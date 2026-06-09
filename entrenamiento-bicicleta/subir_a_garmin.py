#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sube a Garmin Connect el plan generado por la app "Entrenamiento Bici".

Lee el archivo plan_garmin.json (botón "📦 Plan completo para Garmin" de la app),
crea cada entrenamiento en Garmin Connect y lo AGENDA en el calendario en su fecha.

USO
---
1) Instala la dependencia (una sola vez):
       pip install garminconnect
2) Pon este script en la MISMA carpeta que el archivo plan_garmin.json.
3) Ejecútalo:
       python subir_a_garmin.py
   Te pedirá tu email y contraseña de Garmin Connect (si tienes verificación en
   dos pasos, te pedirá también el código que te llegue).

Opcional: para no escribir las credenciales cada vez, puedes definirlas como
variables de entorno GARMIN_EMAIL y GARMIN_PASSWORD.
"""

import os
import sys
import json
import getpass

try:
    from garminconnect import Garmin
except ImportError:
    sys.exit("Falta la librería. Ejecuta primero:  pip install garminconnect")


PLAN_FILE = os.environ.get("PLAN_FILE", "plan_garmin.json")


def cargar_plan(path):
    if not os.path.exists(path):
        sys.exit(f"No encuentro '{path}'. Descárgalo desde la app "
                 f"(botón '📦 Plan completo para Garmin') y déjalo en esta carpeta.")
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    workouts = data.get("workouts", [])
    if not workouts:
        sys.exit("El archivo no contiene entrenamientos.")
    return data, workouts


def login():
    email = os.environ.get("GARMIN_EMAIL") or input("Email de Garmin Connect: ").strip()
    password = os.environ.get("GARMIN_PASSWORD") or getpass.getpass("Contraseña: ")
    print("Iniciando sesión en Garmin Connect...")
    try:
        g = Garmin(email, password)
        g.login()
    except Exception as e:  # incluye el flujo de verificación en dos pasos (MFA)
        msg = str(e).lower()
        if "mfa" in msg or "factor" in msg or "code" in msg:
            sys.exit("Tu cuenta pide verificación en dos pasos. Actualiza la librería "
                     "(pip install -U garminconnect) y vuelve a ejecutar; te pedirá el código.")
        sys.exit(f"No pude iniciar sesión: {e}")
    print("Sesión iniciada ✅")
    return g


def crear_y_agendar(g, item):
    """Crea el workout y lo agenda en su fecha. Devuelve (ok, detalle)."""
    payload = item["workout"]
    nombre = payload.get("workoutName", "Workout")
    fecha = item.get("date")
    # 1) crear el entrenamiento
    r = g.garth.post("connectapi", "/workout-service/workout", json=payload)
    wid = r.json().get("workoutId")
    if not wid:
        return False, f"{nombre}: la API no devolvió workoutId"
    # 2) agendarlo en el calendario en su fecha
    if fecha:
        g.garth.post("connectapi", f"/workout-service/schedule/{wid}", json={"date": fecha})
        return True, f"{nombre}  →  {fecha}"
    return True, f"{nombre}  (sin fecha, solo creado)"


def main():
    data, workouts = cargar_plan(PLAN_FILE)
    print(f"Plan: {data.get('weeks', '?')} semanas · FTP {data.get('ftp', '?')} W · "
          f"{len(workouts)} entrenamientos\n")
    g = login()

    ok = 0
    fallos = []
    for i, item in enumerate(workouts, 1):
        try:
            done, detalle = crear_y_agendar(g, item)
            estado = "✅" if done else "⚠️"
            print(f"[{i:>2}/{len(workouts)}] {estado} {detalle}")
            if done:
                ok += 1
            else:
                fallos.append(detalle)
        except Exception as e:
            nombre = item.get("workout", {}).get("workoutName", f"#{i}")
            print(f"[{i:>2}/{len(workouts)}] ❌ {nombre}: {e}")
            fallos.append(f"{nombre}: {e}")

    print(f"\nHecho: {ok}/{len(workouts)} subidos y agendados.")
    if fallos:
        print("Con problemas:")
        for f in fallos:
            print("  -", f)
    print("\nAbre Garmin Connect → Entrenamiento → Calendario para verlos.")


if __name__ == "__main__":
    main()

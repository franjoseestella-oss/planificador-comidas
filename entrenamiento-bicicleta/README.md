# 🚴 Entrenamiento Bici · Plan FTP

App móvil (PWA) que genera un **plan de entrenamiento de ciclismo periodizado para subir tu FTP**,
a partir de tus datos de Strava, los días que entrenas y el tiempo del que dispones.
Cada sesión se exporta como **workout importable en Garmin Connect**.

> Hecha a medida para Frantxesko (Estella). FTP de partida detectado en Strava: **200 W**.

## ✨ Qué hace

- Indicas tu **FTP actual y objetivo**, los **días de la semana** que entrenas y los **minutos** de cada día.
- Genera un plan de 4/6/8/12 semanas con periodización real:
  - **Carga progresiva** (Sweet Spot → Umbral → VO2 máx), con más volumen cada semana.
  - **Semana de descarga** cada 4 semanas.
  - **Afinamiento + test de FTP** en la última semana.
- Respeta el tiempo disponible: si un día tienes menos minutos, recorta las series para que quepa.
- Calcula **vatios por zona**, **TSS** e **IF** estimados de cada sesión.
- Exporta cada workout (o todos) en el **JSON del workout-service de Garmin Connect** y un **.csv** de calendario.

## 📲 Uso

1. Abre la app en el móvil (ver *Despliegue*) e instálala desde el navegador ("Añadir a pantalla de inicio").
2. Pestaña **Configurar**: ajusta FTP, marca días + minutos, elige semanas y fecha de inicio. Pulsa **Generar plan**.
3. Pestaña **Mi plan**: toca una sesión para ver el detalle, o el botón ⬇️ para descargar su fichero Garmin.

## ⌚ Importar en Garmin Connect

El fichero `.json` que genera la app tiene el mismo formato que sube a la API de Garmin el proyecto de
referencia [sydspost/Garmin-Connect-Workout-and-Schedule-creator](https://github.com/sydspost/Garmin-Connect-Workout-and-Schedule-creator).
Para subirlo a tu cuenta:

```bash
pip install garminconnect
python - <<'PY'
import json, glob
from garminconnect import Garmin
g = Garmin("TU_EMAIL", "TU_PASSWORD"); g.login()
for f in glob.glob("S*_*.json"):
    g.garth.post("connectapi", "/workout-service/workout", json=json.load(open(f)))
    print("subido", f)
PY
```

Los workouts aparecerán en *Garmin Connect → Entrenamiento → Entrenamientos* y podrás enviarlos al dispositivo
o programarlos en el calendario (el `.csv` te ayuda a saber qué día toca cada uno).

## 🧱 Estructura

| Archivo | Función |
|---|---|
| `index.html` | Interfaz (2 pestañas: Configurar / Mi plan) |
| `js/planner.js` | Motor de periodización (zonas, progresión, asignación por días) |
| `js/garmin.js` | Exportador al JSON de Garmin Connect (potencia en vatios) |
| `js/app.js` | Lógica de UI, estado y descargas |
| `manifest.json`, `sw.js`, `icon.svg` | Soporte PWA (instalable, offline) |

## 🚀 Despliegue

Es estática, sirve cualquier hosting:

- **Vercel**: importa el repo (incluye `vercel.json`).
- **GitHub Pages**: Settings → Pages → rama `main` / carpeta raíz.
- **Local**: `python3 -m http.server` y abre `http://localhost:8000`.

## 🔧 Notas

- Los datos de Strava (FTP, perfil) se usaron como punto de partida; el FTP es editable en la app.
- El plan se guarda en el navegador (`localStorage`), no necesita servidor.

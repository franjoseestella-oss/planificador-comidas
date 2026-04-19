
// ============================================================
// DATA.JS — Base de datos de comidas, recetas y nutrición
// ============================================================

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
const DIAS_LABEL = {
  lunes: 'Lunes', martes: 'Martes', miercoles: 'Miércoles',
  jueves: 'Jueves', viernes: 'Viernes'
};

// Semanas de menú rotativas (2 semanas)
const SEMANAS = [
  // ── SEMANA 1 ──────────────────────────────────────────────
  {
    lunes: {
      comida: {
        id: 'arroz-pollo',
        nombre: 'Arroz con pollo y verduras',
        tipo: 'normal',
        porciones: 2,
        tiempo: 40,
        icono: '🍚',
        descripcion: 'Arroz caldoso cocinado con muslos de pollo, pimiento, zanahoria y guisantes. Plato único completo y muy nutritivo.',
        ingredientes: [
          { nombre: 'Arroz', cantidad: '200g', comprar: true },
          { nombre: 'Muslos de pollo', cantidad: '4 uds', comprar: true },
          { nombre: 'Pimiento rojo', cantidad: '1', comprar: true },
          { nombre: 'Zanahoria', cantidad: '2', comprar: true },
          { nombre: 'Guisantes', cantidad: '100g', comprar: true },
          { nombre: 'Caldo de pollo', cantidad: '600ml', comprar: true },
          { nombre: 'Cebolla', cantidad: '1', comprar: true },
          { nombre: 'Ajo', cantidad: '3 dientes', comprar: false },
          { nombre: 'Aceite de oliva', cantidad: 'c/s', comprar: false },
          { nombre: 'Pimentón dulce', cantidad: '1 cdta', comprar: false },
          { nombre: 'Sal y pimienta', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Salpimentar y dorar los muslos de pollo en aceite hasta quedar bien sellados. Reservar.',
          'En la misma cazuela, sofreír la cebolla y ajo picados durante 5 min.',
          'Añadir el pimiento y la zanahoria en dados. Cocinar 5 min más.',
          'Incorporar el pimentón, remover rápido y añadir el arroz. Nacarar 2 min.',
          'Verter el caldo caliente, colocar el pollo encima y cocinar 18-20 min a fuego medio.',
          'Añadir los guisantes los últimos 5 min. Reposar 5 min tapado antes de servir.',
        ],
        nutricion: { calorias: 520, proteinas: 38, carbohidratos: 58, grasas: 12, fibra: 5 },
        nota: '💡 Guarda los huesos del pollo para hacer caldo casero'
      },
      cena: {
        id: 'macarrones-tomate',
        nombre: 'Macarrones con tomate y queso',
        tipo: 'normal',
        porciones: 4,
        tiempo: 20,
        icono: '🍝',
        descripcion: 'Clásico sencillo que encanta a los niños. Macarrones con salsa de tomate casera y queso gratinado.',
        ingredientes: [
          { nombre: 'Macarrones', cantidad: '400g', comprar: true },
          { nombre: 'Tomate triturado', cantidad: '400g lata', comprar: true },
          { nombre: 'Queso rallado mozzarella', cantidad: '150g', comprar: true },
          { nombre: 'Cebolla', cantidad: '1/2', comprar: false },
          { nombre: 'Ajo', cantidad: '2 dientes', comprar: false },
          { nombre: 'Aceite de oliva', cantidad: '3 cdas', comprar: false },
          { nombre: 'Sal, azúcar y orégano', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Cocer la pasta en agua con sal según el paquete (normalmente 10-12 min).',
          'Sofreír cebolla y ajo en aceite durante 5 min.',
          'Añadir el tomate, sal, una pizca de azúcar y orégano. Cocinar 10 min.',
          'Escurrir la pasta, mezclar con la salsa.',
          'Opcional: pasar por el grill 5 min con queso gratinado por encima.',
        ],
        nutricion: { calorias: 420, proteinas: 18, carbohidratos: 72, grasas: 9, fibra: 4 },
        nota: '🧒 Apto para niños de 5 y 7 años — sin picante'
      }
    },
    martes: {
      comida: {
        id: 'lentejas-chorizo',
        nombre: 'Lentejas con chorizo y verduras',
        tipo: 'normal',
        porciones: 2,
        tiempo: 45,
        icono: '🫘',
        descripcion: 'Lentejas pardinas con sofrito de verduras, chorizo y patata. Plato contundente y muy completo.',
        ingredientes: [
          { nombre: 'Lentejas pardinas', cantidad: '250g', comprar: true },
          { nombre: 'Chorizo', cantidad: '100g', comprar: true },
          { nombre: 'Patata', cantidad: '2', comprar: true },
          { nombre: 'Zanahoria', cantidad: '1', comprar: false },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Pimiento verde', cantidad: '1', comprar: false },
          { nombre: 'Ajo', cantidad: '3 dientes', comprar: false },
          { nombre: 'Tomate', cantidad: '1', comprar: false },
          { nombre: 'Aceite, sal, laurel', cantidad: 'c/s', comprar: false },
          { nombre: 'Pimentón', cantidad: '1 cdta', comprar: false },
        ],
        pasos: [
          'Enjuagar las lentejas y ponerlas en remojo 1h si es posible (opcional).',
          'Sofreír en aceite: cebolla, ajo, pimiento y zanahoria durante 8 min.',
          'Añadir el chorizo en rodajas y el tomate rallado. Cocinar 5 min.',
          'Incorporar las lentejas, la patata en trozos, el laurel y pimentón.',
          'Cubrir con agua fría 3 cm por encima y cocinar 30-35 min a fuego suave.',
          'Rectificar de sal. Servir caliente.',
        ],
        nutricion: { calorias: 540, proteinas: 32, carbohidratos: 68, grasas: 14, fibra: 16 },
        nota: '💡 Mejoran de un día para otro — ideal hacer cantidad extra'
      },
      cena: {
        id: 'crema-calabaza',
        nombre: 'Crema de calabaza con tostadas',
        tipo: 'normal',
        porciones: 4,
        tiempo: 25,
        icono: '🎃',
        descripcion: 'Cremosa sopa de calabaza con un toque de jengibre, acompañada de tostadas con jamón york para los niños.',
        ingredientes: [
          { nombre: 'Calabaza', cantidad: '700g', comprar: true },
          { nombre: 'Pan de molde', cantidad: '8 rebanadas', comprar: true },
          { nombre: 'Jamón york', cantidad: '8 lonchas', comprar: true },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Zanahoria', cantidad: '1', comprar: false },
          { nombre: 'Caldo de verduras', cantidad: '600ml', comprar: false },
          { nombre: 'Nata para cocinar', cantidad: '100ml', comprar: true },
          { nombre: 'Jengibre en polvo', cantidad: '1/2 cdta', comprar: false },
          { nombre: 'Aceite, sal y pimienta', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Pochar cebolla y zanahoria en aceite 5 min.',
          'Añadir la calabaza en trozos, el jengibre y el caldo. Cocinar 18-20 min.',
          'Triturar con batidora hasta obtener crema fina. Añadir la nata y salpimentar.',
          'Tostar el pan y colocar jamón york encima para las tostadas.',
          'Servir la crema caliente con un hilo de aceite.',
        ],
        nutricion: { calorias: 280, proteinas: 14, carbohidratos: 38, grasas: 8, fibra: 6 },
        nota: '🧒 Los niños suelen adorar esta crema por su sabor suave y color bonito'
      }
    },
    miercoles: {
      comida: {
        id: 'croquetas-pollo',
        nombre: 'Croquetas de pollo + ensalada completa',
        tipo: 'aprovechamiento',
        porciones: 2,
        tiempo: 35,
        icono: '🟡',
        descripcion: 'Aprovechamos el pollo del arroz del lunes para hacier unas croquetas cremosas. Con ensalada completa hace un menú perfecto.',
        ingredientes: [
          { nombre: 'Pollo cocido (sobrante del lunes)', cantidad: '150g', comprar: false },
          { nombre: 'Leche entera', cantidad: '500ml', comprar: false },
          { nombre: 'Harina', cantidad: '60g', comprar: false },
          { nombre: 'Mantequilla', cantidad: '50g', comprar: false },
          { nombre: 'Pan rallado', cantidad: '100g', comprar: false },
          { nombre: 'Huevo', cantidad: '2', comprar: false },
          { nombre: 'Lechuga', cantidad: '1/2', comprar: true },
          { nombre: 'Tomate', cantidad: '2', comprar: false },
          { nombre: 'Pepino', cantidad: '1', comprar: true },
          { nombre: 'Atún', cantidad: '1 lata', comprar: true },
          { nombre: 'Huevo cocido', cantidad: '2', comprar: false },
          { nombre: 'Aceite y vinagre', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Desmigar el pollo cocido finamente.',
          'Hacer bechamel: derretir mantequilla, añadir harina, cocinar 2 min, incorporar la leche caliente poco a poco removiendo hasta espesar.',
          'Añadir el pollo a la bechamel, salpimentar. Enfriar en nevera 2h mínimo.',
          'Formar croquetas, pasar por huevo batido y pan rallado.',
          'Freír en aceite abundante hasta dorar. Escurrir en papel.',
          'Preparar ensalada con todos los ingredientes y aliñar.',
        ],
        nutricion: { calorias: 580, proteinas: 30, carbohidratos: 52, grasas: 26, fibra: 5 },
        nota: '♻️ APROVECHAMIENTO — Usamos el pollo del arroz del lunes'
      },
      cena: {
        id: 'tortilla-patatas',
        nombre: 'Tortilla de patatas con pan',
        tipo: 'normal',
        porciones: 4,
        tiempo: 30,
        icono: '🥚',
        descripcion: 'La clásica tortilla española, jugosa por dentro. Con pan de barra y ensalada opcional.',
        ingredientes: [
          { nombre: 'Huevos', cantidad: '6', comprar: false },
          { nombre: 'Patatas', cantidad: '500g', comprar: false },
          { nombre: 'Cebolla', cantidad: '1 (opcional)', comprar: false },
          { nombre: 'Aceite de oliva', cantidad: '150ml', comprar: false },
          { nombre: 'Sal', cantidad: 'c/s', comprar: false },
          { nombre: 'Pan de barra', cantidad: '1', comprar: true },
        ],
        pasos: [
          'Pelar y cortar las patatas en láminas finas. Salar.',
          'Freír en aceite abundante a fuego medio 15-18 min hasta que estén tiernas.',
          'Escurrir bien el aceite. Batir los huevos con sal y mezclar con las patatas.',
          'En sartén con poco aceite caliente, verter la mezcla. Cocinar 3 min, dar la vuelta con un plato.',
          'Cocinar 2-3 min más según gusto de cuajado. Servir con pan.',
        ],
        nutricion: { calorias: 350, proteinas: 16, carbohidratos: 38, grasas: 14, fibra: 3 },
        nota: '🧒 Los niños pueden comerla tal cual con pan'
      }
    },
    jueves: {
      comida: {
        id: 'pasta-bolonesa',
        nombre: 'Pasta con salsa boloñesa',
        tipo: 'normal',
        porciones: 2,
        tiempo: 35,
        icono: '🍝',
        descripcion: 'Tallarines o espaguetis con salsa boloñesa casera de ternera. Plato único muy completo y reconfortante.',
        ingredientes: [
          { nombre: 'Tallarines o espaguetis', cantidad: '200g', comprar: true },
          { nombre: 'Carne picada ternera', cantidad: '250g', comprar: true },
          { nombre: 'Tomate triturado', cantidad: '400g lata', comprar: false },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Zanahoria', cantidad: '1', comprar: false },
          { nombre: 'Ajo', cantidad: '2 dientes', comprar: false },
          { nombre: 'Vino tinto', cantidad: '100ml', comprar: false },
          { nombre: 'Queso parmesano', cantidad: '30g', comprar: true },
          { nombre: 'Aceite, sal, azúcar, orégano', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Sofreír cebolla, zanahoria y ajo muy picados hasta que estén blandos.',
          'Añadir la carne, subir el fuego y dorar bien removiendo.',
          'Incorporar el vino y dejar evaporar 2 min.',
          'Añadir el tomate, sal, azúcar y orégano. Cocinar 20 min a fuego bajo.',
          'Cocer la pasta al dente. Escurrir y mezclar con la salsa.',
          'Servir con queso parmesano rallado por encima.',
        ],
        nutricion: { calorias: 590, proteinas: 42, carbohidratos: 65, grasas: 16, fibra: 6 },
        nota: '💡 Puedes hacer el doble de boloñesa y congelar la mitad'
      },
      cena: {
        id: 'pizza-casera',
        nombre: 'Pizza casera con masa comprada',
        tipo: 'normal',
        porciones: 4,
        tiempo: 20,
        icono: '🍕',
        descripcion: 'Pizza casera rápida usando masa comprada. Los niños pueden personalizar su parte. Cena divertida y sencilla.',
        ingredientes: [
          { nombre: 'Base de pizza precocinada', cantidad: '2 ud', comprar: true },
          { nombre: 'Tomate triturado', cantidad: '200g', comprar: false },
          { nombre: 'Mozzarella rallada', cantidad: '200g', comprar: true },
          { nombre: 'Jamón cocido', cantidad: '150g', comprar: true },
          { nombre: 'Champiñones', cantidad: '100g', comprar: true },
          { nombre: 'Orégano', cantidad: 'c/s', comprar: false },
          { nombre: 'Aceite de oliva', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Precalentar horno a 220°C.',
          'Extender tomate sobre las bases, añadir un poco de sal y aceite.',
          'Distribuir la mozzarella generosamente.',
          'Colocar jamón y champiñones (en la mitad de los niños solo jamón y queso).',
          'Espolvorear orégano y hornear 12-15 min hasta que el queso burbujee.',
        ],
        nutricion: { calorias: 460, proteinas: 22, carbohidratos: 48, grasas: 20, fibra: 3 },
        nota: '🧒 Involucra a los niños en poner los ingredientes — les encanta'
      }
    },
    viernes: {
      comida: {
        id: 'merluza-horno',
        nombre: 'Merluza al horno con patatas',
        tipo: 'normal',
        porciones: 2,
        tiempo: 40,
        icono: '🐟',
        descripcion: 'Rodajas de merluza al horno sobre cama de patatas y pimientos. Plato ligero, sano y muy sabroso.',
        ingredientes: [
          { nombre: 'Merluza (rodajas)', cantidad: '4 rodajas', comprar: true },
          { nombre: 'Patatas', cantidad: '3', comprar: false },
          { nombre: 'Pimiento verde y rojo', cantidad: '1 de cada', comprar: false },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Tomate', cantidad: '2', comprar: false },
          { nombre: 'Ajo', cantidad: '4 dientes', comprar: false },
          { nombre: 'Vino blanco', cantidad: '100ml', comprar: false },
          { nombre: 'Aceite de oliva', cantidad: '4 cdas', comprar: false },
          { nombre: 'Sal, perejil y pimentón', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Precalentar horno a 200°C.',
          'Pelar y cortar patatas en rodajas finas. Colocar en bandeja con aceite, sal y 20 min en el horno.',
          'Añadir sobre las patatas: cebolla, pimientos y tomate en rodajas. 10 min más.',
          'Colocar la merluza encima, añadir ajo laminado, perejil, pimentón y vino blanco.',
          'Hornear 15-18 min hasta que el pescado esté hecho. Servir inmediatamente.',
        ],
        nutricion: { calorias: 460, proteinas: 48, carbohidratos: 38, grasas: 10, fibra: 5 },
        nota: '🐟 El pescado blanco es ideal para el viernes — ligero y nutritivo'
      },
      cena: {
        id: 'hamburguesas-caseras',
        nombre: 'Hamburguesas caseras con patatas al horno',
        tipo: 'normal',
        porciones: 4,
        tiempo: 30,
        icono: '🍔',
        descripcion: 'Hamburguesas de ternera caseras con lechuga, tomate y queso. Acompañadas de patatas al horno. ¡Cena de viernes especial!',
        ingredientes: [
          { nombre: 'Carne picada ternera', cantidad: '400g', comprar: true },
          { nombre: 'Pan de hamburguesa', cantidad: '4 uds', comprar: true },
          { nombre: 'Queso en lonchas', cantidad: '4 lonchas', comprar: true },
          { nombre: 'Lechuga', cantidad: '4 hojas', comprar: false },
          { nombre: 'Tomate', cantidad: '1', comprar: false },
          { nombre: 'Patatas', cantidad: '4', comprar: false },
          { nombre: 'Ketchup y mayonesa', cantidad: 'c/s', comprar: false },
          { nombre: 'Sal, ajo en polvo', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Cortar patatas en gajos, salar, añadir aceite y hornear a 200°C durante 25-30 min.',
          'Mezclar la carne con sal y ajo en polvo. Formar 4 hamburguesas.',
          'Cocinar en sartén o plancha caliente 3-4 min por lado.',
          'Último minuto, colocar queso encima para que se funda.',
          'Montar las hamburguesas con lechuga, tomate, salsas al gusto.',
        ],
        nutricion: { calorias: 620, proteinas: 38, carbohidratos: 52, grasas: 28, fibra: 4 },
        nota: '🎉 Cena especial de viernes para toda la familia'
      }
    }
  },

  // ── SEMANA 2 ──────────────────────────────────────────────
  {
    lunes: {
      comida: {
        id: 'cocido-verduras',
        nombre: 'Cocido de garbanzos con verduras y jamón',
        tipo: 'normal',
        porciones: 2,
        tiempo: 50,
        icono: '🫘',
        descripcion: 'Garbanzos con espinacas, huevo duro y jamón serrano. Plato único lleno de proteínas y hierro.',
        ingredientes: [
          { nombre: 'Garbanzos cocidos (bote)', cantidad: '400g', comprar: true },
          { nombre: 'Espinacas frescas', cantidad: '200g', comprar: true },
          { nombre: 'Jamón serrano', cantidad: '80g', comprar: true },
          { nombre: 'Huevos', cantidad: '2', comprar: false },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Ajo', cantidad: '4 dientes', comprar: false },
          { nombre: 'Comino, pimentón', cantidad: 'c/s', comprar: false },
          { nombre: 'Aceite de oliva', cantidad: '3 cdas', comprar: false },
        ],
        pasos: [
          'Cocer los huevos 10 min en agua hirviendo. Pelar y reservar.',
          'En cazuela, dorar ajo y cebolla. Añadir pimentón y comino.',
          'Incorporar los garbanzos escurridos y el jamón. Saltear 3 min.',
          'Añadir espinacas y remover hasta que se reduzcan.',
          'Servir con el huevo duro cortado por encima.',
        ],
        nutricion: { calorias: 480, proteinas: 35, carbohidratos: 48, grasas: 14, fibra: 18 },
        nota: '💡 Los garbanzos en bote ahorran mucho tiempo — igual de nutritivos'
      },
      cena: {
        id: 'pasta-carbonara',
        nombre: 'Pasta carbonara sencilla',
        tipo: 'normal',
        porciones: 4,
        tiempo: 20,
        icono: '🍝',
        descripcion: 'Pasta con salsa cremosa de huevo, bacon y queso. Rápida de preparar y que gusta a toda la familia.',
        ingredientes: [
          { nombre: 'Espaguetis', cantidad: '400g', comprar: true },
          { nombre: 'Bacon en lonchas', cantidad: '150g', comprar: true },
          { nombre: 'Huevos', cantidad: '3', comprar: false },
          { nombre: 'Queso parmesano', cantidad: '100g', comprar: true },
          { nombre: 'Nata para cocinar', cantidad: '100ml', comprar: false },
          { nombre: 'Sal y pimienta negra', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Cocer la pasta al dente. Guardar un vaso del agua de cocción.',
          'Dorar el bacon en sartén sin aceite hasta que esté crujiente.',
          'Batir huevos, queso y nata con pimienta negra.',
          'Mezclar la pasta caliente con el bacon, retirar del fuego.',
          'Añadir la mezcla de huevo removiendo rápido (el calor la cuaja). Si queda seco, añadir agua de cocción.',
        ],
        nutricion: { calorias: 520, proteinas: 24, carbohidratos: 68, grasas: 18, fibra: 3 },
        nota: '🧒 Versión con nata para que sea más suave y menos probable de cortarse'
      }
    },
    martes: {
      comida: {
        id: 'sopa-fideo',
        nombre: 'Sopa de fideos con pollo',
        tipo: 'normal',
        porciones: 2,
        tiempo: 30,
        icono: '🍜',
        descripcion: 'Reconfortante sopa casera de fideos con muslos de pollo troceados y verduras. Plato de cuchara completo.',
        ingredientes: [
          { nombre: 'Fideos gordos', cantidad: '150g', comprar: true },
          { nombre: 'Pechuga de pollo', cantidad: '300g', comprar: true },
          { nombre: 'Caldo de pollo', cantidad: '1L', comprar: true },
          { nombre: 'Zanahoria', cantidad: '2', comprar: false },
          { nombre: 'Apio', cantidad: '1 rama', comprar: true },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Sal, perejil', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Cocer el pollo en el caldo junto con cebolla, zanahoria y apio 20 min.',
          'Retirar el pollo, desmigar y volver a la olla.',
          'Añadir los fideos y cocinar según el paquete (6-8 min).',
          'Rectificar de sal y servir con perejil picado.',
        ],
        nutricion: { calorias: 420, proteinas: 38, carbohidratos: 48, grasas: 6, fibra: 4 },
        nota: '💡 Guarda el pollo desmigado sobrante para el miércoles'
      },
      cena: {
        id: 'empanada-atun',
        nombre: 'Empanada de atún con ensalada',
        tipo: 'normal',
        porciones: 4,
        tiempo: 35,
        icono: '🥧',
        descripcion: 'Empanada gallega con masa comprada, rellena de atún, tomate y pimiento. Fácil y que les gusta a todos.',
        ingredientes: [
          { nombre: 'Masa para empanada', cantidad: '2 planchas', comprar: true },
          { nombre: 'Atún en aceite', cantidad: '3 latas', comprar: true },
          { nombre: 'Tomate triturado', cantidad: '200g', comprar: false },
          { nombre: 'Pimiento rojo asado (bote)', cantidad: '100g', comprar: true },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Huevo', cantidad: '1 (para pintar)', comprar: false },
          { nombre: 'Lechuga, tomate y pepino', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Sofreír cebolla, añadir tomate y cocinar 10 min. Escurrir el atún y mezclar con pimiento y la salsa.',
          'Colocar una plancha de masa en bandeja, rellenar con la mezcla.',
          'Tapar con la otra plancha, sellar los bordes y pintar con huevo batido.',
          'Hornear a 200°C durante 20-25 min hasta dorar.',
          'Acompañar con ensalada fresca.',
        ],
        nutricion: { calorias: 440, proteinas: 28, carbohidratos: 45, grasas: 16, fibra: 3 },
        nota: '🧒 Fría también está buenísima — puedes hacerla la noche anterior'
      }
    },
    miercoles: {
      comida: {
        id: 'caldo-arroz-pollo',
        nombre: 'Arroz con pollo desmigado y verduras',
        tipo: 'aprovechamiento',
        porciones: 2,
        tiempo: 20,
        icono: '🍲',
        descripcion: 'Aprovechamos el pollo de la sopa del martes. Arroz salteado con verduras y el pollo desmigado. Sabrosísimo.',
        ingredientes: [
          { nombre: 'Pollo desmigado (sobrante martes)', cantidad: '150g', comprar: false },
          { nombre: 'Arroz', cantidad: '180g', comprar: false },
          { nombre: 'Guisantes', cantidad: '80g', comprar: false },
          { nombre: 'Zanahoria', cantidad: '1', comprar: false },
          { nombre: 'Salsa de soja', cantidad: '2 cdas', comprar: false },
          { nombre: 'Huevo', cantidad: '2', comprar: false },
          { nombre: 'Aceite de sésamo (opcional)', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Cocer el arroz y dejar enfriar (ideal usar arroz de la víspera).',
          'Saltear zanahoria y guisantes en aceite 5 min.',
          'Añadir el pollo y saltear 2 min.',
          'Incorporar el arroz y remover bien a fuego fuerte.',
          'Hacer un hueco, añadir los huevos batidos y revolver todo.',
          'Añadir la salsa de soja, mezclar y servir.',
        ],
        nutricion: { calorias: 500, proteinas: 32, carbohidratos: 62, grasas: 12, fibra: 4 },
        nota: '♻️ APROVECHAMIENTO — Reutilizamos el pollo de la sopa del martes'
      },
      cena: {
        id: 'salmon-limon',
        nombre: 'Salmón al limón con brócoli al vapor',
        tipo: 'normal',
        porciones: 4,
        tiempo: 25,
        icono: '🐠',
        descripcion: 'Filetes de salmón al horno con limón y eneldo. Con brócoli al vapor. Cena ligera, sana y deliciosa.',
        ingredientes: [
          { nombre: 'Filetes de salmón', cantidad: '4', comprar: true },
          { nombre: 'Brócoli', cantidad: '1 cabeza', comprar: true },
          { nombre: 'Limón', cantidad: '2', comprar: true },
          { nombre: 'Ajo', cantidad: '2 dientes', comprar: false },
          { nombre: 'Eneldo seco', cantidad: '1 cdta', comprar: false },
          { nombre: 'Aceite de oliva, sal', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Precalentar horno a 180°C.',
          'Colocar el salmón en papel de horno, añadir ajo laminado, eneldo, zumo de limón y aceite.',
          'Hornear 15-18 min.',
          'Cocer el brócoli al vapor o en agua con sal 8-10 min.',
          'Servir el salmón con el brócoli y rodajas de limón.',
        ],
        nutricion: { calorias: 350, proteinas: 38, carbohidratos: 8, grasas: 18, fibra: 5 },
        nota: '🧒 Para los niños pequeños, desmigar el salmón y asegurarse que no hay espinas'
      }
    },
    jueves: {
      comida: {
        id: 'estofado-ternera',
        nombre: 'Estofado de ternera con patatas',
        tipo: 'normal',
        porciones: 2,
        tiempo: 60,
        icono: '🥩',
        descripcion: 'Carne de ternera guisada con patatas y verduras en su propio jugo. Plato hecho en olla express en 20 min.',
        ingredientes: [
          { nombre: 'Ternera para guisar', cantidad: '300g', comprar: true },
          { nombre: 'Patatas', cantidad: '3', comprar: false },
          { nombre: 'Zanahoria', cantidad: '2', comprar: false },
          { nombre: 'Cebolla', cantidad: '1', comprar: false },
          { nombre: 'Tomate', cantidad: '1', comprar: false },
          { nombre: 'Vino tinto', cantidad: '100ml', comprar: false },
          { nombre: 'Caldo de carne', cantidad: '300ml', comprar: false },
          { nombre: 'Laurel, tomillo, sal', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Dorar la carne salpimentada en aceite fuerte. Retirar.',
          'Pochar cebolla y zanahoria 5 min. Añadir tomate y cocinar 3 min.',
          'Incorporar la carne, el vino y dejar reducir 2 min.',
          'Añadir caldo, patatas en trozos, laurel y tomillo.',
          'En olla express: 20 min desde que sube la presión. Normal: 45-50 min tapado.',
        ],
        nutricion: { calorias: 560, proteinas: 44, carbohidratos: 42, grasas: 18, fibra: 6 },
        nota: '💡 En olla express el tiempo se reduce a la mitad'
      },
      cena: {
        id: 'wrap-pollo',
        nombre: 'Wraps de pollo con verduras y hummus',
        tipo: 'normal',
        porciones: 4,
        tiempo: 20,
        icono: '🌯',
        descripcion: 'Tortillas de trigo rellenas de pollo asado, lechuga, zanahoria rallada y hummus. Fácil, fresco y nutritivo.',
        ingredientes: [
          { nombre: 'Tortillas de trigo grandes', cantidad: '4', comprar: true },
          { nombre: 'Pechuga pollo asada', cantidad: '300g', comprar: true },
          { nombre: 'Hummus', cantidad: '200g', comprar: true },
          { nombre: 'Lechuga', cantidad: '1/2', comprar: false },
          { nombre: 'Zanahoria', cantidad: '1', comprar: false },
          { nombre: 'Tomate', cantidad: '1', comprar: false },
          { nombre: 'Queso cremoso (opcional)', cantidad: '50g', comprar: false },
        ],
        pasos: [
          'Cortar el pollo en tiras finas.',
          'Calentar las tortillas 30 seg en microondas.',
          'Untar hummus sobre cada tortilla.',
          'Añadir lechuga, zanahoria rallada, tomate y pollo.',
          'Enrollar firmemente. Cortar por la mitad en diagonal.',
        ],
        nutricion: { calorias: 380, proteinas: 28, carbohidratos: 42, grasas: 10, fibra: 5 },
        nota: '🧒 A los niños les encanta enrollarlos ellos mismos'
      }
    },
    viernes: {
      comida: {
        id: 'paella-mixta',
        nombre: 'Paella mixta de viernes',
        tipo: 'normal',
        porciones: 2,
        tiempo: 45,
        icono: '🥘',
        descripcion: 'Paella con pollo, gambas y mejillones. El plato de los viernes para celebrar el fin de semana.',
        ingredientes: [
          { nombre: 'Arroz bomba', cantidad: '200g', comprar: true },
          { nombre: 'Muslo de pollo troceado', cantidad: '2', comprar: true },
          { nombre: 'Gambas', cantidad: '150g', comprar: true },
          { nombre: 'Mejillones', cantidad: '200g', comprar: true },
          { nombre: 'Tomate rallado', cantidad: '1', comprar: false },
          { nombre: 'Pimiento rojo', cantidad: '1/2', comprar: false },
          { nombre: 'Caldo de pescado o mariscos', cantidad: '500ml', comprar: true },
          { nombre: 'Azafrán o colorante', cantidad: 'c/s', comprar: false },
          { nombre: 'Aceite, sal, pimentón', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Dorar el pollo en la paellera con aceite. Reservar.',
          'Sofreír pimiento, añadir tomate y pimentón. Cocinar 5 min.',
          'Añadir el arroz, nacerar 2 min. Incorporar el caldo caliente con azafrán.',
          'Volver con el pollo. Cocinar 18 min sin remover.',
          'Añadir gambas y mejillones los últimos 5 min.',
          'Reposar 5 min tapado con papel de cocina.',
        ],
        nutricion: { calorias: 580, proteinas: 52, carbohidratos: 55, grasas: 14, fibra: 4 },
        nota: '🎉 ¡Paella de viernes! El caldo de pescado es clave para el sabor'
      },
      cena: {
        id: 'crepes-jamon-queso',
        nombre: 'Crêpes de jamón y queso',
        tipo: 'normal',
        porciones: 4,
        tiempo: 25,
        icono: '🫓',
        descripcion: 'Crêpes caseros rellenos de jamón york y queso fundido. Rápidos, sencillos y que gustan a toda la familia.',
        ingredientes: [
          { nombre: 'Harina', cantidad: '200g', comprar: false },
          { nombre: 'Leche', cantidad: '400ml', comprar: false },
          { nombre: 'Huevos', cantidad: '3', comprar: false },
          { nombre: 'Mantequilla', cantidad: '30g', comprar: false },
          { nombre: 'Jamón york', cantidad: '8 lonchas', comprar: false },
          { nombre: 'Queso en lonchas', cantidad: '8 lonchas', comprar: false },
          { nombre: 'Sal', cantidad: 'c/s', comprar: false },
        ],
        pasos: [
          'Mezclar harina, huevos, leche y sal hasta obtener masa lisa. Reposar 20 min.',
          'Calentar sartén antiadherente con un poco de mantequilla.',
          'Verter un cucharón, inclinar para extender. Cocinar 1 min por lado.',
          'Rellenar cada crêpe con jamón y queso, doblar en cuartos.',
          'Servir calientes, 2 crêpes por persona.',
        ],
        nutricion: { calorias: 420, proteinas: 22, carbohidratos: 48, grasas: 16, fibra: 2 },
        nota: '🧒 Los niños pueden rellenar los suyos solos — actividad divertida'
      }
    }
  }
];

// Alternativas de comida cuando se rechaza la propuesta
const ALTERNATIVAS = {
  comida: [
    { id: 'ensalada-pollo', nombre: 'Ensalada César con pollo', icono: '🥗', tiempo: 15 },
    { id: 'verduras-huevo-frito', nombre: 'Menestra de verduras con huevo', icono: '🥦', tiempo: 25 },
    { id: 'judias-pintas', nombre: 'Judías pintas con arroz', icono: '🫘', tiempo: 40 },
    { id: 'revuelto-champis', nombre: 'Revuelto de champiñones y jamón', icono: '🍳', tiempo: 15 },
    { id: 'pescado-plancha', nombre: 'Filete de pescado a la plancha', icono: '🐟', tiempo: 15 },
  ],
  cena: [
    { id: 'sopa-fideos', nombre: 'Sopa de fideos con verduras', icono: '🍜', tiempo: 20 },
    { id: 'bocadillos-variados', nombre: 'Bocadillos variados', icono: '🥪', tiempo: 10 },
    { id: 'revuelto-patatas', nombre: 'Revuelto de patatas y pimientos', icono: '🍳', tiempo: 20 },
    { id: 'pure-patatas', nombre: 'Puré de patatas con salchicha', icono: '🥔', tiempo: 20 },
    { id: 'arroz-leche-tomate', nombre: 'Arroz a la cubana', icono: '🍚', tiempo: 20 },
    // ── Nuevas recetas del Recetario Oficial (Ministerio de Consumo) ──
    { id: 'lentejas-arroz-curcuma', nombre: 'Lentejas con arroz y cúrcuma', icono: '🍲', tiempo: 25 },
    { id: 'garbanzos-pisto', nombre: 'Garbanzos con pisto', icono: '🫘', tiempo: 30 },
    { id: 'espaguetis-estudiante', nombre: 'Espaguetis del estudiante', icono: '🍝', tiempo: 15 },
    { id: 'tortilla-calabacin', nombre: 'Tortilla de patata y calabacín', icono: '🍳', tiempo: 20 },
    { id: 'pitas-huevo-espinacas', nombre: 'Pitas con huevo y espinacas', icono: '🥙', tiempo: 15 },
    { id: 'ramen-casero', nombre: 'Ramen casero', icono: '🍜', tiempo: 20 },
    { id: 'salmon-microondas', nombre: 'Salmón exprés al microondas', icono: '🐟', tiempo: 10 },
    { id: 'brocheta-pollo', nombre: 'Brocheta de pollo especiado', icono: '🍢', tiempo: 20 },
    { id: 'miniburger-alubias', nombre: 'Miniburger de alubias y atún', icono: '🍔', tiempo: 20 },
    { id: 'olleta-arroz-integral', nombre: 'Olleta de arroz integral', icono: '🍱', tiempo: 35 },
  ]
};

// ── RECETAS COMPLETAS (Nuevas del Recetario Oficial) ─────────
const RECETAS_NUEVAS = {
  "crema-tibia-puerro-patata": {
    "id": "crema-tibia-puerro-patata",
    "nombre": "Crema tibia de puerro y patata",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 60,
    "icono": "🍲",
    "descripcion": "Crema tibia ideal para la primavera.",
    "ingredientes": [
      {
        "nombre": "Puerros",
        "cantidad": "4",
        "comprar": false
      },
      {
        "nombre": "Patata",
        "cantidad": "1",
        "comprar": false
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "2 cucharadas",
        "comprar": false
      },
      {
        "nombre": "Caldo de verduras",
        "cantidad": "500 ml",
        "comprar": false
      },
      {
        "nombre": "Nata para cocinar",
        "cantidad": "100 ml",
        "comprar": false
      },
      {
        "nombre": "Sal y pimienta",
        "cantidad": "al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Lavar y cortar los puerros y la patata.",
      "Rehogar los puerros con el aceite de oliva en una olla.",
      "Añadir la patata y el caldo de verduras, y dejar cocer.",
      "Triturar con batidora eléctrica y añadir la nata.",
      "Salpimentar al gusto y servir tibio."
    ]
  },
  "bacalao-al-pil-pil": {
    "id": "bacalao-al-pil-pil",
    "nombre": "Bacalao al pil pil",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 30,
    "icono": "🐟",
    "descripcion": "Bacalao al pil pil con el truco para templar rápido el aceite.",
    "ingredientes": [
      {
        "nombre": "Ajos",
        "cantidad": "Varios dientes",
        "comprar": false
      },
      {
        "nombre": "Guindillas",
        "cantidad": "Un par",
        "comprar": false
      },
      {
        "nombre": "Lomitos de bacalao desalado",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Raspas de bacalao",
        "cantidad": "Opcional",
        "comprar": false
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "Abundante",
        "comprar": false
      }
    ],
    "pasos": [
      "Picar los ajos en láminas finas y confitarlos a fuego suave junto con las guindillas hasta que estén crujientes. Reservar.",
      "En el mismo aceite, poner los lomos de bacalao con la piel hacia arriba y confitar al mínimo por 15-20 minutos, añadiendo raspas para soltar colágeno.",
      "Retirar el bacalao cuando las lascas empiecen a despegarse.",
      "Templar rápidamente el aceite colado colocando la cazuela sobre placas de congelar.",
      "Emulsionar el pil pil vertiendo el aceite poco a poco.",
      "Devolver el bacalao y los ajos a la cazuela para dar un último meneo y servir."
    ]
  },
  "chips-de-kale": {
    "id": "chips-de-kale",
    "nombre": "Chips de kale",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥬",
    "descripcion": "Un snack crujiente y saludable a base de kale horneado.",
    "ingredientes": [
      {
        "nombre": "Kale",
        "cantidad": "1 manojo",
        "comprar": false
      },
      {
        "nombre": "AOVE",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Sal",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Pimentón",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Cúrcuma",
        "cantidad": "Opcional",
        "comprar": false
      },
      {
        "nombre": "Ajo en polvo",
        "cantidad": "Opcional",
        "comprar": false
      }
    ],
    "pasos": [
      "Precalentar el horno a 180°C - 200°C con calor arriba y abajo.",
      "Lavar muy bien el kale y secarlo con papel absorbente.",
      "Quitar los tallos gruesos y cortar en trozos de unos 4 cm.",
      "Masajear en un bol las hojas con el AOVE hasta que estén impregnadas.",
      "Extender sin amontonar en la bandeja del horno con papel vegetal y hornear 10-12 min.",
      "Dejar enfriar y añadir sal y especias al gusto."
    ]
  },
  "guisote-marinero-merluza": {
    "id": "guisote-marinero-merluza",
    "nombre": "Guisote marinero de Merluza con Cachelos 'importantes'",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 40,
    "icono": "🍲",
    "descripcion": "Un guiso tradicional con sabor a mar.",
    "ingredientes": [
      {
        "nombre": "Merluza gruesa",
        "cantidad": "Medallones o rodajas",
        "comprar": true
      },
      {
        "nombre": "Patatas",
        "cantidad": "500g",
        "comprar": true
      },
      {
        "nombre": "Caldo de pescado",
        "cantidad": "1 botella",
        "comprar": true
      },
      {
        "nombre": "Azafrán en hebras",
        "cantidad": "2 sobres",
        "comprar": true
      },
      {
        "nombre": "Guisantes dulces",
        "cantidad": "1 puñado",
        "comprar": false
      }
    ],
    "pasos": [
      "Sofreír las patatas y agregar el azafrán.",
      "Añadir el caldo de pescado y dejar cocinar las patatas a fuego medio.",
      "En los últimos minutos, incorporar los medallones de merluza y los guisantes.",
      "Dejar cocer hasta que el pescado esté en su punto y servir."
    ]
  },
  "puerros-asados-carbonara-kimchi": {
    "id": "puerros-asados-carbonara-kimchi",
    "nombre": "Puerros asados con carbonara de kimchi",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 30,
    "icono": "🧅",
    "descripcion": "Puerros al horno bañados en una deliciosa y original carbonara de kimchi.",
    "ingredientes": [
      {
        "nombre": "Puerros tiernos",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Mantequilla",
        "cantidad": "Unos dados",
        "comprar": false
      },
      {
        "nombre": "Yemas de huevo",
        "cantidad": "2 unidades",
        "comprar": false
      },
      {
        "nombre": "Queso de oveja rallado",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Aliño de kimchi",
        "cantidad": "Un chorrito",
        "comprar": false
      },
      {
        "nombre": "Sal y pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Quitar el verde a los puerros y cortar en tajadas un poco gruesas.",
      "Colocar en bandeja de horno, añadir daditos de mantequilla, sal y pimienta.",
      "Tapar con aluminio y hornear 20 minutos a 200°C.",
      "Mezclar las yemas, el queso, pimienta y el aliño de kimchi.",
      "Destapar los puerros, dar un golpe de grill y verter la crema por encima al servir."
    ]
  },
  "curry-rapido-garbanzos-espinacas": {
    "id": "curry-rapido-garbanzos-espinacas",
    "nombre": "Curry rápido de garbanzos y espinacas",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🍛",
    "descripcion": "Un plato de cuchara caliente, completo y rápido de preparar.",
    "ingredientes": [
      {
        "nombre": "Garbanzos cocidos",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Espinacas baby",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Leche de coco",
        "cantidad": "200ml",
        "comprar": false
      },
      {
        "nombre": "Pasta de curry",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Cebolla",
        "cantidad": "1/2 unidad",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "1 diente",
        "comprar": false
      }
    ],
    "pasos": [
      "Pica finamente la cebolla y el ajo y sofríelos en una sartén con el aceite de oliva.",
      "Añade la pasta de curry y remueve un minuto para que suelte sus aromas.",
      "Incorpora los garbanzos escurridos y la leche de coco. Deja cocer a fuego medio durante 10 minutos.",
      "En el último minuto apaga el fuego, añade las espinacas baby y tápalo.",
      "Sirve caliente."
    ]
  },
  "quinoa-verduras-huevo-poche": {
    "id": "quinoa-verduras-huevo-poche",
    "nombre": "Quinoa con verduras asadas y huevo poché",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 30,
    "icono": "🥗",
    "descripcion": "Bol nutricionalmente completo con cereales tostados y huevo.",
    "ingredientes": [
      {
        "nombre": "Quinoa",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Calabacín",
        "cantidad": "1 unidad",
        "comprar": false
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "1 unidad",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "2 unidades",
        "comprar": false
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "1/2 unidad",
        "comprar": false
      },
      {
        "nombre": "Vinagre",
        "cantidad": "Un chorrito",
        "comprar": false
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "2 cucharadas",
        "comprar": false
      },
      {
        "nombre": "Sal y pimienta",
        "cantidad": "al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Pica calabacín, pimiento y cebolla en dados. Hornea a 200ºC por 20 minutos con sal, pimienta y aceite.",
      "Lava bien la quinoa y cuécela unos 15 minutos. Escúrrela bien.",
      "Para el huevo poché: hierve agua con vinagre, haz un remolino, echa el huevo y cuece 3 minutos.",
      "Mezcla la quinoa con las verduras y sirve con el huevo poché encima."
    ]
  },
  "fajitas-pollo-pimientos": {
    "id": "fajitas-pollo-pimientos",
    "nombre": "Fajitas de pollo y pimientos",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🌯",
    "descripcion": "Pollo y verduras salteadas en una sola sartén ideales para enrollar.",
    "ingredientes": [
      {
        "nombre": "Pechuga de pollo",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Pimientos variados",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Cebolla",
        "cantidad": "1 unidad",
        "comprar": false
      },
      {
        "nombre": "Tortillas de trigo o maíz",
        "cantidad": "4 unidades",
        "comprar": false
      },
      {
        "nombre": "Sazonador de fajitas",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "1 cucharada",
        "comprar": false
      }
    ],
    "pasos": [
      "Corta el pollo, los pimientos y la cebolla en tiras finas.",
      "Saltea cebolla y pimientos a fuego fuerte en una sartén con aceite.",
      "Añade el pollo y saltea hasta que esté cocinado.",
      "Espolvorea el sazonador, remueve y aparta del fuego.",
      "Calienta las tortillas y sirve la mezcla dentro."
    ]
  },
  "frittata-aprovechamiento": {
    "id": "frittata-aprovechamiento",
    "nombre": "Frittata de aprovechamiento",
    "tipo": "aprovechamiento",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍳",
    "descripcion": "Ideal para gastar cualquier verdura, queso o embutido suelto en la nevera.",
    "ingredientes": [
      {
        "nombre": "Huevos",
        "cantidad": "4 unidades",
        "comprar": false
      },
      {
        "nombre": "Restos de verduras",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Restos de queso",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Leche o nata",
        "cantidad": "Un chorrito",
        "comprar": false
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Sal y hierbas",
        "cantidad": "al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Bate los huevos con leche, sal y hierbas.",
      "Añade los restos de verduras y queso troceado.",
      "Precalienta aceite en una sartén y vierte la mezcla.",
      "Deja cuajar 5 minutos a fuego medio.",
      "Termina en el horno con grill o dale la vuelta."
    ]
  },
  "arroz-frito-tres-delicias": {
    "id": "arroz-frito-tres-delicias",
    "nombre": "Arroz frito tres delicias de aprovechamiento",
    "tipo": "aprovechamiento",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍚",
    "descripcion": "La clásica forma de darle vida al arroz blanco sobrante.",
    "ingredientes": [
      {
        "nombre": "Arroz cocido frío",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "2 unidades",
        "comprar": false
      },
      {
        "nombre": "Guisantes",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Restos de fiambre o carne",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Zanahoria",
        "cantidad": "1 unidad",
        "comprar": false
      },
      {
        "nombre": "Salsa de soja",
        "cantidad": "2 cucharadas",
        "comprar": false
      },
      {
        "nombre": "Aceite",
        "cantidad": "1 cucharada",
        "comprar": false
      }
    ],
    "pasos": [
      "Pica zanahoria y carne. Bate los huevos.",
      "Haz un revuelto rápido en sartén con aceite y retira.",
      "Sofríe zanahoria y carne, añade guisantes.",
      "Incorpora arroz frío desmenuzado y saltea a fuego fuerte.",
      "Añade huevo, soja y remueve vigorosamente 1 minuto. Sirve."
    ]
  },
  "guacamole-palitos-zanahoria": {
    "id": "guacamole-palitos-zanahoria",
    "nombre": "Guacamole con palitos de zanahoria",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥑",
    "descripcion": "Guacamole fresco servido con saludables palitos de zanahoria.",
    "ingredientes": [
      {
        "nombre": "Zanahorias",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Aguacates",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Cebolleta",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Tomate",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "10 ml",
        "comprar": false
      },
      {
        "nombre": "Cilantro fresco",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Lava y corta la zanahoria en bastones.",
      "Lava el tomate y pica la cebolleta.",
      "Extrae la pulpa del aguacate y machaca con un tenedor.",
      "Añade tomate, cebolla y cilantro al aguacate, mezcla y sazona.",
      "Riega con limón y sirve con los bastones de zanahoria."
    ]
  },
  "zanahorias-encurtidas": {
    "id": "zanahorias-encurtidas",
    "nombre": "Zanahorias encurtidas 'para mañana'",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🥕",
    "descripcion": "Zanahorias encurtidas frescas, ideales como snack.",
    "ingredientes": [
      {
        "nombre": "Zanahorias",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Perejil fresco",
        "cantidad": "10g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "4-5g",
        "comprar": false
      },
      {
        "nombre": "Hierbabuena o menta",
        "cantidad": "10g",
        "comprar": false
      },
      {
        "nombre": "Pimienta negra",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "AOVE",
        "cantidad": "20 ml",
        "comprar": false
      },
      {
        "nombre": "Vinagre",
        "cantidad": "30 ml",
        "comprar": false
      },
      {
        "nombre": "Sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Corta las zanahorias en tiras.",
      "Pica el ajo, salpimienta y reposa 15 minutos.",
      "Añade hierbas picadas a la zanahoria.",
      "Mezcla AOVE y vinagre, e incorpora junto con el ajo.",
      "Deja reposar 24 horas antes de comer."
    ]
  },
  "hummus-remolacha-crudites": {
    "id": "hummus-remolacha-crudites",
    "nombre": "Hummus de remolacha con crudités",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥣",
    "descripcion": "Colorido hummus de remolacha acompañado de verduras frescas.",
    "ingredientes": [
      {
        "nombre": "Ajo",
        "cantidad": "5g",
        "comprar": false
      },
      {
        "nombre": "Remolacha cocida",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Garbanzos cocidos",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "AOVE",
        "cantidad": "40 ml",
        "comprar": false
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "10 ml",
        "comprar": false
      },
      {
        "nombre": "Yogur natural",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Tahini",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Comino, sal, pimentón",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Pimiento rojo y apio",
        "cantidad": "Para acompañar",
        "comprar": false
      }
    ],
    "pasos": [
      "Bate la remolacha, garbanzos, yogur, tahini, ajo, AOVE, comino, sal y limón.",
      "Ajusta consistencia con agua si es necesario.",
      "Espolvorea pimentón y sirve con bastones de pimiento y apio."
    ]
  },
  "patatitas-dos-salsas": {
    "id": "patatitas-dos-salsas",
    "nombre": "Patatitas dos salsas",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥔",
    "descripcion": "Patatas baby al microondas acompañadas de dos ricas salsas de yogur.",
    "ingredientes": [
      {
        "nombre": "Patatas baby",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Yogures griegos",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "3g",
        "comprar": false
      },
      {
        "nombre": "AOVE y limón",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Curry",
        "cantidad": "8g",
        "comprar": false
      },
      {
        "nombre": "Hierbabuena, sal y pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece patatas al microondas.",
      "Para salsa 1: mezcla un yogur con hierbabuena, ajo, AOVE, limón y sal.",
      "Para salsa 2: mezcla el otro yogur con curry, pimienta y AOVE.",
      "Sirve patatas con las salsas."
    ]
  },
  "falso-sushi-pepino": {
    "id": "falso-sushi-pepino",
    "nombre": "Falso sushi de pepino, yogur y queso feta",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥒",
    "descripcion": "Originales rollitos de pepino rellenos de crema de yogur y feta.",
    "ingredientes": [
      {
        "nombre": "Pepino holandés",
        "cantidad": "270g",
        "comprar": false
      },
      {
        "nombre": "Pimiento amarillo",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "40g",
        "comprar": false
      },
      {
        "nombre": "Yogur griego",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Queso feta",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "3g",
        "comprar": false
      },
      {
        "nombre": "Ralladura de limón",
        "cantidad": "3g",
        "comprar": false
      },
      {
        "nombre": "AOVE y pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Corta tiras de pepino y sécalas.",
      "Corta pimiento y cebolla finamente.",
      "Mezcla yogur, feta, ajo, limón, pimienta y AOVE.",
      "Pon crema y verduras sobre la tira de pepino y enrolla."
    ]
  },
  "gazpacho-sandia-feta": {
    "id": "gazpacho-sandia-feta",
    "nombre": "Gazpacho de sandía y feta",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍉",
    "descripcion": "Refrescante gazpacho combinando tomate, sandía y queso feta.",
    "ingredientes": [
      {
        "nombre": "Tomates pera",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Sandía",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Cebolleta",
        "cantidad": "40g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "5g",
        "comprar": false
      },
      {
        "nombre": "Queso feta",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Albahaca, AOVE, vinagre, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Bate tomates, sandía, cebolleta, pimiento y albahaca escaldada.",
      "Añade AOVE, vinagre y sal, bate de nuevo.",
      "Sirve con trozos de sandía y queso feta."
    ]
  },
  "carpaccio-remolacha-champinon": {
    "id": "carpaccio-remolacha-champinon",
    "nombre": "Carpaccio de remolacha y champiñón",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Carpaccio vegetal con vinagreta de avellanas.",
    "ingredientes": [
      {
        "nombre": "Remolacha cocida",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Champiñones",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Rúcula",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Avellanas",
        "cantidad": "30g",
        "comprar": false
      },
      {
        "nombre": "Queso manchego",
        "cantidad": "30g",
        "comprar": false
      },
      {
        "nombre": "AOVE, vinagre, sal, pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Corta remolacha y champiñones en láminas finas y emplata.",
      "Añade rúcula y queso manchego.",
      "Prepara vinagreta con AOVE, vinagre, avellanas picadas y sal, y aliña."
    ]
  },
  "dip-guisantes-hierbabuena": {
    "id": "dip-guisantes-hierbabuena",
    "nombre": "Dip de guisantes con hierbabuena y totopos",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥣",
    "descripcion": "Crema untable de guisantes servida con totopos horneados.",
    "ingredientes": [
      {
        "nombre": "Guisantes congelados",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Queso fresco",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Tortillas de trigo integral",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Pistachos",
        "cantidad": "15g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "3g",
        "comprar": false
      },
      {
        "nombre": "Hierbabuena, AOVE, pimentón",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Hornea triángulos de tortilla con AOVE 10 min a 180°C.",
      "Cocina guisantes en microondas 4 min y tritura.",
      "Mezcla queso, ajo, pistachos, hierbabuena y guisantes. Sirve con totopos."
    ]
  },
  "escarola-granada": {
    "id": "escarola-granada",
    "nombre": "Escarola con granada",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 8,
    "icono": "🥗",
    "descripcion": "Ensalada fresca y crujiente de escarola y granada con toque de comino.",
    "ingredientes": [
      {
        "nombre": "Escarola",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Granada",
        "cantidad": "275g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "8g",
        "comprar": false
      },
      {
        "nombre": "AOVE, vinagre, sal, comino",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Desgrana la granada y trocea la escarola.",
      "Tuesta el comino y tritúralo con el ajo, añade AOVE, vinagre y sal.",
      "Aliña la escarola y añade la granada."
    ]
  },
  "tosta-aguacate-requeson": {
    "id": "tosta-aguacate-requeson",
    "nombre": "Tosta de aguacate con requesón",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🍞",
    "descripcion": "Tosta rápida y nutritiva para cualquier momento.",
    "ingredientes": [
      {
        "nombre": "Pan integral",
        "cantidad": "90g",
        "comprar": false
      },
      {
        "nombre": "Requesón",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Aguacate",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Tomates cherry",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "AOVE y sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Tuesta el pan.",
      "Extiende el requesón, coloca aguacate y tomate troceados encima.",
      "Añade sal y riega con AOVE."
    ]
  },
  "barquitas-berenjena-yogur": {
    "id": "barquitas-berenjena-yogur",
    "nombre": "Barquitas de berenjena con yogur y manzana",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍆",
    "descripcion": "Berenjena asada y rellena con una refrescante mezcla.",
    "ingredientes": [
      {
        "nombre": "Berenjena",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Manzana verde",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Yogur natural",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Cebolla roja",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "8g",
        "comprar": false
      },
      {
        "nombre": "Limón, AOVE, sal, pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Pica la cebolla y marina en limón.",
      "Asa mitades de berenjena en microondas 10 min, vacía la carne.",
      "Mezcla carne de berenjena con manzana, ajo, yogur y cebolla.",
      "Rellena la piel y decora con más manzana."
    ]
  },
  "escabeche-sardinas": {
    "id": "escabeche-sardinas",
    "nombre": "Escabeche de sardinas",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🐟",
    "descripcion": "Clásico escabeche de sardinas rápido.",
    "ingredientes": [
      {
        "nombre": "Sardinas limpias",
        "cantidad": "500g",
        "comprar": false
      },
      {
        "nombre": "AOVE",
        "cantidad": "60ml",
        "comprar": false
      },
      {
        "nombre": "Vinagre",
        "cantidad": "30ml",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "8g",
        "comprar": false
      },
      {
        "nombre": "Pimentón",
        "cantidad": "6g",
        "comprar": false
      },
      {
        "nombre": "Laurel, pimienta, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Dora el ajo en AOVE, añade pimentón, vinagre y coce.",
      "Incorpora laurel, pimienta y sardinas, cocina 10 min.",
      "Deja enfriar para consumir al día siguiente."
    ]
  },
  "crema-calabaza-queso-azul": {
    "id": "crema-calabaza-queso-azul",
    "nombre": "Crema de calabaza y queso azul",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥣",
    "descripcion": "Crema caliente y dulce contrastada con intenso queso azul.",
    "ingredientes": [
      {
        "nombre": "Calabaza cacahuete",
        "cantidad": "500g",
        "comprar": false
      },
      {
        "nombre": "Puerro",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "Queso azul",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "Semillas de calabaza",
        "cantidad": "10g",
        "comprar": false
      },
      {
        "nombre": "Caldo de verduras",
        "cantidad": "250ml",
        "comprar": false
      },
      {
        "nombre": "Pimentón, AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Saltea puerro en AOVE.",
      "Añade pimentón, calabaza y caldo. Cuece 10 min.",
      "Tritura y sirve sobre dados de queso azul, espolvoreando semillas."
    ]
  },
  "alubia-confetti": {
    "id": "alubia-confetti",
    "nombre": "Alubia confetti",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥗",
    "descripcion": "Ensalada colorida de alubias y verduras.",
    "ingredientes": [
      {
        "nombre": "Alubias rojas",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Arroz integral",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Maíz",
        "cantidad": "140g",
        "comprar": false
      },
      {
        "nombre": "Cebolleta",
        "cantidad": "30g",
        "comprar": false
      },
      {
        "nombre": "Limón, AOVE, cilantro, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Corta la cebolleta y reposa en limón.",
      "Cocina arroz en microondas, enfría.",
      "Mezcla alubias, maíz, pimiento, arroz y cebolleta.",
      "Aliña con AOVE, sal y cilantro."
    ]
  },
  "salmon-expres-microondas": {
    "id": "salmon-expres-microondas",
    "nombre": "Salmón exprés al microondas",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍣",
    "descripcion": "Salmón cocinado al microondas con guarnición japonesa.",
    "ingredientes": [
      {
        "nombre": "Lomo de salmón",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Arroz basmati",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Pepino",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Cebolleta",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Soja, vinagre",
        "cantidad": "1 cucharada c/u",
        "comprar": false
      },
      {
        "nombre": "Sésamo, jengibre, eneldo, sal, AOVE",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Corta pepino en tiras y sala.",
      "Cocina salmón con eneldo en microondas 5 min.",
      "Mezcla pepino escurrido con cebolleta, aliña con soja, vinagre, sésamo y jengibre.",
      "Sirve salmón con arroz y ensalada."
    ]
  },
  "tallarines-calabacin-zanahoria": {
    "id": "tallarines-calabacin-zanahoria",
    "nombre": "Tallarines de calabacín y zanahoria con vinagreta de nueces",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍝",
    "descripcion": "Falsa pasta vegetal salteada con toque crujiente.",
    "ingredientes": [
      {
        "nombre": "Zanahorias",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Calabacín",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "5g",
        "comprar": false
      },
      {
        "nombre": "Nueces",
        "cantidad": "25g",
        "comprar": false
      },
      {
        "nombre": "Sésamo",
        "cantidad": "12g",
        "comprar": false
      },
      {
        "nombre": "Mostaza",
        "cantidad": "3g",
        "comprar": false
      },
      {
        "nombre": "AOVE, vinagre, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Forma tallarines con espiralizador.",
      "Saltea tallarines con ajo a fuego fuerte.",
      "Mezcla AOVE, vinagre y mostaza. Aliña y espolvorea nueces y sésamo."
    ]
  },
  "brocheta-pollo-especiado": {
    "id": "brocheta-pollo-especiado",
    "nombre": "Brocheta de pollo especiado",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍢",
    "descripcion": "Sanas brochetas de pechuga con fruta y verduras.",
    "ingredientes": [
      {
        "nombre": "Pechuga pollo",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Cebolla",
        "cantidad": "40g",
        "comprar": false
      },
      {
        "nombre": "Nectarina",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Tomates cherry",
        "cantidad": "60g",
        "comprar": false
      },
      {
        "nombre": "Pimiento verde",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Rúcula y nueces",
        "cantidad": "Para acompañar",
        "comprar": false
      },
      {
        "nombre": "Limón, AOVE, pimentón, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Marina pollo en dados con cebolla, pimentón, limón y AOVE.",
      "Ensarta pollo alternando con fruta y verdura.",
      "Cocina a la plancha y sirve con ensalada."
    ]
  },
  "miniburger-alubias-atun": {
    "id": "miniburger-alubias-atun",
    "nombre": "Miniburger de alubias y atún",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍔",
    "descripcion": "Hamburguesas nutritivas de legumbre y pescado.",
    "ingredientes": [
      {
        "nombre": "Alubias blancas",
        "cantidad": "240g",
        "comprar": false
      },
      {
        "nombre": "Atún",
        "cantidad": "185g",
        "comprar": false
      },
      {
        "nombre": "Huevo",
        "cantidad": "60g",
        "comprar": false
      },
      {
        "nombre": "Pan rallado",
        "cantidad": "30g",
        "comprar": false
      },
      {
        "nombre": "Hojas verdes",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Mostaza, orégano, limón, AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Aplasta alubias, mezcla con atún, huevo, pan rallado y condimentos.",
      "Forma hamburguesas y dora en sartén.",
      "Sirve con ensalada."
    ]
  },
  "poke-pollo-harvard": {
    "id": "poke-pollo-harvard",
    "nombre": "Poke de pollo al estilo Harvard",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Plato completo siguiendo la proporción del plato de Harvard.",
    "ingredientes": [
      {
        "nombre": "Pechuga pollo",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Arroz integral",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Melocotón",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Melón",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Canónigos, pepino, tomate cherry",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Anacardos",
        "cantidad": "8g",
        "comprar": false
      },
      {
        "nombre": "Limón, AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Saltea dados de pollo.",
      "Cocina arroz, prepara frutas y vegetales.",
      "Monta boles y aliña con limón y AOVE."
    ]
  },
  "rainbow-wrap-salsa-anchoas": {
    "id": "rainbow-wrap-salsa-anchoas",
    "nombre": "Rainbow wrap con salsa de anchoas",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🌯",
    "descripcion": "Wrap colorido de vegetales y huevo con deliciosa salsa.",
    "ingredientes": [
      {
        "nombre": "Tortillas integrales",
        "cantidad": "75g",
        "comprar": false
      },
      {
        "nombre": "Queso fresco",
        "cantidad": "60g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "120g",
        "comprar": false
      },
      {
        "nombre": "Espinacas, cebolla, zanahoria, pimiento",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Anchoas",
        "cantidad": "4 filetes",
        "comprar": false
      },
      {
        "nombre": "Limón, AOVE, ajo",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece huevos.",
      "Para la salsa: bate huevos, ajo, anchoas, aceite y limón.",
      "Unta tortillas, rellena con vegetales y queso, enrolla."
    ]
  },
  "mini-green-pizza": {
    "id": "mini-green-pizza",
    "nombre": "Mini green pizza",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍕",
    "descripcion": "Pizzas rápidas sobre base de pan de pita integral.",
    "ingredientes": [
      {
        "nombre": "Pitas integrales",
        "cantidad": "180g",
        "comprar": false
      },
      {
        "nombre": "Brócoli",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Mozzarella fresca",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Rúcula",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Nueces y parmesano",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Ajo, AOVE, pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cocina brócoli en microondas.",
      "Bate rúcula, ajo, parmesano, nueces y AOVE para el pesto.",
      "Pon pesto, mozzarella y brócoli sobre las pitas. Gratina."
    ]
  },
  "lubina-patatas-verduras": {
    "id": "lubina-patatas-verduras",
    "nombre": "Lubina con patatas y cama de verduras",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🐟",
    "descripcion": "Plato de pescado completo al microondas.",
    "ingredientes": [
      {
        "nombre": "Lomos de lubina",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Patatas",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Cebolla, tomate, pimientos",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece patatas en microondas.",
      "Cocina cebolla, tomate y pimientos en microondas por intervalos.",
      "Pon el pescado sobre las verduras, cocina 5 min más. Sirve con patatas."
    ]
  },
  "ensalada-frutos-rojos-cuscus": {
    "id": "ensalada-frutos-rojos-cuscus",
    "nombre": "Ensalada de frutos rojos, setas y cuscús",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Ensalada tibia contrastada.",
    "ingredientes": [
      {
        "nombre": "Queso de cabra",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Frutos rojos",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Setas ostra",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Cuscús",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Brotes lechuga",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "AOVE, ajo, cebollino, vinagre, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Hidrata el cuscús.",
      "Saltea setas con ajo, tuesta el queso.",
      "Monta ensalada con lechuga, queso, frutos rojos y setas. Sirve con cuscús."
    ]
  },
  "espaguetis-estudiante": {
    "id": "espaguetis-estudiante",
    "nombre": "Espaguetis del estudiante",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍝",
    "descripcion": "Plato de pasta fácil y con ingredientes de despensa.",
    "ingredientes": [
      {
        "nombre": "Espaguetis",
        "cantidad": "160g",
        "comprar": false
      },
      {
        "nombre": "Tomate triturado",
        "cantidad": "290g",
        "comprar": false
      },
      {
        "nombre": "Sardinas en conserva",
        "cantidad": "88g",
        "comprar": false
      },
      {
        "nombre": "Aceitunas negras",
        "cantidad": "25g",
        "comprar": false
      },
      {
        "nombre": "Ajo, AOVE, orégano",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece la pasta.",
      "Calienta ajos, añade tomate y orégano, cocina en microondas.",
      "Mezcla pasta, salsa, sardinas y aceitunas."
    ]
  },
  "tortilla-patata-calabacin-microondas": {
    "id": "tortilla-patata-calabacin-microondas",
    "nombre": "Tortilla de patata y calabacín al microondas",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍳",
    "descripcion": "Versión rápida de tortilla con verduras.",
    "ingredientes": [
      {
        "nombre": "Patatas",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Calabacín",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Cebolla",
        "cantidad": "40g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "4",
        "comprar": false
      },
      {
        "nombre": "AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Pica verduras y cocínalas en el microondas hasta que estén tiernas.",
      "Bate huevos y mezcla con las verduras calientes.",
      "Cuaja en sartén."
    ]
  },
  "pitas-huevo-espinacas-queso": {
    "id": "pitas-huevo-espinacas-queso",
    "nombre": "Pitas con huevo, espinacas y queso",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥙",
    "descripcion": "Bocadillos en pan de pita rellenos de revuelto jugoso.",
    "ingredientes": [
      {
        "nombre": "Pitas integrales",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "3",
        "comprar": false
      },
      {
        "nombre": "Espinacas",
        "cantidad": "150g",
        "comprar": false
      },
      {
        "nombre": "Tomates secos",
        "cantidad": "15g",
        "comprar": false
      },
      {
        "nombre": "Queso de cabra",
        "cantidad": "180g",
        "comprar": false
      },
      {
        "nombre": "AOVE, sal, pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Hidrata tomates secos.",
      "Bate huevos y cuaja en sartén ligeramente.",
      "Calienta pitas y rellena con huevo, espinacas frescas, queso y tomates."
    ]
  },
  "alcachofas-langostinos": {
    "id": "alcachofas-langostinos",
    "nombre": "Alcachofas con langostinos",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍤",
    "descripcion": "Salteado rápido de alcachofas y marisco.",
    "ingredientes": [
      {
        "nombre": "Alcachofas congeladas",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Langostinos congelados",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Cebolla",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "Ajo, AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Descongela langostinos.",
      "Cocina alcachofas en microondas.",
      "Sofríe cebolla y ajo. Añade alcachofas y langostinos, y saltea."
    ]
  },
  "lentejas-arroz-curcuma": {
    "id": "lentejas-arroz-curcuma",
    "nombre": "Lentejas con arroz y cúrcuma",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍲",
    "descripcion": "Crema rápida especiada servida con arroz.",
    "ingredientes": [
      {
        "nombre": "Lentejas cocidas",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Arroz integral",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Cebolla, zanahoria, tomate",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Cúrcuma, AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Sofríe verduras.",
      "Añade lentejas y un poco de agua, hierve 5 minutos.",
      "Tritura todo con cúrcuma y sirve acompañado de arroz cocido."
    ]
  },
  "garbanzos-pisto-ras-el-hanout": {
    "id": "garbanzos-pisto-ras-el-hanout",
    "nombre": "Garbanzos con pisto y ras el hanout",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥘",
    "descripcion": "Guiso ultrarrápido aprovechando conservas.",
    "ingredientes": [
      {
        "nombre": "Garbanzos cocidos",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Pisto en conserva",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Ras el hanout",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Cilantro/hierbabuena",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Calienta garbanzos en olla con agua.",
      "Añade el pisto y cuece todo junto.",
      "Incorpora el ras el hanout y sirve con hierbas."
    ]
  },
  "escalivada-germinados-bacalao": {
    "id": "escalivada-germinados-bacalao",
    "nombre": "Escalivada con alma de germinados y bacalao",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Ensalada contundente con base de verduras asadas.",
    "ingredientes": [
      {
        "nombre": "Escalivada conserva",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Bacalao desalado",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "Germinados",
        "cantidad": "15g",
        "comprar": false
      },
      {
        "nombre": "AOVE, vinagre, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece y ralla huevos.",
      "Monta escalivada en un plato.",
      "Añade bacalao, cebolla, huevo rallado y germinados. Aliña."
    ]
  },
  "copazo-ensaladilla": {
    "id": "copazo-ensaladilla",
    "nombre": "Copazo de ensaladilla",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥗",
    "descripcion": "Ensaladilla exprés y casera.",
    "ingredientes": [
      {
        "nombre": "Patatas",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Zanahoria",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Atún al natural",
        "cantidad": "185g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "AOVE, limón, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece patatas, zanahorias y huevos en microondas.",
      "Pica todo y mezcla con atún.",
      "Bate yemas de huevo con AOVE y limón para salsa, mezcla y sirve."
    ]
  },
  "tortilla-setas-espinacas": {
    "id": "tortilla-setas-espinacas",
    "nombre": "Tortilla de setas y espinacas",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍳",
    "descripcion": "Sana tortilla rellena de vegetales.",
    "ingredientes": [
      {
        "nombre": "Espinacas congeladas",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Setas",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "4",
        "comprar": false
      },
      {
        "nombre": "Ajo, AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Saltea espinacas y setas troceadas.",
      "Bate huevos, añade la verdura.",
      "Cuaja la tortilla en sartén."
    ]
  },
  "olleta-arroz-integral": {
    "id": "olleta-arroz-integral",
    "nombre": "Olleta de arroz integral",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍲",
    "descripcion": "Plato de cuchara tradicional.",
    "ingredientes": [
      {
        "nombre": "Arroz integral",
        "cantidad": "60g",
        "comprar": false
      },
      {
        "nombre": "Patata, acelgas, judías verdes, nabo",
        "cantidad": "Variado",
        "comprar": false
      },
      {
        "nombre": "Alubias blancas",
        "cantidad": "60g",
        "comprar": false
      },
      {
        "nombre": "Agua, azafrán, comino, AOVE, sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece patata, añade el resto de vegetales y hierve.",
      "Añade arroz cocido y alubias.",
      "Termina cocción y añade AOVE."
    ]
  },
  "ramen-casero": {
    "id": "ramen-casero",
    "nombre": "Ramen casero",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍜",
    "descripcion": "Ramen rápido con vegetales crujientes y fideos integrales.",
    "ingredientes": [
      {
        "nombre": "Caldo vegetal",
        "cantidad": "1l",
        "comprar": false
      },
      {
        "nombre": "Fideos arroz",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Zanahoria, brotes soja, cebolleta",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Sésamo, alga nori",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cuece huevos y fideos.",
      "Calienta caldo y vierte sobre fideos.",
      "Añade vegetales, huevo y decora con nori y sésamo."
    ]
  },
  "helado-yogur-chocolate-platano": {
    "id": "helado-yogur-chocolate-platano",
    "nombre": "Helado casero de yogur, chocolate y plátano",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍦",
    "descripcion": "Helado saludable sin azúcares añadidos.",
    "ingredientes": [
      {
        "nombre": "Yogur natural",
        "cantidad": "125g",
        "comprar": false
      },
      {
        "nombre": "Plátano",
        "cantidad": "80g",
        "comprar": false
      },
      {
        "nombre": "Cacao puro",
        "cantidad": "15g",
        "comprar": false
      }
    ],
    "pasos": [
      "Machaca el plátano y mezcla con yogur y cacao.",
      "Coloca en moldes, añade palitos.",
      "Congela."
    ]
  },
  "batido-platano-arandanos": {
    "id": "batido-platano-arandanos",
    "nombre": "Batido de plátano y arándanos con avena",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥤",
    "descripcion": "Smoothie energético para recargar.",
    "ingredientes": [
      {
        "nombre": "Arándanos",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Plátano",
        "cantidad": "40g",
        "comprar": false
      },
      {
        "nombre": "Leche o bebida vegetal",
        "cantidad": "250ml",
        "comprar": false
      },
      {
        "nombre": "Avena molida",
        "cantidad": "60g",
        "comprar": false
      },
      {
        "nombre": "Canela, hielo",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Bate frutas, avena y leche.",
      "Añade hielo, espolvorea canela."
    ]
  },
  "pudding-chia-mango": {
    "id": "pudding-chia-mango",
    "nombre": "Pudding de chía con mango",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍮",
    "descripcion": "Postre cremoso de chía con frescor tropical.",
    "ingredientes": [
      {
        "nombre": "Mango duro",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Semillas de chía",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Leche de coco",
        "cantidad": "400ml",
        "comprar": false
      }
    ],
    "pasos": [
      "Hidrata chía con leche de coco.",
      "Tritura el mango.",
      "Monta capas de chía y puré de mango."
    ]
  },
  "pina-plancha-cardamomo": {
    "id": "pina-plancha-cardamomo",
    "nombre": "Piña a la plancha con cardamomo",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🍍",
    "descripcion": "Piña asada y perfumada.",
    "ingredientes": [
      {
        "nombre": "Piña natural",
        "cantidad": "500g",
        "comprar": false
      },
      {
        "nombre": "Cardamomo verde",
        "cantidad": "1 vaina",
        "comprar": false
      },
      {
        "nombre": "Piel de limón y hierbabuena",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Asa cuñas de piña en sartén.",
      "Muele cardamomo.",
      "Sirve piña espolvoreada con especias y hierbas."
    ]
  },
  "gajos-naranja-menta-chocolate": {
    "id": "gajos-naranja-menta-chocolate",
    "nombre": "Gajos de naranja con menta y chocolate",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍊",
    "descripcion": "Refrescantes gajos de naranja envueltos en chocolate.",
    "ingredientes": [
      {
        "nombre": "Naranjas",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Chocolate negro",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Hojas de menta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Funde chocolate.",
      "Baña gajos de naranja en el chocolate y enfría.",
      "Sirve decorado con menta."
    ]
  },
  "lentejas-viudas": {
    "id": "lentejas-viudas",
    "nombre": "Lentejas con verduras o viudas",
    "tipo": "comida",
    "porciones": 6,
    "tiempo": 80,
    "icono": "🍲",
    "descripcion": "Guiso vegetal de lentejas sano y económico.",
    "ingredientes": [
      {
        "nombre": "Lentejas pardinas",
        "cantidad": "400g",
        "comprar": false
      },
      {
        "nombre": "Patatas",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Zanahorias",
        "cantidad": "6",
        "comprar": false
      },
      {
        "nombre": "Cebollas",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Ajos",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Puerro",
        "cantidad": "1",
        "comprar": false
      },
      {
        "nombre": "Tomates",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Pimientos variados",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Pimentón dulce, AOVE, sal, pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Picar verduras y sofreírlas en olla.",
      "Añadir pimentón y luego las lentejas escurridas.",
      "Cubrir con agua y cocer a fuego lento.",
      "Añadir patatas troceadas y cocer hasta tiernas."
    ]
  },
  "cazuela-garbanzos-chorizo": {
    "id": "cazuela-garbanzos-chorizo",
    "nombre": "Cazuela de garbanzos con chorizo",
    "tipo": "comida",
    "porciones": 6,
    "tiempo": 30,
    "icono": "🥘",
    "descripcion": "Potaje tradicional exprés.",
    "ingredientes": [
      {
        "nombre": "Garbanzos",
        "cantidad": "500g",
        "comprar": false
      },
      {
        "nombre": "Cebollas, ajos, zanahorias, pimiento",
        "cantidad": "Variado",
        "comprar": false
      },
      {
        "nombre": "Patatas",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Chorizo",
        "cantidad": "1",
        "comprar": false
      },
      {
        "nombre": "AOVE, pimentón, sal, pimienta, laurel",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Sofreír verduras con pimentón en olla.",
      "Añadir garbanzos, chorizo, patatas, agua, sal y pimienta.",
      "Cocer en olla express 15 min."
    ]
  },
  "crema-calabacin-facil": {
    "id": "crema-calabacin-facil",
    "nombre": "Crema de calabacín fácil",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 40,
    "icono": "🥣",
    "descripcion": "Crema suave de calabacín clásica.",
    "ingredientes": [
      {
        "nombre": "Calabacín",
        "cantidad": "600g",
        "comprar": false
      },
      {
        "nombre": "Cebolla",
        "cantidad": "1",
        "comprar": false
      },
      {
        "nombre": "Patata",
        "cantidad": "1",
        "comprar": false
      },
      {
        "nombre": "Nata o leche",
        "cantidad": "100ml",
        "comprar": false
      },
      {
        "nombre": "Caldo de verduras",
        "cantidad": "250ml",
        "comprar": false
      },
      {
        "nombre": "AOVE, sal, pimienta",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Sofreír cebolla y patata troceada.",
      "Añadir calabacín, sofreír 5 min.",
      "Verter caldo, cocer 20 min.",
      "Retirar, añadir nata, triturar y servir."
    ]
  },
  "patatas-viudas": {
    "id": "patatas-viudas",
    "nombre": "Patatas viudas",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 40,
    "icono": "🥔",
    "descripcion": "Guiso humilde y exquisito de patatas.",
    "ingredientes": [
      {
        "nombre": "Patatas",
        "cantidad": "1kg",
        "comprar": false
      },
      {
        "nombre": "Cebollas",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Ajos",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Caldo",
        "cantidad": "1l",
        "comprar": false
      },
      {
        "nombre": "Azafrán, pimentón, laurel, AOVE",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Pochar cebolla y ajo.",
      "Añadir patatas chascadas, pimentón, azafrán y caldo.",
      "Cocer hasta que patatas estén tiernas."
    ]
  },
  "macarrones-atun-tomate": {
    "id": "macarrones-atun-tomate",
    "nombre": "Macarrones con atún y tomate",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🍝",
    "descripcion": "Receta clásica y económica de pasta.",
    "ingredientes": [
      {
        "nombre": "Atún conserva",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Salsa tomate",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Macarrones",
        "cantidad": "Para 4",
        "comprar": false
      },
      {
        "nombre": "Queso rallado",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Pochar cebolla.",
      "Cocer pasta.",
      "Añadir salsa de tomate y atún a la cebolla, escurrir pasta y mezclar.",
      "Servir con queso rallado."
    ]
  },
  "sopa-pollo": {
    "id": "sopa-pollo",
    "nombre": "Sopa de pollo casera",
    "tipo": "comida",
    "porciones": 6,
    "tiempo": 50,
    "icono": "🍲",
    "descripcion": "Sopa reconfortante de pollo.",
    "ingredientes": [
      {
        "nombre": "Pollo",
        "cantidad": "Una pieza buena",
        "comprar": false
      },
      {
        "nombre": "Apio, puerro, zanahoria",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Fideos",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cocer pollo y verduras.",
      "Limpiar pollo de huesos.",
      "Cocer fideos en el caldo colado y servir con trozos."
    ]
  },
  "tallarines-salmon": {
    "id": "tallarines-salmon",
    "nombre": "Tallarines con salmón",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 20,
    "icono": "🍝",
    "descripcion": "Plato de lujo para hacer en pocos minutos.",
    "ingredientes": [
      {
        "nombre": "Tallarines (Tagliatelle)",
        "cantidad": "Para 4",
        "comprar": false
      },
      {
        "nombre": "Salmón fresco",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Sal",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cocer la pasta en abundante agua con sal.",
      "Escurrir bien.",
      "Cocinar salmón, mezclar con pasta y servir."
    ]
  },
  "paella-pollo": {
    "id": "paella-pollo",
    "nombre": "Arroz con pollo y verduras (Paella)",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 40,
    "icono": "🥘",
    "descripcion": "Arroz completo para el fin de semana.",
    "ingredientes": [
      {
        "nombre": "Alitas de pollo",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Arroz",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Cebolla, pimientos, calabacín, judías",
        "cantidad": "Variado",
        "comprar": false
      },
      {
        "nombre": "Agua y caldo de pollo",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Azafrán, AOVE, sal, tomates",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Picar verduras y sofreírlas.",
      "Añadir pollo para dorarlo.",
      "Añadir arroz, caldo y azafrán y cocer en su punto."
    ]
  },
  "arroz-verduras-casero": {
    "id": "arroz-verduras-casero",
    "nombre": "Arroz con verduras casero",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🍚",
    "descripcion": "Sabroso arroz meloso de verduras y jamón.",
    "ingredientes": [
      {
        "nombre": "Arroz",
        "cantidad": "300g",
        "comprar": false
      },
      {
        "nombre": "Caldo de verduras",
        "cantidad": "1l",
        "comprar": false
      },
      {
        "nombre": "Zanahoria, pimiento rojo, guisantes",
        "cantidad": "Variado",
        "comprar": false
      },
      {
        "nombre": "Jamón serrano",
        "cantidad": "120g",
        "comprar": false
      },
      {
        "nombre": "Tomate triturado",
        "cantidad": "120g",
        "comprar": false
      },
      {
        "nombre": "Azafrán, ajos, AOVE",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Dorar ajos y sofreír verduras.",
      "Añadir jamón y azafrán.",
      "Incorporar tomate y arroz.",
      "Añadir caldo y cocer."
    ]
  },
  "tortilla-champinones": {
    "id": "tortilla-champinones",
    "nombre": "Tortilla de champiñones",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 18,
    "icono": "🍳",
    "descripcion": "Tortilla fácil y rápida.",
    "ingredientes": [
      {
        "nombre": "Champiñones",
        "cantidad": "200g",
        "comprar": false
      },
      {
        "nombre": "Huevos",
        "cantidad": "5",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "1",
        "comprar": false
      },
      {
        "nombre": "AOVE, sal, pimienta, perejil",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Salsa sriracha",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Limpiar champiñones y saltearlos con ajo.",
      "Batir huevos.",
      "Cuajar en sartén y servir con salsa picante."
    ]
  },
  "bocadillo-calamares": {
    "id": "bocadillo-calamares",
    "nombre": "Bocadillo de calamares rebozados",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🥖",
    "descripcion": "Clásico madrileño hecho en casa.",
    "ingredientes": [
      {
        "nombre": "Calamares",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Pan",
        "cantidad": "4 panecillos",
        "comprar": false
      },
      {
        "nombre": "Harina y aceite",
        "cantidad": "Para freír",
        "comprar": false
      },
      {
        "nombre": "Mayonesa",
        "cantidad": "Opcional",
        "comprar": false
      }
    ],
    "pasos": [
      "Limpiar calamares y cortar anillas.",
      "Salar, enharinar y freír.",
      "Untar pan con mayonesa y servir caliente."
    ]
  },
  "bocadillo-vegetal-atun": {
    "id": "bocadillo-vegetal-atun",
    "nombre": "Bocadillo vegetal con atún",
    "tipo": "comida",
    "porciones": 1,
    "tiempo": 10,
    "icono": "🥪",
    "descripcion": "Bocadillo vegetal fresco y completo.",
    "ingredientes": [
      {
        "nombre": "Pan",
        "cantidad": "1 barra",
        "comprar": false
      },
      {
        "nombre": "Jamón cocido",
        "cantidad": "100g",
        "comprar": false
      },
      {
        "nombre": "Huevos cocidos",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Tomate, lechuga, zanahoria",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Atún al natural",
        "cantidad": "1 lata",
        "comprar": false
      },
      {
        "nombre": "Mayonesa",
        "cantidad": "50g",
        "comprar": false
      }
    ],
    "pasos": [
      "Lavar vegetales y cocer huevos.",
      "Desmigar atún.",
      "Cortar pan, untar mayonesa y hacer capas con los ingredientes."
    ]
  },
  "sandwich-huevo-mayonesa": {
    "id": "sandwich-huevo-mayonesa",
    "nombre": "Sándwich de huevo y mayonesa",
    "tipo": "comida",
    "porciones": 1,
    "tiempo": 15,
    "icono": "🥪",
    "descripcion": "Sándwich cremoso clásico y sus variantes.",
    "ingredientes": [
      {
        "nombre": "Huevos cocidos",
        "cantidad": "2",
        "comprar": false
      },
      {
        "nombre": "Pan de molde",
        "cantidad": "2 rebanadas",
        "comprar": false
      },
      {
        "nombre": "Crème fraîche",
        "cantidad": "1 cdta",
        "comprar": false
      },
      {
        "nombre": "Mostaza y mayonesa",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cocer huevos.",
      "Picar y mezclar con salsas.",
      "Rellenar pan."
    ]
  },
  "hummus-garbanzos": {
    "id": "hummus-garbanzos",
    "nombre": "Hummus o crema de garbanzos",
    "tipo": "comida",
    "porciones": 6,
    "tiempo": 10,
    "icono": "🥣",
    "descripcion": "Paté de garbanzos exótico.",
    "ingredientes": [
      {
        "nombre": "Garbanzos",
        "cantidad": "1 bote",
        "comprar": false
      },
      {
        "nombre": "Tahini",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Limón, ajo, especias",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "AOVE",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Añadir todos ingredientes en robot/batidora.",
      "Batir al máximo hasta obtener puré.",
      "Servir frío decorado con AOVE y pimentón."
    ]
  },
  "pastel-atun-frio": {
    "id": "pastel-atun-frio",
    "nombre": "Pastel de atún frío",
    "tipo": "comida",
    "porciones": 8,
    "tiempo": 40,
    "icono": "🥧",
    "descripcion": "Receta clásica veraniega de molde.",
    "ingredientes": [
      {
        "nombre": "Pan de molde",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Atún y mayonesa",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Huevo duro y verduras picadas",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Preparar la mezcla de relleno con atún y mayonesa.",
      "Alternar capas de pan y relleno.",
      "Cubrir con mayonesa y enfriar."
    ]
  },
  "ensalada-patata-yogur": {
    "id": "ensalada-patata-yogur",
    "nombre": "Ensalada de patata y yogur griego",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🥗",
    "descripcion": "Ensalada fresca y cremosa.",
    "ingredientes": [
      {
        "nombre": "Patatas",
        "cantidad": "800g",
        "comprar": false
      },
      {
        "nombre": "Yogur griego",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Aceitunas negras",
        "cantidad": "60g",
        "comprar": false
      },
      {
        "nombre": "Limón, mostaza, hierbas",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Cocer patatas, pelar y cortar.",
      "Mezclar yogur, aceitunas, limón y especias.",
      "Bañar las patatas con la salsa."
    ]
  },
  "poke-salmon": {
    "id": "poke-salmon",
    "nombre": "Poke de salmón hawaiano",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 75,
    "icono": "🍣",
    "descripcion": "Bol ligero de arroz y salmón crudo.",
    "ingredientes": [
      {
        "nombre": "Salmón",
        "cantidad": "500g",
        "comprar": false
      },
      {
        "nombre": "Arroz",
        "cantidad": "250g",
        "comprar": false
      },
      {
        "nombre": "Aguacate, tomates, lombarda",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Soja y sésamo",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Congelar salmón y luego trocear y marinar.",
      "Cocer arroz.",
      "Montar boles."
    ]
  },
  "guacamole-mexicano": {
    "id": "guacamole-mexicano",
    "nombre": "Guacamole mexicano fácil",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 12,
    "icono": "🥑",
    "descripcion": "Auténtica receta de aguacate de México.",
    "ingredientes": [
      {
        "nombre": "Aguacates",
        "cantidad": "6",
        "comprar": false
      },
      {
        "nombre": "Tomate, cebolla",
        "cantidad": "Al gusto",
        "comprar": false
      },
      {
        "nombre": "Lima y cilantro",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Machacar aguacate.",
      "Añadir verduras picadas y limón.",
      "Mezclar y servir."
    ]
  },
  "mug-cake-chocolate": {
    "id": "mug-cake-chocolate",
    "nombre": "Mug cake de chocolate",
    "tipo": "postre",
    "porciones": 1,
    "tiempo": 10,
    "icono": "☕",
    "descripcion": "Bizcocho rápido hecho en microondas.",
    "ingredientes": [
      {
        "nombre": "Huevo",
        "cantidad": "1",
        "comprar": false
      },
      {
        "nombre": "Leche",
        "cantidad": "3 cdas",
        "comprar": false
      },
      {
        "nombre": "Aceite",
        "cantidad": "3 cdas",
        "comprar": false
      },
      {
        "nombre": "Harina, azúcar, cacao",
        "cantidad": "Al gusto",
        "comprar": false
      }
    ],
    "pasos": [
      "Mezclar todo en una taza.",
      "Cocer al microondas 1 o 2 minutos.",
      "Decorar."
    ]
  },
  "galletas-chocolate": {
    "id": "galletas-chocolate",
    "nombre": "Galletas de chocolate crujientes",
    "tipo": "postre",
    "porciones": 10,
    "tiempo": 60,
    "icono": "🍪",
    "descripcion": "Cookies caseras que salen siempre.",
    "ingredientes": [
      {
        "nombre": "Harina, mantequilla, chocolate",
        "cantidad": "Para galletas",
        "comprar": false
      }
    ],
    "pasos": [
      "Hacer la masa de galleta y mezclar con pepitas.",
      "Hornear hasta dorar.",
      "Dejar enfriar y disfrutar."
    ]
  }
};

// Funci�n para obtener el men� de la semana actual
function getSemanaActual() {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return SEMANAS[weekNumber % SEMANAS.length];
}

// Función para obtener el menú del día siguiente
function getComidaManana() {
  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(mañana.getDate() + 1);
  const diaMañana = mañana.getDay(); // 1=lunes, 2=martes... 5=viernes
  
  const diasMap = {1: 'lunes', 2: 'martes', 3: 'miercoles', 4: 'jueves', 5: 'viernes'};
  const diaKey = diasMap[diaMañana];
  
  if (!diaKey) return null; // Fin de semana
  
  const semana = getSemanaActual();
  return { dia: diaKey, comidas: semana[diaKey] };
}

// Función para obtener una receta por ID (busca en menús + recetas nuevas)
function getRecetaById(id) {
  if (window.STATE?.customRecipes && window.STATE.customRecipes[id]) return window.STATE.customRecipes[id];
  if (RECETAS_NUEVAS[id]) return RECETAS_NUEVAS[id];
  for (const semana of SEMANAS) {
    for (const dia of Object.values(semana)) {
      if (dia.comida?.id === id) return dia.comida;
      if (dia.cena?.id === id) return dia.cena;
    }
  }
  return null;
}

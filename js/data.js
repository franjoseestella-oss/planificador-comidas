
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
    { id: 'miniburger-alubias', nombre: 'Miniburger de alubias y atún', icono: '🍔', tiempo: 20, imagen: "images/recipes/miniburger-de-alubias-y-at-n.png" },
    { id: 'olleta-arroz-integral', nombre: 'Olleta de arroz integral', icono: '🍱', tiempo: 35 },
  ]
};

// ── RECETAS COMPLETAS (Nuevas del Recetario Oficial) ─────────
const RECETAS_NUEVAS = {
  "chips-de-kale": {
    "id": "chips-de-kale",
    "nombre": "Chips de kale",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥬",
    "descripcion": "Un snack ligero y crujiente para acompañar cenas o como entrante saludable.",
    "ingredientes": [
        { "nombre": "Kale", "cantidad": "150g", "comprar": true },
        { "nombre": "Aceite de Oliva (AOVE)", "cantidad": "15ml", "comprar": false },
        { "nombre": "Sal fina", "cantidad": "1 pizca", "comprar": false },
        { "nombre": "Pimentón dulce", "cantidad": "1 cucharadita", "comprar": false }
    ],
    "pasos": [
        "Precalentar el horno a 180°C con calor arriba y abajo.",
        "Lavar muy bien bajo el grifo el kale y secarlo con papel absorbente.",
        "Quitar los tallos gruesos y trocear las hojas en trozos de un bocado.",
        "Masajear en un bol las hojas con el AOVE, la sal y el pimentón hasta que estén impregnadas.",
        "Extender sin amontonar en la bandeja del horno y hornear 10-12 min.",
        "Dejar enfriar 5 minutos para que crispen completemente."
    ],
    "nutricion": { "calorias": 100, "proteinas": 5, "carbohidratos": 10, "grasas": 5, "fibra": 4 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "guacamole-con-palitos-de-zanahoria": {
    "id": "guacamole-con-palitos-de-zanahoria",
    "nombre": "Guacamole casero con palitos de zanahoria",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥑",
    "descripcion": "Cena muy ligera y fresca ideal para compartir.",
    "ingredientes": [
        { "nombre": "Aguacate maduro", "cantidad": "1 unidad", "comprar": true },
        { "nombre": "Cebolla morada", "cantidad": "20g", "comprar": true },
        { "nombre": "Tomate", "cantidad": "50g", "comprar": true },
        { "nombre": "Lima", "cantidad": "1/2 unidad", "comprar": true },
        { "nombre": "Cilantro fresco", "cantidad": "1 ramito", "comprar": true },
        { "nombre": "Sal gorda", "cantidad": "1 pizca", "comprar": false },
        { "nombre": "Zanahorias para dipear", "cantidad": "2 unidades", "comprar": true }
    ],
    "pasos": [
        "Pelar las zanahorias y cortarlas en bastones de 5 cm. Reservar en un vaso con hielos.",
        "Picar la cebolla morada y el tomate (sin semillas) en trocitos muy pequeños.",
        "Moler la pulpa del aguacate con un tenedor dejando grumos rústicos.",
        "Añadir lima, sal, tomate, cebolla, el cilantro picado, y remover.",
        "Servir junto con las zanahorias."
    ],
    "nutricion": { "calorias": 220, "proteinas": 3, "carbohidratos": 15, "grasas": 15, "fibra": 8 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "zanahorias-encurtidas-para-ma-ana": {
    "id": "zanahorias-encurtidas-para-ma-ana",
    "nombre": "Zanahorias encurtidas caseras",
    "tipo": "cena",
    "porciones": 4,
    "tiempo": 15,
    "icono": "🥕",
    "descripcion": "Un excelente acompañamiento en frío para guarnición.",
    "ingredientes": [
        { "nombre": "Zanahorias", "cantidad": "400g", "comprar": true },
        { "nombre": "Vinagre de manzana", "cantidad": "200ml", "comprar": true },
        { "nombre": "Agua mineral", "cantidad": "200ml", "comprar": false },
        { "nombre": "Sal gorda", "cantidad": "1 cucharada", "comprar": false },
        { "nombre": "Laurel", "cantidad": "2 hojas", "comprar": false },
        { "nombre": "Ajo", "cantidad": "2 dientes", "comprar": false }
    ],
    "pasos": [
        "Pelar las zanahorias y cortarlas en rodajas.",
        "Hervir el agua con el vinagre, sal y laurel 3 minutos.",
        "Colocar zanahorias y los ajos machacados en un tarro.",
        "Verter líquido caliente, dejar enfriar tapado en nevera hasta el día siguiente."
    ],
    "nutricion": { "calorias": 45, "proteinas": 1, "carbohidratos": 10, "grasas": 0, "fibra": 3 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "hummus-de-remolacha-con-crudit-s": {
    "id": "hummus-de-remolacha-con-crudit-s",
    "nombre": "Hummus de remolacha y crudités",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 15,
    "icono": "🧆",
    "descripcion": "Plato completo lleno de color con mucha fibra.",
    "ingredientes": [
        { "nombre": "Garbanzos de frasco", "cantidad": "400g", "comprar": true },
        { "nombre": "Remolacha cocida", "cantidad": "150g", "comprar": true },
        { "nombre": "Pasta tahini", "cantidad": "30g", "comprar": true },
        { "nombre": "Aceite de oliva (AOVE)", "cantidad": "30ml", "comprar": false },
        { "nombre": "Limón", "cantidad": "1/2 unidad", "comprar": true },
        { "nombre": "Pimentón dulce", "cantidad": "1 cucharadita", "comprar": false },
        { "nombre": "Verduras tipo apio y pepino", "cantidad": "250g", "comprar": true }
    ],
    "pasos": [
        "Lavar y escurrir muy bien la legumbre.",
        "Triturar en batidora garbanzos, remolacha troceada, tahini, limón y sal.",
        "Agregar hilo de AOVE y unas gotas de agua para que la crema quede sedosa.",
        "Servir junto a los palos de verduras para mojar."
    ],
    "nutricion": { "calorias": 320, "proteinas": 12, "carbohidratos": 36, "grasas": 14, "fibra": 11 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "patatitas-dos-salsas": {
    "id": "patatitas-dos-salsas",
    "nombre": "Patatitas asadas dos salsas",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🥔",
    "descripcion": "Patatas sabrosas acompañadas con salsa yogur y pimentón.",
    "ingredientes": [
        { "nombre": "Patatas baby", "cantidad": "500g", "comprar": true },
        { "nombre": "Yogur natural (sin endulzar)", "cantidad": "125g", "comprar": true },
        { "nombre": "Ajo o ajo en polvo", "cantidad": "1 cucharilla", "comprar": false },
        { "nombre": "Perejil fresco", "cantidad": "1 puñado", "comprar": true },
        { "nombre": "Pimentón dulce y picante", "cantidad": "Media cda", "comprar": false }
    ],
    "pasos": [
        "Cocer patatas con piel 15min. Secar.",
        "Dorarlas en sartén caliente con poco de AOVE hasta que crujan por su piel.",
        "Salsa Yogur: Mezclar yogur con ajo granulado y perejil picado.",
        "Salsa brava: Caldentar un dedo de AOVE en sartén e infundir los dos pimentones al apartar.",
        "Servir las patatas rociadas de ambas mezclas."
    ],
    "nutricion": { "calorias": 280, "proteinas": 5, "carbohidratos": 42, "grasas": 10, "fibra": 5 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "falso-sushi-de-pepino-yogur-y-queso-feta": {
    "id": "falso-sushi-de-pepino-yogur-y-queso-feta",
    "nombre": "Falso sushi fresco de pepino",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍣",
    "descripcion": "Rollitos rellenos de yogur feta sin nada de pesadez para la noche.",
    "ingredientes": [
        { "nombre": "Pepino largo y firme", "cantidad": "1 unidad", "comprar": true },
        { "nombre": "Yogur griego", "cantidad": "125g", "comprar": true },
        { "nombre": "Queso feta", "cantidad": "50g", "comprar": true },
        { "nombre": "Hojas de menta", "cantidad": "1 ramito", "comprar": true },
        { "nombre": "Nueces peladas", "cantidad": "20g", "comprar": false }
    ],
    "pasos": [
        "Cortar con mandolina largas y finas tiras de pepino (longitudinalmente). Secarlas en papel.",
        "Mezclar el yogur con feta machacado, menta picadita y la nuez triturada.",
        "Rellenar un extremo de la cinta de pepino y girar creando rollos como de maki.",
        "Servir inmediatamente en bandeja bien fríos."
    ],
    "nutricion": { "calorias": 140, "proteinas": 6, "carbohidratos": 6, "grasas": 10, "fibra": 1 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "gazpacho-de-sand-a-y-feta": {
    "id": "gazpacho-de-sand-a-y-feta",
    "nombre": "Gazpacho de sandía con feta",
    "tipo": "cena",
    "porciones": 4,
    "tiempo": 15,
    "icono": "🍅",
    "descripcion": "Gazpacho andaluz tradicional dulcificado para el verano.",
    "ingredientes": [
        { "nombre": "Tomates maduros", "cantidad": "500g", "comprar": true },
        { "nombre": "Sandía sin pepitas", "cantidad": "500g", "comprar": true },
        { "nombre": "Pimiento verde", "cantidad": "50g", "comprar": false },
        { "nombre": "Pepino", "cantidad": "Media ud.", "comprar": false },
        { "nombre": "Vinagre y AOVE", "cantidad": "3 cdas", "comprar": false },
        { "nombre": "Queso feta", "cantidad": "50g", "comprar": true }
    ],
    "pasos": [
        "Lavar y trocear las verduras y la sandía en cachos de batidora.",
        "Pasar todo por batidora un buen rato hasta licuar.",
        "Emulsionar vertiendo AOVE en hilo y sal, vinagre.",
        "Refrigerarlo y tomarlo helado, desmenuzando feta por encima como guarnición salada."
    ],
    "nutricion": { "calorias": 130, "proteinas": 3, "carbohidratos": 18, "grasas": 6, "fibra": 2 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "carpaccio-de-remolacha-y-champi-n": {
    "id": "carpaccio-de-remolacha-y-champi-n",
    "nombre": "Carpaccio vegetal con parmesano",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍄",
    "descripcion": "Cena ultra ligera. Sabor tierra con mucha clase.",
    "ingredientes": [
        { "nombre": "Remolacha cocida", "cantidad": "200g", "comprar": true },
        { "nombre": "Champiñones portobello muy crudos", "cantidad": "100g", "comprar": true },
        { "nombre": "Piñones tostados", "cantidad": "10g", "comprar": true },
        { "nombre": "Parmesano en taco", "cantidad": "20g", "comprar": true },
        { "nombre": "Brotes de rúcula", "cantidad": "50g", "comprar": true },
        { "nombre": "Zumo de limón natural", "cantidad": "Medio exprimid", "comprar": true }
    ],
    "pasos": [
        "Limpiar de posible tierra frotando los champis en seco. Sin mojarlos.",
        "Con un cuchillo hiper afilado o mandolina cortar remolacha y setas en hojas de papel de finos.",
        "Emplatar plano tipo abanico entrelazándolas sobre hojas de rúcula lavadas.",
        "Aliñar generosamente con zumo crudo de limón, polvo de sal y viruta sacadas de parmesano."
    ],
    "nutricion": { "calorias": 150, "proteinas": 6, "carbohidratos": 11, "grasas": 9, "fibra": 4 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "dip-de-guisantes-con-hierbabuena-y-totopos-caseros": {
    "id": "dip-de-guisantes-con-hierbabuena-y-totopos-caseros",
    "nombre": "Crema untable de guisantes a la menta",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🫛",
    "descripcion": "Mezcla de legumbre muy refrescante, acompañado de tostas de la abuela.",
    "ingredientes": [
        { "nombre": "Guisantes", "cantidad": "300g", "comprar": true },
        { "nombre": "Queso fresco batido p burgos", "cantidad": "250g", "comprar": true },
        { "nombre": "Pistachos repelados", "cantidad": "15g", "comprar": true },
        { "nombre": "Tortillas mejicanas redondas (trigo/maíz)", "cantidad": "2 unidades", "comprar": true },
        { "nombre": "Hojas menta/hierbabuena", "cantidad": "Pequeño manojo", "comprar": true }
    ],
    "pasos": [
        "Para los totopos caseros cortar a cuartos u octavos de pizza las tortitas, asare o tostar hasta endurecer en el centro.",
        "Escaldar guisantes 2 min para verdear fuerte y resfrescar bajo grifo.",
        "Batir la verdura, queso, pizquita de sal, medio ajo descabezado y la hierba.",
        "Bañar de pistachos por arriba y mojar el dorito en este fabuloso entrante."
    ],
    "nutricion": { "calorias": 360, "proteinas": 22, "carbohidratos": 38, "grasas": 12, "fibra": 10 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "escarola-con-granada": {
    "id": "escarola-con-granada",
    "nombre": "Ensalada de escarola crujiente y frutos rubíes",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Guarnición puramente digestiva, excelente para descansar.",
    "ingredientes": [
        { "nombre": "Escarola blanca lavada", "cantidad": "150g", "comprar": true },
        { "nombre": "Granada roja", "cantidad": "1 media", "comprar": true },
        { "nombre": "Avellanas naturales o nuez", "cantidad": "20g", "comprar": true },
        { "nombre": "Sal, vinagres y aceites.", "cantidad": "A capricho", "comprar": false }
    ],
    "pasos": [
        "Desgranar y recoger todos las pepitas carnosas de media granada en el plato.",
        "Si compras en bolsa ensalada de escarola, disponer la ración, echar dentro un buen puñado trozado de picadillo de frutos secano.",
        "El cítrico o toque de mostazas son perfectas a su vinagreta, lo mezclas al sentarte para que sus hojas rizadas nunca claudiquen ahogadas en salsa blanda y mustia."
    ],
    "nutricion": { "calorias": 120, "proteinas": 3, "carbohidratos": 14, "grasas": 10, "fibra": 4 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "tosta-de-aguacate-con-reques-n": {
    "id": "tosta-de-aguacate-con-reques-n",
    "nombre": "Gran tosta de aguacate y proteína láctea",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍞",
    "descripcion": "Perfecta como primer plato rápido cargado de proteína rápida y grasa excelente vegetal.",
    "ingredientes": [
        { "nombre": "Pan rústico, de masa mater", "cantidad": "2 buenas lonchas", "comprar": true },
        { "nombre": "Aguacate madurito", "cantidad": "1 completo", "comprar": true },
        { "nombre": "Requesón grumoso de buena calidad", "cantidad": "100g", "comprar": true },
        { "nombre": "Semillas de sésamo negra", "cantidad": "Espolvoreado", "comprar": false }
    ],
    "pasos": [
        "Tuestalo bastante a tope el pan, sea duro de corteza.",
        "Embadurna con tenazidad unos generosos cazos de requesón (queso whey fresco sin sala) de sabor suave lechoso al pan.",
        "Apostar en rodaje de gajos precisos un medio del fruto mantecoso de aguacatero por rebanadita individual. Echar sésamo arriba.",
        "Gota afilada de AOVE rematadora al festin de paladar!"
    ],
    "nutricion": { "calorias": 310, "proteinas": 10, "carbohidratos": 25, "grasas": 21, "fibra": 8 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "barquitas-de-berenjena-con-yogur-y-manzana": {
    "id": "barquitas-de-berenjena-con-yogur-y-manzana",
    "nombre": "Berenjenas rellenas de fruta especiada india",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 35,
    "icono": "🍆",
    "descripcion": "Exotismo sin par. Relleno vegano pero ultra condimentado.",
    "ingredientes": [
        { "nombre": "Berenjenas (medianas de asar rectilíneas)", "cantidad": "1 unidad", "comprar": true },
        { "nombre": "Manzana dulce ácida", "cantidad": "1 unidad", "comprar": true },
        { "nombre": "Yogur natural no azucarado o de coco", "cantidad": "125g", "comprar": true },
        { "nombre": "Especias (polvo madrás de curry)", "cantidad": "1 cucharón", "comprar": false },
        { "nombre": "Puñado nuez", "cantidad": "30 gr", "comprar": false }
    ],
    "pasos": [
        "Divídase por medio. Raya o acuchilla de trama cruz la carnosidad y mete asadora temperatura 200 gradiños hasta ablandar (min. 25 min).",
        "Pela un manzano de temporada crudo como fuji, rompe micro en cubos de ajedréz enanito muy fríos.",
        "Al sacar tu vegetal asadito recoge raspando la pulposidad al bol. Júntalo con manzanita, el polvito amarillísimo de curry y blanco del yofugo. Remover todo.",
        "Sirvete su re-mezcla rehundida entre sus pellejitos, adorna arriba de lascas nuecería y disfrútalo"
    ],
    "nutricion": { "calorias": 220, "proteinas": 7, "carbohidratos": 28, "grasas": 8, "fibra": 9 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "escabeche-de-sardinas": {
    "id": "escabeche-de-sardinas",
    "nombre": "Sardinas sutiles del maritorio en escabeche",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🐟",
    "descripcion": "Clásico que aguantará en la despensa hasta tres semanotas (y sin bote).",
    "ingredientes": [
        { "nombre": "Sardinetas plata o boquerón", "cantidad": "250 gramos limpios", "comprar": true },
        { "nombre": "Zanahoria / Cebollino / lauros y clavo/ajo machacado", "cantidad": "Fondo potásico clásico", "comprar": false },
        { "nombre": "Vinabres", "cantidad": "Vaso vinagre blanco / y pizco pimenton", "comprar": false },
        { "nombre": "Aceite bueno.", "cantidad": "50cc en la olla", "comprar": false }
    ],
    "pasos": [
        "Asume que descamar y eviscerar con dos manos el pez sin malobrar la forma, pasar por agüilla a limpiar.",
        "Hacer sudar el lecho o sofrito base hortalizo al punto (pocilgar), y de pronto retirar lumbre, añadir pimiento molido sin quemar color, y seguido tu vinagre agrio tapando para el vaporazo de ebulle.",
        "Sumar agua pelín y hiervelo por 10 o dobles minutitos la base salsante.",
        "Deposita pezcau fresco allí apaga flama, deja asentar enfríe hermetico. Plato majestuoso y barato."
    ],
    "nutricion": { "calorias": 380, "proteinas": 28, "carbohidratos": 7, "grasas": 26, "fibra": 2 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "crema-de-calabaza-y-queso-azul": {
    "id": "crema-de-calabaza-y-queso-azul",
    "nombre": "Crema fuerte de Calabaza Asada y Roquefort",
    "tipo": "cena",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🥣",
    "descripcion": "Puré espeso cremosísimo que rompe el salado feroz con lo dulcesote de temporada de otono.",
    "ingredientes": [
        { "nombre": "Calabaza cacahueteras pelada", "cantidad": "Ochocientos gr", "comprar": true },
        { "nombre": "Cebolla", "cantidad": "1 Ud Gigante", "comprar": false },
        { "nombre": "Fondo vegetal caldo", "cantidad": "1 Brick literario", "comprar": true },
        { "nombre": "Quesito Azul intenso o roquefórte", "cantidad": "40gramillo", "comprar": true }
    ],
    "pasos": [
        "Pochado violento en granolla y aceitaron con los cebaques grandes asomándolos transparentosos.",
        "Corte calabacíl y lo rehagas a fuego par. Salseas / inunda en caldeos su cocimiento lento de un cuarto 20 mins.",
        "Rompe lo deshecho asuporado pasándole batidos integrando caliente unos porciotos la mirtad de queso podrit azulíto, licuándolo al tacto deséau.",
        "Sírvalo calentíto esparciéndolas otras mitades al natural grumosos de quesazo para rematillo fuerte o picatosta crocanti."
    ],
    "nutricion": { "calorias": 160, "proteinas": 5, "carbohidratos": 22, "grasas": 6, "fibra": 4 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "alubia-confetti": {
    "id": "alubia-confetti",
    "nombre": "Alubia de carnaval Confetti Ensaladazo",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🫘",
    "descripcion": "Ensalada mega colorida en frío (o semi caliente a opción). Saciantísima.",
    "ingredientes": [
        { "nombre": "Alubia de lata cocida suave mantecosa", "cantidad": "1Bota 400", "comprar": true },
        { "nombre": "Pimenteros varioscuba verde amarillos rojazos", "cantidad": "1 enterito por cuartas", "comprar": true },
        { "nombre": "Aguacate duro firme al taglio", "cantidad": "1 medio", "comprar": true },
        { "nombre": "Mijo gordo o grano maíz lata", "cantidad": "50 gs y de aliño al aceto", "comprar": true }
    ],
    "pasos": [
        "Exige lavar a saco la aluviación hasta irse la gomosidad bote.",
        "Picazos y re cuadeados miniatura todo al morro del pimiento para confundirl la vista entre legumbriña en un Confetti pergeñado.",
        "Baño aceite, ácidos vinagretos o limeños de frescor al centro mesillero para pinche de festivo diurno entre platos proteínicos a mogollon!"
    ],
    "nutricion": { "calorias": 360, "proteinas": 15, "carbohidratos": 45, "grasas": 12, "fibra": 18 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "salm-n-expr-s-al-microondas": {
    "id": "salm-n-expr-s-al-microondas",
    "nombre": "Salmón Noruego express a vaporización al ONDAS 10mins",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 12,
    "icono": "🥘",
    "descripcion": "Rapidísimo que no cede calidad ni mancha las sartén. Súper limpio al asado de agua.",
    "ingredientes": [
        { "nombre": "Salmón troncos", "cantidad": "2 Piezas unos 300gsudos", "comprar": true },
        { "nombre": "Calabacín o Zucchini tierno pelado / cachelo gordo", "cantidad": "Las rodajas finas, 1 grande", "comprar": true },
        { "nombre": "Limón gordo al jugo eneldo pastosillo", "cantidad": "Medio limonaje al llovizn", "comprar": true }
    ],
    "pasos": [
        "Hacer escamas planas con pealdoros del calabazin y papa asar o cacheles tierneciros. Asarlos sólos base en taper de microonidas o del vapori 5 m a topoteo potencia.",
        "Coronar depositándo arriba el lomarrosa y salpincarlo acidón de los limón o limas verdes perfumero.",
        "Sellar / Tapillar plástico e intrudice 4 / 5 minuto de sauna max. No levantar el hule hacia tus caretos ni gafas por calores vivos!!"
    ],
    "nutricion": { "calorias": 420, "proteinas": 34, "carbohidratos": 25, "grasas": 21, "fibra": 4 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "merluza-con-patatas-a-la-importancia": {
    "id": "merluza-con-patatas-a-la-importancia",
    "nombre": "Guisote marinero de Merluza con Cachelos 'importantes'",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 40,
    "icono": "🐟",
    "descripcion": "El guisantes en fondo caldoso o perol grande ahumadito. Tradiciona.",
    "ingredientes": [
        { "nombre": "Merluza gruesa del pincha centro lomo", "cantidad": "Los medallones o las rodajas", "comprar": true },
        { "nombre": "Patatales para rebozitos.", "cantidad": "Medio quilitero", "comprar": true },
        { "nombre": "Marisco puro pescados y Azafrán hilazas", "cantidad": "Botellas caldo 1 y 2 sobres.", "comprar": true },
        { "nombre": "Guisantes dulces", "cantidad": "Puñado para coloretes.", "comprar": false }
    ],
    "pasos": [
        "Mete moneda de rodaja gorda empaná a huevo rápido salteada, asentar fritos dorados y al plato (patata base).",
        "Porchear cevas transparantes y echaz el caldi maritimino a borobteones sutilones introdujo el patator",
        "Hiervejarlas solitas pa 15, meter merluzas y los bolitos (guisantazo) últimos 4 y servir hondo de mojar barras de painetes de trigos enteros crujos."
    ],
    "nutricion": { "calorias": 360, "proteinas": 26, "carbohidratos": 32, "grasas": 12, "fibra": 5 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "pechugas-de-pollo-empanadas-con-kikos": {
    "id": "pechugas-de-pollo-empanadas-con-kikos",
    "nombre": "Crujipollo a los pechuga empaná en KIKO de maíz",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍗",
    "descripcion": "A los zagales gustara bestial el empanizarlo rudo estilo Kfc pero sano de gusanito cric cri.",
    "ingredientes": [
        { "nombre": "Fieltes blando de corraleta a de pechugas finísimas", "cantidad": "2 libritas gordotas al cortes", "comprar": true },
        { "nombre": "Maíz dorado horneaditos (Mister Kiko frito grueso)", "cantidad": "Gran bolsa gorda", "comprar": true },
        { "nombre": "Huevina gorda camperes bación", "cantidad": "Los dos enteros.", "comprar": false }
    ],
    "pasos": [
        "Aplasta los gusanitos frito duros en un embolse hasta picazos irregulores sin harina (mortheros valen o rulos de pasta)",
        "Las gallinitas en finas yemas huevos sumergir rebodidas, al envuelve o panko maízero adherido al aprietes maximos entre mano y fileteón gruesales",
        "Posa un papel a asar caldeados de airfirer super tostadoras u de orno comun a 8 y doce minuteletes.",
        "Se quema enseuguida sin el ojometreado constante al final."
    ],
    "nutricion": { "calorias": 420, "proteinas": 34, "carbohidratos": 25, "grasas": 18, "fibra": 2 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "miniburger-de-alubias-y-at-n": {
    "id": "miniburger-de-alubias-y-at-n",
    "nombre": "Miniburger vegetarianos (de legumbre y atún)",
    "imagen": "images/recipes/miniburger-de-alubias-y-at-n.png",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🍔",
    "descripcion": "Burger sana perfecta que agrupa proteína alta de pescador y la alúbias triturón a base terrosa densisima.",
    "ingredientes": [
        { "nombre": "Alubias blancas precocinadas, muy pastis", "cantidad": "250 gramos", "comprar": true },
        { "nombre": "Atún a de bote claro aceitetas girazol u aguas del natu.", "cantidad": "A Lata drenada sequita sin gota", "comprar": true }
    ],
    "pasos": [
        "Escacha leguminosas. Dejari un pocot de enteras pare dentelleada rústicas de no pasta gomasia pura fina..",
        "Tirar todo pescadazo y de amalgamar los dos sin paros en la bolas masadas de tus handazos grandes o un cacillazo heladores redondas..",
        "Pasee a aplastar tipo torrezna ancha pero fínisimas parrilleando dorado. A engullir con lechuguina tomate y quesero tierno derretos encima un panaco integral crujosazo gordo!!"
    ],
    "nutricion": { "calorias": 280, "proteinas": 22, "carbohidratos": 28, "grasas": 8, "fibra": 9 },
    "nota" : "📖 Original NotebookLM (Mejorado)"
  },
  "batido-platano-arandanos-avena": {
    "id": "batido-platano-arandanos-avena",
    "nombre": "Batidazo rápido deportivo Plátano Fresón o Moresco Fríos + Avenón",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥤",
    "descripcion": "Recomponedor liquidos. Cena rácana exprén para el gimnás o al caloruzo estival gordo denso para buche rellenitas pero livianotes nocturno",
    "ingredientes": [
        { "nombre": "Arándano oscuro antioxidantes crudos congelsados (heladero)", "cantidad": "100 gramos puros", "comprar": true },
        { "nombre": "Platanillo ultra blando muy oscuro.", "cantidad": "Medio (40 gr.)", "comprar": true },
        { "nombre": "La bebida de Sojas, de las almendrables. (cualquier lactera natural base líquideses yemas blancones)", "cantidad": "1 vasos de cuartos / y unos copos para enpesores. Cúbicos hierlerías fríon.", "comprar": true }
    ],
    "pasos": [
        "Metis a turbinas lo plataneo rotos. Las arándani azulera, su lacteas base.",
        "A pulverizar las copinas u harinas desnudas avenas batidos gordos por un milisegundo largo de moliendas sutil.",
        "Un cubo aguahielo rayada para fresquetos o batir juntis con canela olorosa, te tragas eso súper nutritivas pa cama tempraneos super agustos"
    ],
    "nutricion": { "calorias": 230, "proteinas": 9, "carbohidratos": 34, "grasas": 7, "fibra": 6 },
    "nota": "📖 Extraído con IA (NotebookLM) / Custom "
  }
}
;

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

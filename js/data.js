
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
  "crema-tibia-de-puerro-y-patata": {
    "id": "crema-tibia-de-puerro-y-patata",
    "nombre": "Crema tibia de puerro y patata",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 60,
    "icono": "🍲",
    "descripcion": "Crema tibia ideal para primavera.",
    "ingredientes": [
      "4 puerros",
      "1 patata",
      "2 cucharadas de aceite de oliva",
      "500 mililitros de caldo de verduras",
      "100 mililitros de nata para cocinar",
      "Sal y pimienta al gusto"
    ],
    "pasos": [
      "Preparar los ingredientes.",
      "Cocinar en olla o cazuela.",
      "Batir con batidora eléctrica."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/crema-tibia-de-puerro-y-patata.jpg"
  },
  "chips-de-kale": {
    "id": "chips-de-kale",
    "nombre": "Chips de kale",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥬",
    "descripcion": "Snack crujiente y saludable.",
    "ingredientes": [
      {
        "nombre": "Kale",
        "cantidad": "150g",
        "comprar": true
      },
      {
        "nombre": "Aceite de Oliva (AOVE)",
        "cantidad": "15ml",
        "comprar": false
      },
      {
        "nombre": "Sal fina",
        "cantidad": "1 pizca",
        "comprar": false
      },
      {
        "nombre": "Pimentón dulce",
        "cantidad": "1 cucharadita",
        "comprar": false
      }
    ],
    "pasos": [
      "Precalentar el horno a 180°C con calor arriba y abajo.",
      "Lavar muy bien bajo el grifo el kale y secarlo con papel absorbente.",
      "Quitar los tallos gruesos y trocear las hojas en trozos de un bocado.",
      "Masajear en un bol las hojas con el AOVE, la sal y el pimentón hasta que estén impregnadas.",
      "Extender sin amontonar en la bandeja del horno y hornear 10-12 min.",
      "Dejar enfriar 5 minutos para que crispen completemente."
    ],
    "nutricion": {},
    "nota": "Puedes comerlos como snack o añadirlos a tus ensaladas.",
    "imagen": "images/recipes/chips-de-kale.jpg"
  },
  "merluza-con-patatas-a-la-importancia": {
    "id": "merluza-con-patatas-a-la-importancia",
    "nombre": "Guisote marinero de Merluza con Cachelos 'importantes'",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 40,
    "icono": "🐟",
    "descripcion": "Guiso marinero de merluza con patatas.",
    "ingredientes": [
      {
        "nombre": "Merluza gruesa del pincha centro lomo",
        "cantidad": "Los medallones o las rodajas",
        "comprar": true
      },
      {
        "nombre": "Patatales para rebozitos.",
        "cantidad": "Medio quilitero",
        "comprar": true
      },
      {
        "nombre": "Marisco puro pescados y Azafrán hilazas",
        "cantidad": "Botellas caldo 1 y 2 sobres.",
        "comprar": true
      },
      {
        "nombre": "Guisantes dulces",
        "cantidad": "Puñado para coloretes.",
        "comprar": false
      }
    ],
    "pasos": [
      "Mete moneda de rodaja gorda empaná a huevo rápido salteada, asentar fritos dorados y al plato (patata base).",
      "Porchear cevas transparantes y echaz el caldi maritimino a borobteones sutilones introdujo el patator",
      "Hiervejarlas solitas pa 15, meter merluzas y los bolitos (guisantazo) últimos 4 y servir hondo de mojar barras de painetes de trigos enteros crujos."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/merluza-con-patatas-a-la-importancia.jpg"
  },
  "curry-rapido-de-garbanzos-y-espinacas": {
    "id": "curry-rapido-de-garbanzos-y-espinacas",
    "nombre": "Curry rápido de garbanzos y espinacas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🍛",
    "descripcion": "Un plato de cuchara caliente, completo y rápido de preparar.",
    "ingredientes": [
      "Garbanzos cocidos 400g",
      "Espinacas baby 150g",
      "Leche de coco 200ml",
      "Pasta de curry (amarillo o rojo) 1 cucharada",
      "Aceite de oliva 1 cucharada",
      "Cebolla 1/2 unidad",
      "Ajo 1 diente"
    ],
    "pasos": [
      "Pica finamente la cebolla y el ajo y sofríelos en una sartén con el aceite de oliva.",
      "Añade la pasta de curry y remueve un minuto.",
      "Incorpora los garbanzos escurridos y la leche de coco. Deja cocer 10 minutos.",
      "Apaga el fuego, añade las espinacas baby y tápalo.",
      "Sirve caliente."
    ],
    "nutricion": {},
    "nota": "Puede acompañarse de arroz.",
    "imagen": "images/recipes/curry-rapido-de-garbanzos-y-espinacas.jpg"
  },
  "quinoa-con-verduras-asadas-y-huevo-poche": {
    "id": "quinoa-con-verduras-asadas-y-huevo-poche",
    "nombre": "Quinoa con verduras asadas y huevo poché",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 30,
    "icono": "🥗",
    "descripcion": "Bol nutricionalmente completo con cereales tostados y huevo.",
    "ingredientes": [
      "Quinoa 100g",
      "Calabacín 1 unidad",
      "Pimiento rojo 1 unidad",
      "Huevos 2 unidades",
      "Cebolla morada 1/2 unidad",
      "Vinagre un chorrito",
      "Aceite de oliva 2 cucharadas",
      "Sal y pimienta al gusto"
    ],
    "pasos": [
      "Pica calabacín, pimiento y cebolla. Hornea a 200ºC por 20 minutos con sal, pimienta y aceite.",
      "Lava la quinoa y cuécela 15 minutos.",
      "Haz el huevo poché en agua con vinagre durante 3 minutos.",
      "Mezcla la quinoa con las verduras y pon el huevo poché encima."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/quinoa-con-verduras-asadas-y-huevo-poche.jpg"
  },
  "fajitas-de-pollo-y-pimientos": {
    "id": "fajitas-de-pollo-y-pimientos",
    "nombre": "Fajitas de pollo y pimientos",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🌯",
    "descripcion": "Pollo y verduras salteadas en una sola sartén ideales para enrollar.",
    "ingredientes": [
      "Pechuga de pollo 300g",
      "Mezcla de pimientos 200g",
      "Cebolla 1 unidad",
      "Tortillas de trigo o maíz 4 unidades",
      "Sazonador de fajitas 1 cucharada",
      "Aceite de oliva 1 cucharada"
    ],
    "pasos": [
      "Corta el pollo, pimientos y cebolla en tiras.",
      "Saltea cebolla y pimientos a fuego fuerte.",
      "Añade el pollo y saltea hasta cocinar.",
      "Espolvorea el sazonador.",
      "Calienta tortillas y sirve."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/fajitas-de-pollo-y-pimientos.jpg"
  },
  "frittata-de-aprovechamiento": {
    "id": "frittata-de-aprovechamiento",
    "nombre": "Frittata de aprovechamiento (verduras de la nevera)",
    "tipo": "aprovechamiento",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍳",
    "descripcion": "Ideal para gastar cualquier verdura, queso o embutido suelto en la nevera.",
    "ingredientes": [
      "Huevos 4 unidades",
      "Restos de verduras asadas o cocidas 200g",
      "Restos de queso suelto 50g",
      "Leche o nata un chorrito",
      "Aceite de oliva 1 cucharada",
      "Sal y hierbas provenzales al gusto"
    ],
    "pasos": [
      "Bate los huevos con leche, sal y hierbas.",
      "Añade las verduras y el queso.",
      "Precalienta aceite en sartén.",
      "Vierte la mezcla y cuaja 5 minutos a fuego medio.",
      "Termina de cuajar en el horno o dándole la vuelta."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/frittata-de-aprovechamiento.jpg"
  },
  "arroz-frito-tres-delicias-de-aprovechamiento": {
    "id": "arroz-frito-tres-delicias-de-aprovechamiento",
    "nombre": "Arroz frito tres delicias de aprovechamiento",
    "tipo": "aprovechamiento",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍚",
    "descripcion": "La clásica forma de darle vida al arroz blanco sobrante.",
    "ingredientes": [
      "Arroz cocido de días anteriores 250g",
      "Huevos 2 unidades",
      "Guisantes 50g",
      "Restos de fiambre o carne 50g",
      "Zanahoria 1 unidad",
      "Salsa de soja 2 cucharadas",
      "Aceite 1 cucharada"
    ],
    "pasos": [
      "Pica la zanahoria y el fiambre. Bate los huevos.",
      "Haz un revuelto rápido con los huevos y retira.",
      "Sofríe zanahoria, pollo y guisantes.",
      "Incorpora el arroz frío desmenuzado.",
      "Añade el huevo, la soja y saltea a fuego fuerte. Sirve."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/arroz-frito-tres-delicias-de-aprovechamiento.jpg"
  },
  "mix-crocante": {
    "id": "mix-crocante",
    "nombre": "Mix crocante",
    "tipo": "snack",
    "porciones": 10,
    "tiempo": 5,
    "icono": "🥣",
    "descripcion": "Snack dulce y saludable.",
    "ingredientes": [
      "100 g de pasitas",
      "200 g hojuelas de maíz Cornflakes",
      "150 g de maní sin sal tostado"
    ],
    "pasos": [
      "Mezclar los ingredientes.",
      "Almacenarlo en frasco de vidrio.",
      "Servir la porción en cono de papel."
    ],
    "nutricion": {},
    "nota": "Dificultad fácil.",
    "imagen": "images/recipes/mix-crocante.jpg"
  },
  "hamburguesa-de-lentejas": {
    "id": "hamburguesa-de-lentejas",
    "nombre": "Hamburguesa de lentejas",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 20,
    "icono": "🍔",
    "descripcion": "Hamburguesas vegetarianas a base de lentejas.",
    "ingredientes": [
      "2 tazas de lentejas cocinadas",
      "1 cebolla",
      "1 diente de ajo",
      "Media zanahoria rallada",
      "2 cucharadas de aceite",
      "1 huevo",
      "1 taza de harina de avena",
      "Pimienta al gusto"
    ],
    "pasos": [
      "Mezclar las lentejas cocinadas con las verduras picadas y el huevo.",
      "Añadir la harina de avena y formar las hamburguesas.",
      "Sofreir."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/hamburguesa-de-lentejas.jpg"
  },
  "batido-delicioso-para-las-defensas": {
    "id": "batido-delicioso-para-las-defensas",
    "nombre": "Batido delicioso para las defensas",
    "tipo": "bebida",
    "porciones": 1,
    "tiempo": 10,
    "icono": "🥤",
    "descripcion": "Batido refrescante.",
    "ingredientes": [
      "150 g de piña",
      "Trozos de manzana, al gusto",
      "1 pepino",
      "1 limón",
      "5 hojas de menta fresca",
      "50 ml de agua de coco"
    ],
    "pasos": [
      "Batir todos los ingredientes en la licuadora.",
      "Mezclar bien y servirlo fresco."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/batido-delicioso-para-las-defensas.jpg"
  },
  "batido-de-coco-guineo-y-cacao": {
    "id": "batido-de-coco-guineo-y-cacao",
    "nombre": "Batido de coco, guineo y cacao",
    "tipo": "bebida",
    "porciones": 1,
    "tiempo": 10,
    "icono": "🥤",
    "descripcion": "Batido dulce y energético.",
    "ingredientes": [
      "Coco",
      "Guineo",
      "Cacao"
    ],
    "pasos": [
      "Colocar todos los ingredientes en una licuadora.",
      "Licuar hasta lograr una consistencia suave y uniforme.",
      "Servir."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/batido-de-coco-guineo-y-cacao.jpg"
  },
  "batido-energetico": {
    "id": "batido-energetico",
    "nombre": "Batido energético",
    "tipo": "bebida",
    "porciones": 1,
    "tiempo": 5,
    "icono": "🥤",
    "descripcion": "Batido con frutos rojos y espinacas.",
    "ingredientes": [
      "200 g de mora",
      "100 g de arándanos",
      "2 puñados de espinacas tiernas",
      "30 g de frutos secos, picados finos",
      "Un chorrito de zumo de limón",
      "3 dátiles sin semilla",
      "4 hojas de menta",
      "Un puñado de cubitos de hielo"
    ],
    "pasos": [
      "Batir todos los ingredientes en la licuadora.",
      "Mezclarlos hasta que quede una consistencia suave y homogénea.",
      "Servir fresco."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/batido-energetico.jpg"
  },
  "ensalada-arco-iris-con-pollo": {
    "id": "ensalada-arco-iris-con-pollo",
    "nombre": "Ensalada arco iris con pollo",
    "tipo": "ensalada",
    "porciones": 4,
    "tiempo": 20,
    "icono": "🥗",
    "descripcion": "Ensalada colorida con pollo.",
    "ingredientes": [
      "1 Pechuga de pollo",
      "1 zanahoria mediana",
      "3 tomates pequeños",
      "4 cabezas de brócoli",
      "Media Lechuga mediana",
      "Jugo de 1 limón",
      "2 cucharadas de aceite de oliva",
      "1 cucharadita de mostaza",
      "Laurel, pimienta y orégano"
    ],
    "pasos": [
      "Hervir el pollo.",
      "Cortar y mezclar los vegetales.",
      "Añadir el aliño y el pollo."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/ensalada-arco-iris-con-pollo.jpg"
  },
  "ensalada-de-tres-colores": {
    "id": "ensalada-de-tres-colores",
    "nombre": "Ensalada de tres colores",
    "tipo": "ensalada",
    "porciones": 4,
    "tiempo": 20,
    "icono": "🥗",
    "descripcion": "Ensalada fresca con aguacate.",
    "ingredientes": [
      "1 Pechuga entera de pollo deshuesada",
      "1 Aguacate mediano",
      "3 tomates pequeños",
      "Jugo de ½ limón",
      "1 cda. de aceite",
      "1 hoja de laurel"
    ],
    "pasos": [
      "Cocinar la pechuga de pollo con laurel y orégano. Enfriar y reposar. Cortar el aguacate en cubitos.",
      "Lavar y cortar en trocitos los tomates.",
      "Mezclar todos los ingredientes y servir."
    ],
    "nutricion": {},
    "nota": "Puedes sustituir el pollo por cubitos de queso fresco o ricota.",
    "imagen": "images/recipes/ensalada-de-tres-colores.jpg"
  },
  "guisado-de-carne-y-verdura": {
    "id": "guisado-de-carne-y-verdura",
    "nombre": "Guisado de carne y verdura",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 50,
    "icono": "🍲",
    "descripcion": "Guiso de carne de res con vegetales.",
    "ingredientes": [
      "500g de carne de res",
      "1 cebolla mediana",
      "2 Camotes",
      "3 papas medianas",
      "2 zanahorias medianas",
      "2 tomates",
      "1 cda. de aceite",
      "Laurel"
    ],
    "pasos": [
      "Cortar la carne en cubitos y sofreir. Picar la cebolla y tomate. Pelar y cortar papa, camote y zanahoria.",
      "Incorporar la cebolla a la cacerola.",
      "Añadir tomate, laurel y vegetales.",
      "Cubrir con agua y cocinar hasta que los vegetales estén tiernos."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/guisado-de-carne-y-verdura.jpg"
  },
  "ensalada-de-torrejitas-de-coliflor-y-tuna": {
    "id": "ensalada-de-torrejitas-de-coliflor-y-tuna",
    "nombre": "Ensalada de torrejitas de coliflor y tuna",
    "tipo": "ensalada",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🥗",
    "descripcion": "Ensalada acompañada de torrejitas.",
    "ingredientes": [
      "6 huevos",
      "2 tzas de coliflor hervida y picada",
      "1 lata de tuna",
      "½ tza de cebolla roja picada",
      "½ tza de harina",
      "Sal y pimienta",
      "Perejil picado",
      "1 aguacate",
      "1 tomate",
      "Limón",
      "Aceite"
    ],
    "pasos": [
      "Hacer torrejitas con la coliflor, atún, huevos y harina.",
      "Servir junto con aguacate y tomate."
    ],
    "nutricion": {},
    "nota": ""
  },
  "rollitos-de-pescado-con-ricota-y-perejil": {
    "id": "rollitos-de-pescado-con-ricota-y-perejil",
    "nombre": "Rollitos de pescado con ricota y perejil",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 50,
    "icono": "🐟",
    "descripcion": "Pescado relleno horneado.",
    "ingredientes": [
      "4 filetes de pescado fresco sin espinas",
      "1 cda. de perejil picado",
      "8 cdas. de ricota",
      "1 cda. de aceite"
    ],
    "pasos": [
      "Mezclar la ricota con el perejil.",
      "Rellenar los filetes y hornear."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/rollitos-de-pescado-con-ricota-y-perejil.jpg"
  },
  "croqueta-de-pescado": {
    "id": "croqueta-de-pescado",
    "nombre": "Croqueta de pescado",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 5,
    "icono": "🧆",
    "descripcion": "Croquetas horneadas de pescado.",
    "ingredientes": [
      "1 taza de pescado cocido desmenuzado",
      "1 ½ tazas de puré de papas",
      "½ taza de pan rallado",
      "½ taza de avena en hojuelas",
      "1 huevo",
      "1 cda. de aceite",
      "1 cdta. de jugo de limón",
      "1 cda. de perejil picado",
      "Pizca de nuez moscada"
    ],
    "pasos": [
      "Mezclar el pescado, el puré de papas, el huevo, el jugo de limón y el perejil.",
      "Formar bolitas. Pasarlas por huevo y mezcla de pan y avena.",
      "Hornear en bandeja aceitada hasta que se doren."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/croqueta-de-pescado.jpg"
  },
  "pescado-empanizado-con-salsa-verde": {
    "id": "pescado-empanizado-con-salsa-verde",
    "nombre": "Pescado empanizado con salsa verde",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 60,
    "icono": "🐟",
    "descripcion": "Pescado con salsa verde.",
    "ingredientes": [
      "4 filetes de pescado sin espinas",
      "1 tza de harina",
      "3 huevos",
      "1 ½ tza de miga de pan",
      "2 tzas de espinaca",
      "¼ de cebolla blanca fileteada",
      "Sal al gusto",
      "1 tza de cebolla blanca picada (salsa)",
      "3 dientes de ajo (salsa)",
      "2 kg tomate verde o tomatillo (salsa)",
      "Chiles al gusto (salsa)",
      "2 tzas de caldo de pollo (salsa)"
    ],
    "pasos": [
      "Preparar la salsa hirviendo los ingredientes.",
      "Pasar el pescado por harina, huevo y pan, y repetir.",
      "Cocinar el pescado y servir con la salsa y espinaca."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/pescado-empanizado-con-salsa-verde.jpg"
  },
  "arroz-con-coco-y-leche": {
    "id": "arroz-con-coco-y-leche",
    "nombre": "Arroz con coco y leche",
    "tipo": "postre",
    "porciones": 3,
    "tiempo": 40,
    "icono": "🍚",
    "descripcion": "Postre tradicional de arroz.",
    "ingredientes": [
      "1 libra de arroz",
      "1 coco rallado",
      "2 tazas de leche",
      "1 taza con agua",
      "Media libra de raspadura",
      "Canela",
      "Vainilla"
    ],
    "pasos": [
      "Cocina el arroz a fuego medio con el agua, raspadura y vainilla por 30 min.",
      "Agrega la leche revolviendo constantemente.",
      "Retira del fuego, incorpore el coco y mezcle.",
      "Deja reposar 30 minutos.",
      "Sirve espolvoreado con canela."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/arroz-con-coco-y-leche.jpg"
  },
  "tajaditas-de-platano-con-guacamole": {
    "id": "tajaditas-de-platano-con-guacamole",
    "nombre": "Tajaditas de plátano con guacamole",
    "tipo": "snack",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🍌",
    "descripcion": "Plátano al horno con guacamole.",
    "ingredientes": [
      "Plátano",
      "Guacamole"
    ],
    "pasos": [
      "Corta el plátano en tajadas delgadas.",
      "Hornea por 20 minutos hasta que queden crocantes.",
      "Sirve acompañadas con el guacamole."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/tajaditas-de-platano-con-guacamole.jpg"
  },
  "huevos-escalfados-en-un-bote-de-aguacate": {
    "id": "huevos-escalfados-en-un-bote-de-aguacate",
    "nombre": "Huevos escalfados en un bote de aguacate",
    "tipo": "desayuno",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🥑",
    "descripcion": "Huevos servidos en mitades de aguacate.",
    "ingredientes": [
      "2 huevos grandes",
      "50 g de tomate picado",
      "60 g de queso cottage desmenuzado",
      "Cilantro para decorar",
      "10 ml de aceite de oliva",
      "80 g de jamón picado",
      "30 g de cebolla picada",
      "10 ml de vinagre blanco",
      "Aguacate"
    ],
    "pasos": [
      "Escalfar los huevos.",
      "Rellenar el aguacate con los huevos.",
      "Añadir tomate, queso cottage y cilantro."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/huevos-escalfados-en-un-bote-de-aguacate.jpg"
  },
  "galletas-de-avena-y-manzana": {
    "id": "galletas-de-avena-y-manzana",
    "nombre": "Galletas de avena y manzana",
    "tipo": "postre",
    "porciones": 20,
    "tiempo": 30,
    "icono": "🍪",
    "descripcion": "Galletas dulces horneadas.",
    "ingredientes": [
      "2 huevos",
      "½ t. de aceite",
      "1 cda. de vainilla",
      "1 cda. de ralladura de limón",
      "¾ t. de azúcar",
      "1 ¼ t. de harina",
      "1 2/3 t. de avena",
      "2 manzanas ralladas",
      "2 ctas. de polvo de hornear",
      "½ cta. de sal"
    ],
    "pasos": [
      "Mezclar los ingredientes y hornear."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/galletas-de-avena-y-manzana.jpg"
  },
  "galletas-saladas-de-hierbas": {
    "id": "galletas-saladas-de-hierbas",
    "nombre": "Galletas saladas de hierbas",
    "tipo": "snack",
    "porciones": 20,
    "tiempo": 30,
    "icono": "🍘",
    "descripcion": "Galletas saladas con aromáticas.",
    "ingredientes": [
      "2 t. de harina",
      "1/3 t. de aceite",
      "4 cta. de polvo de hornear",
      "½ cta. de sal",
      "1 cda. de hierbas aromáticas",
      "1 huevo",
      "½ t. de leche"
    ],
    "pasos": [
      "Mezclar aceite, huevo y leche.",
      "Incorporar hierbas aromáticas y secos.",
      "Formar masa, cortar en círculos y hornear a 230 ºC por 12 minutos."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/galletas-saladas-de-hierbas.jpg"
  },
  "bizcocho-de-frutas": {
    "id": "bizcocho-de-frutas",
    "nombre": "Bizcocho de frutas",
    "tipo": "postre",
    "porciones": 10,
    "tiempo": 40,
    "icono": "🍰",
    "descripcion": "Bizcocho con frutas de estación.",
    "ingredientes": [
      "2 t. de harina",
      "2 ctas. de polvo de hornear",
      "3/4 t. de azúcar",
      "1/4 t. de aceite",
      "1/2 t. de leche",
      "3 huevos",
      "1 cta. de vainilla",
      "1 pizca de sal",
      "3/4 t. de fruta fresca picada"
    ],
    "pasos": [
      "Mezclar ingredientes y hornear."
    ],
    "nutricion": {},
    "nota": "Puedes utilizar melón, durazno, fresa, kiwi, guineo o coco.",
    "imagen": "images/recipes/bizcocho-de-frutas.jpg"
  },
  "guacamole-con-palitos-de-zanahoria": {
    "id": "guacamole-con-palitos-de-zanahoria",
    "nombre": "Guacamole con palitos de zanahoria",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥑",
    "descripcion": "Aperitivo saludable.",
    "ingredientes": [
      {
        "nombre": "Aguacate maduro",
        "cantidad": "1 unidad",
        "comprar": true
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "20g",
        "comprar": true
      },
      {
        "nombre": "Tomate",
        "cantidad": "50g",
        "comprar": true
      },
      {
        "nombre": "Lima",
        "cantidad": "1/2 unidad",
        "comprar": true
      },
      {
        "nombre": "Cilantro fresco",
        "cantidad": "1 ramito",
        "comprar": true
      },
      {
        "nombre": "Sal gorda",
        "cantidad": "1 pizca",
        "comprar": false
      },
      {
        "nombre": "Zanahorias para dipear",
        "cantidad": "2 unidades",
        "comprar": true
      }
    ],
    "pasos": [
      "Pelar las zanahorias y cortarlas en bastones de 5 cm. Reservar en un vaso con hielos.",
      "Picar la cebolla morada y el tomate (sin semillas) en trocitos muy pequeños.",
      "Moler la pulpa del aguacate con un tenedor dejando grumos rústicos.",
      "Añadir lima, sal, tomate, cebolla, el cilantro picado, y remover.",
      "Servir junto con las zanahorias."
    ],
    "nutricion": {
      "proteinas": 3.22,
      "grasas": 21.26,
      "grasas_saturadas": 4.66,
      "hidratos": 10.02,
      "azucares": 7.9,
      "calorias": 244.3
    },
    "nota": "",
    "imagen": "images/recipes/guacamole-con-palitos-de-zanahoria.jpg"
  },
  "zanahorias-encurtidas": {
    "id": "zanahorias-encurtidas",
    "nombre": "Zanahorias encurtidas 'para mañana'",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🥕",
    "descripcion": "Encurtido rápido de zanahorias.",
    "ingredientes": [
      "2 zanahorias (200 g)",
      "Perejil fresco (10 g)",
      "Ajo (4-5 g)",
      "Hierbabuena o menta (10 g)",
      "Pimienta negra",
      "AOVE (20 ml)",
      "Vinagre (30 ml)",
      "Sal"
    ],
    "pasos": [
      "Corta las zanahorias en tiras.",
      "Pica el ajo, ponle sal y pimienta y deja reposar.",
      "Pica las hierbas y añádelas a la zanahoria.",
      "Mezcla el AOVE y vinagre y añádelo.",
      "Deja reposar 24 h."
    ],
    "nutricion": {
      "proteinas": 1.15,
      "grasas": 10.07,
      "grasas_saturadas": 1.54,
      "hidratos": 9.07,
      "azucares": 6.21,
      "calorias": 131.51
    },
    "nota": "",
    "imagen": "images/recipes/zanahorias-encurtidas.jpg"
  },
  "hummus-de-remolacha-con-crudites": {
    "id": "hummus-de-remolacha-con-crudites",
    "nombre": "Hummus de remolacha con crudités",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥣",
    "descripcion": "Hummus colorido.",
    "ingredientes": [
      "1 remolacha cocida y pelada (250 g)",
      "1 bote de garbanzos cocidos (200 g)",
      "1 cucharada de yogurt natural",
      "1 diente de ajo (5 g)",
      "Apio (40 g)",
      "Zumo de limón (10 ml)",
      "Pimentón (5 g)",
      "AOVE (40 ml)",
      "Comino tostado y molido (5 g)",
      "1 cucharada de tahini",
      "Sal",
      "Pimiento rojo (40 g)"
    ],
    "pasos": [
      "Bate la remolacha troceada con los garbanzos, yogur, tahini, ajo, AOVE, comino, sal y limón.",
      "Sirve con los crudités."
    ],
    "nutricion": {
      "proteinas": 14.77,
      "grasas": 29.93,
      "grasas_saturadas": 4.89,
      "hidratos": 33.38,
      "azucares": 10.7,
      "calorias": 461.97
    },
    "nota": "",
    "imagen": "images/recipes/hummus-de-remolacha-con-crudites.jpg"
  },
  "patatitas-dos-salsas": {
    "id": "patatitas-dos-salsas",
    "nombre": "Patatitas dos salsas",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥔",
    "descripcion": "Patatas al microondas con salsas de yogur.",
    "ingredientes": [
      {
        "nombre": "Patatas baby",
        "cantidad": "500g",
        "comprar": true
      },
      {
        "nombre": "Yogur natural (sin endulzar)",
        "cantidad": "125g",
        "comprar": true
      },
      {
        "nombre": "Ajo o ajo en polvo",
        "cantidad": "1 cucharilla",
        "comprar": false
      },
      {
        "nombre": "Perejil fresco",
        "cantidad": "1 puñado",
        "comprar": true
      },
      {
        "nombre": "Pimentón dulce y picante",
        "cantidad": "Media cda",
        "comprar": false
      }
    ],
    "pasos": [
      "Cocer patatas con piel 15min. Secar.",
      "Dorarlas en sartén caliente con poco de AOVE hasta que crujan por su piel.",
      "Salsa Yogur: Mezclar yogur con ajo granulado y perejil picado.",
      "Salsa brava: Caldentar un dedo de AOVE en sartén e infundir los dos pimentones al apartar.",
      "Servir las patatas rociadas de ambas mezclas."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/patatitas-dos-salsas.jpg"
  },
  "falso-sushi-de-pepino-yogur-y-queso-feta": {
    "id": "falso-sushi-de-pepino-yogur-y-queso-feta",
    "nombre": "Falso sushi de pepino, yogur y queso feta",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍣",
    "descripcion": "Aperitivo fresco en forma de sushi.",
    "ingredientes": [
      {
        "nombre": "Pepino largo y firme",
        "cantidad": "1 unidad",
        "comprar": true
      },
      {
        "nombre": "Yogur griego",
        "cantidad": "125g",
        "comprar": true
      },
      {
        "nombre": "Queso feta",
        "cantidad": "50g",
        "comprar": true
      },
      {
        "nombre": "Hojas de menta",
        "cantidad": "1 ramito",
        "comprar": true
      },
      {
        "nombre": "Nueces peladas",
        "cantidad": "20g",
        "comprar": false
      }
    ],
    "pasos": [
      "Cortar con mandolina largas y finas tiras de pepino (longitudinalmente). Secarlas en papel.",
      "Mezclar el yogur con feta machacado, menta picadita y la nuez triturada.",
      "Rellenar un extremo de la cinta de pepino y girar creando rollos como de maki.",
      "Servir inmediatamente en bandeja bien fríos."
    ],
    "nutricion": {
      "proteinas": 8.29,
      "grasas": 12.22,
      "grasas_saturadas": 5.51,
      "hidratos": 10.66,
      "azucares": 8.25,
      "calorias": 185.78
    },
    "nota": "",
    "imagen": "images/recipes/falso-sushi-de-pepino-yogur-y-queso-feta.jpg"
  },
  "gazpacho-de-sandia-y-feta": {
    "id": "gazpacho-de-sandia-y-feta",
    "nombre": "Gazpacho de sandía y feta",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥣",
    "descripcion": "Variante refrescante del gazpacho.",
    "ingredientes": [
      "3 tomates pera (250 g)",
      "1 trozo de sandía (250 g)",
      "1/2 cebolleta (40 g)",
      "1 diente de ajo (5 g)",
      "1/2 pimiento rojo (150 g)",
      "Queso feta (50 g)",
      "Hojas de albahaca escaldada",
      "AOVE",
      "Pimienta",
      "Sal",
      "Vinagre"
    ],
    "pasos": [
      "En una batidora pon tomates, sandía, cebolleta, pimiento y albahaca escaldada.",
      "Bate todo.",
      "Añade aceite, vinagre y sal.",
      "Sirve con trozos de sandía y queso feta."
    ],
    "nutricion": {
      "proteinas": 8.39,
      "grasas": 20.92,
      "grasas_saturadas": 6.05,
      "hidratos": 22.14,
      "azucares": 17.43,
      "calorias": 310.4
    },
    "nota": "",
    "imagen": "images/recipes/gazpacho-de-sandia-y-feta.jpg"
  },
  "carpaccio-de-remolacha-y-champinon": {
    "id": "carpaccio-de-remolacha-y-champinon",
    "nombre": "Carpaccio de remolacha y champiñón",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Carpaccio vegetal.",
    "ingredientes": [
      "1 remolacha cocida y pelada (250 g)",
      "10 champiñones (150 g)",
      "Rúcula (100 g)",
      "Queso manchego curado (30 g)",
      "8 o 10 avellanas (30 g)",
      "Vinagre",
      "AOVE",
      "Pimienta",
      "Sal"
    ],
    "pasos": [
      "Corta remolacha y champiñones en láminas finas.",
      "Dispón remolacha en un plato, champiñones encima.",
      "Pon rúcula y queso.",
      "Mezcla AOVE, vinagre, avellanas y sal y aliña."
    ],
    "nutricion": {
      "proteinas": 11.04,
      "grasas": 29.16,
      "grasas_saturadas": 6.31,
      "hidratos": 13.83,
      "azucares": 11.37,
      "calorias": 361.92
    },
    "nota": "",
    "imagen": "images/recipes/carpaccio-de-remolacha-y-champinon.jpg"
  },
  "dip-de-guisantes-con-hierbabuena-y-totopos-caseros": {
    "id": "dip-de-guisantes-con-hierbabuena-y-totopos-caseros",
    "nombre": "Dip de guisantes con hierbabuena y totopos caseros",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥣",
    "descripcion": "Crema verde para untar.",
    "ingredientes": [
      {
        "nombre": "Guisantes",
        "cantidad": "300g",
        "comprar": true
      },
      {
        "nombre": "Queso fresco batido p burgos",
        "cantidad": "250g",
        "comprar": true
      },
      {
        "nombre": "Pistachos repelados",
        "cantidad": "15g",
        "comprar": true
      },
      {
        "nombre": "Tortillas mejicanas redondas (trigo/maíz)",
        "cantidad": "2 unidades",
        "comprar": true
      },
      {
        "nombre": "Hojas menta/hierbabuena",
        "cantidad": "Pequeño manojo",
        "comprar": true
      }
    ],
    "pasos": [
      "Para los totopos caseros cortar a cuartos u octavos de pizza las tortitas, asare o tostar hasta endurecer en el centro.",
      "Escaldar guisantes 2 min para verdear fuerte y resfrescar bajo grifo.",
      "Batir la verdura, queso, pizquita de sal, medio ajo descabezado y la hierba.",
      "Bañar de pistachos por arriba y mojar el dorito en este fabuloso entrante."
    ],
    "nutricion": {
      "proteinas": 19.65,
      "grasas": 22.4,
      "grasas_saturadas": 9.73,
      "hidratos": 21.45,
      "azucares": 11.35,
      "calorias": 366
    },
    "nota": "",
    "imagen": "images/recipes/dip-de-guisantes-con-hierbabuena-y-totopos-caseros.jpg"
  },
  "escarola-con-granada": {
    "id": "escarola-con-granada",
    "nombre": "Escarola con granada",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 8,
    "icono": "🥗",
    "descripcion": "Ensalada agridulce.",
    "ingredientes": [
      {
        "nombre": "Escarola blanca lavada",
        "cantidad": "150g",
        "comprar": true
      },
      {
        "nombre": "Granada roja",
        "cantidad": "1 media",
        "comprar": true
      },
      {
        "nombre": "Avellanas naturales o nuez",
        "cantidad": "20g",
        "comprar": true
      },
      {
        "nombre": "Sal, vinagres y aceites.",
        "cantidad": "A capricho",
        "comprar": false
      }
    ],
    "pasos": [
      "Desgranar y recoger todos las pepitas carnosas de media granada en el plato.",
      "Si compras en bolsa ensalada de escarola, disponer la ración, echar dentro un buen puñado trozado de picadillo de frutos secano.",
      "El cítrico o toque de mostazas son perfectas a su vinagreta, lo mezclas al sentarte para que sus hojas rizadas nunca claudiquen ahogadas en salsa blanda y mustia."
    ],
    "nutricion": {
      "proteinas": 6.84,
      "grasas": 12.35,
      "grasas_saturadas": 1.7,
      "hidratos": 17.51,
      "azucares": 12.44,
      "calorias": 242.06
    },
    "nota": "",
    "imagen": "images/recipes/escarola-con-granada.jpg"
  },
  "tosta-de-aguacate-con-requeson": {
    "id": "tosta-de-aguacate-con-requeson",
    "nombre": "Tosta de aguacate con requesón",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥑",
    "descripcion": "Tosta rápida y nutritiva.",
    "ingredientes": [
      "1 aguacate (150 g)",
      "1 tarrina de requesón (125 g)",
      "Tomates cherry (80 g)",
      "2 rebanadas de pan integral (90 g)",
      "AOVE",
      "Sal"
    ],
    "pasos": [
      "Tuesta el pan.",
      "Extiende el requesón.",
      "Coloca aguacate y tomate cortados.",
      "Añade sal y AOVE."
    ],
    "nutricion": {
      "proteinas": 11.52,
      "grasas": 20.37,
      "grasas_saturadas": 7.79,
      "hidratos": 30.3,
      "azucares": 3.75,
      "calorias": 350.61
    },
    "nota": "",
    "imagen": "images/recipes/tosta-de-aguacate-con-requeson.jpg"
  },
  "barquitas-de-berenjena-con-yogur-y-manzana": {
    "id": "barquitas-de-berenjena-con-yogur-y-manzana",
    "nombre": "Barquitas de berenjena con yogur y manzana",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍆",
    "descripcion": "Berenjenas rellenas frías.",
    "ingredientes": [
      {
        "nombre": "Berenjenas (medianas de asar rectilíneas)",
        "cantidad": "1 unidad",
        "comprar": true
      },
      {
        "nombre": "Manzana dulce ácida",
        "cantidad": "1 unidad",
        "comprar": true
      },
      {
        "nombre": "Yogur natural no azucarado o de coco",
        "cantidad": "125g",
        "comprar": true
      },
      {
        "nombre": "Especias (polvo madrás de curry)",
        "cantidad": "1 cucharón",
        "comprar": false
      },
      {
        "nombre": "Puñado nuez",
        "cantidad": "30 gr",
        "comprar": false
      }
    ],
    "pasos": [
      "Divídase por medio. Raya o acuchilla de trama cruz la carnosidad y mete asadora temperatura 200 gradiños hasta ablandar (min. 25 min).",
      "Pela un manzano de temporada crudo como fuji, rompe micro en cubos de ajedréz enanito muy fríos.",
      "Al sacar tu vegetal asadito recoge raspando la pulposidad al bol. Júntalo con manzanita, el polvito amarillísimo de curry y blanco del yofugo. Remover todo.",
      "Sirvete su re-mezcla rehundida entre sus pellejitos, adorna arriba de lascas nuecería y disfrútalo"
    ],
    "nutricion": {
      "proteinas": 6.02,
      "grasas": 7.24,
      "grasas_saturadas": 1.84,
      "hidratos": 25.66,
      "azucares": 18.07,
      "calorias": 191.88
    },
    "nota": "",
    "imagen": "images/recipes/barquitas-de-berenjena-con-yogur-y-manzana.jpg"
  },
  "escabeche-de-sardinas": {
    "id": "escabeche-de-sardinas",
    "nombre": "Escabeche de sardinas",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🐟",
    "descripcion": "Sardinas en conserva casera.",
    "ingredientes": [
      {
        "nombre": "Sardinetas plata o boquerón",
        "cantidad": "250 gramos limpios",
        "comprar": true
      },
      {
        "nombre": "Zanahoria / Cebollino / lauros y clavo/ajo machacado",
        "cantidad": "Fondo potásico clásico",
        "comprar": false
      },
      {
        "nombre": "Vinabres",
        "cantidad": "Vaso vinagre blanco / y pizco pimenton",
        "comprar": false
      },
      {
        "nombre": "Aceite bueno.",
        "cantidad": "50cc en la olla",
        "comprar": false
      }
    ],
    "pasos": [
      "Asume que descamar y eviscerar con dos manos el pez sin malobrar la forma, pasar por agüilla a limpiar.",
      "Hacer sudar el lecho o sofrito base hortalizo al punto (pocilgar), y de pronto retirar lumbre, añadir pimiento molido sin quemar color, y seguido tu vinagre agrio tapando para el vaporazo de ebulle.",
      "Sumar agua pelín y hiervelo por 10 o dobles minutitos la base salsante.",
      "Deposita pezcau fresco allí apaga flama, deja asentar enfríe hermetico. Plato majestuoso y barato."
    ],
    "nutricion": {
      "proteinas": 30.59,
      "grasas": 44.85,
      "grasas_saturadas": 8.31,
      "hidratos": 4.08,
      "azucares": 0.9,
      "calorias": 542.33
    },
    "nota": "",
    "imagen": "images/recipes/escabeche-de-sardinas.jpg"
  },
  "crema-de-calabaza-y-queso-azul": {
    "id": "crema-de-calabaza-y-queso-azul",
    "nombre": "Crema de calabaza y queso azul",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥣",
    "descripcion": "Crema untuosa.",
    "ingredientes": [
      {
        "nombre": "Calabaza cacahueteras pelada",
        "cantidad": "Ochocientos gr",
        "comprar": true
      },
      {
        "nombre": "Cebolla",
        "cantidad": "1 Ud Gigante",
        "comprar": false
      },
      {
        "nombre": "Fondo vegetal caldo",
        "cantidad": "1 Brick literario",
        "comprar": true
      },
      {
        "nombre": "Quesito Azul intenso o roquefórte",
        "cantidad": "40gramillo",
        "comprar": true
      }
    ],
    "pasos": [
      "Pochado violento en granolla y aceitaron con los cebaques grandes asomándolos transparentosos.",
      "Corte calabacíl y lo rehagas a fuego par. Salseas / inunda en caldeos su cocimiento lento de un cuarto 20 mins.",
      "Rompe lo deshecho asuporado pasándole batidos integrando caliente unos porciotos la mirtad de queso podrit azulíto, licuándolo al tacto deséau.",
      "Sírvalo calentíto esparciéndolas otras mitades al natural grumosos de quesazo para rematillo fuerte o picatosta crocanti."
    ],
    "nutricion": {
      "proteinas": 14.04,
      "grasas": 29.9,
      "grasas_saturadas": 10.25,
      "hidratos": 12.62,
      "azucares": 5.46,
      "calorias": 375.74
    },
    "nota": "",
    "imagen": "images/recipes/crema-de-calabaza-y-queso-azul.jpg"
  },
  "alubia-confetti": {
    "id": "alubia-confetti",
    "nombre": "Alubia confetti",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥗",
    "descripcion": "Ensalada rápida de legumbres y arroz.",
    "ingredientes": [
      {
        "nombre": "Alubia de lata cocida suave mantecosa",
        "cantidad": "1Bota 400",
        "comprar": true
      },
      {
        "nombre": "Pimenteros varioscuba verde amarillos rojazos",
        "cantidad": "1 enterito por cuartas",
        "comprar": true
      },
      {
        "nombre": "Aguacate duro firme al taglio",
        "cantidad": "1 medio",
        "comprar": true
      },
      {
        "nombre": "Mijo gordo o grano maíz lata",
        "cantidad": "50 gs y de aliño al aceto",
        "comprar": true
      }
    ],
    "pasos": [
      "Exige lavar a saco la aluviación hasta irse la gomosidad bote.",
      "Picazos y re cuadeados miniatura todo al morro del pimiento para confundirl la vista entre legumbriña en un Confetti pergeñado.",
      "Baño aceite, ácidos vinagretos o limeños de frescor al centro mesillero para pinche de festivo diurno entre platos proteínicos a mogollon!"
    ],
    "nutricion": {
      "proteinas": 18.15,
      "grasas": 10.23,
      "grasas_saturadas": 1.76,
      "hidratos": 59.82,
      "azucares": 7.6,
      "calorias": 403.95
    },
    "nota": "",
    "imagen": "images/recipes/alubia-confetti.jpg"
  },
  "salmon-expres-al-microondas": {
    "id": "salmon-expres-al-microondas",
    "nombre": "Salmón exprés al microondas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🐟",
    "descripcion": "Pescado rápido con arroz.",
    "ingredientes": [
      "1 lomo de salmón en 2 porciones (400 g)",
      "1 vasito de arroz basmati (125 g)",
      "1/2 cebolleta (50 g)",
      "1 pepino (300 g)",
      "Jengibre rallado",
      "1 cucharada de soja",
      "1 cucharada de vinagre",
      "Semillas de sésamo",
      "Eneldo seco",
      "AOVE",
      "Sal"
    ],
    "pasos": [
      "Corta el pepino, espolvorea con sal.",
      "Cocina el salmón al microondas.",
      "Sirve con arroz y ensalada de pepino."
    ],
    "nutricion": {
      "proteinas": 44.9,
      "grasas": 31.69,
      "grasas_saturadas": 5.36,
      "hidratos": 24.25,
      "azucares": 3.73,
      "calorias": 561.81
    },
    "nota": "",
    "imagen": "images/recipes/salomon-expres-al-microondas.jpg"
  },
  "tallarines-de-calabacin-y-zanahoria-con-vinagreta-de-nueces": {
    "id": "tallarines-de-calabacin-y-zanahoria-con-vinagreta-de-nueces",
    "nombre": "Tallarines de calabacín y zanahoria con vinagreta de nueces",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍝",
    "descripcion": "Falsos espaguetis de verdura.",
    "ingredientes": [
      "2 zanahorias (200 g)",
      "1 calabacín (200 g)",
      "1 diente de ajo (5 g)",
      "2 o 3 nueces (25 g)",
      "1/2 cucharada de sésamo (12 g)",
      "Mostaza de Dijon (3 g)",
      "Vinagre",
      "AOVE (20 ml)",
      "Sal"
    ],
    "pasos": [
      "Forma tallarines con espiralizador.",
      "Prepara vinagreta con aceite, vinagre y mostaza.",
      "Saltea las verduras a fuego fuerte con ajo y aceite.",
      "Pica las nueces. Mezcla todo en un bol y aliña."
    ],
    "nutricion": {
      "proteinas": 4.76,
      "grasas": 17.78,
      "grasas_saturadas": 2.41,
      "hidratos": 10.77,
      "azucares": 6.94,
      "calorias": 222.14
    },
    "nota": "",
    "imagen": "images/recipes/tallarines-de-calabacin-y-zanahoria-con-vinagreta-de-nueces.jpg"
  },
  "brocheta-de-pollo-especiado": {
    "id": "brocheta-de-pollo-especiado",
    "nombre": "Brocheta de pollo especiado",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍢",
    "descripcion": "Pinchos a la plancha.",
    "ingredientes": [
      "1/2 pechuga de pollo (300 g)",
      "1/2 cebolla (40 g)",
      "Tomates cherry (60 g)",
      "1 nectarina (150 g)",
      "1 pimiento verde (100 g)",
      "AOVE (10 ml)",
      "Zumo de limón",
      "Pimienta molida",
      "Pimentón (8 g)",
      "Rúcula (100 g)",
      "2 o 3 nueces (25 g)",
      "Sal"
    ],
    "pasos": [
      "Corta el pollo y marina con cebolla, pimentón, limón y AOVE.",
      "Lava y corta pimiento y nectarina.",
      "Ensarta pollo, fruta y verduras en brochetas.",
      "Cocina a la plancha y sirve con ensalada de rúcula."
    ],
    "nutricion": {
      "proteinas": 38.69,
      "grasas": 12.44,
      "grasas_saturadas": 2.15,
      "hidratos": 12.34,
      "azucares": 9.62,
      "calorias": 316.08
    },
    "nota": "",
    "imagen": "images/recipes/brocheta-de-pollo-especiado.jpg"
  },
  "miniburger-de-alubias-y-atun": {
    "id": "miniburger-de-alubias-y-atun",
    "nombre": "Miniburger de alubias y atún",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍔",
    "descripcion": "Hamburguesas de pescado y legumbre.",
    "ingredientes": [
      "1 bote pequeño de alubias blancas (240 g)",
      "1 lata de atún (185 g)",
      "1 huevo (60 g)",
      "Pan rallado (30 g)",
      "Lechuga/espinacas (200 g)",
      "Mostaza de Dijon",
      "AOVE (5 ml)",
      "Sal",
      "1 limón",
      "Tomates cherry",
      "Orégano seco"
    ],
    "pasos": [
      "Escurre las alubias y aplasta.",
      "Aliña con mostaza, orégano, limón y sal.",
      "Incorpora atún escurrido, huevo y pan rallado.",
      "Forma miniburguers y marca a la plancha.",
      "Sirve con ensalada."
    ],
    "nutricion": {
      "proteinas": 38.61,
      "grasas": 16.62,
      "grasas_saturadas": 2.9,
      "hidratos": 24.59,
      "azucares": 3.53,
      "calorias": 402.38
    },
    "nota": "",
    "imagen": "images/recipes/miniburger-de-alubias-y-at-n.png"
  },
  "poke-de-pollo-al-estilo-harvard": {
    "id": "poke-de-pollo-al-estilo-harvard",
    "nombre": "Poke de pollo al estilo Harvard",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Plato combinado nutritivo.",
    "ingredientes": [
      "1/2 pechuga de pollo (300 g)",
      "1 vasito de arroz integral (125 g)",
      "1 melocotón (150 g)",
      "1 trozo de melón (100 g)",
      "Canónigos (80 g)",
      "Tomate cherry (100 g)",
      "Pepino (100 g)",
      "10 anacardos (8 g)",
      "Zumo de limón",
      "AOVE",
      "Sal"
    ],
    "pasos": [
      "Corta la pechuga y saltea. Reserva.",
      "Pela y lamina melocotón, melón, tomate y pepino.",
      "Cuece el arroz 1 min en microondas.",
      "Monta el poke y aliña."
    ],
    "nutricion": {
      "proteinas": 40.27,
      "grasas": 14.96,
      "grasas_saturadas": 2.65,
      "hidratos": 38.76,
      "azucares": 14.38,
      "calorias": 450.76
    },
    "nota": "",
    "imagen": "images/recipes/poke-de-pollo-al-estilo-harvard.jpg"
  },
  "rainbow-wrap-con-salsa-de-anchoas": {
    "id": "rainbow-wrap-con-salsa-de-anchoas",
    "nombre": "Rainbow wrap con salsa de anchoas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🌯",
    "descripcion": "Wrap vegetal con salsa sabrosa.",
    "ingredientes": [
      "2 tortillas integrales (75 g)",
      "Queso fresco (60 g)",
      "1/2 cebolla morada (40 g)",
      "Hojas de espinacas (150 g)",
      "1 zanahoria (80 g)",
      "1/2 pimiento rojo (150 g)",
      "2 huevos (120 g)",
      "4 filetes de anchoa",
      "1/2 diente de ajo (3 g)",
      "Zumo de limón",
      "AOVE"
    ],
    "pasos": [
      "Cuece los huevos 5 min. Córtalos y haz salsa batiendo con anchoas, ajo, AOVE y limón.",
      "Corta verduras en tiras.",
      "Calienta la tortilla, unta salsa, pon verduras y queso, y enrolla."
    ],
    "nutricion": {
      "proteinas": 15.53,
      "grasas": 17.41,
      "grasas_saturadas": 3.98,
      "hidratos": 13.84,
      "azucares": 8.7,
      "calorias": 274.17
    },
    "nota": "",
    "imagen": "images/recipes/rainbow-wrap-con-salsa-de-anchoas.jpg"
  },
  "mini-green-pizza": {
    "id": "mini-green-pizza",
    "nombre": "Mini green pizza",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍕",
    "descripcion": "Pizza sobre base de pita.",
    "ingredientes": [
      "2 pitas integrales (180 g)",
      "Brócoli (150 g)",
      "Mozzarella fresca (100 g)",
      "Rúcula (100 g)",
      "Nueces peladas (25 g)",
      "Queso parmesano (30 g)",
      "1/2 ajo (3 g)",
      "AOVE",
      "Pimienta"
    ],
    "pasos": [
      "Corta pitas por la mitad. Tuesta.",
      "Cocina brócoli al microondas 4 min.",
      "Tritura rúcula, nueces, ajo, parmesano y AOVE para pesto.",
      "Unta pesto en pita, pon mozzarella y brócoli. Gratina 3 min."
    ],
    "nutricion": {
      "proteinas": 17.48,
      "grasas": 35.16,
      "grasas_saturadas": 13.31,
      "hidratos": 5.53,
      "azucares": 1.88,
      "calorias": 408.48
    },
    "nota": "",
    "imagen": "images/recipes/mini-green-pizza.jpg"
  },
  "lubina-con-patatas-y-cama-de-verduras": {
    "id": "lubina-con-patatas-y-cama-de-verduras",
    "nombre": "Lubina con patatas y cama de verduras",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🐟",
    "descripcion": "Pescado cocinado al microondas.",
    "ingredientes": [
      "2 lomos de lubina (400 g)",
      "2 patatas (200 g)",
      "1/2 cebolla (50 g)",
      "1 tomate (80 g)",
      "Pimientos de colores (150 g)",
      "AOVE (10 ml)"
    ],
    "pasos": [
      "Cuece patata al micro 6 min. Corta.",
      "Corta cebolla y cocina al micro 5 min.",
      "Añade tomate y pimiento, cocina 5 min.",
      "Pon pescado sobre verduras y cocina 5 min al microondas."
    ],
    "nutricion": {
      "proteinas": 45.94,
      "grasas": 13.9,
      "grasas_saturadas": 2.94,
      "hidratos": 20,
      "azucares": 6.42,
      "calorias": 388.86
    },
    "nota": "",
    "imagen": "images/recipes/lubina-con-patatas-y-cama-de-verduras.jpg"
  },
  "ensalada-de-frutos-rojos-setas-y-cuscus": {
    "id": "ensalada-de-frutos-rojos-setas-y-cuscus",
    "nombre": "Ensalada de frutos rojos, setas y cuscús",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Ensalada agridulce.",
    "ingredientes": [
      "Queso rulo de cabra (100 g)",
      "Brotes de lechuga (150 g)",
      "Cuscús integral (50 g)",
      "Setas ostra (200 g)",
      "Frutos rojos (200 g)",
      "Cebollino",
      "AOVE",
      "1/2 diente de ajo (3 g)",
      "Sal",
      "Vinagre"
    ],
    "pasos": [
      "Hidrata el cuscús.",
      "Saltea setas con ajo y AOVE.",
      "Monta ensalada con rúcula, frutos rojos y queso. Aliña."
    ],
    "nutricion": {
      "proteinas": 16.54,
      "grasas": 21.82,
      "grasas_saturadas": 8.53,
      "hidratos": 31.27,
      "azucares": 10.75,
      "calorias": 387.62
    },
    "nota": "",
    "imagen": "images/recipes/ensalada-de-frutos-rojos-setas-y-cuscus.jpg"
  },
  "espaguetis-del-estudiante": {
    "id": "espaguetis-del-estudiante",
    "nombre": "Espaguetis del estudiante",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍝",
    "descripcion": "Pasta rápida con sardinas.",
    "ingredientes": [
      "Espaguetis integrales (160 g)",
      "1 lata tomate triturado (290 g)",
      "1 lata sardinas (88 g)",
      "Aceitunas negras",
      "2 dientes de ajo",
      "Orégano",
      "AOVE (10 g)"
    ],
    "pasos": [
      "Cuece la pasta.",
      "Calienta AOVE y ajo al micro. Añade tomate y orégano y cocina 10 min.",
      "Mezcla pasta, salsa, sardinas y aceitunas."
    ],
    "nutricion": {
      "proteinas": 23.19,
      "grasas": 19.5,
      "grasas_saturadas": 3.62,
      "hidratos": 61.84,
      "azucares": 4.59,
      "calorias": 515.62
    },
    "nota": "",
    "imagen": "images/recipes/espaguetis-del-estudiante.jpg"
  },
  "tortilla-de-patata-y-calabacin": {
    "id": "tortilla-de-patata-y-calabacin",
    "nombre": "Tortilla de patata y calabacín al microondas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍳",
    "descripcion": "Tortilla hecha al microondas y sartén.",
    "ingredientes": [
      "2 patatas (300 g)",
      "1/2 cebolla (40 g)",
      "1 calabacín (150 g)",
      "4 huevos (300 g)",
      "AOVE (22 ml)",
      "Sal"
    ],
    "pasos": [
      "Cocina cebolla 5 min al microondas.",
      "Añade patata y calabacín, cocina.",
      "Bate huevos, mezcla y cuaja en sartén."
    ],
    "nutricion": {
      "proteinas": 11.58,
      "grasas": 26.9,
      "grasas_saturadas": 4.51,
      "hidratos": 10.47,
      "azucares": 1.35,
      "calorias": 229.34
    },
    "nota": "",
    "imagen": "images/recipes/tortilla-de-patata-y-calabacin.jpg"
  },
  "pitas-con-huevo-espinacas-y-queso": {
    "id": "pitas-con-huevo-espinacas-y-queso",
    "nombre": "Pitas con huevo, espinacas y queso",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥙",
    "descripcion": "Bocadillo caliente relleno.",
    "ingredientes": [
      "2 pitas (180 g)",
      "3 huevos (180 g)",
      "Espinacas (150 g)",
      "4 tomates secos (15 g)",
      "Rulo cabra (180 g)",
      "AOVE",
      "Pimienta",
      "Sal"
    ],
    "pasos": [
      "Hidrata los tomates 15 min.",
      "Haz un revuelto con los huevos.",
      "Calienta pitas y rellena con espinacas, queso, tomate y huevos."
    ],
    "nutricion": {
      "proteinas": 17.33,
      "grasas": 23.48,
      "grasas_saturadas": 12.9,
      "hidratos": 5.51,
      "azucares": 3.99,
      "calorias": 302.68
    },
    "nota": "",
    "imagen": "images/recipes/pitas-con-huevo-espinacas-y-queso.jpg"
  },
  "alcachofas-con-langostinos": {
    "id": "alcachofas-con-langostinos",
    "nombre": "Alcachofas con langostinos",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🦐",
    "descripcion": "Salteado rápido.",
    "ingredientes": [
      "Langostinos congelados (250 g)",
      "Corazones alcachofa (250 g)",
      "1 cebolla (80 g)",
      "1 ajo (8 g)",
      "Sal",
      "AOVE (10 ml)"
    ],
    "pasos": [
      "Descongela langostinos.",
      "Cocina alcachofas al microondas 5 min.",
      "Sofríe cebolla y ajo, añade alcachofas y langostinos. Saltea."
    ],
    "nutricion": {
      "proteinas": 31.5,
      "grasas": 7.11,
      "grasas_saturadas": 1.12,
      "hidratos": 13.15,
      "azucares": 3.9,
      "calorias": 242.59
    },
    "nota": "",
    "imagen": "images/recipes/alcachofas-con-langostinos.jpg"
  },
  "lentejas-con-arroz-y-curcuma": {
    "id": "lentejas-con-arroz-y-curcuma",
    "nombre": "Lentejas con arroz y cúrcuma",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍛",
    "descripcion": "Crema de lentejas con arroz.",
    "ingredientes": [
      "1 bote lentejas cocidas (400 g)",
      "1 cebolla (80 g)",
      "1 zanahoria (100 g)",
      "1 tomate (80 g)",
      "1 vasito arroz integral (125 g)",
      "AOVE",
      "Sal",
      "Cúrcuma"
    ],
    "pasos": [
      "Sofríe cebolla, zanahoria y tomate.",
      "Añade lentejas y agua. Hierve 5 min.",
      "Tritura con cúrcuma.",
      "Sirve con arroz microondas."
    ],
    "nutricion": {
      "proteinas": 24.67,
      "grasas": 18.24,
      "grasas_saturadas": 3.07,
      "hidratos": 82.54,
      "azucares": 10.26,
      "calorias": 593
    },
    "nota": "",
    "imagen": "images/recipes/lentejas-con-arroz-y-curcuma.jpg"
  },
  "garbanzos-con-pisto-y-ras-el-hanout": {
    "id": "garbanzos-con-pisto-y-ras-el-hanout",
    "nombre": "Garbanzos con pisto y ras el hanout",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍛",
    "descripcion": "Guiso express.",
    "ingredientes": [
      "1 bote garbanzos (400 g)",
      "1 bote pisto (400 g)",
      "1 cucharada ras el hanout",
      "Cilantro/hierbabuena"
    ],
    "pasos": [
      "Añade garbanzos escurridos y pisto a una cazuela.",
      "Añade ras el hanout. Cuece unos minutos.",
      "Sirve con cilantro."
    ],
    "nutricion": {
      "proteinas": 18.68,
      "grasas": 6.19,
      "grasas_saturadas": 0.92,
      "hidratos": 41.88,
      "azucares": 6.38,
      "calorias": 297.95
    },
    "nota": "",
    "imagen": "images/recipes/garbanzos-con-pisto-y-ras-el-hanout.jpg"
  },
  "escalivada-con-alma-de-germinados-y-bacalao": {
    "id": "escalivada-con-alma-de-germinados-y-bacalao",
    "nombre": "Escalivada con alma de germinados y bacalao",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Plato frío.",
    "ingredientes": [
      "1 bote escalivada (300 g)",
      "Bacalao desmigado (250 g)",
      "1 cebolla (80 g)",
      "2 huevos (150 g)",
      "Germinados (15 g)",
      "AOVE",
      "Vinagre",
      "Sal"
    ],
    "pasos": [
      "Cuece huevos 10 min. Ralla.",
      "Escurre verduras y monta el plato con bacalao.",
      "Pon cebolla, huevo y germinados. Aliña."
    ],
    "nutricion": {
      "proteinas": 61.67,
      "grasas": 12.54,
      "grasas_saturadas": 2.04,
      "hidratos": 9.08,
      "azucares": 7.33,
      "calorias": 395.86
    },
    "nota": "",
    "imagen": "images/recipes/escalivada-con-alma-de-germinados-y-bacalao.jpg"
  },
  "copazo-de-ensaladilla": {
    "id": "copazo-de-ensaladilla",
    "nombre": "Copazo de ensaladilla",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥗",
    "descripcion": "Ensaladilla express.",
    "ingredientes": [
      "2 patatas (300 g)",
      "2 huevos (100 g)",
      "1 zanahoria (100 g)",
      "1 lata atún (185 g)",
      "AOVE (20 ml)",
      "Zumo limón",
      "Sal"
    ],
    "pasos": [
      "Cuece patatas y zanahoria al microondas.",
      "Cuece huevos 10 min.",
      "Mezcla patata, zanahoria, atún.",
      "Tritura huevos con AOVE y limón para salsa. Mezcla todo."
    ],
    "nutricion": {
      "proteinas": 10.26,
      "grasas": 10.36,
      "grasas_saturadas": 1.6,
      "hidratos": 28.25,
      "azucares": 4.25,
      "calorias": 247.28
    },
    "nota": "",
    "imagen": "images/recipes/copazo-de-ensaladilla.jpg"
  },
  "tortilla-de-setas-y-espinacas": {
    "id": "tortilla-de-setas-y-espinacas",
    "nombre": "Tortilla de setas y espinacas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍳",
    "descripcion": "Tortilla rellena.",
    "ingredientes": [
      "Espinacas (250 g)",
      "Setas (250 g)",
      "4 huevos (300 g)",
      "1 ajo (8 g)",
      "AOVE",
      "Sal"
    ],
    "pasos": [
      "Saltea espinacas.",
      "Saltea setas con ajo.",
      "Bate huevos, mezcla y cuaja en sartén."
    ],
    "nutricion": {
      "proteinas": 16.09,
      "grasas": 16.09,
      "grasas_saturadas": 2.45,
      "hidratos": 9.26,
      "azucares": 3.62,
      "calorias": 210.73
    },
    "nota": "",
    "imagen": "images/recipes/tortilla-de-setas-y-espinacas.jpg"
  },
  "olleta-de-arroz-integral": {
    "id": "olleta-de-arroz-integral",
    "nombre": "Olleta de arroz integral",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍲",
    "descripcion": "Guiso de arroz y verduras.",
    "ingredientes": [
      "1/2 vaso arroz (60 g)",
      "Acelgas (40 g)",
      "Alubias blancas (60 g)",
      "Judías verdes (100 g)",
      "Nabo (100 g)",
      "1 patata (80 g)",
      "Agua (500 ml)",
      "Azafrán",
      "Comino",
      "Sal",
      "AOVE"
    ],
    "pasos": [
      "Cuece patata con agua, sal, comino y azafrán.",
      "Añade arroz (precocido), acelgas, nabos y judías.",
      "Cuece 15 min. Añade alubias.",
      "Apaga, añade AOVE y sirve."
    ],
    "nutricion": {
      "proteinas": 10.5,
      "grasas": 22,
      "grasas_saturadas": 3.36,
      "hidratos": 46.2,
      "azucares": 4.01,
      "calorias": 424.8
    },
    "nota": "",
    "imagen": "images/recipes/olleta-de-arroz-integral.jpg"
  },
  "ramen-casero": {
    "id": "ramen-casero",
    "nombre": "Ramen casero",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍜",
    "descripcion": "Sopa oriental.",
    "ingredientes": [
      "Caldo vegetal (1 l)",
      "Fideos arroz (50 g)",
      "2 huevos (150 g)",
      "Zanahoria (80 g)",
      "Brotes soja (40 g)",
      "Cebolleta (20 g)",
      "Sésamo (10 g)",
      "Alga nori"
    ],
    "pasos": [
      "Cuece huevos 6 min.",
      "Cuece fideos.",
      "Calienta caldo y vierte sobre fideos.",
      "Coloca huevos, verduras, sésamo y alga."
    ],
    "nutricion": {
      "proteinas": 18.42,
      "grasas": 12.87,
      "grasas_saturadas": 3.11,
      "hidratos": 30.41,
      "azucares": 5.45,
      "calorias": 311.15
    },
    "nota": "",
    "imagen": "images/recipes/ramen-casero.jpg"
  },
  "helado-casero-de-yogur-chocolate-y-platano": {
    "id": "helado-casero-de-yogur-chocolate-y-platano",
    "nombre": "Helado casero de yogur, chocolate y plátano",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍦",
    "descripcion": "Polos helados.",
    "ingredientes": [
      "1 yogur (125 g)",
      "1 plátano (80 g)",
      "1 cucharada cacao (15 g)"
    ],
    "pasos": [
      "Machaca plátano.",
      "Mezcla con yogur y cacao.",
      "Congela en moldes."
    ],
    "nutricion": {
      "proteinas": 4.07,
      "grasas": 4.07,
      "grasas_saturadas": 2.66,
      "hidratos": 17.9,
      "azucares": 5.67,
      "calorias": 121.59
    },
    "nota": "",
    "imagen": "images/recipes/helado-casero-de-yogur-chocolate-y-platano.jpg"
  },
  "batido-de-platano-y-arandanos-con-avena": {
    "id": "batido-de-platano-y-arandanos-con-avena",
    "nombre": "Batido de plátano y arándanos con avena",
    "tipo": "bebida",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥤",
    "descripcion": "Batido completo.",
    "ingredientes": [
      "Arándanos (100 g)",
      "1/2 plátano (40 g)",
      "Leche/bebida (250 ml)",
      "Avena molida (60 g)",
      "Hielo",
      "Canela"
    ],
    "pasos": [
      "Bate plátano, arándanos, avena y leche.",
      "Añade hielo y canela."
    ],
    "nutricion": {
      "proteinas": 6.8,
      "grasas": 3.01,
      "grasas_saturadas": 1.5,
      "hidratos": 15.08,
      "azucares": 4.43,
      "calorias": 232.6
    },
    "nota": "",
    "imagen": "images/recipes/batido-de-platano-y-arandanos-con-avena.jpg"
  },
  "pudding-de-chia-con-mango": {
    "id": "pudding-de-chia-con-mango",
    "nombre": "Pudding de chía con mango",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍨",
    "descripcion": "Postre de semillas.",
    "ingredientes": [
      "1/2 mango (300 g)",
      "Chía (50 g)",
      "Leche coco (400 ml)"
    ],
    "pasos": [
      "Mezcla chía y leche y deja hidratar.",
      "Tritura una parte del mango.",
      "Monta capas de chía, mango triturado y dados."
    ],
    "nutricion": {
      "proteinas": 8.61,
      "grasas": 44.47,
      "grasas_saturadas": 33.38,
      "hidratos": 30.18,
      "azucares": 23.55,
      "calorias": 277.76
    },
    "nota": "",
    "imagen": "images/recipes/pudding-de-chia-con-mango.jpg"
  },
  "pina-a-la-plancha-con-cardamomo": {
    "id": "pina-a-la-plancha-con-cardamomo",
    "nombre": "Piña a la plancha con cardamomo",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🍍",
    "descripcion": "Fruta caliente asada.",
    "ingredientes": [
      "1/2 piña (500 g)",
      "1 vaina cardamomo",
      "Piel lima",
      "Hierbabuena"
    ],
    "pasos": [
      "Corta la piña en cuñas.",
      "Asa las cuñas en sartén.",
      "Muele el cardamomo.",
      "Sirve con cardamomo, lima y hierbabuena."
    ],
    "nutricion": {
      "proteinas": 0.65,
      "grasas": 0.36,
      "grasas_saturadas": 0.01,
      "hidratos": 31.46,
      "azucares": 26.43,
      "calorias": 131.68
    },
    "nota": "",
    "imagen": "images/recipes/pina-a-la-plancha-con-cardamomo.jpg"
  },
  "gajos-de-naranja-con-menta-y-chocolate": {
    "id": "gajos-de-naranja-con-menta-y-chocolate",
    "nombre": "Gajos de naranja con menta y chocolate",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍫",
    "descripcion": "Fruta bañada en chocolate.",
    "ingredientes": [
      "2 naranjas (300 g)",
      "Chocolate negro (100 g)",
      "Hojas de menta"
    ],
    "pasos": [
      "Pela y separa los gajos.",
      "Funde chocolate al microondas.",
      "Sumerge gajos y deja enfriar en nevera."
    ],
    "nutricion": {
      "proteinas": 6.13,
      "grasas": 20.53,
      "grasas_saturadas": 13.01,
      "hidratos": 27.2,
      "azucares": 25.06,
      "calorias": 318.09
    },
    "nota": "",
    "imagen": "images/recipes/gajos-de-naranja-con-menta-y-chocolate.jpg"
  },
  "lentejas-con-verduras-o-viudas": {
    "id": "lentejas-con-verduras-o-viudas",
    "nombre": "Lentejas con verduras o viudas",
    "tipo": "plato principal",
    "porciones": 6,
    "tiempo": 80,
    "icono": "🍲",
    "descripcion": "Lentejas caseras estofadas sin grasa.",
    "ingredientes": [
      "Lenteja pardina",
      "2 cebollas",
      "2 dientes de ajo",
      "1 hoja de laurel",
      "Pimentón de la Vera dulce",
      "2 cdas. AOVE",
      "1 puerro",
      "Agua",
      "1 pimiento verde",
      "2 tomates",
      "1/2 pimiento rojo",
      "Sal y pimienta"
    ],
    "pasos": [
      "Cocinar el guiso con todas las verduras y las lentejas pardinas."
    ],
    "nutricion": {
      "calorias": 281
    },
    "nota": "",
    "imagen": "images/recipes/lentejas-con-verduras-o-viudas.jpg"
  },
  "cazuela-de-garbanzos-con-chorizo": {
    "id": "cazuela-de-garbanzos-con-chorizo",
    "nombre": "Cazuela de garbanzos con chorizo",
    "tipo": "plato principal",
    "porciones": 6,
    "tiempo": 30,
    "icono": "🍲",
    "descripcion": "Garbanzos caseros con chorizo.",
    "ingredientes": [
      "2 cebollas",
      "2 dientes de ajo",
      "2 hojas de laurel",
      "3 zanahorias",
      "1/2 k de garbanzos",
      "Chorizo",
      "AOVE"
    ],
    "pasos": [
      "Cocinar los garbanzos con las verduras y el chorizo."
    ],
    "nutricion": {
      "calorias": 305
    },
    "nota": "",
    "imagen": "images/recipes/cazuela-de-garbanzos-con-chorizo.jpg"
  },
  "crema-de-calabacin-facil": {
    "id": "crema-de-calabacin-facil",
    "nombre": "Crema de calabacín fácil",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 40,
    "icono": "🥣",
    "descripcion": "Crema suave y ligera para cenar.",
    "ingredientes": [
      "Calabacín",
      "Cebolla",
      "Patata",
      "Nata o quesitos (opcional)"
    ],
    "pasos": [
      "Pochar verduras y cocerlas.",
      "Triturar para hacer crema."
    ],
    "nutricion": {
      "calorias": 230
    },
    "nota": "",
    "imagen": "images/recipes/crema-de-calabacin-facil.jpg"
  },
  "patatas-viudas": {
    "id": "patatas-viudas",
    "nombre": "Patatas viudas",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 40,
    "icono": "🥔",
    "descripcion": "Guiso de patata tradicional.",
    "ingredientes": [
      "1 kg patatas",
      "2 cebollas",
      "2 dientes ajo",
      "1 cdita pimentón de la Vera",
      "Azafrán",
      "1 l. caldo vegetal o pollo"
    ],
    "pasos": [
      "Guisar las patatas en el caldo con el sofrito de verduras y pimentón."
    ],
    "nutricion": {
      "calorias": 285
    },
    "nota": "",
    "imagen": "images/recipes/patatas-viudas.jpg"
  },
  "sopa-de-pollo": {
    "id": "sopa-de-pollo",
    "nombre": "Sopa de pollo",
    "tipo": "plato principal",
    "porciones": 6,
    "tiempo": 50,
    "icono": "🥣",
    "descripcion": "Sopa casera paso a paso.",
    "ingredientes": [
      "Pollo",
      "Apio",
      "Zanahorias",
      "Puerros",
      "Fideos"
    ],
    "pasos": [
      "Cocer las verduras con el pollo.",
      "Limpiar el pollo y cocinar los fideos en el caldo."
    ],
    "nutricion": {
      "calorias": 235
    },
    "nota": "",
    "imagen": "images/recipes/sopa-de-pollo.jpg"
  },
  "tallarines-o-tagliatelle-con-salmon": {
    "id": "tallarines-o-tagliatelle-con-salmon",
    "nombre": "Tallarines o tagliatelle con salmón",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 20,
    "icono": "🍝",
    "descripcion": "Pasta con pescado.",
    "ingredientes": [
      "Pasta (tallarines)",
      "Salmón",
      "Crema de queso",
      "Pimienta"
    ],
    "pasos": [
      "Cocer pasta.",
      "Mezclar pasta con crema de queso y salmón cocinado."
    ],
    "nutricion": {
      "calorias": 290
    },
    "nota": "",
    "imagen": "images/recipes/tallarines-o-tagliatelle-con-salmon.jpg"
  },
  "arroz-con-pollo": {
    "id": "arroz-con-pollo",
    "nombre": "Arroz con pollo",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 40,
    "icono": "🍚",
    "descripcion": "Clásico arroz con alitas y verduras.",
    "ingredientes": [
      "300 g. arroz Brillante Sabroz",
      "1 cebolla",
      "2 dientes de ajo",
      "1/2 pimiento verde",
      "1 pimiento rojo",
      "1/2 calabacín",
      "150 g. judías",
      "1 zanahoria",
      "200 g alitas pollo",
      "2 tomates",
      "1/4 l. agua",
      "1/2 l. caldo pollo",
      "Azafrán",
      "AOVE",
      "Sal",
      "Pimienta"
    ],
    "pasos": [
      "Picar todas las verduras finamente.",
      "Sofritas las verduras y el pollo.",
      "Añadir arroz, caldo y cocer."
    ],
    "nutricion": {},
    "nota": "",
    "imagen": "images/recipes/arroz-con-pollo.jpg"
  },
  "pollo-a-la-cerveza": {
    "id": "pollo-a-la-cerveza",
    "nombre": "Pollo a la cerveza",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 60,
    "icono": "🍗",
    "descripcion": "Guiso muy sabroso y barato.",
    "ingredientes": [
      "1.2 kg de pollo",
      "1 cebolla",
      "1 cebolleta",
      "1 pimiento rojo",
      "2 pimientos verdes",
      "4 ajos",
      "4 zanahorias",
      "Laurel",
      "1/2 l. cerveza",
      "Pimienta",
      "Sal"
    ],
    "pasos": [
      "Dorar el pollo y retirar.",
      "Sofreír verduras en el mismo aceite.",
      "Reincorporar el pollo, añadir cerveza y guisar."
    ],
    "nutricion": {
      "calorias": 306
    },
    "nota": "",
    "imagen": "images/recipes/pollo-a-la-cerveza.jpg"
  },
  "tortilla-de-champinones": {
    "id": "tortilla-de-champinones",
    "nombre": "Tortilla de champiñones",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 18,
    "icono": "🍳",
    "descripcion": "Tortilla rápida y equilibrada.",
    "ingredientes": [
      "Champiñones",
      "Huevos",
      "AOVE",
      "Especias al gusto"
    ],
    "pasos": [
      "Batir los huevos.",
      "Saltear champiñones.",
      "Esparcir champiñones sobre el huevo en la sartén y cuajar."
    ],
    "nutricion": {
      "calorias": 190
    },
    "nota": "",
    "imagen": "images/recipes/tortilla-de-champinones.jpg"
  },
  "tortilla-de-patatas-al-microondas-rechupete": {
    "id": "tortilla-de-patatas-al-microondas-rechupete",
    "nombre": "Tortilla de patatas al microondas",
    "tipo": "plato principal",
    "porciones": 4,
    "tiempo": 35,
    "icono": "🍳",
    "descripcion": "Tortilla rápida más ligera que la tradicional.",
    "ingredientes": [
      "Patatas",
      "Huevos",
      "Cebolla",
      "AOVE",
      "Sal"
    ],
    "pasos": [
      "Cocer patatas y cebolla al microondas.",
      "Mezclar con los huevos batidos.",
      "Cuajar en sartén."
    ],
    "nutricion": {
      "calorias": 255
    },
    "nota": "",
    "imagen": "images/recipes/tortilla-de-patatas-al-microondas-rechupete.jpg"
  },
  "bocadillo-vegetal-con-atun": {
    "id": "bocadillo-vegetal-con-atun",
    "nombre": "Bocadillo vegetal con atún",
    "tipo": "bocadillo",
    "porciones": 1,
    "tiempo": 10,
    "icono": "🥖",
    "descripcion": "Sandwich vegetal con huevo, atún o jamón.",
    "ingredientes": [
      "Pan",
      "Lechuga",
      "Tomate",
      "Atún",
      "Huevo duro",
      "Jamón cocido/pavo",
      "Mayonesa"
    ],
    "pasos": [
      "Montar todos los ingredientes en el pan."
    ],
    "nutricion": {
      "calorias": 272
    },
    "nota": "",
    "imagen": "images/recipes/bocadillo-vegetal-con-atun.jpg"
  },
  "guacamole-mexicano-facil": {
    "id": "guacamole-mexicano-facil",
    "nombre": "Guacamole mexicano fácil",
    "tipo": "snack",
    "porciones": 4,
    "tiempo": 12,
    "icono": "🥑",
    "descripcion": "Guacamole tradicional.",
    "ingredientes": [
      "6 aguacates",
      "100 g. tomate",
      "100 g. cebolla",
      "1 lima",
      "1 cda. cilantro fresco"
    ],
    "pasos": [
      "Picar vegetales y mezclar con el aguacate chafado."
    ],
    "nutricion": {
      "calorias": 182
    },
    "nota": "",
    "imagen": "images/recipes/guacamole-mexicano-facil.jpg"
  },
  "bizcocho-en-taza-mug-cake": {
    "id": "bizcocho-en-taza-mug-cake",
    "nombre": "Bizcocho en taza (Mug cake)",
    "tipo": "postre",
    "porciones": 1,
    "tiempo": 10,
    "icono": "☕",
    "descripcion": "Bizcocho rápido hecho al microondas.",
    "ingredientes": [
      "Harina",
      "Azúcar",
      "Huevo",
      "Cacao/colacao",
      "Leche",
      "Aceite",
      "Levadura"
    ],
    "pasos": [
      "Mezclar ingredientes con tenedor en taza.",
      "Cocinar en microondas y comer tibio."
    ],
    "nutricion": {
      "calorias": 340
    },
    "nota": "",
    "imagen": "images/recipes/bizcocho-en-taza-mug-cake.jpg"
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
      {
        "nombre": "Zanahorias",
        "cantidad": "400g",
        "comprar": true
      },
      {
        "nombre": "Vinagre de manzana",
        "cantidad": "200ml",
        "comprar": true
      },
      {
        "nombre": "Agua mineral",
        "cantidad": "200ml",
        "comprar": false
      },
      {
        "nombre": "Sal gorda",
        "cantidad": "1 cucharada",
        "comprar": false
      },
      {
        "nombre": "Laurel",
        "cantidad": "2 hojas",
        "comprar": false
      },
      {
        "nombre": "Ajo",
        "cantidad": "2 dientes",
        "comprar": false
      }
    ],
    "pasos": [
      "Pelar las zanahorias y cortarlas en rodajas.",
      "Hervir el agua con el vinagre, sal y laurel 3 minutos.",
      "Colocar zanahorias y los ajos machacados en un tarro.",
      "Verter líquido caliente, dejar enfriar tapado en nevera hasta el día siguiente."
    ],
    "nutricion": {
      "calorias": 45,
      "proteinas": 1,
      "carbohidratos": 10,
      "grasas": 0,
      "fibra": 3
    },
    "nota": "📖 Original NotebookLM (Mejorado)",
    "imagen": "images/recipes/zanahorias-encurtidas.jpg"
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
      {
        "nombre": "Garbanzos de frasco",
        "cantidad": "400g",
        "comprar": true
      },
      {
        "nombre": "Remolacha cocida",
        "cantidad": "150g",
        "comprar": true
      },
      {
        "nombre": "Pasta tahini",
        "cantidad": "30g",
        "comprar": true
      },
      {
        "nombre": "Aceite de oliva (AOVE)",
        "cantidad": "30ml",
        "comprar": false
      },
      {
        "nombre": "Limón",
        "cantidad": "1/2 unidad",
        "comprar": true
      },
      {
        "nombre": "Pimentón dulce",
        "cantidad": "1 cucharadita",
        "comprar": false
      },
      {
        "nombre": "Verduras tipo apio y pepino",
        "cantidad": "250g",
        "comprar": true
      }
    ],
    "pasos": [
      "Lavar y escurrir muy bien la legumbre.",
      "Triturar en batidora garbanzos, remolacha troceada, tahini, limón y sal.",
      "Agregar hilo de AOVE y unas gotas de agua para que la crema quede sedosa.",
      "Servir junto a los palos de verduras para mojar."
    ],
    "nutricion": {
      "calorias": 320,
      "proteinas": 12,
      "carbohidratos": 36,
      "grasas": 14,
      "fibra": 11
    },
    "nota": "📖 Original NotebookLM (Mejorado)",
    "imagen": "images/recipes/hummus-de-remolacha-con-crudites.jpg"
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
      {
        "nombre": "Tomates maduros",
        "cantidad": "500g",
        "comprar": true
      },
      {
        "nombre": "Sandía sin pepitas",
        "cantidad": "500g",
        "comprar": true
      },
      {
        "nombre": "Pimiento verde",
        "cantidad": "50g",
        "comprar": false
      },
      {
        "nombre": "Pepino",
        "cantidad": "Media ud.",
        "comprar": false
      },
      {
        "nombre": "Vinagre y AOVE",
        "cantidad": "3 cdas",
        "comprar": false
      },
      {
        "nombre": "Queso feta",
        "cantidad": "50g",
        "comprar": true
      }
    ],
    "pasos": [
      "Lavar y trocear las verduras y la sandía en cachos de batidora.",
      "Pasar todo por batidora un buen rato hasta licuar.",
      "Emulsionar vertiendo AOVE en hilo y sal, vinagre.",
      "Refrigerarlo y tomarlo helado, desmenuzando feta por encima como guarnición salada."
    ],
    "nutricion": {
      "calorias": 130,
      "proteinas": 3,
      "carbohidratos": 18,
      "grasas": 6,
      "fibra": 2
    },
    "nota": "📖 Original NotebookLM (Mejorado)",
    "imagen": "images/recipes/gazpacho-de-sandia-y-feta.jpg"
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
      {
        "nombre": "Remolacha cocida",
        "cantidad": "200g",
        "comprar": true
      },
      {
        "nombre": "Champiñones portobello muy crudos",
        "cantidad": "100g",
        "comprar": true
      },
      {
        "nombre": "Piñones tostados",
        "cantidad": "10g",
        "comprar": true
      },
      {
        "nombre": "Parmesano en taco",
        "cantidad": "20g",
        "comprar": true
      },
      {
        "nombre": "Brotes de rúcula",
        "cantidad": "50g",
        "comprar": true
      },
      {
        "nombre": "Zumo de limón natural",
        "cantidad": "Medio exprimid",
        "comprar": true
      }
    ],
    "pasos": [
      "Limpiar de posible tierra frotando los champis en seco. Sin mojarlos.",
      "Con un cuchillo hiper afilado o mandolina cortar remolacha y setas en hojas de papel de finos.",
      "Emplatar plano tipo abanico entrelazándolas sobre hojas de rúcula lavadas.",
      "Aliñar generosamente con zumo crudo de limón, polvo de sal y viruta sacadas de parmesano."
    ],
    "nutricion": {
      "calorias": 150,
      "proteinas": 6,
      "carbohidratos": 11,
      "grasas": 9,
      "fibra": 4
    },
    "nota": "📖 Original NotebookLM (Mejorado)",
    "imagen": "images/recipes/carpaccio-de-remolacha-y-champinon.jpg"
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
      {
        "nombre": "Pan rústico, de masa mater",
        "cantidad": "2 buenas lonchas",
        "comprar": true
      },
      {
        "nombre": "Aguacate madurito",
        "cantidad": "1 completo",
        "comprar": true
      },
      {
        "nombre": "Requesón grumoso de buena calidad",
        "cantidad": "100g",
        "comprar": true
      },
      {
        "nombre": "Semillas de sésamo negra",
        "cantidad": "Espolvoreado",
        "comprar": false
      }
    ],
    "pasos": [
      "Tuestalo bastante a tope el pan, sea duro de corteza.",
      "Embadurna con tenazidad unos generosos cazos de requesón (queso whey fresco sin sala) de sabor suave lechoso al pan.",
      "Apostar en rodaje de gajos precisos un medio del fruto mantecoso de aguacatero por rebanadita individual. Echar sésamo arriba.",
      "Gota afilada de AOVE rematadora al festin de paladar!"
    ],
    "nutricion": {
      "calorias": 310,
      "proteinas": 10,
      "carbohidratos": 25,
      "grasas": 21,
      "fibra": 8
    },
    "nota": "📖 Original NotebookLM (Mejorado)",
    "imagen": "images/recipes/tosta-de-aguacate-con-requeson.jpg"
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
      {
        "nombre": "Salmón troncos",
        "cantidad": "2 Piezas unos 300gsudos",
        "comprar": true
      },
      {
        "nombre": "Calabacín o Zucchini tierno pelado / cachelo gordo",
        "cantidad": "Las rodajas finas, 1 grande",
        "comprar": true
      },
      {
        "nombre": "Limón gordo al jugo eneldo pastosillo",
        "cantidad": "Medio limonaje al llovizn",
        "comprar": true
      }
    ],
    "pasos": [
      "Hacer escamas planas con pealdoros del calabazin y papa asar o cacheles tierneciros. Asarlos sólos base en taper de microonidas o del vapori 5 m a topoteo potencia.",
      "Coronar depositándo arriba el lomarrosa y salpincarlo acidón de los limón o limas verdes perfumero.",
      "Sellar / Tapillar plástico e intrudice 4 / 5 minuto de sauna max. No levantar el hule hacia tus caretos ni gafas por calores vivos!!"
    ],
    "nutricion": {
      "calorias": 420,
      "proteinas": 34,
      "carbohidratos": 25,
      "grasas": 21,
      "fibra": 4
    },
    "nota": "📖 Original NotebookLM (Mejorado)",
    "imagen": "images/recipes/salomon-expres-al-microondas.jpg"
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
      {
        "nombre": "Fieltes blando de corraleta a de pechugas finísimas",
        "cantidad": "2 libritas gordotas al cortes",
        "comprar": true
      },
      {
        "nombre": "Maíz dorado horneaditos (Mister Kiko frito grueso)",
        "cantidad": "Gran bolsa gorda",
        "comprar": true
      },
      {
        "nombre": "Huevina gorda camperes bación",
        "cantidad": "Los dos enteros.",
        "comprar": false
      }
    ],
    "pasos": [
      "Aplasta los gusanitos frito duros en un embolse hasta picazos irregulores sin harina (mortheros valen o rulos de pasta)",
      "Las gallinitas en finas yemas huevos sumergir rebodidas, al envuelve o panko maízero adherido al aprietes maximos entre mano y fileteón gruesales",
      "Posa un papel a asar caldeados de airfirer super tostadoras u de orno comun a 8 y doce minuteletes.",
      "Se quema enseuguida sin el ojometreado constante al final."
    ],
    "nutricion": {
      "calorias": 420,
      "proteinas": 34,
      "carbohidratos": 25,
      "grasas": 18,
      "fibra": 2
    },
    "nota": "📖 Original NotebookLM (Mejorado)",
    "imagen": "images/recipes/pechugas-de-pollo-empanadas-con-kikos.jpg"
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
      {
        "nombre": "Alubias blancas precocinadas, muy pastis",
        "cantidad": "250 gramos",
        "comprar": true
      },
      {
        "nombre": "Atún a de bote claro aceitetas girazol u aguas del natu.",
        "cantidad": "A Lata drenada sequita sin gota",
        "comprar": true
      }
    ],
    "pasos": [
      "Escacha leguminosas. Dejari un pocot de enteras pare dentelleada rústicas de no pasta gomasia pura fina..",
      "Tirar todo pescadazo y de amalgamar los dos sin paros en la bolas masadas de tus handazos grandes o un cacillazo heladores redondas..",
      "Pasee a aplastar tipo torrezna ancha pero fínisimas parrilleando dorado. A engullir con lechuguina tomate y quesero tierno derretos encima un panaco integral crujosazo gordo!!"
    ],
    "nutricion": {
      "calorias": 280,
      "proteinas": 22,
      "carbohidratos": 28,
      "grasas": 8,
      "fibra": 9
    },
    "nota": "📖 Original NotebookLM (Mejorado)"
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
      {
        "nombre": "Arándano oscuro antioxidantes crudos congelsados (heladero)",
        "cantidad": "100 gramos puros",
        "comprar": true
      },
      {
        "nombre": "Platanillo ultra blando muy oscuro.",
        "cantidad": "Medio (40 gr.)",
        "comprar": true
      },
      {
        "nombre": "La bebida de Sojas, de las almendrables. (cualquier lactera natural base líquideses yemas blancones)",
        "cantidad": "1 vasos de cuartos / y unos copos para enpesores. Cúbicos hierlerías fríon.",
        "comprar": true
      }
    ],
    "pasos": [
      "Metis a turbinas lo plataneo rotos. Las arándani azulera, su lacteas base.",
      "A pulverizar las copinas u harinas desnudas avenas batidos gordos por un milisegundo largo de moliendas sutil.",
      "Un cubo aguahielo rayada para fresquetos o batir juntis con canela olorosa, te tragas eso súper nutritivas pa cama tempraneos super agustos"
    ],
    "nutricion": {
      "calorias": 230,
      "proteinas": 9,
      "carbohidratos": 34,
      "grasas": 7,
      "fibra": 6
    },
    "nota": "📖 Extraído con IA (NotebookLM) / Custom ",
    "imagen": "images/recipes/batido-de-platano-y-arandanos-con-avena.jpg"
  },
  "ensalada-garbanzos-atun": {
    "id": "ensalada-garbanzos-atun",
    "nombre": "Ensalada de Garbanzos y Atún",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥗",
    "descripcion": "Ensalada rápida de legumbres",
    "ingredientes": [
      "400g garbanzos cocidos",
      "2 latas atún",
      "2 huevos",
      "10 tomates cherry",
      "media cebolla morada",
      "aceite",
      "vinagre",
      "sal"
    ],
    "pasos": [
      "Cuece los huevos 10 min",
      "Enjuaga garbanzos",
      "Pica cebolla y tomate",
      "Mezcla y aliña"
    ],
    "nutricion": {
      "calorias": 350
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/ensalada-garbanzos-atun.jpg"
  },
  "salmon-horno-esparragos": {
    "id": "salmon-horno-esparragos",
    "nombre": "Salmón al Horno con Espárragos",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🐟",
    "descripcion": "Salmón asado con verduras",
    "ingredientes": [
      "2 lomos salmón",
      "1 manojo espárragos trigueros",
      "1 limón",
      "aceite de oliva",
      "sal",
      "pimienta"
    ],
    "pasos": [
      "Precalienta horno a 200°C",
      "Lava espárragos",
      "Salpimenta y añade limón y aceite",
      "Hornea 12-15 min"
    ],
    "nutricion": {
      "calorias": 320
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/salmon-horno-esparragos.jpg"
  },
  "espaguetis-carbonara": {
    "id": "espaguetis-carbonara",
    "nombre": "Espaguetis a la Carbonara (Tradicional)",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🍝",
    "descripcion": "Pasta clásica italiana auténtica",
    "ingredientes": [
      "200g espaguetis",
      "100g panceta curada",
      "2 yemas huevo",
      "50g parmesano",
      "pimienta negra"
    ],
    "pasos": [
      "Cuece pasta al dente",
      "Fríe panceta",
      "Mezcla yemas con parmesano",
      "Combina fuera del fuego"
    ],
    "nutricion": {
      "calorias": 520
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/espaguetis-carbonara.jpg"
  },
  "lentejas-rapidas-verduras": {
    "id": "lentejas-rapidas-verduras",
    "nombre": "Lentejas Rápidas con Verduras",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍲",
    "descripcion": "Guiso de lentejas fácil",
    "ingredientes": [
      "400g lentejas cocidas",
      "1 zanahoria",
      "1 patata",
      "1 cebolla",
      "1 cdita pimentón dulce",
      "500ml caldo verduras"
    ],
    "pasos": [
      "Sofríe verduras 10 min",
      "Añade pimentón y lentejas",
      "Cubre con caldo",
      "Cuece 15 min"
    ],
    "nutricion": {
      "calorias": 280
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/lentejas-con-verduras-o-viudas.jpg"
  },
  "salteado-ternera-brocoli": {
    "id": "salteado-ternera-brocoli",
    "nombre": "Salteado de Ternera y Brócoli",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥩",
    "descripcion": "Carne salteada estilo oriental",
    "ingredientes": [
      "300g filetes ternera",
      "1 brócoli",
      "2 ajos",
      "salsa de soja",
      "sésamo"
    ],
    "pasos": [
      "Corta ternera y brócoli",
      "Saltea carne con ajos",
      "Saltea brócoli al vapor",
      "Mezcla todo con soja y sésamo"
    ],
    "nutricion": {
      "calorias": 310
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/salteado-ternera-brocoli.jpg"
  },
  "wok-fideos-pollo": {
    "id": "wok-fideos-pollo",
    "nombre": "Wok de Fideos de Arroz y Pollo",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🍜",
    "descripcion": "Fideos asiáticos salteados",
    "ingredientes": [
      "150g fideos arroz",
      "1 pechuga pollo",
      "1 zanahoria",
      "1 calabacín",
      "salsa teriyaki"
    ],
    "pasos": [
      "Hidrata fideos",
      "Corta ingredientes",
      "Saltea pollo y verduras",
      "Añade fideos y teriyaki"
    ],
    "nutricion": {
      "calorias": 380
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/wok-fideos-pollo.jpg"
  },
  "shakshuka": {
    "id": "shakshuka",
    "nombre": "Shakshuka (Huevos en Salsa de Tomate)",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍳",
    "descripcion": "Huevos cuajados en salsa de tomate especiada",
    "ingredientes": [
      "3 o 4 huevos",
      "400g tomate triturado",
      "1 cebolla",
      "1 pimiento rojo",
      "comino",
      "pimentón",
      "pan"
    ],
    "pasos": [
      "Pocha cebolla y pimiento",
      "Añade tomate y especias 15 min",
      "Casca huevos encima",
      "Tapa y cuaja 5 min"
    ],
    "nutricion": {
      "calorias": 260
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/shakshuka.jpg"
  },
  "poke-bowl-salmon": {
    "id": "poke-bowl-salmon",
    "nombre": "Poke Bowl de Salmón Ahumado",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Bol de arroz y salmón al estilo hawaiano",
    "ingredientes": [
      "2 vasitos arroz",
      "100g salmón ahumado",
      "1 aguacate",
      "edamame cocido",
      "salsa de soja",
      "sésamo"
    ],
    "pasos": [
      "Calienta arroz",
      "Corta salmón y aguacate",
      "Coloca ingredientes en bol",
      "Aliña con soja y sésamo"
    ],
    "nutricion": {
      "calorias": 420
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/poke-bowl-salmon.jpg"
  },
  "tortilla-campera": {
    "id": "tortilla-campera",
    "nombre": "Tortilla Campera Exprés",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🥔",
    "descripcion": "Tortilla rápida con microondas",
    "ingredientes": [
      "4 huevos",
      "2 patatas",
      "1 pimiento verde",
      "media cebolla",
      "aceite",
      "sal"
    ],
    "pasos": [
      "Corta verduras y microondas 10-12 min",
      "Bate huevos",
      "Mezcla verduras y huevos",
      "Cuaja en sartén"
    ],
    "nutricion": {
      "calorias": 280
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/tortilla-de-patatas-al-microondas-rechupete.jpg"
  },
  "ensalada-pasta-pesto": {
    "id": "ensalada-pasta-pesto",
    "nombre": "Ensalada de Pasta al Pesto",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍝",
    "descripcion": "Ensalada fría de pasta al pesto",
    "ingredientes": [
      "200g pasta corta",
      "1 bola mozzarella",
      "tomates cherry",
      "3 cdas pesto",
      "aceitunas negras"
    ],
    "pasos": [
      "Cuece pasta",
      "Corta mozzarella y cherrys",
      "Pon en ensaladera",
      "Incorpora pesto y mezcla"
    ],
    "nutricion": {
      "calorias": 480
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/ensalada-pasta-pesto.jpg"
  },
  "pechugas-caprese": {
    "id": "pechugas-caprese",
    "nombre": "Pechugas Caprese al Horno",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 30,
    "icono": "🍗",
    "descripcion": "Pollo relleno estilo italiano",
    "ingredientes": [
      "2 pechugas pollo",
      "1 tomate",
      "1 mozzarella",
      "albahaca",
      "aceite",
      "sal"
    ],
    "pasos": [
      "Precalienta horno 200°C",
      "Haz cortes en el pollo",
      "Introduce tomate y mozzarella",
      "Hornea 25 min"
    ],
    "nutricion": {
      "calorias": 350
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/pechugas-caprese.jpg"
  },
  "revuelto-setas-gambas": {
    "id": "revuelto-setas-gambas",
    "nombre": "Revuelto de Setas, Ajetes y Gambas",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍳",
    "descripcion": "Revuelto jugoso mar y tierra",
    "ingredientes": [
      "4 huevos",
      "1 manojo ajetes",
      "150g setas",
      "100g gambas",
      "aceite",
      "sal"
    ],
    "pasos": [
      "Sofríe ajetes y setas",
      "Incorpora gambas",
      "Baja fuego y añade huevos",
      "Remueve hasta cuajar"
    ],
    "nutricion": {
      "calorias": 290
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/revuelto-setas-gambas.jpg"
  },
  "tacos-carne-picada": {
    "id": "tacos-carne-picada",
    "nombre": "Tacos de Carne Picada",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🌮",
    "descripcion": "Tacos mexicanos clásicos",
    "ingredientes": [
      "300g carne picada",
      "1 sazonador tacos",
      "tortillas",
      "lechuga",
      "queso rallado"
    ],
    "pasos": [
      "Fríe carne",
      "Añade sazonador y reduce",
      "Calienta tortillas",
      "Rellena al gusto"
    ],
    "nutricion": {
      "calorias": 420
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/tacos-carne-picada.jpg"
  },
  "macarrones-gratinados": {
    "id": "macarrones-gratinados",
    "nombre": "Macarrones Gratinados al Microondas",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🧀",
    "descripcion": "Pasta gratinada exprés",
    "ingredientes": [
      "200g macarrones",
      "salsa tomate",
      "2 latas atún",
      "orégano",
      "queso para gratinar"
    ],
    "pasos": [
      "Cuece macarrones",
      "Mezcla con tomate, atún y orégano",
      "Cubre con queso",
      "Gratina en microondas 4-5 min"
    ],
    "nutricion": {
      "calorias": 450
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/macarrones-gratinados.jpg"
  },
  "pollo-ajillo": {
    "id": "pollo-ajillo",
    "nombre": "Pollo al Ajillo Exprés",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍗",
    "descripcion": "Pollo tradicional rápido al ajillo",
    "ingredientes": [
      "4 contramuslos pollo",
      "6 ajos",
      "100ml vino blanco",
      "aceite",
      "sal",
      "perejil"
    ],
    "pasos": [
      "Fríe ajos y retira",
      "Dora pollo en aceite",
      "Añade ajos y vino",
      "Cuece 10 min tapado"
    ],
    "nutricion": {
      "calorias": 380
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/pollo-ajillo.jpg"
  },
  "falsas-pizzas-pita": {
    "id": "falsas-pizzas-pita",
    "nombre": "Falsas Pizzas en Pan de Pita",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍕",
    "descripcion": "Pizza fácil con base de pita",
    "ingredientes": [
      "4 panes pita",
      "salsa tomate",
      "mozzarella rallada",
      "jamón cocido",
      "champiñones",
      "orégano"
    ],
    "pasos": [
      "Precalienta horno 200°C",
      "Extiende tomate sobre pitas",
      "Cubre con queso e ingredientes",
      "Hornea 8-10 min"
    ],
    "nutricion": {
      "calorias": 380
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/falsas-pizzas-pita.jpg"
  },
  "sopa-frijol": {
    "id": "sopa-frijol",
    "nombre": "Sopa de Frijol",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 40,
    "icono": "🥣",
    "descripcion": "Sopa reconfortante de legumbres",
    "ingredientes": [
      "1 kg frijol bayo",
      "3L agua",
      "1/4 cebolla",
      "2 ajos",
      "cilantro"
    ],
    "pasos": [
      "Cocer frijoles hasta tiernos",
      "Procesar parte de los frijoles",
      "Servir con complementos"
    ],
    "nutricion": {
      "calorias": 320
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/sopa-de-pollo.jpg"
  },
  "paletas-fresa": {
    "id": "paletas-fresa",
    "nombre": "Paletas de Fresa",
    "tipo": "postre",
    "porciones": 4,
    "tiempo": 15,
    "icono": "🍦",
    "descripcion": "Helado natural de fresa y naranja",
    "ingredientes": [
      "1/2 kg fresas",
      "jugo y ralladura de 1/2 naranja"
    ],
    "pasos": [
      "Licuar fresas con naranja",
      "Congelar en moldes",
      "Desmoldar y servir"
    ],
    "nutricion": {
      "calorias": 80
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/paletas-fresa.jpg"
  },
  "tres-leches": {
    "id": "tres-leches",
    "nombre": "Tres Leches",
    "tipo": "postre",
    "porciones": 8,
    "tiempo": 50,
    "icono": "🍰",
    "descripcion": "Bizcocho tradicional bañado en tres leches",
    "ingredientes": [
      "12 huevos",
      "380g azúcar",
      "270g harina",
      "vainilla",
      "3 latas leche condensada",
      "3 latas leche evaporada",
      "2 tzas crema leche"
    ],
    "pasos": [
      "Hacer bizcocho",
      "Hornear 20 min",
      "Mezclar leches y calentar",
      "Bañar bizcocho y enfriar"
    ],
    "nutricion": {
      "calorias": 420
    },
    "nota": "NotebookLM",
    "imagen": "images/recipes/tres-leches.jpg"
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


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
  "crema_puerro_patata": {
    "id": "crema_puerro_patata",
    "nombre": "Crema tibia de puerro y patata",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 60,
    "icono": "🍲",
    "descripcion": "Crema suave de verduras perfecta para la primavera.",
    "ingredientes": [
      {
        "nombre": "Puerros",
        "cantidad": "4 unidades"
      },
      {
        "nombre": "Patata",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "2 cucharadas"
      },
      {
        "nombre": "Caldo de verduras",
        "cantidad": "500 ml"
      },
      {
        "nombre": "Nata para cocinar",
        "cantidad": "100 ml"
      },
      {
        "nombre": "Sal y pimienta",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Limpia los puerros y quítales las primeras capas. Córtalos en trozos.",
      "Pela las patatas y córtalas a dados.",
      "En una olla o cazuela, sofríe los puerros en el aceite a fuego lento. Pasados unos 7 minutos, añade las patatas, la sal y la pimienta.",
      "Ve removiendo y, al cabo de 2 minutos, añade el caldo. Déjalo hervir unos 20 minutos a fuego lento o hasta que la patata esté blanda.",
      "Añade la nata y tritúralo con la batidora eléctrica."
    ],
    "nutricion": {
      "calorias": 0,
      "proteinas": "0g",
      "carbohidratos": "0g",
      "grasas": "0g"
    }
  },
  "chips_de_kale": {
    "id": "chips_de_kale",
    "nombre": "Chips de kale",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥗",
    "descripcion": "Snack crujiente y saludable horneado al momento.",
    "ingredientes": [
      {
        "nombre": "Kale",
        "cantidad": "300 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "5 ml"
      },
      {
        "nombre": "Especias",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Precalienta el horno a 200 grados (arriba y abajo).",
      "Corta el kale en trozos de unos 4 cm.",
      "Ponlos en un bol y mezcla con AOVE. Puedes usar un pulverizador.",
      "Deja enfriar y añade sal, cúrcuma, pimentón, ajo en polvo o cualquier otra especia que te guste.",
      "En una bandeja cubierta con papel de hornear dispón los trozos de kale sin amontonar.",
      "Hornea unos 10 minutos. Hacia el final vigila que no se quemen."
    ],
    "nutricion": {
      "calorias": 88.1,
      "proteinas": "6.5g",
      "carbohidratos": "6.3g",
      "grasas": "4.1g"
    }
  },
  "guacamole_palitos_zanahoria": {
    "id": "guacamole_palitos_zanahoria",
    "nombre": "Guacamole con palitos de zanahoria",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥑",
    "descripcion": "Guacamole fresco acompañado de bastones de zanahoria crujientes.",
    "ingredientes": [
      {
        "nombre": "Zanahorias",
        "cantidad": "200 g"
      },
      {
        "nombre": "Aguacates",
        "cantidad": "300 g"
      },
      {
        "nombre": "Cebolleta",
        "cantidad": "50 g"
      },
      {
        "nombre": "Tomate",
        "cantidad": "80 g"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "10 ml"
      },
      {
        "nombre": "Cilantro fresco",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Lava la zanahoria, retira la piel con un pelador y corta bastones de aproximadamente 10 x 1 cm.",
      "Lava el tomate y córtalo en dados.",
      "Extrae la pulpa del aguacate y machaca con un tenedor o prensador de patatas.",
      "Vuelca el tomate, la cebolla y el cilantro sobre el puré de aguacate. Mezcla bien, sazona y listo.",
      "Riega con el zumo de limón o de la lima.",
      "Limpia y pica la cebolla. Guarda el tallo para otra preparación.",
      "Mezcla la cebolla con las hojas de cilantro picadas finamente (no machacadas). Reserva."
    ],
    "nutricion": {
      "calorias": 244.3,
      "proteinas": "3.22g",
      "carbohidratos": "10.02g",
      "grasas": "21.26g"
    }
  },
  "zanahorias_encurtidas": {
    "id": "zanahorias_encurtidas",
    "nombre": "Zanahorias encurtidas 'para mañana'",
    "tipo": "snack",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🥕",
    "descripcion": "Láminas finas de zanahoria encurtidas en una mezcla aromática.",
    "ingredientes": [
      {
        "nombre": "Zanahorias",
        "cantidad": "200 g"
      },
      {
        "nombre": "Perejil fresco",
        "cantidad": "10 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "4-5 g"
      },
      {
        "nombre": "Hierbabuena o menta",
        "cantidad": "10 g"
      },
      {
        "nombre": "Pimienta negra",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "20 ml"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "30 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta las zanahorias en tiras con una mandolina o un pelador. Reserva.",
      "Pica el ajo, ponle sal y pimienta y deja que repose unos 15 minutos para que se mezclen los sabores.",
      "Pica las hierbas y añádelas a la zanahoria.",
      "Mezcla el AOVE y el vinagre y añádelo a la mezcla de zanahorias con ajo y hierbas.",
      "Deja reposar 24 h. ¡Al día siguiente estará listo para comer como snack!",
      "Añade el ajo picado y salpimentado."
    ],
    "nutricion": {
      "calorias": 131.51,
      "proteinas": "1.15g",
      "carbohidratos": "9.07g",
      "grasas": "10.07g"
    }
  },
  "hummus_remolacha_crudites": {
    "id": "hummus_remolacha_crudites",
    "nombre": "Hummus de remolacha con crudités",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥣",
    "descripcion": "Cremoso y vistoso hummus de remolacha para dipear.",
    "ingredientes": [
      {
        "nombre": "Remolacha cocida y pelada",
        "cantidad": "250 g"
      },
      {
        "nombre": "Garbanzos cocidos",
        "cantidad": "200 g"
      },
      {
        "nombre": "Yogurt natural",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Ajo",
        "cantidad": "5 g"
      },
      {
        "nombre": "Apio",
        "cantidad": "40 g"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "10 ml"
      },
      {
        "nombre": "Pimentón",
        "cantidad": "5 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "40 ml"
      },
      {
        "nombre": "Comino tostado y molido",
        "cantidad": "5 g"
      },
      {
        "nombre": "Tahini",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "40 g"
      }
    ],
    "pasos": [
      "Bate la remolacha troceada con los garbanzos enjuagados y escurridos, el yogur, la salsa tahini, el ajo, el AOVE, el comino tostado, la sal y el zumo de limón.",
      "Comprueba la consistencia y, si te gusta más ligero, añade dos o tres cucharadas de agua y vuelve a batir.",
      "Espolvorea con pimentón y sirve acompañado con bastones de pimiento rojo y apio (10 x 1 cm aproximadamente)."
    ],
    "nutricion": {
      "calorias": 461.97,
      "proteinas": "14.77g",
      "carbohidratos": "33.38g",
      "grasas": "29.93g"
    }
  },
  "patatitas_dos_salsas": {
    "id": "patatitas_dos_salsas",
    "nombre": "Patatitas dos salsas",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥔",
    "descripcion": "Patatas baby cocidas acompañadas de salsa de yogur con hierbabuena y de curry.",
    "ingredientes": [
      {
        "nombre": "Patatas baby",
        "cantidad": "400 g"
      },
      {
        "nombre": "Yogures griegos",
        "cantidad": "250 g"
      },
      {
        "nombre": "Hojas de hierbabuena",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Ajo",
        "cantidad": "3 g"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Curry",
        "cantidad": "8 g"
      },
      {
        "nombre": "Pimienta negra",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Cuece las patatas al microondas siguiendo las indicaciones del fabricante.",
      "Mientras tanto, mezcla un yogur con la hierbabuena picada, medio diente de ajo, AOVE, zumo de limón al gusto y un poco de sal.",
      "En otro recipiente, mezcla el otro yogur con el curry, un poco de pimienta negra y AOVE.",
      "Sirve las patatas con las salsas."
    ],
    "nutricion": {
      "calorias": 336.08,
      "proteinas": "10.86g",
      "carbohidratos": "41.12g",
      "grasas": "14.24g"
    }
  },
  "falso_sushi_pepino": {
    "id": "falso_sushi_pepino",
    "nombre": "Falso sushi de pepino, yogur y queso feta",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥒",
    "descripcion": "Rollitos refrescantes de pepino con relleno cremoso.",
    "ingredientes": [
      {
        "nombre": "Pepino holandés",
        "cantidad": "270 g"
      },
      {
        "nombre": "Pimiento amarillo",
        "cantidad": "100 g"
      },
      {
        "nombre": "Yogur griego natural",
        "cantidad": "125 g"
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "40 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "3 g"
      },
      {
        "nombre": "Queso feta",
        "cantidad": "50 g"
      },
      {
        "nombre": "Ralladura de limón",
        "cantidad": "3 g"
      },
      {
        "nombre": "Pimienta molida",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "10 ml"
      }
    ],
    "pasos": [
      "Corta tiras finas de pepino con un pelador o una mandolina.",
      "Corta el pimiento y la cebolla en cuadraditos pequeños.",
      "Prepara una crema con el yogur, el queso feta desmigado, el ajo picado muy fino, la piel de limón rallada, pimienta molida y un chorrito de AOVE.",
      "Seca bien el pepino con papel de cocina.",
      "Sobre cada tira pon una cucharada de la crema, el pimiento y la cebolla y enróllalo.",
      "Sirve frío."
    ],
    "nutricion": {
      "calorias": 185.78,
      "proteinas": "8.29g",
      "carbohidratos": "10.66g",
      "grasas": "12.22g"
    }
  },
  "gazpacho_sandia_feta": {
    "id": "gazpacho_sandia_feta",
    "nombre": "Gazpacho de sandía y feta",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍉",
    "descripcion": "Refrescante sopa fría a base de sandía y tomate.",
    "ingredientes": [
      {
        "nombre": "Tomates pera",
        "cantidad": "250 g"
      },
      {
        "nombre": "Sandía",
        "cantidad": "250 g"
      },
      {
        "nombre": "Cebolleta",
        "cantidad": "40 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "5 g"
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "150 g"
      },
      {
        "nombre": "Queso feta",
        "cantidad": "50 g"
      },
      {
        "nombre": "Hojas de albahaca escaldada",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimienta",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "En un robot o batidora potente pon los tomates lavados y cortados en dos, la sandía sin piel ni pepitas (reserva un poco para la guarnición), la cebolleta, el pimiento en trozos lavado y sin semillas y las hojas de albahaca. Previamente habrás sumergido las hojas de albahaca unos segundos en agua hirviendo.",
      "Añade 3-4 cucharadas de aceite, dos de vinagre y sal.",
      "Bate todos los ingredientes hasta lograr una textura fina y sirve acompañado de trozos de sandía y de queso feta."
    ],
    "nutricion": {
      "calorias": 310.4,
      "proteinas": "8.39g",
      "carbohidratos": "22.14g",
      "grasas": "20.92g"
    }
  },
  "carpaccio_remolacha_champinon": {
    "id": "carpaccio_remolacha_champinon",
    "nombre": "Carpaccio de remolacha y champiñón",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍄",
    "descripcion": "Láminas extrafinas de remolacha y champiñones marinados.",
    "ingredientes": [
      {
        "nombre": "Remolacha cocida y pelada",
        "cantidad": "250 g"
      },
      {
        "nombre": "Champiñones",
        "cantidad": "150 g"
      },
      {
        "nombre": "Rúcula",
        "cantidad": "100 g"
      },
      {
        "nombre": "Queso manchego curado",
        "cantidad": "30 g"
      },
      {
        "nombre": "Avellanas",
        "cantidad": "30 g"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimienta",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta la remolacha en láminas muy finas con un cuchillo muy afilado o con una mandolina. Dispón la remolacha cubriendo la base de un plato llano.",
      "Lava los champiñones y córtalos en láminas finas. Colócalos encima de la remolacha.",
      "Pon un puñado de rúcula en el centro del plato y coloca encima unas lascas de queso manchego.",
      "En un bote de cristal pequeño mezcla el AOVE, el vinagre, las avellanas picadas y la sal. Agita y vierte el aliño sobre el carpaccio."
    ],
    "nutricion": {
      "calorias": 361.92,
      "proteinas": "11.04g",
      "carbohidratos": "13.83g",
      "grasas": "29.16g"
    }
  },
  "dip_guisantes_hierbabuena": {
    "id": "dip_guisantes_hierbabuena",
    "nombre": "Dip de guisantes con hierbabuena y totopos caseros",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🟢",
    "descripcion": "Untable verde y fresco acompañado de totopos crujientes.",
    "ingredientes": [
      {
        "nombre": "Guisantes congelados",
        "cantidad": "300 g"
      },
      {
        "nombre": "Queso fresco",
        "cantidad": "250 g"
      },
      {
        "nombre": "Pistachos",
        "cantidad": "15 g"
      },
      {
        "nombre": "Tortillas de trigo integral",
        "cantidad": "50 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "3 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "10 ml"
      },
      {
        "nombre": "Hojas de hierbabuena",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimentón",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Precalienta el horno a 180 grados (calor arriba y abajo).",
      "Coloca los guisantes (sin descongelar) en un recipiente apto para microondas. Añade dos cucharadas de agua y cocina a máxima potencia en el micro durante 4 minutos. Tritura con un tenedor y deja enfriar.",
      "Para hacer los totopos, corta cada tortilla en ocho triángulos. Colócalos en una bandeja sobre papel vegetal, pinta con AOVE, añade sal y hornea 10 minutos vigilando que no se quemen.",
      "Mezcla el queso con el ajo picado, los pistachos picados, la hierbabuena, AOVE, sal y pimienta. Incorpora el puré de guisantes y mezcla bien.",
      "Saca los totopos del horno, espolvorea con pimentón y sirve con el dip de guisantes."
    ],
    "nutricion": {
      "calorias": 366,
      "proteinas": "19.65g",
      "carbohidratos": "21.45g",
      "grasas": "22.4g"
    }
  },
  "escarola_granada": {
    "id": "escarola_granada",
    "nombre": "Escarola con granada",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 8,
    "icono": "🥗",
    "descripcion": "Ensalada ligera y agridulce con toques de comino tostado.",
    "ingredientes": [
      {
        "nombre": "Escarola",
        "cantidad": "300 g"
      },
      {
        "nombre": "Granada",
        "cantidad": "275 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "8 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "10 ml"
      },
      {
        "nombre": "Comino en grano",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Para desgranar la fruta, corta la pieza en dos mitades de forma transversal. Coloca cada mitad sobre un plato o bol y da ligeros toques con la mano de un mortero hasta que se desprendan todos los granos. Reserva.",
      "Lava, escurre y trocea la escarola.",
      "En una sartén tuesta los granos de comino con cuidado para que no se quemen. Tritura en el mortero junto con el ajo. Añade un poco de sal y vinagre al gusto y el aove. Vuelca sobre la escarola.",
      "Incorpora la granada, mezcla y sirve."
    ],
    "nutricion": {
      "calorias": 181.99,
      "proteinas": "4.63g",
      "carbohidratos": "24.51g",
      "grasas": "7.27g"
    }
  },
  "tosta_aguacate_requeson": {
    "id": "tosta_aguacate_requeson",
    "nombre": "Tosta de aguacate con requesón",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🍞",
    "descripcion": "Pan integral crujiente con base de queso y aguacate laminado.",
    "ingredientes": [
      {
        "nombre": "Aguacate",
        "cantidad": "150 g"
      },
      {
        "nombre": "Requesón",
        "cantidad": "125 g"
      },
      {
        "nombre": "Tomates cherry",
        "cantidad": "80 g"
      },
      {
        "nombre": "Rebanadas de pan integral",
        "cantidad": "90 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta el aguacate y el tomate.",
      "Tuesta el pan en una tostadora o sartén antiadherente.",
      "Extiende el requesón sobre cada una de las mitades.",
      "Coloca el tomate y el aguacate sobre el requesón.",
      "Añade un poco de sal y riega con AOVE."
    ],
    "nutricion": {
      "calorias": 350.61,
      "proteinas": "11.52g",
      "carbohidratos": "30.3g",
      "grasas": "20.37g"
    }
  },
  "barquitas_berenjena": {
    "id": "barquitas_berenjena",
    "nombre": "Barquitas de berenjena con yogur y manzana",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍆",
    "descripcion": "Medias berenjenas rellenas de su carne asada con toques crujientes y ácidos.",
    "ingredientes": [
      {
        "nombre": "Berenjena",
        "cantidad": "300 g"
      },
      {
        "nombre": "Yogur natural",
        "cantidad": "125 g"
      },
      {
        "nombre": "Cebolla roja",
        "cantidad": "80 g"
      },
      {
        "nombre": "Manzana verde ácida",
        "cantidad": "200 g"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "80 ml"
      },
      {
        "nombre": "Ajo",
        "cantidad": "8 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimienta",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Pica la cebolla y ponla a marinar en zumo de limón.",
      "Corta la berenjena en dos mitades y ásala tapada en el microondas a máxima potencia durante 10 minutos.",
      "Deja templar, saca la carne y reserva la piel.",
      "Pica el ajo y media manzana y mezcla con la carne de la berenjena, el yogur y la cebolla marinada.",
      "Rellena la piel de la berenjena con la mezcla, salpimenta y decora con la otra media manzana cortada en trozos grandes."
    ],
    "nutricion": {
      "calorias": 191.88,
      "proteinas": "6.02g",
      "carbohidratos": "25.66g",
      "grasas": "7.24g"
    }
  },
  "escabeche_sardinas": {
    "id": "escabeche_sardinas",
    "nombre": "Escabeche de sardinas",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🐟",
    "descripcion": "Sardinas conservadas en una deliciosa salsa de escabeche casera.",
    "ingredientes": [
      {
        "nombre": "Sardinas limpias",
        "cantidad": "500 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "8 g"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "30 ml"
      },
      {
        "nombre": "Pimentón",
        "cantidad": "6 g"
      },
      {
        "nombre": "Granos de pimienta negra",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Hoja de laurel",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "AOVE",
        "cantidad": "60 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Pide en la pescadería que te limpien las sardinas retirando cabezas, vísceras y escamas.",
      "En una sartén con dos cucharadas de AOVE dora el diente de ajo aplastado y con piel.",
      "Añade el pimentón con cuidado para que no se queme, el resto del aceite y el vinagre y deja cocer 5 minutos.",
      "Añade el laurel, los granos de pimienta y las sardinas y deja cocer 10 minutos más. Deja que se enfríe y consume al día siguiente."
    ],
    "nutricion": {
      "calorias": 542.33,
      "proteinas": "30.59g",
      "carbohidratos": "4.08g",
      "grasas": "44.85g"
    }
  },
  "crema_calabaza_queso_azul": {
    "id": "crema_calabaza_queso_azul",
    "nombre": "Crema de calabaza y queso azul",
    "tipo": "entrante",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🎃",
    "descripcion": "Crema untuosa dulce salada con contraste de queso azul.",
    "ingredientes": [
      {
        "nombre": "Calabaza cacahuete",
        "cantidad": "500 g"
      },
      {
        "nombre": "Agua o caldo de verduras",
        "cantidad": "250 ml"
      },
      {
        "nombre": "Puerro",
        "cantidad": "80 g"
      },
      {
        "nombre": "Pimentón",
        "cantidad": "10 g"
      },
      {
        "nombre": "Queso azul",
        "cantidad": "80 g"
      },
      {
        "nombre": "Semillas de calabaza",
        "cantidad": "10 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "30 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Pela la calabaza, retira las semillas y córtala en dados. Limpia el puerro y córtalo en rodajas.",
      "Pon el aceite a calentar en una olla, añade el puerro y saltea con cuidado para que no se queme.",
      "Cuando empiece a dorar separa la olla del fuego, añade el pimentón, da una vuelta y vuelve a poner la olla al fuego.",
      "Añade los dados de calabaza y da otra vuelta. Añade el agua o el caldo de verduras, la sal y deja cocer 10 minutos.",
      "En un plato hondo, pon unos dados de queso azul.",
      "Tritura la crema con una batidora o robot y vierte sobre los dados de queso. Añade las semillas de calabaza y sirve caliente."
    ],
    "nutricion": {
      "calorias": 375.74,
      "proteinas": "14.04g",
      "carbohidratos": "12.62g",
      "grasas": "29.9g"
    }
  },
  "alubia_confetti": {
    "id": "alubia_confetti",
    "nombre": "Alubia confetti",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🫘",
    "descripcion": "Ensalada multicolor de legumbres y arroz.",
    "ingredientes": [
      {
        "nombre": "Alubias rojas",
        "cantidad": "400 g"
      },
      {
        "nombre": "Arroz integral precocido",
        "cantidad": "125 g"
      },
      {
        "nombre": "Maíz",
        "cantidad": "140 g"
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "150 g"
      },
      {
        "nombre": "Cebolleta (parte verde)",
        "cantidad": "30 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "20 ml"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "20 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Cilantro fresco",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta los tallos de cebolleta en aros y déjalos reposar con el zumo de medio limón.",
      "Cocina el arroz en el microondas siguiendo las indicaciones del fabricante. Deja enfriar.",
      "Escurre las alubias y viértelas en un bol. Escurre el maíz y viértelo sobre las alubias.",
      "Añade el pimiento cortado en dados. Añade el vasito de arroz. Añade los tallos de cebolleta cortados en dados junto al limón de la maceración.",
      "Aliña con AOVE y sal. Pica el cilantro y remata el plato."
    ],
    "nutricion": {
      "calorias": 403.95,
      "proteinas": "18.15g",
      "carbohidratos": "59.82g",
      "grasas": "10.23g"
    }
  },
  "salmon_expres": {
    "id": "salmon_expres",
    "nombre": "Salmón exprés al microondas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍣",
    "descripcion": "Salmón rápido cocinado al microondas con base de arroz y ensalada japonesa.",
    "ingredientes": [
      {
        "nombre": "Lomo de salmón",
        "cantidad": "400 g"
      },
      {
        "nombre": "Arroz basmati precocido",
        "cantidad": "125 g"
      },
      {
        "nombre": "Cebolleta",
        "cantidad": "50 g"
      },
      {
        "nombre": "Pepino",
        "cantidad": "300 g"
      },
      {
        "nombre": "Jengibre rallado",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Salsa de soja",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Semillas de sésamo",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Eneldo seco",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta el pepino en tiras con un pelador o una mandolina, espolvorea con sal y reserva.",
      "Pica la cebolla y ponla en medio vaso de agua. Reserva.",
      "Cocina el arroz en el microondas siguiendo las indicaciones del fabricante. Reserva.",
      "Lava el salmón, extrae las espinas y ponlo en un plato untado con AOVE. Sazona y espolvorea con eneldo. Cubre el plato y cocina 5 minutos a potencia máxima. Vigila el proceso, porque el tiempo final dependerá del tamaño del pescado.",
      "Escurre bien el pepino y monta una ensalada japonesa mezclando con la cebolla (también escurrida). Mezcla la soja con el vinagre, el sésamo y el jengibre. Aliña y sirve con el salmón."
    ],
    "nutricion": {
      "calorias": 561.81,
      "proteinas": "44.9g",
      "carbohidratos": "24.25g",
      "grasas": "31.69g"
    }
  },
  "tallarines_calabacin_zanahoria": {
    "id": "tallarines_calabacin_zanahoria",
    "nombre": "Tallarines de calabacín y zanahoria con vinagreta de nueces",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍝",
    "descripcion": "Fideos vegetales salteados con aderezo de mostaza y nueces.",
    "ingredientes": [
      {
        "nombre": "Zanahorias",
        "cantidad": "200 g"
      },
      {
        "nombre": "Calabacín",
        "cantidad": "200 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "5 g"
      },
      {
        "nombre": "Nueces",
        "cantidad": "25 g"
      },
      {
        "nombre": "Semillas de sésamo",
        "cantidad": "12 g"
      },
      {
        "nombre": "Mostaza de Dijon",
        "cantidad": "3 g"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "20 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Lava el calabacín y la zanahoria y forma los tallarines con un espiralizador.",
      "Saltéalos a fuego fuerte en una sartén antiadherente con AOVE y el diente de ajo picado.",
      "Mientras, prepara una vinagreta con dos cucharadas de aceite de oliva, una de vinagre y media de mostaza de Dijon.",
      "Pica las nueces.",
      "Mezcla en un bol el salteado de verduras con la vinagreta. Al servir, espolvorea con las nueces picadas y el sésamo."
    ],
    "nutricion": {
      "calorias": 222.14,
      "proteinas": "4.76g",
      "carbohidratos": "10.77g",
      "grasas": "17.78g"
    }
  },
  "brocheta_pollo_especiado": {
    "id": "brocheta_pollo_especiado",
    "nombre": "Brocheta de pollo especiado",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍢",
    "descripcion": "Brochetas asadas de pollo, pimiento y fruta fresca.",
    "ingredientes": [
      {
        "nombre": "Pechuga de pollo",
        "cantidad": "300 g"
      },
      {
        "nombre": "Cebolla",
        "cantidad": "40 g"
      },
      {
        "nombre": "Tomates cherry",
        "cantidad": "60 g"
      },
      {
        "nombre": "Nectarina",
        "cantidad": "150 g"
      },
      {
        "nombre": "Pimiento verde",
        "cantidad": "100 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "10 ml"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimienta molida",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimentón",
        "cantidad": "8 g"
      },
      {
        "nombre": "Rúcula",
        "cantidad": "100 g"
      },
      {
        "nombre": "Nueces",
        "cantidad": "25 g"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta la pechuga en dados, salpimenta y pon en un bol junto con la cebolla rallada, el pimentón, el zumo de limón y un chorrito de AOVE. Deja reposar.",
      "Lava y corta el pimiento, la nectarina (sin piel) y la cebolla de un tamaño similar al de los trozos de pollo.",
      "Forma las brochetas ensartando el pollo, la fruta, las verduras cortadas y los tomates.",
      "Cocina las brochetas en una plancha o sartén antiadherente con AOVE.",
      "Monta una ensalada con rúcula y nueces. Aliña con AOVE, zumo de limón y sal."
    ],
    "nutricion": {
      "calorias": 316.08,
      "proteinas": "38.69g",
      "carbohidratos": "12.34g",
      "grasas": "12.44g"
    }
  },
  "miniburger_alubias_atun": {
    "id": "miniburger_alubias_atun",
    "nombre": "Miniburger de alubias y atún",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍔",
    "descripcion": "Hamburguesas nutritivas hechas con legumbres y atún.",
    "ingredientes": [
      {
        "nombre": "Alubias blancas cocidas",
        "cantidad": "240 g"
      },
      {
        "nombre": "Atún en aceite de oliva o al natural",
        "cantidad": "185 g"
      },
      {
        "nombre": "Huevo",
        "cantidad": "60 g"
      },
      {
        "nombre": "Pan rallado",
        "cantidad": "30 g"
      },
      {
        "nombre": "Lechuga, espinacas u otras hojas verdes",
        "cantidad": "200 g"
      },
      {
        "nombre": "Mostaza de Dijon",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "5 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Limón",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "Tomates cherry",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Orégano seco",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Escurre las alubias y aplástalas con un tenedor hasta formar una pasta.",
      "Si usas atún en AOVE no necesitas añadir aceite a la mezcla. Incorpora atún escurrido, un huevo y dos cucharadas de pan rallado.",
      "Aliña con una cucharada de mostaza de Dijon, otra de orégano seco, la ralladura de un limón y sal. Forma un puré.",
      "Con la masa resultante, forma las mini-burguer. En una sartén antiadherente con AOVE márcalas hasta que estén doradas.",
      "Sirve con las hojas verdes y los tomates aliñados con AOVE y sal."
    ],
    "nutricion": {
      "calorias": 402.38,
      "proteinas": "38.61g",
      "carbohidratos": "24.59g",
      "grasas": "16.62g"
    }
  },
  "poke_pollo_harvard": {
    "id": "poke_pollo_harvard",
    "nombre": "Poke de pollo al estilo Harvard",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Bol equilibrado de pollo, verduras y frutas siguiendo la proporción ideal.",
    "ingredientes": [
      {
        "nombre": "Pechuga de pollo",
        "cantidad": "300 g"
      },
      {
        "nombre": "Arroz integral precocido",
        "cantidad": "125 g"
      },
      {
        "nombre": "Melocotón",
        "cantidad": "150 g"
      },
      {
        "nombre": "Melón",
        "cantidad": "100 g"
      },
      {
        "nombre": "Canónigos",
        "cantidad": "80 g"
      },
      {
        "nombre": "Tomate cherry",
        "cantidad": "100 g"
      },
      {
        "nombre": "Pepino",
        "cantidad": "100 g"
      },
      {
        "nombre": "Anacardos",
        "cantidad": "8 g"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta la pechuga en trozos de un solo bocado y saltea en una sartén antiadherente con AOVE y sal. Reserva.",
      "Pela y lamina el melocotón. Reserva.",
      "Cuece el arroz en el microondas siguiendo las indicaciones del fabricante. Reserva.",
      "Quita la piel del melón, corta en láminas y reserva.",
      "Lamina el tomate y el pepino. Reserva.",
      "Monta el poke, añade unos anacardos y aliña con AOVE, zumo de limón y sal."
    ],
    "nutricion": {
      "calorias": 450.76,
      "proteinas": "40.27g",
      "carbohidratos": "38.76g",
      "grasas": "14.96g"
    }
  },
  "rainbow_wrap_anchoas": {
    "id": "rainbow_wrap_anchoas",
    "nombre": "Rainbow wrap con salsa de anchoas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🌯",
    "descripcion": "Enrollado con variedad de vegetales coloridos y sabrosa salsa.",
    "ingredientes": [
      {
        "nombre": "Tortillas de trigo integral",
        "cantidad": "75 g"
      },
      {
        "nombre": "Queso fresco",
        "cantidad": "60 g"
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "40 g"
      },
      {
        "nombre": "Hojas de espinacas",
        "cantidad": "150 g"
      },
      {
        "nombre": "Zanahoria",
        "cantidad": "80 g"
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "150 g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "120 g"
      },
      {
        "nombre": "Agua",
        "cantidad": "2 cucharadas"
      },
      {
        "nombre": "Filetes de anchoa en conserva",
        "cantidad": "4 unidades"
      },
      {
        "nombre": "Ajo",
        "cantidad": "3 g"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Cuece los huevos durante 5 min, pélalos y reserva.",
      "Corta en tiras la cebolla, el pimiento rojo y la zanahoria.",
      "Corta el queso fresco en lámina.",
      "Para hacer la salsa, bate los huevos cocidos con el ajo, los filetes de anchoa escurridos, dos cucharadas de aceite y zumo de limón.",
      "Calienta la tortilla, úntala con una cucharada de salsa y dispón encima las verduras, las hortalizas y el queso.",
      "Enrolla y sirve con la salsa aparte en un recipiente."
    ],
    "nutricion": {
      "calorias": 274.17,
      "proteinas": "15.53g",
      "carbohidratos": "13.84g",
      "grasas": "17.41g"
    }
  },
  "mini_green_pizza": {
    "id": "mini_green_pizza",
    "nombre": "Mini green pizza",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍕",
    "descripcion": "Pizza en pan de pita con base verde y mozzarella.",
    "ingredientes": [
      {
        "nombre": "Pitas integrales",
        "cantidad": "180 g"
      },
      {
        "nombre": "Brócoli",
        "cantidad": "150 g"
      },
      {
        "nombre": "Mozzarella fresca",
        "cantidad": "100 g"
      },
      {
        "nombre": "Rúcula",
        "cantidad": "100 g"
      },
      {
        "nombre": "Nueces peladas crudas",
        "cantidad": "25 g"
      },
      {
        "nombre": "Queso parmesano",
        "cantidad": "30 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "3 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimienta",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Tomates cherry",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta las pitas transversalmente y reserva.",
      "Lava el brócoli y córtalo en ramilletes pequeños y del mismo tamaño. Introdúcelo en un recipiente apto para cocinar en microondas, tapa y cocina durante 4 minutos a máxima potencia. Reserva.",
      "Precalienta el horno en modo grill.",
      "En el vaso de la batidora, coloca la rúcula, el ajo, el parmesano rallado, las nueces, dos cucharadas de aceite y una pizca de sal. Bate y reserva.",
      "Corta la mozzarella en rodajas.",
      "En cada media pita, coloca una rodaja de mozzarella, unos ramilletes de brócoli y cubre con el pesto de rúcula y nueces.",
      "Mete en el horno, gratina 3 minutos o hasta que se funda el queso y sirve."
    ],
    "nutricion": {
      "calorias": 408.48,
      "proteinas": "17.48g",
      "carbohidratos": "5.53g",
      "grasas": "35.16g"
    }
  },
  "lubina_patatas_verduras": {
    "id": "lubina_patatas_verduras",
    "nombre": "Lubina con patatas y cama de verduras",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🐟",
    "descripcion": "Pescado suave cocinado en microondas con guarnición.",
    "ingredientes": [
      {
        "nombre": "Lomos de lubina sin piel ni espinas",
        "cantidad": "400 g"
      },
      {
        "nombre": "Patatas medianas",
        "cantidad": "200 g"
      },
      {
        "nombre": "Cebolla",
        "cantidad": "50 g"
      },
      {
        "nombre": "Tomate",
        "cantidad": "80 g"
      },
      {
        "nombre": "Pimientos de colores",
        "cantidad": "150 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "10 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Lava la patata, pínchala con un tenedor y cuécela sin secar al microondas con la tapa durante 6 min a máxima potencia. Pínchala y, si no está cocida, ponla un minutos más y vuelve a comprobar. Reserva.",
      "Corta la cebolla en aros y ponla en un recipiente apto para microondas con dos cucharadas de agua, sal y un chorrito de aceite. Tapa y cocina 5 minutos a máxima potencia.",
      "Corta el tomate en rodajas y los pimientos en tiras y añádelos a la cebolla. Cocina otros 5 minutos a máxima potencia.",
      "Lava y seca el pescado. Colócalo sobre las verduras con un poco de sal y AOVE. Tapa y cocina 5 minutos a media potencia.",
      "Mientras tanto, pela las patatas y córtalas en rodajas. Sírvelas como acompañamiento de la lubina."
    ],
    "nutricion": {
      "calorias": 388.86,
      "proteinas": "45.94g",
      "carbohidratos": "20g",
      "grasas": "13.9g"
    }
  },
  "ensalada_frutos_rojos_cuscus": {
    "id": "ensalada_frutos_rojos_cuscus",
    "nombre": "Ensalada de frutos rojos, setas y cuscús",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Contraste de sabor con base de cuscús, rulo de cabra y fruta.",
    "ingredientes": [
      {
        "nombre": "Queso rulo de cabra",
        "cantidad": "100 g"
      },
      {
        "nombre": "Brotes de lechuga",
        "cantidad": "150 g"
      },
      {
        "nombre": "Cuscús integral",
        "cantidad": "50 g"
      },
      {
        "nombre": "Setas ostra",
        "cantidad": "200 g"
      },
      {
        "nombre": "Frutos rojos",
        "cantidad": "200 g"
      },
      {
        "nombre": "Cebollino",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Ajo",
        "cantidad": "3 g"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Hidrata el cuscús según las indicaciones del fabricante.",
      "Limpia las setas con un papel de cocina húmedo.",
      "Corta las setas en tiras y saltea con medio diente de ajo picado, AOVE y sal.",
      "Tuesta en la sartén las rodajas de queso de cabra por ambos lados.",
      "Monta el plato con una base de ensalada y dispón encima el rulo de cabra y los frutos rojos. Aliña con AOVE y unas gotas de vinagre. Espolvorea con cebollino.",
      "Acompaña con el cuscús hidratado."
    ],
    "nutricion": {
      "calorias": 387.62,
      "proteinas": "16.54g",
      "carbohidratos": "31.27g",
      "grasas": "21.82g"
    }
  },
  "espaguetis_estudiante": {
    "id": "espaguetis_estudiante",
    "nombre": "Espaguetis del estudiante",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍝",
    "descripcion": "Plato de pasta fácil con sardinas en conserva y aceitunas.",
    "ingredientes": [
      {
        "nombre": "Espaguetis integrales",
        "cantidad": "160 g"
      },
      {
        "nombre": "Tomate natural triturado",
        "cantidad": "290 g"
      },
      {
        "nombre": "Sardinas en conserva",
        "cantidad": "88 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "10 g"
      },
      {
        "nombre": "Aceitunas negras",
        "cantidad": "25 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Orégano seco",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Cuece la pasta siguiendo las indicaciones del fabricante.",
      "Mientras tanto, en un bol de cristal pon una cucharada de AOVE y los dos dientes de ajo partidos por la mitad. Calienta en el microondas un minuto a máxima potencia. Añade el contenido de la lata de tomate y un poco de orégano y cocina 10 minutos a máxima potencia.",
      "Mezcla la pasta con la salsa de tomate y las sardinas escurridas y desmenuzadas. Añade unas aceitunas negras en rodajas y sirve el plato espolvoreando el orégano."
    ],
    "nutricion": {
      "calorias": 515.62,
      "proteinas": "23.19g",
      "carbohidratos": "61.84g",
      "grasas": "19.5g"
    }
  },
  "tortilla_patata_calabacin": {
    "id": "tortilla_patata_calabacin",
    "nombre": "Tortilla de patata y calabacín al microondas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍳",
    "descripcion": "Tortilla jugosa y saludable sin freír la patata.",
    "ingredientes": [
      {
        "nombre": "Patatas medianas",
        "cantidad": "300 g"
      },
      {
        "nombre": "Cebolla",
        "cantidad": "40 g"
      },
      {
        "nombre": "Calabacín pequeño",
        "cantidad": "150 g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "300 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "22 ml"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta la cebolla en aros, ponla en un recipiente apto para microondas, añade media cucharada de AOVE, tapa y cocina 5 minutos a máxima potencia.",
      "Mientras, corta la patata en láminas finas. Añade sobre la cebolla y cocina 6 minutos a máxima potencia.",
      "Entretanto, corta el calabacín en rodajas de 0,5 cm, incorpóralo a la mezcla de patata y cebolla y cocina otros 4 minutos a máxima potencia.",
      "Bate los huevos, añade sal, incorpora la cebolla, la patata y el calabacín y cuaja la tortilla en una sartén antiadherente con una cucharada de AOVE."
    ],
    "nutricion": {
      "calorias": 229.34,
      "proteinas": "11.58g",
      "carbohidratos": "26.9g",
      "grasas": "11.58g"
    }
  },
  "pitas_huevo_espinacas": {
    "id": "pitas_huevo_espinacas",
    "nombre": "Pitas con huevo, espinacas y queso",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥙",
    "descripcion": "Bocadillos rellenos calientes y sabrosos.",
    "ingredientes": [
      {
        "nombre": "Pitas integrales",
        "cantidad": "180 g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "180 g"
      },
      {
        "nombre": "Espinacas crudas",
        "cantidad": "150 g"
      },
      {
        "nombre": "Tomates secos",
        "cantidad": "15 g"
      },
      {
        "nombre": "Mini rulo de cabra",
        "cantidad": "180 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Pimienta",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Hidrata los tomates durante al menos 15 minutos en agua muy caliente.",
      "Lava y corta las espinacas en trozos pequeños.",
      "Prepara unos medallones de queso de cabra cortados en dos.",
      "Bate los huevos y cuájalos en una sartén antiadherente con unas gotas de AOVE, sal y pimienta molida.",
      "Calienta las pitas en el tostador siguiendo las indicaciones del fabricante y rellénalas con los huevos revueltos, las espinacas, el queso y los tomates, ya hidratados, picados en trozos pequeños."
    ],
    "nutricion": {
      "calorias": 302.68,
      "proteinas": "17.33g",
      "carbohidratos": "5.51g",
      "grasas": "23.48g"
    }
  },
  "alcachofas_langostinos": {
    "id": "alcachofas_langostinos",
    "nombre": "Alcachofas con langostinos",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🦐",
    "descripcion": "Salteado mar y tierra muy rápido de preparar.",
    "ingredientes": [
      {
        "nombre": "Langostinos congelados",
        "cantidad": "250 g"
      },
      {
        "nombre": "Corazones de alcachofa congelados",
        "cantidad": "250 g"
      },
      {
        "nombre": "Cebolla",
        "cantidad": "80 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "8 g"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "10 ml"
      }
    ],
    "pasos": [
      "Descongela previamente los langostinos, lávalos, pélalos y reserva.",
      "Pon los corazones de alcachofa (sin descongelar ni lavar previamente), en un recipiente apto para microondas con un chorrito de AOVE y sal. Tapa y cocina 5 minutos a máxima potencia.",
      "Sofríe la cebolla y el ajo picado en una sartén con dos cucharadas de AOVE.",
      "Cuando la cebolla esté transparente, añade las alcachofas cocidas y los langostinos pelados. Saltea y sirve caliente."
    ],
    "nutricion": {
      "calorias": 242.59,
      "proteinas": "31.5g",
      "carbohidratos": "13.15g",
      "grasas": "7.11g"
    }
  },
  "lentejas_arroz_curcuma": {
    "id": "lentejas_arroz_curcuma",
    "nombre": "Lentejas con arroz y cúrcuma",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍛",
    "descripcion": "Crema de legumbres muy especiada sobre arroz.",
    "ingredientes": [
      {
        "nombre": "Lentejas cocidas",
        "cantidad": "400 g"
      },
      {
        "nombre": "Cebolla",
        "cantidad": "80 g"
      },
      {
        "nombre": "Zanahoria",
        "cantidad": "100 g"
      },
      {
        "nombre": "Tomate maduro",
        "cantidad": "80 g"
      },
      {
        "nombre": "Arroz integral precocido",
        "cantidad": "125 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Cúrcuma",
        "cantidad": "1 cucharada"
      }
    ],
    "pasos": [
      "Pica en daditos la cebolla y el tomate. Lava, pela y ralla la zanahoria.",
      "En una cazuela con dos cucharadas de AOVE y sofríe la cebolla. Cuando esté transparente, añade la zanahoria y el tomate.",
      "Cuando el tomate adquiera un tono naranja, añade las lentejas escurridas y enjuagadas. Cubre con agua y deja hervir 5 minutos.",
      "Añade una cucharada de cúrcuma y tritura con una batidora o robot. Añade más agua si la crema está demasiado espesa.",
      "Cocina el arroz en el microondas según las instrucciones del fabricante.",
      "Sirve la crema en cuencos con dos o tres cucharadas de arroz cocido y espolvorea con cúrcuma."
    ],
    "nutricion": {
      "calorias": 593,
      "proteinas": "24.67g",
      "carbohidratos": "82.54g",
      "grasas": "18.24g"
    }
  },
  "garbanzos_pisto": {
    "id": "garbanzos_pisto",
    "nombre": "Garbanzos con pisto y ras el hanout",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍲",
    "descripcion": "Guiso expres muy aromático gracias a la mezcla de especias.",
    "ingredientes": [
      {
        "nombre": "Garbanzos cocidos",
        "cantidad": "400 g"
      },
      {
        "nombre": "Pisto en conserva",
        "cantidad": "400 g"
      },
      {
        "nombre": "Ras el hanout",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Hojas de cilantro o hierbabuena",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Escurre los garbanzos, enjuaga y ponlos en una cazuela cubiertos de agua. Enciende el fuego.",
      "Añade el pisto y cuece unos minutos desde que empiece a hervir.",
      "Pon más agua si te gusta más caldoso, incorpora una cucharada de ras el hanout y deja que vuelva a hervir.",
      "Retira del fuego, prueba y añade más especias si te gusta más especiado.",
      "Sirve caliente espolvoreado con cilantro o hierbabuena."
    ],
    "nutricion": {
      "calorias": 297.95,
      "proteinas": "18.68g",
      "carbohidratos": "41.88g",
      "grasas": "6.19g"
    }
  },
  "escalivada_bacalao": {
    "id": "escalivada_bacalao",
    "nombre": "Escalivada con alma de germinados y bacalao",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🐟",
    "descripcion": "Plato frío completo a base de verduras asadas en conserva y bacalao.",
    "ingredientes": [
      {
        "nombre": "Escalivada en conserva",
        "cantidad": "300 g"
      },
      {
        "nombre": "Bacalao desalado y desmigado",
        "cantidad": "250 g"
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "80 g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "150 g"
      },
      {
        "nombre": "Germinados",
        "cantidad": "15 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Cuece los huevos durante 10 minutos, deja que enfríen y ralla con un rallador.",
      "Corta la cebolleta.",
      "Escurre las verduras y móntalas en un plato hondo.",
      "Escurre las migas de bacalao y colócalas sobre las verduras.",
      "Reparte la cebolleta sobre el bacalao, añade el huevo rallado y remata con los germinados.",
      "Aliña con AOVE, vinagre y sal."
    ],
    "nutricion": {
      "calorias": 395.86,
      "proteinas": "61.67g",
      "carbohidratos": "9.08g",
      "grasas": "12.54g"
    }
  },
  "copazo_ensaladilla": {
    "id": "copazo_ensaladilla",
    "nombre": "Copazo de ensaladilla",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥗",
    "descripcion": "Versión rápida de la ensaladilla clásica.",
    "ingredientes": [
      {
        "nombre": "Patatas medianas",
        "cantidad": "300 g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "100 g"
      },
      {
        "nombre": "Zanahoria",
        "cantidad": "100 g"
      },
      {
        "nombre": "Atún al natural",
        "cantidad": "185 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "20 ml"
      },
      {
        "nombre": "Zumo de limón",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Cuece los huevos durante 10 minutos. Lava las patatas, sécalas parcialmente, pínchalas varias veces con un tenedor y ponlas en un recipiente apto para microondas, con un poco de agua. Tapa y cuece 10 minutos a máxima potencia. Deja enfriar.",
      "Lava las zanahorias, córtalas en rodajas y ponlas en un recipiente apto para microondas con agua y sal. Cuece cinco minutos a máxima potencia. Deja enfriar.",
      "Pela las patatas y corta en dados. Corta en dados las rodajas de zanahoria y mezcla todo con el atún escurrido.",
      "Pela los huevos duros, añade el AOVE, zumo de limón al gusto y sal. Bate con una batidora o robot hasta formar una salsa cremosa y mezcla con la preparación anterior."
    ],
    "nutricion": {
      "calorias": 247.28,
      "proteinas": "10.26g",
      "carbohidratos": "28.25g",
      "grasas": "10.36g"
    }
  },
  "tortilla_setas_espinacas": {
    "id": "tortilla_setas_espinacas",
    "nombre": "Tortilla de setas y espinacas",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍳",
    "descripcion": "Tortilla exprés usando espinacas congeladas y setas.",
    "ingredientes": [
      {
        "nombre": "Espinacas congeladas",
        "cantidad": "250 g"
      },
      {
        "nombre": "Setas de temporada",
        "cantidad": "250 g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "300 g"
      },
      {
        "nombre": "Ajo",
        "cantidad": "8 g"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "En una sartén caliente saltea las espinacas congeladas con AOVE siguiendo las indicaciones de tiempo dadas por el fabricante.",
      "Mientras, trocea las setas y saltéalas con un diente de ajo laminado y AOVE en otra sartén hasta que pierdan el agua.",
      "Bate los huevos con un poco de sal, añade las espinacas y las setas y cuaja la tortilla en una sartén antiadherente."
    ],
    "nutricion": {
      "calorias": 210.73,
      "proteinas": "7.22g",
      "carbohidratos": "9.26g",
      "grasas": "16.09g"
    }
  },
  "olleta_arroz_integral": {
    "id": "olleta_arroz_integral",
    "nombre": "Olleta de arroz integral",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥘",
    "descripcion": "Guiso de arroz rápido con base de legumbre y verduras.",
    "ingredientes": [
      {
        "nombre": "Arroz integral precocido",
        "cantidad": "60 g"
      },
      {
        "nombre": "Acelgas",
        "cantidad": "40 g"
      },
      {
        "nombre": "Alubias blancas cocidas",
        "cantidad": "60 g"
      },
      {
        "nombre": "Judías verdes",
        "cantidad": "100 g"
      },
      {
        "nombre": "Nabo",
        "cantidad": "100 g"
      },
      {
        "nombre": "Patata",
        "cantidad": "80 g"
      },
      {
        "nombre": "Agua",
        "cantidad": "500 ml"
      },
      {
        "nombre": "Azafrán",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Comino",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Sal",
        "cantidad": "al gusto"
      },
      {
        "nombre": "AOVE",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Corta la patata en trozos y ponla a cocer en una olla con agua, sal, comino y azafrán.",
      "Trocea las acelgas, los nabos y las judías verdes y añádelas a la olla cuando comience a hervir.",
      "Cuece el vaso de arroz en el microondas y añade la mitad a la olla.",
      "Añade dos o tres cucharadas de alubias blancas cocidas.",
      "Deja cocer la olla 15 minutos.",
      "Apaga el fuego y añade AOVE. Sirve caliente."
    ],
    "nutricion": {
      "calorias": 424.8,
      "proteinas": "10.5g",
      "carbohidratos": "46.2g",
      "grasas": "22g"
    }
  },
  "ramen_casero": {
    "id": "ramen_casero",
    "nombre": "Ramen casero",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍜",
    "descripcion": "Sopa reconfortante de fideos de arroz rápida.",
    "ingredientes": [
      {
        "nombre": "Caldo vegetal",
        "cantidad": "1 l"
      },
      {
        "nombre": "Fideos de arroz integrales",
        "cantidad": "50 g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "150 g"
      },
      {
        "nombre": "Zanahoria rallada",
        "cantidad": "80 g"
      },
      {
        "nombre": "Brotes de soja",
        "cantidad": "40 g"
      },
      {
        "nombre": "Tallos verdes de cebolleta",
        "cantidad": "20 g"
      },
      {
        "nombre": "Semillas de sésamo",
        "cantidad": "10 g"
      },
      {
        "nombre": "Lámina de alga nori",
        "cantidad": "1 unidad"
      }
    ],
    "pasos": [
      "Cuece los huevos durante 6 minutos, retira del fuego y ponlos en agua fría para cortar la cocción.",
      "Cuece los fideos según las indicaciones del fabricante. Escúrrelos y reserva en un bol.",
      "Calienta el caldo en el microondas y vierte sobre los fideos.",
      "Corta el tallo de la cebolleta en aros finos.",
      "Añade el topping de zanahoria rallada, los brotes de soja, el tallo de la cebolleta y el huevo cocido cortado en dos.",
      "Decora con alga nori y sésamo molido y sirve caliente."
    ],
    "nutricion": {
      "calorias": 311.15,
      "proteinas": "18.42g",
      "carbohidratos": "30.41g",
      "grasas": "12.87g"
    }
  },
  "helado_yogur_chocolate_platano": {
    "id": "helado_yogur_chocolate_platano",
    "nombre": "Helado casero de yogur, chocolate y plátano",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍦",
    "descripcion": "Postre helado fácil utilizando fruta congelada.",
    "ingredientes": [
      {
        "nombre": "Yogur natural",
        "cantidad": "125 g"
      },
      {
        "nombre": "Plátano sin piel",
        "cantidad": "80 g"
      },
      {
        "nombre": "Cacao puro",
        "cantidad": "1 cucharada"
      }
    ],
    "pasos": [
      "Machaca el plátano con un tenedor.",
      "Mezcla con el yogur y el cacao.",
      "Coloca la mezcla en moldes. Puedes usar moldes para magdalenas de papel o silicona.",
      "Pincha las paletas... ¡y al congelador!."
    ],
    "nutricion": {
      "calorias": 121.59,
      "proteinas": "3.34g",
      "carbohidratos": "17.9g",
      "grasas": "4.07g"
    }
  },
  "batido_platano_arandanos": {
    "id": "batido_platano_arandanos",
    "nombre": "Batido de plátano y arándanos con avena",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥤",
    "descripcion": "Licuado espeso y saludable de frutas con avena.",
    "ingredientes": [
      {
        "nombre": "Arándanos",
        "cantidad": "100 g"
      },
      {
        "nombre": "Plátano",
        "cantidad": "40 g"
      },
      {
        "nombre": "Avena molida",
        "cantidad": "60 g"
      },
      {
        "nombre": "Leche o bebida vegetal",
        "cantidad": "250 ml"
      },
      {
        "nombre": "Canela o nuez moscada",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Hielo picado",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "En el vaso de la batidora pon los arándanos, el medio plátano, la avena, la leche o bebida vegetal y bate.",
      "Añade hielo picado al gusto y espolvorea con canela molida o nuez moscada."
    ],
    "nutricion": {
      "calorias": 232.6,
      "proteinas": "8.77g",
      "carbohidratos": "34.08g",
      "grasas": "6.8g"
    }
  },
  "pudding_chia_mango": {
    "id": "pudding_chia_mango",
    "nombre": "Pudding de chía con mango",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍮",
    "descripcion": "Dulce cremoso y saciante de chía hidratada en leche de coco con fruta.",
    "ingredientes": [
      {
        "nombre": "Mango duro",
        "cantidad": "300 g"
      },
      {
        "nombre": "Semillas de chía",
        "cantidad": "50 g"
      },
      {
        "nombre": "Leche de coco",
        "cantidad": "400 ml"
      }
    ],
    "pasos": [
      "Mezcla la chía con la leche de coco y deja que se hidrate siguiendo las indicaciones del fabricante. Si tienes tiempo, pon a hidratar la noche anterior o a mediodía si vas a consumirla por la noche.",
      "Pela el mango, retira la semilla y córtalo en trozos pequeños. Reserva un cuarto de la pieza y córtala en daditos uniformes.",
      "Tritura la parte que no has reservado con una batidora o robot.",
      "Monta el vaso alternando capas de puré de mango y de chía con coco. Decora con los daditos de mango reservados."
    ],
    "nutricion": {
      "calorias": 277.76,
      "proteinas": "8.61g",
      "carbohidratos": "30.18g",
      "grasas": "44.47g"
    }
  },
  "pina_plancha_cardamomo": {
    "id": "pina_plancha_cardamomo",
    "nombre": "Piña a la plancha con cardamomo",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🍍",
    "descripcion": "Fruta caliente y aromática con toque exótico de cardamomo.",
    "ingredientes": [
      {
        "nombre": "Piña natural",
        "cantidad": "500 g"
      },
      {
        "nombre": "Vaina de cardamomo verde",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "Piel de lima o limón",
        "cantidad": "al gusto"
      },
      {
        "nombre": "Hojas de hierbabuena",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Pela la piña, retira el centro, corta la mitad en dos y forma cuñas.",
      "Asa las cuñas en una sartén antiadherente hasta que estén doradas.",
      "Muele la vaina de cardamomo en un mortero.",
      "Sirve la piña espolvoreada con el cardamomo, ralladura de lima o limón y unas hojas de hierbabuena."
    ],
    "nutricion": {
      "calorias": 131.68,
      "proteinas": "0.65g",
      "carbohidratos": "31.46g",
      "grasas": "0.36g"
    }
  },
  "gajos_naranja_menta_chocolate": {
    "id": "gajos_naranja_menta_chocolate",
    "nombre": "Gajos de naranja con menta y chocolate",
    "tipo": "postre",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍊",
    "descripcion": "Golosos gajos de fruta recubiertos en chocolate.",
    "ingredientes": [
      {
        "nombre": "Naranjas",
        "cantidad": "300 g"
      },
      {
        "nombre": "Chocolate negro (85% - 90% cacao) para fundir",
        "cantidad": "100 g"
      },
      {
        "nombre": "Hojas de menta",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Pela las naranjas, separa los gajos y sécalos con papel de cocina.",
      "Funde el chocolate en el microondas siguiendo las indicaciones del fabricante.",
      "Sumerge cada gajo hasta la mitad en el chocolate fundido y colócalos en un plato separados unos de otros para que se enfríen al menos 5 min.",
      "Déjalos 10 min más en la nevera y sirve acompañados con hojas de menta."
    ],
    "nutricion": {
      "calorias": 318.09,
      "proteinas": "6.13g",
      "carbohidratos": "27.2g",
      "grasas": "20.53g"
    }
  },
  "curry_rapido_de_garbanzos_y_espinacas": {
    "id": "curry_rapido_de_garbanzos_y_espinacas",
    "nombre": "Curry rápido de garbanzos y espinacas [1]",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🍛",
    "descripcion": "Un plato de cuchara caliente, completo y rápido de preparar. [1]",
    "ingredientes": [
      {
        "nombre": "Garbanzos cocidos",
        "cantidad": "400g"
      },
      {
        "nombre": "Espinacas baby",
        "cantidad": "150g"
      },
      {
        "nombre": "Leche de coco",
        "cantidad": "200ml"
      },
      {
        "nombre": "Pasta de curry (amarillo o rojo)",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Cebolla",
        "cantidad": "1/2 unidad"
      },
      {
        "nombre": "Ajo",
        "cantidad": "1 diente"
      }
    ],
    "pasos": [
      "Pica finamente la cebolla y el ajo y sofríelos en una sartén con el aceite de oliva. [1]",
      "Añade la pasta de curry y remueve un minuto para que suelte sus aromas. [1]",
      "Incorpora los garbanzos escurridos y la leche de coco. [1]",
      "Deja cocer a fuego medio durante 10 minutos. [1]",
      "En el último minuto apaga el fuego, añade las espinacas baby y tápalo. [1]",
      "El calor residual las cocinará. [1]",
      "Sirve caliente (puede acompañarse de arroz). [1]"
    ],
    "nutricion": {
      "calorias": null,
      "proteinas": null,
      "carbohidratos": null,
      "grasas": null
    }
  },
  "quinoa_con_verduras_asadas_y_huevo_poche": {
    "id": "quinoa_con_verduras_asadas_y_huevo_poche",
    "nombre": "Quinoa con verduras asadas y huevo poché [2]",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 30,
    "icono": "🥗",
    "descripcion": "Bol nutricionalmente completo con cereales tostados y huevo. [2]",
    "ingredientes": [
      {
        "nombre": "Quinoa",
        "cantidad": "100g"
      },
      {
        "nombre": "Calabacín",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "Pimiento rojo",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "Huevos",
        "cantidad": "2 unidades"
      },
      {
        "nombre": "Cebolla morada",
        "cantidad": "1/2 unidad"
      },
      {
        "nombre": "Vinagre",
        "cantidad": "un chorrito"
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "2 cucharadas"
      },
      {
        "nombre": "Sal y pimienta",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Pica el calabacín, el pimiento y la cebolla en dados. [2]",
      "Échalos en una bandeja de horno, añade sal, pimienta y aceite, y hornea a 200ºC por 20 minutos. [2]",
      "Lava bien la quinoa y cuécela unos 15 minutos. [2]",
      "Escúrrela bien. [2]",
      "Para el huevo poché: hierve agua en un cazo con un chorrito de vinagre. [2]",
      "Remueve para hacer un remolino, echa el huevo sin cáscara y deja cocer 3 minutos. [2]",
      "Retira con espumadera. [2]",
      "Mezcla la quinoa con las verduras, sírvelo en un bol y pon el huevo poché encima para romperlo al comer. [2]"
    ],
    "nutricion": {
      "calorias": null,
      "proteinas": null,
      "carbohidratos": null,
      "grasas": null
    }
  },
  "fajitas_de_pollo_y_pimientos": {
    "id": "fajitas_de_pollo_y_pimientos",
    "nombre": "Fajitas de pollo y pimientos [3]",
    "tipo": "plato principal",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🌯",
    "descripcion": "Pollo y verduras salteadas en una sola sartén ideales para enrollar. [3]",
    "ingredientes": [
      {
        "nombre": "Pechuga de pollo",
        "cantidad": "300g"
      },
      {
        "nombre": "Mezcla de pimientos (rojo, verde, amarillo)",
        "cantidad": "200g"
      },
      {
        "nombre": "Cebolla",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "Tortillas de trigo o maíz",
        "cantidad": "4 unidades"
      },
      {
        "nombre": "Sazonador de fajitas",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "1 cucharada"
      }
    ],
    "pasos": [
      "Corta el pollo, los pimientos y la cebolla en tiras finas. [3]",
      "En una sartén amplia, saltea la cebolla y los pimientos a fuego fuerte hasta que doren ligeramente. [3]",
      "Añade el pollo y sáltealo hasta que esté cocinado por todos lados. [3]",
      "Espolvorea el sazonador de fajitas, remueve bien para que todo se impregne y aparta del fuego. [3]",
      "Calienta las tortillas y sirve la mezcla dentro. [3]"
    ],
    "nutricion": {
      "calorias": null,
      "proteinas": null,
      "carbohidratos": null,
      "grasas": null
    }
  },
  "frittata_de_aprovechamiento": {
    "id": "frittata_de_aprovechamiento",
    "nombre": "Frittata de aprovechamiento (verduras de la nevera) [4]",
    "tipo": "aprovechamiento",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍳",
    "descripcion": "Ideal para gastar cualquier verdura, queso o embutido suelto en la nevera. [4]",
    "ingredientes": [
      {
        "nombre": "Huevos",
        "cantidad": "4 unidades"
      },
      {
        "nombre": "Restos de verduras asadas o cocidas (ej. tomates cherry, brócoli, calabacín)",
        "cantidad": "200g"
      },
      {
        "nombre": "Restos de queso suelto",
        "cantidad": "50g"
      },
      {
        "nombre": "Leche o nata",
        "cantidad": "un chorrito"
      },
      {
        "nombre": "Aceite de oliva",
        "cantidad": "1 cucharada"
      },
      {
        "nombre": "Sal y hierbas provenzales",
        "cantidad": "al gusto"
      }
    ],
    "pasos": [
      "Bate los huevos con un chorrito de leche, sal y hierbas. [4]",
      "Añade los restos de verduras y el queso troceado a la mezcla de huevos. [4]",
      "En una sartén apta para horno (o tapada a fuego muy bajo) precalienta el aceite de oliva. [4]",
      "Vierte la mezcla. [4]",
      "Deja que cuaje el borde a fuego medio durante 5 minutos. [4]",
      "Termina de cuajar la parte superior metiendo la sartén al horno en modo grill unos minutos, o dándole la vuelta como a una tortilla. [4]"
    ],
    "nutricion": {
      "calorias": null,
      "proteinas": null,
      "carbohidratos": null,
      "grasas": null
    }
  },
  "arroz_frito_tres_delicias_de_aprovechamiento": {
    "id": "arroz_frito_tres_delicias_de_aprovechamiento",
    "nombre": "Arroz frito tres delicias de aprovechamiento [5]",
    "tipo": "aprovechamiento",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍚",
    "descripcion": "La clásica forma de darle vida al arroz blanco sobrante. [5]",
    "ingredientes": [
      {
        "nombre": "Arroz cocido de días anteriores (del frío de la nevera)",
        "cantidad": "250g"
      },
      {
        "nombre": "Huevos",
        "cantidad": "2 unidades"
      },
      {
        "nombre": "Guisantes",
        "cantidad": "50g"
      },
      {
        "nombre": "Restos de fiambre o carne cocinada (jamón, pavo, pollo)",
        "cantidad": "50g"
      },
      {
        "nombre": "Zanahoria",
        "cantidad": "1 unidad"
      },
      {
        "nombre": "Salsa de soja",
        "cantidad": "2 cucharadas"
      },
      {
        "nombre": "Aceite",
        "cantidad": "1 cucharada"
      }
    ],
    "pasos": [
      "Pica la zanahoria y el fiambre/pollo en cubitos muy pequeños. [5]",
      "Bate los huevos. [5]",
      "En un wok o sartén grande con aceite, haz un revuelto rápido con los huevos y retíralos. [5]",
      "En la misma sartén sofríe la zanahoria y el pollo un par de minutos, añade los guisantes. [5]",
      "Incorpora el arroz frío (desmenuzándolo con los dedos para que no haga grumos) y saltea a fuego muy fuerte. [5]",
      "Añade el huevo revuelto de vuelta, la salsa de soja y remueve vigorosamente durante 1 minuto a fuego máximo. [5]",
      "Sirve al momento. [5]"
    ],
    "nutricion": {
      "calorias": null,
      "proteinas": null,
      "carbohidratos": null,
      "grasas": null
    }
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
  if (RECETAS_NUEVAS[id]) return RECETAS_NUEVAS[id];
  for (const semana of SEMANAS) {
    for (const dia of Object.values(semana)) {
      if (dia.comida?.id === id) return dia.comida;
      if (dia.cena?.id === id) return dia.cena;
    }
  }
  return null;
}

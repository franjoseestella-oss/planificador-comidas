
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
  'lentejas-arroz-curcuma': {
    id: 'lentejas-arroz-curcuma',
    nombre: 'Lentejas con arroz y cúrcuma',
    tipo: 'normal',
    porciones: 4,
    tiempo: 25,
    icono: '🍲',
    descripcion: 'Plato único proteico y económico inspirado en el mujaddara árabe. Las lentejas y el arroz juntos forman una proteína completa.',
    ingredientes: [
      { nombre: 'Lentejas pardinas', cantidad: '200g', comprar: true },
      { nombre: 'Arroz', cantidad: '150g', comprar: true },
      { nombre: 'Cebolla', cantidad: '2', comprar: true },
      { nombre: 'Cúrcuma', cantidad: '1 cdta', comprar: false },
      { nombre: 'Comino', cantidad: '1 cdta', comprar: false },
      { nombre: 'Ajo', cantidad: '3 dientes', comprar: false },
      { nombre: 'Aceite de oliva', cantidad: '3 cdas', comprar: false },
      { nombre: 'Sal', cantidad: 'c/s', comprar: false },
    ],
    pasos: [
      'Cocer las lentejas en agua con sal durante 15 min (no remojar previamente).',
      'Añadir el arroz y la cúrcuma al mismo cazo. Cocinar 12 min más.',
      'Mientras, cortar las cebollas en juliana y freírlas en aceite a fuego lento 15 min hasta caramelizar.',
      'Escurrir si sobra agua. Servir con la cebolla caramelizada por encima y espolvorear comino.',
    ],
    nutricion: { calorias: 380, proteinas: 18, carbohidratos: 65, grasas: 7, fibra: 9 },
    nota: '💰 Menos de 0.80€/ración · Proteína vegetal completa'
  },
  'garbanzos-pisto': {
    id: 'garbanzos-pisto',
    nombre: 'Garbanzos con pisto',
    tipo: 'normal',
    porciones: 4,
    tiempo: 30,
    icono: '🫘',
    descripcion: 'Garbanzos cocidos mezclados con un pisto casero de tomate, calabacín y pimiento. Plato muy nutritivo y vegetariano.',
    ingredientes: [
      { nombre: 'Garbanzos cocidos (bote)', cantidad: '2 botes (800g)', comprar: true },
      { nombre: 'Calabacín', cantidad: '2', comprar: true },
      { nombre: 'Pimiento rojo', cantidad: '1', comprar: true },
      { nombre: 'Tomate triturado', cantidad: '400g lata', comprar: true },
      { nombre: 'Cebolla', cantidad: '1', comprar: true },
      { nombre: 'Ajo', cantidad: '3 dientes', comprar: false },
      { nombre: 'Aceite de oliva', cantidad: '3 cdas', comprar: false },
      { nombre: 'Sal, pimentón y orégano', cantidad: 'c/s', comprar: false },
    ],
    pasos: [
      'Sofreír la cebolla y el ajo picados en aceite durante 5 min.',
      'Añadir el pimiento y el calabacín en dados. Cocinar 8 min.',
      'Incorporar el tomate triturado, pimentón y orégano. Cocinar 10 min.',
      'Agregar los garbanzos escurridos y lavados. Mezclar y cocinar 5 min más.',
      'Rectificar de sal y servir caliente.',
    ],
    nutricion: { calorias: 340, proteinas: 16, carbohidratos: 48, grasas: 9, fibra: 12 },
    nota: '🌱 Vegano · Ideal para tupper del día siguiente'
  },
  'espaguetis-estudiante': {
    id: 'espaguetis-estudiante',
    nombre: 'Espaguetis del estudiante',
    tipo: 'normal',
    porciones: 2,
    tiempo: 15,
    icono: '🍝',
    descripcion: 'La receta más rápida y económica: pasta con ajo, aceite, atún y tomate cherry. Lista en 15 minutos.',
    ingredientes: [
      { nombre: 'Espaguetis', cantidad: '250g', comprar: true },
      { nombre: 'Atún en aceite', cantidad: '2 latas', comprar: true },
      { nombre: 'Tomate triturado', cantidad: '200g', comprar: true },
      { nombre: 'Ajo', cantidad: '4 dientes', comprar: false },
      { nombre: 'Aceite de oliva', cantidad: '3 cdas', comprar: false },
      { nombre: 'Guindilla o pimentón', cantidad: 'al gusto', comprar: false },
      { nombre: 'Sal y perejil', cantidad: 'c/s', comprar: false },
    ],
    pasos: [
      'Cocer los espaguetis en agua abundante con sal según el paquete.',
      'Dorar el ajo laminado en aceite a fuego medio. Añadir guindilla si gusta.',
      'Incorporar el tomate, cocinar 5 min. Añadir el atún escurrido.',
      'Escurrir la pasta reservando un poco de agua de cocción.',
      'Mezclar todo, añadir un chorrito del agua reservada si queda seca.',
    ],
    nutricion: { calorias: 480, proteinas: 28, carbohidratos: 65, grasas: 11, fibra: 4 },
    nota: '⚡ Lista en 15 min · Menos de 1€/ración'
  },
  'salmon-microondas': {
    id: 'salmon-microondas',
    nombre: 'Salmón exprés al microondas',
    tipo: 'normal',
    porciones: 2,
    tiempo: 10,
    icono: '🐟',
    descripcion: 'Salmón cocinado al microondas en 5 minutos con limón y hierbas. Saludable, rápido y sorprendentemente jugoso.',
    ingredientes: [
      { nombre: 'Filetes de salmón', cantidad: '2 (300g)', comprar: true },
      { nombre: 'Limón', cantidad: '1', comprar: true },
      { nombre: 'Ajo', cantidad: '2 dientes', comprar: false },
      { nombre: 'Aceite de oliva', cantidad: '1 cda', comprar: false },
      { nombre: 'Eneldo o perejil', cantidad: 'c/s', comprar: false },
      { nombre: 'Sal y pimienta', cantidad: 'c/s', comprar: false },
    ],
    pasos: [
      'Colocar los filetes en un recipiente apto para microondas.',
      'Aliñar con aceite, ajo picado, zumo de limón, sal y pimienta.',
      'Cubrir con film transparente dejando un pequeño orificio.',
      'Cocinar en el microondas a 800W durante 4-5 minutos.',
      'Reposar 2 min tapado. Servir con limón y hierbas frescas.',
    ],
    nutricion: { calorias: 320, proteinas: 35, carbohidratos: 2, grasas: 18, fibra: 0 },
    nota: '⚡ Solo 5 min de cocción · Muy alto en Omega-3'
  },
  'pitas-huevo-espinacas': {
    id: 'pitas-huevo-espinacas',
    nombre: 'Pitas con huevo y espinacas',
    tipo: 'normal',
    porciones: 2,
    tiempo: 15,
    icono: '🥙',
    descripcion: 'Pan de pita relleno con huevo revuelto, espinacas salteadas y queso. Cena rápida saludable, perfecta para los niños.',
    ingredientes: [
      { nombre: 'Pan de pita', cantidad: '2 uds', comprar: true },
      { nombre: 'Huevos', cantidad: '3', comprar: true },
      { nombre: 'Espinacas frescas', cantidad: '100g', comprar: true },
      { nombre: 'Queso en lonchas', cantidad: '2 lonchas', comprar: true },
      { nombre: 'Ajo', cantidad: '1 diente', comprar: false },
      { nombre: 'Aceite de oliva', cantidad: '1 cda', comprar: false },
      { nombre: 'Sal y pimienta', cantidad: 'c/s', comprar: false },
    ],
    pasos: [
      'Saltear las espinacas con ajo en aceite durante 2 min. Salpimentar.',
      'Batir los huevos y hacer un revuelto cremoso en la misma sartén.',
      'Calentar los panes de pita en una sartén seca 1 min por cada lado.',
      'Abrir los pitas y rellenar con el revuelto de espinacas y huevo.',
      'Añadir el queso en lonchas y servir inmediatamente.',
    ],
    nutricion: { calorias: 360, proteinas: 22, carbohidratos: 38, grasas: 13, fibra: 3 },
    nota: '🧒 Les encanta a los niños · Muy fácil de preparar juntos'
  },
  'ramen-casero': {
    id: 'ramen-casero',
    nombre: 'Ramen casero express',
    tipo: 'normal',
    porciones: 2,
    tiempo: 20,
    icono: '🍜',
    descripcion: 'Ramen sencillo con caldo de pollo, fideos, huevo duro y verduras. Una versión casera y económica del popular plato japonés.',
    ingredientes: [
      { nombre: 'Fideos gordos', cantidad: '200g', comprar: true },
      { nombre: 'Caldo de pollo', cantidad: '1L', comprar: true },
      { nombre: 'Huevos', cantidad: '2', comprar: true },
      { nombre: 'Zanahoria', cantidad: '1', comprar: true },
      { nombre: 'Champiñones', cantidad: '100g', comprar: true },
      { nombre: 'Salsa de soja', cantidad: '2 cdas', comprar: true },
      { nombre: 'Jengibre', cantidad: '1 trozo', comprar: false },
      { nombre: 'Cebollino o puerro', cantidad: 'al gusto', comprar: false },
    ],
    pasos: [
      'Cocer los huevos duros (8 min), pelar y cortar por la mitad.',
      'Calentar el caldo con jengibre rallado y salsa de soja.',
      'Añadir la zanahoria en rodajas y los champiñones laminados. Cocinar 5 min.',
      'Cocer los fideos según el paquete (normalmente 3-4 min).',
      'Servir el caldo con los fideos, el huevo y las verduras. Decorar con cebollino.',
    ],
    nutricion: { calorias: 410, proteinas: 24, carbohidratos: 58, grasas: 9, fibra: 4 },
    nota: '🍜 Fuente de economía: los huevos y fideos son muy baratos'
  },
  'brocheta-pollo': {
    id: 'brocheta-pollo',
    nombre: 'Brochetas de pollo especiado',
    tipo: 'normal',
    porciones: 4,
    tiempo: 20,
    icono: '🍢',
    descripcion: 'Brochetas de pechuga de pollo marinadas con especias mediterráneas. Ideales a la plancha o al horno. Los niños las adoran.',
    ingredientes: [
      { nombre: 'Pechuga de pollo', cantidad: '500g', comprar: true },
      { nombre: 'Pimiento rojo', cantidad: '1', comprar: true },
      { nombre: 'Limón', cantidad: '1', comprar: true },
      { nombre: 'Ajo', cantidad: '3 dientes', comprar: false },
      { nombre: 'Aceite de oliva', cantidad: '2 cdas', comprar: false },
      { nombre: 'Pimentón, comino, orégano', cantidad: '1 cdta cada uno', comprar: false },
      { nombre: 'Sal y pimienta', cantidad: 'c/s', comprar: false },
    ],
    pasos: [
      'Cortar el pollo en dados de 3cm y marinar 15 min con aceite, zumo de limón, ajo y especias.',
      'Cortar el pimiento en trozos similares.',
      'Montar las brochetas alternando pollo y pimiento.',
      'Cocinar en plancha caliente o horno a 200°C durante 8-10 min dándoles la vuelta a mitad.',
      'Servir con arroz blanco o ensalada verde.',
    ],
    nutricion: { calorias: 280, proteinas: 38, carbohidratos: 6, grasas: 11, fibra: 1 },
    nota: '🧒 Sin gluten · Alta proteína · Muy popular con los niños'
  },
};

// Función para obtener el menú de la semana actual
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

const fs = require('fs');

const path = './data.js';
let content = fs.readFileSync(path, 'utf8');

// I will just replace the RECETAS_NUEVAS completely.
const nuevasRecetas = `{
  'chips-de-kale': {
    "id": "chips-de-kale",
    "nombre": "Chips de kale",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🥬",
    "descripcion": "Un snack ligero y crujiente para acompañar cenas o como entrante saludable.",
    "ingredientes": [
        { "nombre": "Kale (150g)", "cantidad": "150g", "comprar": true },
        { "nombre": "AOVE", "cantidad": "15ml", "comprar": false },
        { "nombre": "sal", "cantidad": "1 pizca", "comprar": false },
        { "nombre": "pimentón dulce", "cantidad": "1 cucharadita", "comprar": false }
    ],
    "pasos": [
        "Precalentar el horno a 180°C con calor arriba y abajo.",
        "Lavar muy bien bajo el grifo el kale y secarlo con papel absorbente para que quede muy seco.",
        "Quitar los tallos gruesos y trocear las hojas en trozos del tamaño de un bocado.",
        "En un bol grande, masajear las hojas con el AOVE, la sal y el pimentón hasta que estén bien impregnadas.",
        "Extender las hojas en la bandeja del horno sin que se amontonen y hornear 10-12 min vigilando que no se quemen.",
        "Dejar enfriar 5 minutos para que se vuelvan totalmente crujientes."
    ],
    "nutricion": { "calorias": 100, "proteinas": 5, "carbohidratos": 10, "grasas": 5, "fibra": 4 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'guacamole-con-palitos-de-zanahoria': {
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
        { "nombre": "Sal", "cantidad": "1 pizca", "comprar": false },
        { "nombre": "Zanahorias para dipear", "cantidad": "2 unidades", "comprar": true }
    ],
    "pasos": [
        "Pelar las zanahorias y cortarlas en bastones (palitos) de unos 5 cm de largo. Reservar en un vaso con unos hielos para que estén más crujientes.",
        "Picar la cebolla morada y el tomate (sin semillas) en trocitos muy pequeños.",
        "Picar el cilantro finamente.",
        "Moler o chafar la pulpa del aguacate con un tenedor dejando algunos trocitos para darle textura.",
        "Añadir el zumo de la lima, la sal, la cebolla, el tomate y el cilantro, y mezclar con suavidad.",
        "Servir inmediatamente acompañado de los bastones de zanahoria fresca."
    ],
    "nutricion": { "calorias": 220, "proteinas": 3, "carbohidratos": 15, "grasas": 15, "fibra": 8 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'zanahorias-encurtidas-para-ma-ana': {
    "id": "zanahorias-encurtidas-para-ma-ana",
    "nombre": "Zanahorias encurtidas caseras",
    "tipo": "cena",
    "porciones": 4,
    "tiempo": 15,
    "icono": "🥕",
    "descripcion": "Un excelente acompañamiento para cualquier ensalada o plato frío.",
    "ingredientes": [
        { "nombre": "Zanahorias", "cantidad": "400g", "comprar": true },
        { "nombre": "Vinagre de manzana", "cantidad": "200ml", "comprar": true },
        { "nombre": "Agua mineral", "cantidad": "200ml", "comprar": false },
        { "nombre": "Sal gorda", "cantidad": "1cucharada", "comprar": false },
        { "nombre": "Pimienta negra en grano", "cantidad": "10 granos", "comprar": false },
        { "nombre": "Laurel", "cantidad": "2 hojas", "comprar": false },
        { "nombre": "Ajo", "cantidad": "2 dientes", "comprar": false }
    ],
    "pasos": [
        "Pelar las zanahorias y cortarlas en rodajas o bastones medianos.",
        "En un cazo, hervir el agua con el vinagre, la sal, pimienta, y el laurel durante 3 minutos.",
        "Mientrastanto, disponer las zanahorias y los ajos enteros machacados en un tarro de cristal bien limpio.",
        "Verter el líquido directamente caliente sobre las zanahorias hasta cubrirlas por completo.",
        "Dejar enfriar a temperatura ambiente destapado. Luego tapar y meter a la nevera.",
        "Estarán en su punto de sabor al día siguiente (¡de ahí el nombre 'para mañana'!)."
    ],
    "nutricion": { "calorias": 45, "proteinas": 1, "carbohidratos": 10, "grasas": 0, "fibra": 3 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'hummus-de-remolacha-con-crudit-s': {
    "id": "hummus-de-remolacha-con-crudit-s",
    "nombre": "Hummus de remolacha y crudités",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 15,
    "icono": "🧆",
    "descripcion": "Colorido plato muy nutritivo ideal para un primer plato saciante o un picoteo denso al mediodía.",
    "ingredientes": [
        { "nombre": "Garbanzos cocidos", "cantidad": "400g", "comprar": true },
        { "nombre": "Remolacha cocida", "cantidad": "150g", "comprar": true },
        { "nombre": "Pasta tahini", "cantidad": "30g", "comprar": true },
        { "nombre": "Aceite de oliva (AOVE)", "cantidad": "30ml", "comprar": false },
        { "nombre": "Limón", "cantidad": "Medio exprimid", "comprar": true },
        { "nombre": "Ajo o ajo en polvo", "cantidad": "1 diente", "comprar": false },
        { "nombre": "Comino molido", "cantidad": "1 cucharadita", "comprar": false },
        { "nombre": "Verduras variadas (Pimiento, pepino)", "cantidad": "250g", "comprar": true }
    ],
    "pasos": [
        "Lavar bien los garbanzos bajo agua fría y escurrirlos por completo.",
        "Trocear la remolacha en cubos gruesos.",
        "En un procesador de alimentos o batidora de jarra, añadir los garbanzos, la remolacha, tahini, sal, comino, ajo sin germen y el zumo de limón.",
        "Triturar a máxima velocidad. Ir añadiendo el aceite de oliva a hilo, y si queda muy denso añadir un poco de agua fría hasta textura sedosa.",
        "Servir en un bol ancho decorado con sésamo y un chorro extra de AOVE.",
        "Cortar las verduras (pepino, pimiento, apio) en bastones rectos para dipear en el hummus."
    ],
    "nutricion": { "calorias": 320, "proteinas": 12, "carbohidratos": 36, "grasas": 14, "fibra": 11 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'patatitas-dos-salsas': {
    "id": "patatitas-dos-salsas",
    "nombre": "Patatitas dos salsas",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🥔",
    "descripcion": "Patatas asadas y crujientes con salsa de yogur y salsa de pimentón.",
    "ingredientes": [
        { "nombre": "Patatas baby", "cantidad": "500g", "comprar": true },
        { "nombre": "Yogur natural no azucarado", "cantidad": "1 unidad (125g)", "comprar": true },
        { "nombre": "Ajo granulado", "cantidad": "1 cucharada", "comprar": false },
        { "nombre": "Perejil fresco", "cantidad": "Al gusto", "comprar": true },
        { "nombre": "Pimentón dulce y picante", "cantidad": "1 cucharada c/u", "comprar": false },
        { "nombre": "AOVE y sal", "cantidad": "20ml", "comprar": false }
    ],
    "pasos": [
        "Lavar a fondo las patatas dejándoles la piel. Cocerlas en agua con abundante sal durante 15 minutos.",
        "Escurrir, secar y dorar las patatas en una sartén grande con AOVE a fuego fuerte, o meter en freidora de aire 10 min a 200°C.",
        "Salsa de yogur: Mezclar en un bol pequeño el yogur, ajo granulado, una pizca de sal y perejil picado súper fino.",
        "Salsa de pimentón: Mezclar el AOVE sobrante con los pimentones. Calentar muy levemente.",
        "Servir las patatas con las salsas por encima o a un lado."
    ],
    "nutricion": { "calorias": 280, "proteinas": 5, "carbohidratos": 42, "grasas": 10, "fibra": 5 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'falso-sushi-de-pepino-yogur-y-queso-feta': {
    "id": "falso-sushi-de-pepino-yogur-y-queso-feta",
    "nombre": "Rollitos frescos de pepino y queso feta",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍣",
    "descripcion": "Un 'falso sushi' sin arroz, súper fresco, hecho enrollando finas tiras de pepino.",
    "ingredientes": [
        { "nombre": "Pepino recto y firme", "cantidad": "1 unidad", "comprar": true },
        { "nombre": "Yogur griego", "cantidad": "125g", "comprar": true },
        { "nombre": "Queso feta", "cantidad": "50g", "comprar": true },
        { "nombre": "Hojas de menta fresca", "cantidad": "Un puñadito", "comprar": true },
        { "nombre": "Nueces picadas", "cantidad": "20g", "comprar": false }
    ],
    "pasos": [
        "Con la ayuda de un pelador o mandolina, cortar tiras longitudinales de pepino muy finas, secándolas en papel absorbente.",
        "En un cuenco, desmenuzar el queso feta, mezclar con el yogur griego y añadir las nueces muy picaditas y menta.",
        "Extender cada lámina de pepino, colocar una cucharada de la mezcla anterior en uno de los extremos.",
        "Enrollar el pepino sobre sí mismo, formando pequeños cilindros como maki-sushis.",
        "Si no se mantienen solos, pincharlos con un palillo."
    ],
    "nutricion": { "calorias": 140, "proteinas": 6, "carbohidratos": 6, "grasas": 10, "fibra": 1 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'gazpacho-de-sand-a-y-feta': {
    "id": "gazpacho-de-sand-a-y-feta",
    "nombre": "Gazpacho de sandía con feta",
    "tipo": "comida",
    "porciones": 4,
    "tiempo": 15,
    "icono": "🍅",
    "descripcion": "Un gazpacho más fresco y dulce coronado con la salinidad del queso feta.",
    "ingredientes": [
        { "nombre": "Tomates pera maduros", "cantidad": "500g", "comprar": true },
        { "nombre": "Sandía sin semillas", "cantidad": "500g", "comprar": true },
        { "nombre": "Pimiento verde italiano", "cantidad": "50g", "comprar": false },
        { "nombre": "Pepino (pelado y sin pipas)", "cantidad": "1/2 unidad", "comprar": false },
        { "nombre": "Cebolleta dulce", "cantidad": "1/4", "comprar": false },
        { "nombre": "Vinagre de Jerez", "cantidad": "1 cucharada", "comprar": false },
        { "nombre": "AOVE, Sal", "cantidad": "Al gusto", "comprar": false },
        { "nombre": "Queso feta rallado", "cantidad": "50g", "comprar": true }
    ],
    "pasos": [
        "Lavar y trocear las verduras y la sandía. Retirar las semillas del pimiento y asegurarse de que la sandía no tiene pepitas.",
        "Pasarlo todo por la batidora de vaso hasta conseguir un líquido muy fino.",
        "Emulsionar vertiendo el AOVE en hilo y sazonar.",
        "Pasar por un chino o colador si se desea una textura 100% lisa.",
        "Dejar en la nevera hasta que esté helado.",
        "Servir en cuencos y desmenuzar unos pedacitos de queso feta por encima."
    ],
    "nutricion": { "calorias": 130, "proteinas": 3, "carbohidratos": 18, "grasas": 6, "fibra": 2 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'carpaccio-de-remolacha-y-champi-n': {
    "id": "carpaccio-de-remolacha-y-champi-n",
    "nombre": "Carpaccio de remolacha y champiñón crudo",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🍄",
    "descripcion": "Entrante muy sofisticado y lleno de contraste, ideal ligero para cenas.",
    "ingredientes": [
        { "nombre": "Remolacha cocida o asada", "cantidad": "200g", "comprar": true },
        { "nombre": "Champiñones blancos grandes (muy firmes)", "cantidad": "100g", "comprar": true },
        { "nombre": "Piñones tostados", "cantidad": "10g", "comprar": true },
        { "nombre": "Queso Parmesano en lascas", "cantidad": "20g", "comprar": true },
        { "nombre": "Brotes de rúcula", "cantidad": "50g", "comprar": true },
        { "nombre": "Zumo de limón, AOVE, sal gorda", "cantidad": "Al gusto", "comprar": false }
    ],
    "pasos": [
        "Lavar o limpiar muy bien los champiñones, quitando toda la tierra. Retirar la base dura del pie.",
        "Con una mandolina o cuchillo súper afilado, cortar en láminas hiper finas tanto la remolacha como el champiñón crudo.",
        "Disponer alternando las láminas en abanico sobre la rúcula.",
        "Preparar un aliño batiendo el aceite, zumo de medio limón y la sal gorda. Verter.",
        "Esparcir los piñones y sacar lascas de Parmesano con pelador y dejar caer encima."
    ],
    "nutricion": { "calorias": 150, "proteinas": 6, "carbohidratos": 11, "grasas": 9, "fibra": 4 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'dip-de-guisantes-con-hierbabuena-y-totopos-caseros': {
    "id": "dip-de-guisantes-con-hierbabuena-y-totopos-caseros",
    "nombre": "Dip de guisantes a la hierbabuena con totopos",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 15,
    "icono": "🫛",
    "descripcion": "Una crema para untar parecida al hummus pero refrescante y con queso.",
    "ingredientes": [
        { "nombre": "Guisantes (frescos o congelados)", "cantidad": "300g", "comprar": true },
        { "nombre": "Queso fresco (tipo burgos) o crema", "cantidad": "250g", "comprar": true },
        { "nombre": "Pistachos repelados", "cantidad": "15g", "comprar": true },
        { "nombre": "Tortillas de trigo o maíz", "cantidad": "2 unidades", "comprar": true },
        { "nombre": "Ajo", "cantidad": "1/2 diente", "comprar": false },
        { "nombre": "Hojas de hierbabuena", "cantidad": "1 puñado", "comprar": true }
    ],
    "pasos": [
        "Cortar las tortillas en 8 triángulos cada una (como pizzas). Pintar con aceite y hornear a 200°C unos 5-8 minutos hasta que se endurezcan y formen los totopos/nachos.",
        "Blanquear los guisantes en agua hirviendo con sal durante 2 min (para que queden muy verdes). Enfriar en hielo.",
        "En una batidora, echar los guisantes colados, el queso, el ajo sin germen, unas gotas de AOVE y la hierbabuena.",
        "Triturar groseramente para que tenga algo de textura. Si está espeso añadir una cucharada de agua fría.",
        "Servir decorando con los pistachos picados por encima, y rodeado de los totopos caseros de trigo."
    ],
    "nutricion": { "calorias": 360, "proteinas": 22, "carbohidratos": 38, "grasas": 12, "fibra": 10 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'escarola-con-granada': {
    "id": "escarola-con-granada",
    "nombre": "Ensalada de escarola e higos/granada",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🥗",
    "descripcion": "Ensalada simple típica de los meses de frío con escarola rizada.",
    "ingredientes": [
        { "nombre": "Escarola blanca lavada", "cantidad": "150g", "comprar": true },
        { "nombre": "Granada", "cantidad": "1/2", "comprar": true },
        { "nombre": "Avellanas tostadas picadas", "cantidad": "20g", "comprar": true },
        { "nombre": "AOVE, vinagre o mostaza suave y sal", "cantidad": "Al gusto", "comprar": false }
    ],
    "pasos": [
        "Desgranar la granada, golpeando la cáscara por fuera con una cuchara de palo sobre un bol.",
        "Picar y lavar muy bien la escarola. Secar para que su rizo quede suelto.",
        "Hacer la vinagreta: aceite de oliva, vinagre de manzana, un puntín de mostaza si hace falta matar el amargor de la escarola, y sal.",
        "Mezclar todo en el momento para que los frutos secos (avellanas) no pierdan el crujiente."
    ],
    "nutricion": { "calorias": 120, "proteinas": 3, "carbohidratos": 14, "grasas": 10, "fibra": 4 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'tosta-de-aguacate-con-reques-n': {
    "id": "tosta-de-aguacate-con-reques-n",
    "nombre": "Tosta crujiente de aguacate y requesón",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🍞",
    "descripcion": "Cena ultrarápida y deliciosa rebosante de grasas saludables y proteína del suero.",
    "ingredientes": [
        { "nombre": "Pan integral o de masa madre rebanado gruesas", "cantidad": "2 uds", "comprar": true },
        { "nombre": "Aguacate maduro", "cantidad": "1", "comprar": true },
        { "nombre": "Requesón de buena calidad", "cantidad": "100g", "comprar": true },
        { "nombre": "Semillas de sésamo y chía", "cantidad": "1 cucharadita", "comprar": false },
        { "nombre": "Zumo de lima, y flor de sal", "cantidad": "Al gusto", "comprar": false }
    ],
    "pasos": [
        "Poner a tostar las rebanadas en plancha o tostadora potente para dejarlas quemaditas por fuera y tiernas por dentro.",
        "Untar una capa generosa (unos 50g) de requesón por cada tostada.",
        "Cortar el aguacate por la mitad, retirar el hueso, sacar la mitad de la pulpa y cortarla en láminas idénticas.",
        "Disponer el aguacate laminado como un abanico. Exprimir un poco de lima por encima.",
        "Añadir la flor del sal, el sésamo para crujir, y un hilo fino de AOVE si se quiere un extra."
    ],
    "nutricion": { "calorias": 310, "proteinas": 10, "carbohidratos": 25, "grasas": 21, "fibra": 8 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'barquitas-de-berenjena-con-yogur-y-manzana': {
    "id": "barquitas-de-berenjena-con-yogur-y-manzana",
    "nombre": "Berenjenas asadas rellenas de fruta y yogur al curry",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 35,
    "icono": "🍆",
    "descripcion": "Entrante dulce, salado y especiado. Una forma súper exótica de comer verduras.",
    "ingredientes": [
        { "nombre": "Berenjena recta", "cantidad": "1 unidad", "comprar": true },
        { "nombre": "Manzana dulce-ácida (Pink Lady o Fuji)", "cantidad": "1 unidad", "comprar": true },
        { "nombre": "Yogur natural (sin azúcar añadida)", "cantidad": "125g", "comprar": true },
        { "nombre": "Especias Curry molido", "cantidad": "1 cucharada rasa", "comprar": false },
        { "nombre": "Nueces peladas", "cantidad": "30g", "comprar": false },
        { "nombre": "Cebollino o cebolleta verde", "cantidad": "Al gusto", "comprar": true }
    ],
    "pasos": [
        "Cortar la berenjena por la mitad longitudinalmente. Hacer cortes en 'rombo' en la carne. Echar sal y AOVE y asarla 25 minutos al horno a 200°C.",
        "Cuando la berenjena esté tierna, sacarla y raspar con suavidad la pulpa con una cuchara, dejando la piel intacta (haciendo barquitas). Picar la pulpa recolectada.",
        "Pelar y picar la manzana en daditos extremadamente pequeños (brunoise).",
        "Mezclar el yogur enérgicamente con el curry hasta teñirlo de amarillo. Añadir allí la pulpa de la berenjena asada, y la manzana cruda y crujiente.",
        "Volver a meter el relleno dentro de las pieles asadas de la berenjena y sazonar con nueces troceadas y cebollino."
    ],
    "nutricion": { "calorias": 220, "proteinas": 7, "carbohidratos": 28, "grasas": 8, "fibra": 9 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'escabeche-de-sardinas': {
    "id": "escabeche-de-sardinas",
    "nombre": "Sardinas caseras en suave escabeche",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🐟",
    "descripcion": "Pescado azul escabechado, que estará mucho más rico si se deja reposar de un día a otro.",
    "ingredientes": [
        { "nombre": "Sardinas enteras y muy frescas", "cantidad": "250g", "comprar": true },
        { "nombre": "Cebolla en juliana", "cantidad": "50g", "comprar": false },
        { "nombre": "Zanahoria en rodajas gruesas", "cantidad": "50g", "comprar": false },
        { "nombre": "Ajo enteros sin pelar (con golpe)", "cantidad": "2", "comprar": false },
        { "nombre": "Vinagre de vino blanco", "cantidad": "70ml", "comprar": false },
        { "nombre": "Vino blanco seco, y Agua", "cantidad": "1 vasito", "comprar": false },
        { "nombre": "Hojas de laurel enteros", "cantidad": "2", "comprar": false },
        { "nombre": "Pimentón dulce y pimienta negra en grano", "cantidad": "1 cucharadita", "comprar": false },
        { "nombre": "Aceite de oliva (AOVE)", "cantidad": "50ml", "comprar": false }
    ],
    "pasos": [
        "Limpiar las sardinas desescamando y quitándoles cabeza y tripa sin estropear los filetes. Secar con papel.",
        "En una cazuela media, sofreír las verduras y los dientes de ajo machacados a fuego no muy vivo, junto con pimienta y laurel, hasta que la cebolla ceda.",
        "Quitarlo un momento de calor fuerte y añadir el pimentón rápido para que no se queme! Echar seguido el vinagre, vino blanco y un pelín de agua.",
        "Cocer el conjunto de vegetales (brebaje) 10 minutos tapado. Este es el 'escabeche'.",
        "Apagar el fuego por completo, y tal cual caliente echar las sardinas crudas encima hundilas que queden tapadas. Se harán en 3 o 4 min con el calor residual, quedando extra super jugosas.",
        "Si puedes aguantarte, ¡mejor guárdalo a la nevera hasta comerlas frías al día siguiente!"
    ],
    "nutricion": { "calorias": 380, "proteinas": 28, "carbohidratos": 7, "grasas": 26, "fibra": 2 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'crema-de-calabaza-y-queso-azul': {
    "id": "crema-de-calabaza-y-queso-azul",
    "nombre": "Crema invernal de calabaza con pepitas y queso azul",
    "tipo": "cena",
    "porciones": 4,
    "tiempo": 30,
    "icono": "🥣",
    "descripcion": "El dulzor de la calabaza choca a la perfección en boca con la fuerte salinidad del queso roquefort o cabrales suave.",
    "ingredientes": [
        { "nombre": "Calabaza cacahuete ya pelada", "cantidad": "800g", "comprar": true },
        { "nombre": "Cebolla", "cantidad": "1 grande", "comprar": false },
        { "nombre": "Caldo de verduras brik / natural", "cantidad": "500ml", "comprar": true },
        { "nombre": "Queso azul (roquefort, o gorgonzola para más suave)", "cantidad": "40g", "comprar": true },
        { "nombre": "Picatostes integrales o semillas de calabaza tostadas", "cantidad": "Al gusto", "comprar": false },
        { "nombre": "Aceite de oliva y sal", "cantidad": "3 cucharadas", "comprar": false }
    ],
    "pasos": [
        "Picar la cebolla toscamente porque no importa la forma porque se batirá, pero pocharla mucho en el fondo de olla con aceite para que cristalice los sabores dulces.",
        "Echar la calabaza tronzada en trozos de unos cuatro centímetros, rehogar 5 minutos con la cebolla dorada.",
        "Agrega el caldo, que justo tiene que llegar a asomar entre el nivel de verdura sin que queden flotando. Tapar y dejar que hierba a fuego medio/bajo 20 minutos.",
        "Comprueba con tenedor que la calabaza ha colapsado. Saca dos cazos de caldo por si la crema se requiere corregir antes de batir todo, pero tritura agregandole en caliente unos 15g de queso azul.",
        "Servir una sopa gruesa como una crema en tazones o platos soperos hermosos con dados crudos del queso azúl remanente y unos picatostes o semillas encima para contrastarla."
    ],
    "nutricion": { "calorias": 160, "proteinas": 5, "carbohidratos": 22, "grasas": 6, "fibra": 4 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'alubia-confetti': {
    "id": "alubia-confetti",
    "nombre": "Ensalada Alubia Confetti (mexicana)",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 10,
    "icono": "🫘",
    "descripcion": "Una ensalada colorida (parece un carnaval o confetti) basada en alubias, super alta en fibras.",
    "ingredientes": [
        { "nombre": "Alubias blancas (cocidas de frasco o lata escurrido)", "cantidad": "400g totales", "comprar": true },
        { "nombre": "Pimientos de colores (rojos, verdes, etc)", "cantidad": "Medio de cada", "comprar": true },
        { "nombre": "Cebolla morada tierna", "cantidad": "Media mediana", "comprar": false },
        { "nombre": "Maíz dulce desgranado", "cantidad": "50g", "comprar": true },
        { "nombre": "Aguacate en trozos duros", "cantidad": "Medio", "comprar": true },
        { "nombre": "Vinagreta de mostaza vieja y lima o vinagre y cominos al gusto", "cantidad": "Variado", "comprar": false }
    ],
    "pasos": [
        "Comienza sacando minuciosamente de su tarro, y enguajando, la legumbre hasta que ya no tenga espuma de la conservadora. Escúrrelas fenomenal.",
        "Con mucha destreza, picar los pimientos (al menos verde y rojo) y la cebolla dulce a cuadrados exáctamente iguales que el diámetro de la legumbre para conseguir que haya simetría al juntarlo..",
        "Añadir los callos de maíz y el aguacate (que ha de cortarse al momento de comerlo si no oxidaría).",
        "Echar toda la guarnición a un bol junto a la proteína vegetal (alubias) y menear bien bañando la colorida amalgama de un preparado que debe ser cítrico para hacerla digerible.",
        "Se recomienda reposar al menos unos 10-15 en la neverita si te gusta fría o devorarla directo."
    ],
    "nutricion": { "calorias": 360, "proteinas": 15, "carbohidratos": 45, "grasas": 12, "fibra": 18 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'salm-n-expr-s-al-microondas': {
    "id": "salm-n-expr-s-al-microondas",
    "nombre": "Salmón papillote express al microondas en su propio jugo",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 12,
    "icono": "🥘",
    "descripcion": "Usa vapor para un cocinado brutal en menos de 10 minutos. Ideal, rápido sanísimo.",
    "ingredientes": [
        { "nombre": "Lomos grueso sin espinas de salmón noruego crudo", "cantidad": "2 pedazos de unos 160g", "comprar": true },
        { "nombre": "Calabacín o zuchini", "cantidad": "1 pequeño", "comprar": true },
        { "nombre": "Patata gorda de asar", "cantidad": "Medio cachelo", "comprar": false },
        { "nombre": "Limón, eneldo", "cantidad": "Limón entero y 1 cucharadita de eneldo", "comprar": true },
        { "nombre": "Aceite (AOVE) de buena marca", "cantidad": "Un buen chorro", "comprar": false }
    ],
    "pasos": [
        "Usar pelador de hortaliza o mandolina para que tu patata y calabacín tengan lonchas finísimas estilo lasaña. Esto es para compensar que el micro la ablandará ultraveloz.",
        "En una táper con escape para asador al microndas o un estuche sintético papillote, haz una cama apilando la patata, rocía de sal, un mínimo aceite.",
        "Añade la de zapallo (calabacín), cocina a la potencia máxima en vapor (700 o 800wats), esto debería costar unos 4 o 5 minutitos para que no estén tiesas tus patatas bases.",
        "Coloca ya el tronco rosa del súper pescadet (salmón), condimenta ahora a fondo de limón exprimida (fresca), rocía toda la piel, sella de nuevo la papillote sintético y hornearemos tan solo unos 3 a 5 minutitos extra dependiendo el peso de las tajadas.",
        "Estará la cena sin manchar, super deliciosa si al destapar la sauna, no abrimos hacia la cara si no en la opuesta."
    ],
    "nutricion": { "calorias": 420, "proteinas": 34, "carbohidratos": 25, "grasas": 21, "fibra": 4 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'merluza-con-patatas-a-la-importancia': {
    "id": "merluza-con-patatas-a-la-importancia",
    "nombre": "Merluza a la panadera con patatas 'importancia'",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 40,
    "icono": "🐟",
    "descripcion": "Elaboración en salsa gruesa con tradición vasco o mediterranea repleta caldito para empapar panga de panadería.",
    "ingredientes": [
        { "nombre": "Tronco/Medallón grande sin piel pura merluza negra", "cantidad": "Dos o cuatro lomos de unos 200gr total", "comprar": true },
        { "nombre": "Patatas redonditas o para freír", "cantidad": "Medio kilo escaso", "comprar": true },
        { "nombre": "Caldo concentrado natural ahumado de rape/pescados y azafrán o de olla de peix", "cantidad": "1 Vaso a dos", "comprar": true },
        { "nombre": "Cebolla blanca blanda, y puñadíto guisantes", "cantidad": "Toda una y taza pequeñita guisante de bote o ultra.c", "comprar": true }
    ],
    "pasos": [
        "Corta a cuchillo la pata blanca gruesota a moneda (ancho del dedo gordo aprox.). Pásale un polvo de harina y pan rallado. Puedes en pasarlo en yema al freírtelo un minutín (es para darle espesor), o no, y directo al calderete del guiso de abajo",
        "Guisado del mar o perol plano: fríe cebolla hasta caramelo (sin que rompa negro), introduce hebras ambarinas de la costosa flor del azafrán molida la última décima.",
        "Arranca el puchero vertiendo agua rubia pescatera al caldo. Baja la papa pochada preempanadada. Cocinaremos esta mezcla con cuidado si hervir salvajen 15minutillos.",
        "Suma el tierno filete, ahogalo con cucharón, y el diminuto guisantito por coloratura 5 minutos el apagón de fin."
    ],
    "nutricion": { "calorias": 360, "proteinas": 26, "carbohidratos": 32, "grasas": 12, "fibra": 5 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'pechugas-de-pollo-empanadas-con-kikos': {
    "id": "pechugas-de-pollo-empanadas-con-kikos",
    "nombre": "Pechugas de pollo empanado súper 'crunchy' rebozado kikos",
    "tipo": "comida",
    "porciones": 2,
    "tiempo": 25,
    "icono": "🍗",
    "descripcion": "Filetitos súper divertidas a todos en casa donde logramos un sabor tremendo asado evitando el pan de ralle clásico.",
    "ingredientes": [
        { "nombre": "Pechuga polluela o pavito laminada muy fina y seca (Escalopes tiernos)", "cantidad": "Medio kilo o 4 grandes filetes finitos", "comprar": true },
        { "nombre": "Kikos dorados de la bolsa crujiente gordo (Cacahuetes o maíz tostado)", "cantidad": "Dos o tres puñaditas enteras 80gr", "comprar": true },
        { "nombre": "Huevo camperil o del día de campo batido", "cantidad": "Un buen par.", "comprar": true },
        { "nombre": "Ensalada aliñada con brote u hojas tiernos verde de gran acompañante digestivos.", "cantidad": "Fondo plato grandezote", "comprar": false }
    ],
    "pasos": [
        "Aplasta los maníses kikos o maíz horneaditos en mortero gigantes o ponlos en plastiquita recerrando, pasa y pasa aplástalos pasando el rulo de masa (no rompas su bolsa!), necesitamos una panko de maíz rota semi grueso e heterogéneamente no harina.",
        "Si lo vas a asar sana saca una lámina en lata de grill caliente con pelín pringue unte o aceite (papel pergamino ahorra en desastre bandeja)",
        "Saltea en poquisimo, o, no pongas el punto del pechugo, porque tu gran panko (rebozada maíz picante o gusanitos gruesos) salada a veces se sobrepasa en sus especias. Pasar en batido espumoso y enterrar los crudos con tu harina amarilla hasta rebozudo final gordo, sándwich, que le pegues a las caritas del filet.",
        "Al calor fuerte tu hornada. Se seca del interior rápido en 8 o 12min a 200 graditos está echa la obra chiqui crujiente."
    ],
    "nutricion": { "calorias": 420, "proteinas": 34, "carbohidratos": 25, "grasas": 18, "fibra": 2 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'miniburger-de-alubias-y-at-n': {
    "id": "miniburger-de-alubias-y-at-n",
    "nombre": "Miniburger vegetarianos (de legumbre y atún)",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 20,
    "icono": "🍔",
    "descripcion": "Burger sana perfecta que agrupa proteína alta de un pescado y de origen terrenal blanco del tarrito de un puchero o de sobrar el de la mediodía.",
    "ingredientes": [
        { "nombre": "Alubias blancas precocinadas, muy pastosas", "cantidad": "250 gramos", "comprar": true },
        { "nombre": "Lomo rojo migas laturras al nat./ o atunito en escabechi natural u olival", "cantidad": "Un tarrito escurrido hasta sin líquido latoso, una.", "comprar": true },
        { "nombre": "Ajo fino / polvo o cebollinos, y un huevo si deseas amalagamar para mejor fritilla doradísima o algo empanada natural o avena copada", "cantidad": "Puñado para amasen, más 1 clara batiendo", "comprar": true }
    ],
    "pasos": [
        "Aplastadora manual del chafalotes (triturado manual del bol, dejar enterito para sentirla luego mola).",
        "Verter pescados (atunes) en copos y mezclar fuerte al puré terrenal.",
        "Si humedecida se reblandase la amalgamas un pelín en seco, añade esa de polvo panko de maíz viejo, pan recio, y el ajo picoso a polvo y tu clara..",
        "Haz un pelote gordito. En grill, plancha teflónica y gota oli, vuélcala asar sin aullare fuerte (dorado), unos cortos min. Comer entre pan integral, o descalza (no-pan) bañadas yogur crema con finas hiervas, tomate aliñada por ladera y en paz!"
    ],
    "nutricion": { "calorias": 280, "proteinas": 22, "carbohidratos": 28, "grasas": 8, "fibra": 9 },
    "nota": "📖 Original NotebookLM (Refinado)"
  },
  'batido-platano-arandanos-avena': {
    "id": "batido-platano-arandanos-avena",
    "nombre": "Batido denso proteico morado, plátano azulado mañaneos / meriendas ricas de avenas (Cena exprés fría)",
    "tipo": "cena",
    "porciones": 2,
    "tiempo": 5,
    "icono": "🥤",
    "descripcion": "Recomponedor. Cena liquida fresquísima extra suave al buche.",
    "ingredientes": [
        { "nombre": "Arándano oscuro antioxidantes crudos congelsados (heladero)", "cantidad": "100 gramos puros", "comprar": true },
        { "nombre": "Platanillo ultra blando muy oscuro de chispas por dulzor maduras y sin piel.", "cantidad": "Medio (40 gr.)", "comprar": true },
        { "nombre": "Leches blanca pura de ovejas / vaconas, u avena, almendritas o batidos.", "cantidad": "La tacita hermosa unos 250 millilitros o taza grandita", "comprar": true },
        { "nombre": "Copitos avenas sutil del desayunos", "cantidad": "En polvos moler tres cucharetas colosas u 60 gr", "comprar": true },
        { "nombre": "Cubos aguahielo cristalitas + aroma caneludo rayaduras.", "cantidad": "Si espesara demasiado, agua, en abundanci", "comprar": true }
    ],
    "pasos": [
        "Desliza vaso potente americano tú plátano, arandalo glaciado puro que azularátoda la máquina, tu polvo o hojuelón en blanco de la sutil, la copa bebible cremosa",
        "A turbinar un rato a triturar en máxima, saca hasta sin pellejito, líquido espeso sin rugoso.",
        "Un cubo aguahielo rayada, más caneli en finura espolboreante. Y al vaso alto y cena listíiiiiisima"
    ],
    "nutricion": { "calorias": 230, "proteinas": 9, "carbohidratos": 34, "grasas": 7, "fibra": 6 },
    "nota": "📖 Extraído con IA (NotebookLM) / Custom "
  }
};

const startIndex = content.indexOf('const RECETAS_NUEVAS = {');
let endIndex = -1;

// Since RECETAS_NUEVAS is at the end... oh wait, it has function declarations below it!
// It ends with \n};\n
// So let's find that closing bracket.
const afterRecetas = content.substring(startIndex);
// Finding the closing } of the recipes object
const endRegex = /^};\\s*$/gm;
let found;
while ((found = endRegex.exec(afterRecetas)) !== null) {
    endIndex = startIndex + found.index + 1;
    break;
}

if (startIndex !== -1 && endIndex !== -1) {
    const pre = content.substring(0, startIndex);
    const post = content.substring(endIndex + 1);
    
    // Write back.
    fs.writeFileSync(path, pre + 'const RECETAS_NUEVAS = ' + nuevasRecetas + ';' + post);
    console.log("SUCCESS");
} else {
    console.log("ERROR parsing start/end");
}
\; 
 const startIndex = content.indexOf('const RECETAS_NUEVAS = {'); 
 let endIndex = -1; 
 const endRegex = /^\};\s*$/gm; 
 const afterRecetas = content.substring(startIndex); 
 let found; while ((found = endRegex.exec(afterRecetas)) !== null) { endIndex = startIndex + found.index + 1; break; } 
 if (startIndex !== -1 && endIndex !== -1) { fs.writeFileSync(path, content.substring(0, startIndex) + \r\n'const RECETAS_NUEVAS = ' + nuevasRecetas + ';' + \r\n + content.substring(endIndex + 1)); console.log('SUCCESS'); } else { console.log('ERROR'); }

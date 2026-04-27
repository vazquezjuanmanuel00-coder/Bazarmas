/* =========================================
   MÁS BAZAR — Catálogo de productos
   Fuente: planilla articulos vendamas Final
   Precios con 20% OFF para transferencia
   ========================================= */

const CATEGORIAS = {
  cocina:       'Cocina y Bazar',
  organizacion: 'Organización',
  bano:         'Baño',
  deco:         'Deco y Hogar',
  blanqueria:   'Blanquería',
  sahumerios:   'Sahumerios',
  perfumeria:   'Perfumería',
  textiles:     'Textiles',
};

/* ─── Imágenes por categoría (Unsplash — rotativas por producto) ─── */
const CATEGORY_IMGS = {
  cocina: [
    'photo-1556909114-f6e7ad7d3136', // kitchen counter
    'photo-1586201375761-83865001e31c', // glass jars / food storage
    'photo-1612929633738-8fe44f7ec841', // cutlery / silverware
    'photo-1591189824344-9b65b5166c79', // kitchen utensils
    'photo-1574269909862-7e1d70bb8078', // kitchen tools
    'photo-1556909172-54557c7e4fb7', // kitchen lifestyle
    'photo-1565958011-ab5e42cba5ff', // baking / trays
    'photo-1605522561233-768ad7a8fabf', // kitchen organization
  ],
  bano: [
    'photo-1552321554-5fefe8c9ef14', // bathroom setup
    'photo-1600585154340-be6161a56a0c', // clean bathroom
    'photo-1584622650111-993a426fbf0a', // bathroom accessories
    'photo-1545154651-5e577a0e2f80', // bathroom towels & accessories
  ],
  organizacion: [
    'photo-1567521464027-f127ff144326', // home storage
    'photo-1600585152220-90363fe7e115', // home organization
    'photo-1597843786411-a7fa8ad44a95', // storage baskets
    'photo-1558618666-fcd25c85cd64', // pantry organization
  ],
  deco: [
    'photo-1555041469-a586c61ea9bc', // modern living room
    'photo-1524758631624-e2822e304c36', // cozy interior
    'photo-1513519245088-0e12902e5a38', // home interior warm
    'photo-1618220179428-22790b461013', // modern deco wall
    'photo-1550581190-9c1c48d21d6c', // clock / wall decor
  ],
  perfumeria: [
    'photo-1541643600914-78b084683702', // perfume bottle classic
    'photo-1592945403244-b3fbafd7f539', // perfume bottles
    'photo-1585386959984-a4155224a1ad', // luxury cosmetics
    'photo-1523293182086-7651a899d37f', // perfume luxury dark
  ],
  textiles: [
    'photo-1631049307264-da0ec9d70304', // bedding set
    'photo-1540518614846-7eded433c457', // white bedroom
    'photo-1522771739844-6a9f6d5f14af', // cozy bedroom
    'photo-1578683010236-d716f9a3f461', // bed linen close-up
  ],
  blanqueria: [
    'photo-1582735689369-4fe89db7114c', // kitchen towels / home textiles
    'photo-1616594039964-ae9021a400a0', // folded white textiles
    'photo-1558769132-cb1aea458c5e', // textile/fabric close-up
    'photo-1563453392212-326f5e854473', // home linens
  ],
  sahumerios: [
    'photo-1608571423902-eed4a5ad8108', // candles / aroma
    'photo-1602928298849-a63c5ae89cd5', // aromatherapy & candles
    'photo-1542838132-92c53300491e', // zen / incense mood
    'photo-1603006905003-be475563bc59', // candle / home scent
  ],
};

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // quita tildes
    .replace(/[×÷]/g, 'x')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function productImg(prod, w = 400, h = 400) {
  const local = `img/productos/${slugify(prod.nombre)}.jpg`;
  const imgs = CATEGORY_IMGS[prod.categoria] || [];
  const fallback = imgs.length
    ? `https://images.unsplash.com/${imgs[prod.id % imgs.length]}?auto=format&fit=crop&w=${w}&h=${h}&q=80`
    : `https://picsum.photos/seed/${prod.id}/${w}/${h}`;

  const img = new Image();
  img.src = local;
  return local; // siempre intenta local; si falla el <img> muestra broken image
}

/* Helper para usar en renderCard con fallback automático */
function productImgTag(prod, w = 400, h = 400) {
  const local = `img/productos/${slugify(prod.nombre)}.jpg`;
  const imgs  = CATEGORY_IMGS[prod.categoria] || [];
  const fallback = imgs.length
    ? `https://images.unsplash.com/${imgs[prod.id % imgs.length]}?auto=format&fit=crop&w=${w}&h=${h}&q=80`
    : `https://picsum.photos/seed/${prod.id}/${w}/${h}`;
  return `<img src="${local}" alt="${prod.nombre}" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">`;
}

/* img: clave interna (ya no se usa directamente — se usa productImg()) */
const PRODUCTOS = [
  /* ─────── COCINA Y BAZAR ─────── */
  {
    id: 1,
    nombre:    'Hermético Micro Vent 550cc',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    2100,
    img:       'container01',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 2,
    nombre:    'Hermético Micro Vent Cuadrado 2.7L',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    4100,
    img:       'container02',
    nuevo:     false,
    destacado: true,
    masVendido: false,
  },
  {
    id: 3,
    nombre:    'Hermético Micro Vent Rect. 1.3L',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    2600,
    img:       'container03',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 4,
    nombre:    'Botella GO 800cc',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    2400,
    img:       'bottle01',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 5,
    nombre:    'Set Viandas Picnic 350cc + 475cc + 750cc',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    4700,
    img:       'lunchbox01',
    nuevo:     true,
    destacado: true,
    masVendido: false,
  },
  {
    id: 6,
    nombre:    'Set x4 Flaneras Individuales',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    2500,
    img:       'bowl01',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 7,
    nombre:    'Tarro Flip Top Cilíndrico 1L',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    3200,
    img:       'jar01',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 8,
    nombre:    'Especiero Vidrio Individual',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    2400,
    img:       'spice01',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 9,
    nombre:    'Set x5 Especieros Vidrio + Soporte Colgante',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    15200,
    img:       'spice02',
    nuevo:     false,
    destacado: true,
    masVendido: false,
  },
  {
    id: 10,
    nombre:    'Ensaladera Cosmos Color',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    2500,
    img:       'bowl02',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 11,
    nombre:    'Escurridor de Cubiertos',
    categoria: 'cocina',
    proveedor: 'CROM',
    precio:    2800,
    img:       'kitchen01',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 12,
    nombre:    'Coladores x3 (7 - 8 - 10 cm)',
    categoria: 'cocina',
    proveedor: 'BENABI',
    precio:    2600,
    img:       'kitchen02',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 13,
    nombre:    'Espátula Silicona Mango Cristal 24cm',
    categoria: 'cocina',
    proveedor: 'BENABI',
    precio:    1000,
    img:       'kitchen03',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 14,
    nombre:    'Vaporiera 22cm',
    categoria: 'cocina',
    proveedor: 'BENABI',
    precio:    2000,
    img:       'kitchen04',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 15,
    nombre:    'Molde Antiadherente 26×18×2.5 cm',
    categoria: 'cocina',
    proveedor: 'BENABI',
    precio:    2100,
    img:       'baking01',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 16,
    nombre:    'Decantador de Vino 1600ml',
    categoria: 'cocina',
    proveedor: 'SAUER',
    precio:    29300,
    img:       'decanter01',
    nuevo:     false,
    destacado: true,
    masVendido: false,
  },
  {
    id: 17,
    nombre:    'Set Cubiertos Acero Inox. Carol 16pz Negro',
    categoria: 'cocina',
    proveedor: 'SAUER',
    precio:    68500,
    img:       'cutlery01',
    nuevo:     false,
    destacado: true,
    masVendido: false,
  },
  {
    id: 18,
    nombre:    'Cuchara Batir Coctelería 32cm Acero Inox.',
    categoria: 'cocina',
    proveedor: 'SAUER',
    precio:    4700,
    img:       'kitchen05',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 19,
    nombre:    'Plato Asado 23cm Pino Cuadrado',
    categoria: 'cocina',
    proveedor: 'SAUER',
    precio:    4200,
    img:       'plate01',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },

  /* ─────── ORGANIZACIÓN ─────── */
  {
    id: 20,
    nombre:    'Recipiente Residuos 22L Automático Vaivén',
    categoria: 'organizacion',
    proveedor: 'CROM',
    precio:    14700,
    img:       'trashcan01',
    nuevo:     false,
    destacado: true,
    masVendido: false,
  },
  {
    id: 21,
    nombre:    'Recipiente Residuos 8L Automático',
    categoria: 'organizacion',
    proveedor: 'CROM',
    precio:    10500,
    img:       'trashcan02',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 22,
    nombre:    'Recipiente Residuos 22L Vaivén',
    categoria: 'organizacion',
    proveedor: 'CROM',
    precio:    17000,
    img:       'trashcan03',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 23,
    nombre:    'Cesto de Basura 3L',
    categoria: 'organizacion',
    proveedor: 'BENABI',
    precio:    12200,
    img:       'basket01',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 24,
    nombre:    'Cesto de Basura 5L',
    categoria: 'organizacion',
    proveedor: 'BENABI',
    precio:    15000,
    img:       'basket02',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 25,
    nombre:    'Cesto de Basura 8L',
    categoria: 'organizacion',
    proveedor: 'BENABI',
    precio:    20200,
    img:       'basket03',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },

  /* ─────── BAÑO ─────── */
  {
    id: 26,
    nombre:    'Cortina de Baño con Ganchos Impresa',
    categoria: 'bano',
    proveedor: 'CARESSE',
    precio:    6100,
    img:       'shower01',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 27,
    nombre:    'Cortina Blanca Plus con Ganchos (100 mic)',
    categoria: 'bano',
    proveedor: 'CARESSE',
    precio:    6200,
    img:       'shower02',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 28,
    nombre:    'Cortina Cristal Plus con Ganchos (100 mic)',
    categoria: 'bano',
    proveedor: 'CARESSE',
    precio:    6200,
    img:       'shower03',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 29,
    nombre:    'Cortina de Baño Doble con Ganchos',
    categoria: 'bano',
    proveedor: 'CARESSE',
    precio:    8200,
    img:       'shower04',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 30,
    nombre:    'Protector de Cortina Blanco (75 mic)',
    categoria: 'bano',
    proveedor: 'CARESSE',
    precio:    4800,
    img:       'shower05',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 31,
    nombre:    'Set de Baño 4pz PVC Bambú Cuadrado',
    categoria: 'bano',
    proveedor: 'SAUER',
    precio:    28900,
    img:       'bathroom01',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 32,
    nombre:    'Dosificador Negro c/Porta Esponja Jaguar',
    categoria: 'bano',
    proveedor: 'SAUER',
    precio:    4900,
    img:       'bathroom02',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 33,
    nombre:    'Dosificador Blanco c/Porta Esponja',
    categoria: 'bano',
    proveedor: 'SAUER',
    precio:    4900,
    img:       'bathroom03',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 34,
    nombre:    'Escobilla Acero Inox. c/Vaso',
    categoria: 'bano',
    proveedor: 'SAUER',
    precio:    11900,
    img:       'bathroom04',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },

  /* ─────── DECO Y HOGAR ─────── */
  {
    id: 35,
    nombre:    'Reloj de Pared Bicicleta',
    categoria: 'deco',
    proveedor: 'FRATELLI',
    precio:    14600,
    img:       'clock01',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 36,
    nombre:    'Reloj de Pared Cactus',
    categoria: 'deco',
    proveedor: 'FRATELLI',
    precio:    14600,
    img:       'clock02',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 37,
    nombre:    'Reloj de Pared Flores',
    categoria: 'deco',
    proveedor: 'FRATELLI',
    precio:    14600,
    img:       'clock03',
    nuevo:     false,
    destacado: true,
    masVendido: false,
  },
  {
    id: 38,
    nombre:    'Reloj de Pared Vintage',
    categoria: 'deco',
    proveedor: 'FRATELLI',
    precio:    14600,
    img:       'clock04',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 39,
    nombre:    'Reloj de Pared Fernet',
    categoria: 'deco',
    proveedor: 'FRATELLI',
    precio:    14600,
    img:       'clock05',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 40,
    nombre:    'Reloj de Pared Ruta 66',
    categoria: 'deco',
    proveedor: 'FRATELLI',
    precio:    14600,
    img:       'clock06',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },

  /* ─────── PERFUMERÍA ─────── */
  {
    id: 41,
    nombre:    'Perfume Estilo 212 VIP Black 100ml Premium',
    categoria: 'perfumeria',
    proveedor: 'UNICA',
    precio:    52000,
    img:       'perfume01',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 42,
    nombre:    'Perfume Estilo Good Girl 90ml Premium',
    categoria: 'perfumeria',
    proveedor: 'UNICA',
    precio:    52000,
    img:       'perfume02',
    nuevo:     false,
    destacado: true,
    masVendido: false,
  },
  {
    id: 43,
    nombre:    'Perfume Estilo Invictus 100ml Premium',
    categoria: 'perfumeria',
    proveedor: 'UNICA',
    precio:    49400,
    img:       'perfume03',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 44,
    nombre:    'Perfume Estilo One Million 100ml Premium',
    categoria: 'perfumeria',
    proveedor: 'UNICA',
    precio:    46200,
    img:       'perfume04',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 45,
    nombre:    'Perfume Estilo La Vida es Bella 90ml Premium',
    categoria: 'perfumeria',
    proveedor: 'UNICA',
    precio:    45500,
    img:       'perfume05',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 46,
    nombre:    'Perfume Estilo Olympea 80ml Premium',
    categoria: 'perfumeria',
    proveedor: 'UNICA',
    precio:    42000,
    img:       'perfume06',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 47,
    nombre:    'Perfume Estilo Asad Árabe 100ml Premium',
    categoria: 'perfumeria',
    proveedor: 'UNICA',
    precio:    65000,
    img:       'perfume07',
    nuevo:     true,
    destacado: true,
    masVendido: false,
  },

  /* ─────── TEXTILES ─────── */
  {
    id: 48,
    nombre:    'Juego Sábanas Microfibra Twin Estampadas',
    categoria: 'textiles',
    proveedor: 'TUYEN',
    precio:    25500,
    img:       'bedding01',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 49,
    nombre:    'Juego Sábanas Microfibra Twin Lisa Falso Embozo',
    categoria: 'textiles',
    proveedor: 'TUYEN',
    precio:    29600,
    img:       'bedding02',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 50,
    nombre:    'Juego Sábanas Microfibra 2½ Estampadas',
    categoria: 'textiles',
    proveedor: 'TUYEN',
    precio:    27500,
    img:       'bedding03',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
  {
    id: 51,
    nombre:    'Juego Sábanas Microfibra Queen Estampadas',
    categoria: 'textiles',
    proveedor: 'TUYEN',
    precio:    34100,
    img:       'bedding04',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 52,
    nombre:    'Juego Sábanas Microfibra Queen Lisa Falso Embozo',
    categoria: 'textiles',
    proveedor: 'TUYEN',
    precio:    34100,
    img:       'bedding05',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },

  /* ─────── BLANQUERÍA ─────── */
  {
    id: 53,
    nombre:    'Repasador de Cocina x3 — Rayas Clásicas',
    categoria: 'blanqueria',
    proveedor: 'MÁS BAZAR',
    precio:    4800,
    img:       'blanq01',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 54,
    nombre:    'Trapo de Piso Antideslizante 60×80cm',
    categoria: 'blanqueria',
    proveedor: 'MÁS BAZAR',
    precio:    3600,
    img:       'blanq02',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 55,
    nombre:    'Paño Multiuso de Microfibra x5',
    categoria: 'blanqueria',
    proveedor: 'MÁS BAZAR',
    precio:    2900,
    img:       'blanq03',
    nuevo:     true,
    destacado: false,
    masVendido: true,
  },
  {
    id: 56,
    nombre:    'Set Toallas de Baño 450gr x2',
    categoria: 'blanqueria',
    proveedor: 'MÁS BAZAR',
    precio:    9800,
    img:       'blanq04',
    nuevo:     true,
    destacado: true,
    masVendido: false,
  },
  {
    id: 57,
    nombre:    'Mantel Antimanchas Rectangular 1.40×2.20m',
    categoria: 'blanqueria',
    proveedor: 'MÁS BAZAR',
    precio:    7500,
    img:       'blanq01',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },

  /* ─────── SAHUMERIOS ─────── */
  {
    id: 58,
    nombre:    'Sahumerio Palo Santo — Pack x20 unidades',
    categoria: 'sahumerios',
    proveedor: 'MÁS BAZAR',
    precio:    3200,
    img:       'sahu01',
    nuevo:     false,
    destacado: true,
    masVendido: true,
  },
  {
    id: 59,
    nombre:    'Sahumerio Lavanda — Pack x20 unidades',
    categoria: 'sahumerios',
    proveedor: 'MÁS BAZAR',
    precio:    2800,
    img:       'sahu02',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 60,
    nombre:    'Sahumerio Sándalo — Pack x20 unidades',
    categoria: 'sahumerios',
    proveedor: 'MÁS BAZAR',
    precio:    2800,
    img:       'sahu03',
    nuevo:     false,
    destacado: false,
    masVendido: false,
  },
  {
    id: 61,
    nombre:    'Porta Sahumerios Cerámica Artesanal',
    categoria: 'sahumerios',
    proveedor: 'MÁS BAZAR',
    precio:    4500,
    img:       'sahu04',
    nuevo:     true,
    destacado: true,
    masVendido: false,
  },
  {
    id: 62,
    nombre:    'Citronela en Espiral — Pack x10',
    categoria: 'sahumerios',
    proveedor: 'MÁS BAZAR',
    precio:    1800,
    img:       'sahu01',
    nuevo:     false,
    destacado: false,
    masVendido: true,
  },
  {
    id: 63,
    nombre:    'Bombita de Citronela — Pack x6',
    categoria: 'sahumerios',
    proveedor: 'MÁS BAZAR',
    precio:    2200,
    img:       'sahu02',
    nuevo:     true,
    destacado: false,
    masVendido: false,
  },
];

/* ─── Helpers de precio ─── */
const DESCUENTO_TRF = 0.80; // 20% OFF con transferencia
const CUOTAS        = 3;

function precioTransferencia(p) {
  return Math.round(p * DESCUENTO_TRF);
}
function precioCuota(p) {
  return Math.round(precioTransferencia(p) / CUOTAS);
}
function formatARS(n) {
  return '$' + Number(n).toLocaleString('es-AR');
}
function imgUrl(seed, w = 400, h = 400) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

/* Filtrado / búsqueda */
function filtrarProductos({ categoria = null, query = '', sort = 'default' } = {}) {
  let res = [...PRODUCTOS];
  if (categoria) res = res.filter(p => p.categoria === categoria);
  if (query) {
    const q = query.toLowerCase();
    res = res.filter(p =>
      p.nombre.toLowerCase().includes(q) ||
      p.proveedor.toLowerCase().includes(q) ||
      CATEGORIAS[p.categoria].toLowerCase().includes(q)
    );
  }
  if (sort === 'precio-asc')  res.sort((a, b) => a.precio - b.precio);
  if (sort === 'precio-desc') res.sort((a, b) => b.precio - a.precio);
  if (sort === 'nombre')      res.sort((a, b) => a.nombre.localeCompare(b.nombre));
  return res;
}

/* =========================================
   MÁS BAZAR — Lógica principal
   ========================================= */

/* ── WhatsApp (reemplazar con número real) ── */
const WA_NUMBER = '5491100000000'; // ← cambiar por el número de Mas Bazar

/* =====================
   CARRITO
   ===================== */
let cart = JSON.parse(localStorage.getItem('mb_cart') || '[]');

function saveCart() {
  localStorage.setItem('mb_cart', JSON.stringify(cart));
  renderCartBadge();
}

function addToCart(id) {
  const prod = PRODUCTOS.find(p => p.id === id);
  if (!prod) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, categoria: prod.categoria, qty: 1 });
  }
  saveCart();
  renderCartItems();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCartItems();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCartItems(); }
}

function cartTotal() {
  return cart.reduce((s, i) => s + precioTransferencia(i.precio) * i.qty, 0);
}

function renderCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = total || '';
  });
}

function renderCartItems() {
  const body = document.getElementById('cartBody');
  if (!body) return;
  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty-msg">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Tu carrito está vacío</p>
      </div>`;
    document.getElementById('cartFooter').style.display = 'none';
    return;
  }
  document.getElementById('cartFooter').style.display = '';
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="img/productos/${slugify(item.nombre)}.jpg" alt="${item.nombre}" loading="lazy"
           onerror="this.onerror=null;this.src='${productImg(item, 150, 150)}'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.nombre}</div>
        <div class="cart-item-price">${formatARS(precioTransferencia(item.precio))}</div>
        <div class="cart-item-qty-row">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},  1)">+</button>
          <span class="cart-item-remove" onclick="removeFromCart(${item.id})">Eliminar</span>
        </div>
      </div>
    </div>`).join('');
  document.getElementById('cartTotalVal').textContent = formatARS(cartTotal());
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function pedirPorWhatsApp() {
  if (cart.length === 0) return;
  const lineas = cart.map(i =>
    `• ${i.nombre} x${i.qty} — ${formatARS(precioTransferencia(i.precio) * i.qty)}`
  );
  const msg = `¡Hola Más Bazar! Me gustaría hacer el siguiente pedido:\n\n${lineas.join('\n')}\n\nTotal con transferencia: ${formatARS(cartTotal())}`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

/* =====================
   HERO SLIDER
   ===================== */
let sliderIdx = 0;
let sliderTimer;

function initSlider() {
  const track = document.getElementById('heroTrack');
  const dots  = document.getElementById('sliderDots');
  if (!track) return;
  const slides = track.querySelectorAll('.hero-slide');
  const total  = slides.length;

  dots.innerHTML = Array.from({ length: total }, (_, i) =>
    `<span class="dot${i === 0 ? ' active' : ''}" onclick="goSlide(${i})"></span>`
  ).join('');

  slides[0]?.classList.add('is-active');

  function update() {
    track.style.transform = `translateX(-${sliderIdx * 100}%)`;
    dots.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === sliderIdx));
    slides.forEach((s, i) => s.classList.toggle('is-active', i === sliderIdx));
  }

  window.goSlide = function(i) {
    sliderIdx = (i + total) % total;
    update();
    resetTimer();
  };
  window.nextSlide = () => goSlide(sliderIdx + 1);
  window.prevSlide = () => goSlide(sliderIdx - 1);

  function resetTimer() {
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => goSlide(sliderIdx + 1), 5000);
  }
  resetTimer();

  /* swipe */
  let sx = 0;
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) goSlide(sliderIdx + (dx < 0 ? 1 : -1));
  });
}

/* =====================
   CAROUSEL
   ===================== */
function scrollCarousel(id, dir) {
  const el = document.getElementById(id);
  if (el) el.scrollBy({ left: dir * 260, behavior: 'smooth' });
}

/* =====================
   RENDER PRODUCT CARD
   ===================== */
function renderCard(prod) {
  const pOrig    = prod.precio;
  const pTrf     = precioTransferencia(pOrig);
  const pCuota   = precioCuota(pOrig);
  const local    = `img/productos/${slugify(prod.nombre)}.jpg`;
  const fallback = productImg(prod, 400, 400);
  const badges = [
    prod.nuevo      ? '<span class="badge badge-new">Nuevo</span>' : '',
    prod.masVendido ? '<span class="badge badge-hot">+ Vendido</span>' : '',
  ].filter(Boolean).join('');

  return `
    <div class="product-card">
      <div class="product-img-wrap">
        <img class="product-img" src="${local}" alt="${prod.nombre}" loading="lazy"
             onerror="this.onerror=null;this.src='${fallback}'">
        ${badges ? `<div class="product-badges">${badges}</div>` : ''}
      </div>
      <div class="product-name">${prod.nombre}</div>
      <div class="product-price-orig">${formatARS(pOrig)}</div>
      <div class="product-price-row">
        <span class="product-price-main">${formatARS(pTrf)}</span>
        <span class="product-price-tag">con Transferencia</span>
      </div>
      <div class="product-cuotas">3 x ${formatARS(pCuota)} sin interés</div>
      <button class="btn-comprar" onclick="addToCart(${prod.id})">Comprar</button>
    </div>`;
}

/* =====================
   RENDERIZAR SECCIONES HOME
   ===================== */
function renderSection(containerId, filterFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const prods = PRODUCTOS.filter(filterFn);
  el.innerHTML = prods.map(renderCard).join('');
}

/* =====================
   BÚSQUEDA
   ===================== */
function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input   = document.getElementById('searchBoxInput');
  overlay.classList.add('open');
  input.value = '';
  document.getElementById('searchResultsList').innerHTML = '';
  setTimeout(() => input.focus(), 50);
  document.body.style.overflow = 'hidden';
}
function closeSearch() {
  document.getElementById('searchOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function doSearch(q) {
  const list = document.getElementById('searchResultsList');
  if (!list) return;
  if (!q.trim()) { list.innerHTML = ''; return; }
  const results = filtrarProductos({ query: q }).slice(0, 8);
  if (results.length === 0) {
    list.innerHTML = `<div class="search-empty">Sin resultados para "<strong>${q}</strong>"</div>`;
    return;
  }
  list.innerHTML = results.map(p => `
    <div class="search-result" onclick="addToCart(${p.id}); closeSearch();">
      <img src="img/productos/${slugify(p.nombre)}.jpg" alt="${p.nombre}" loading="lazy"
           onerror="this.onerror=null;this.src='${productImg(p, 100, 100)}'">
      <div>
        <div class="sr-name">${p.nombre}</div>
        <div class="sr-price">${formatARS(precioTransferencia(p.precio))}</div>
      </div>
    </div>`).join('');
}

/* =====================
   COOKIE BANNER
   ===================== */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  if (!localStorage.getItem('mb_cookies')) banner.classList.remove('hide');
  document.getElementById('cookieAccept').onclick = () => {
    localStorage.setItem('mb_cookies', '1');
    banner.classList.add('hide');
  };
}

/* =====================
   PRODUCTOS PAGE — FILTROS + GRID
   ===================== */
let pgState = { categoria: null, query: '', sort: 'default' };

function renderGrid() {
  const grid = document.getElementById('productsGrid');
  const count = document.getElementById('productsCount');
  if (!grid) return;
  const prods = filtrarProductos(pgState);
  if (count) count.textContent = `${prods.length} productos`;
  grid.innerHTML = prods.length
    ? prods.map(renderCard).join('')
    : `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--muted)">
         Sin productos para esta selección.
       </div>`;
}

function setCategoria(cat) {
  pgState.categoria = cat || null;
  document.querySelectorAll('.chip[data-cat]').forEach(c => {
    c.classList.toggle('active', c.dataset.cat === (cat || ''));
  });
  renderGrid();
}
function setSort(val) { pgState.sort = val; renderGrid(); }
function setQuery(q)  { pgState.query = q; renderGrid(); }

/* =====================
   INIT
   ===================== */
document.addEventListener('DOMContentLoaded', () => {

  /* Carrito */
  renderCartBadge();
  renderCartItems();

  /* Slider */
  initSlider();

  /* Cookie */
  initCookieBanner();

  /* Secciones home */
  renderSection('destacadosTrack', p => p.destacado);
  renderSection('novedadesTrack',  p => p.nuevo);
  renderSection('vendidosTrack',   p => p.masVendido);

  /* Productos page */
  if (document.getElementById('productsGrid')) {
    renderGrid();
    /* Chips de categoría */
    document.querySelectorAll('.chip[data-cat]').forEach(chip => {
      chip.addEventListener('click', () => setCategoria(chip.dataset.cat || null));
    });
    /* Sort */
    const sortSel = document.getElementById('sortSelect');
    if (sortSel) sortSel.addEventListener('change', e => setSort(e.target.value));
    /* Search inline */
    const searchPg = document.getElementById('pageSearch');
    if (searchPg) searchPg.addEventListener('input', e => setQuery(e.target.value));
    /* Leer cat desde URL */
    const urlCat = new URLSearchParams(location.search).get('cat');
    if (urlCat) setCategoria(urlCat);
  }

  /* Búsqueda overlay */
  const sbInput = document.getElementById('searchBoxInput');
  if (sbInput) {
    sbInput.addEventListener('input', e => doSearch(e.target.value));
    sbInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch();
    });
  }
  document.getElementById('searchOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('searchOverlay')) closeSearch();
  });

  /* Header búsqueda */
  document.getElementById('headerSearchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.location.href = `productos.html?q=${encodeURIComponent(q)}`;
    }
  });

  /* Aplicar query desde URL en productos page */
  const urlQ = new URLSearchParams(location.search).get('q');
  if (urlQ && document.getElementById('productsGrid')) {
    const pi = document.getElementById('pageSearch');
    if (pi) pi.value = urlQ;
    setQuery(urlQ);
  }

  /* Scroll suave de header */
  const header = document.getElementById('mainHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 10 ? '0 2px 16px rgba(0,0,0,.1)' : '';
    });
  }
});

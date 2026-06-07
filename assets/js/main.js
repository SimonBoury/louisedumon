'use strict';

const CATEGORY_LABELS = {
  keramiek: 'Keramiek',
  schilderij: 'Schilderij',
  illustratie: 'Illustratie'
};

let allWorks = [];
let siteEmail = 'louisedumon@icloud.com';
let currentImages = [];
let currentSlide = 0;

document.addEventListener('DOMContentLoaded', init);

async function init() {
  try {
    const [content, works] = await Promise.all([
      fetchJSON('data/content.json'),
      fetchJSON('data/works.json')
    ]);
    applyContent(content);
    allWorks = Array.isArray(works) ? works : [];
    renderWorks('all');
  } catch (err) {
    showWorksMessage(
      'De inhoud kon niet geladen worden. Controleer of <code>data/works.json</code> en ' +
      '<code>data/content.json</code> bestaan en geldige JSON bevatten. ' +
      'Tip: bekijk de site via de GitHub Pages-link, niet door het bestand lokaal te openen.'
    );
    console.error(err);
  }
  setupFilters();
  setupLightboxDismiss();
}

async function fetchJSON(path) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${path}: ${res.status}`);
  return res.json();
}

/* ---- Content (tagline, bio, e-mail) ---- */

function applyContent(c) {
  if (!c) return;
  siteEmail = c.email || siteEmail;

  setText('heroTag', c.tagline);
  setText('heroSub', c.heroSubtitle);

  const ticker = document.getElementById('ticker');
  if (ticker && c.ticker) {
    const segment = (c.ticker + '  ·  ').repeat(6);
    ticker.innerHTML = `<span class="ticker-inner">${escapeHTML(segment)}${escapeHTML(segment)}</span>`;
  }

  const quote = document.getElementById('aboutQuote');
  if (quote && c.aboutQuote) quote.innerHTML = renderEmphasis(c.aboutQuote);

  const body = document.getElementById('aboutBody');
  if (body && Array.isArray(c.aboutBody)) {
    body.innerHTML = c.aboutBody.map((p) => `<p>${escapeHTML(p)}</p>`).join('');
  }

  const email = document.getElementById('contactEmail');
  if (email) {
    email.textContent = siteEmail;
    email.href = `mailto:${siteEmail}`;
  }
}

/* ---- Werken-grid ---- */

function renderWorks(filter) {
  const grid = document.getElementById('worksGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const visible = allWorks.filter((w) => filter === 'all' || w.category === filter);
  if (visible.length === 0) {
    showWorksMessage('Geen werken in deze categorie.');
    return;
  }

  visible.forEach((work) => {
    const idx = allWorks.indexOf(work);
    const thumb = getImages(work)[0] || '';
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'work-card';
    card.dataset.index = String(idx);
    card.setAttribute('data-title', CATEGORY_LABELS[work.category] || work.category || '');
    card.setAttribute('aria-label', `Bekijk werk: ${work.title}`);
    card.innerHTML = `
      <img src="${escapeAttr(thumb)}" alt="${escapeAttr(work.title)}" loading="lazy"/>
      <div class="card-info">
        <div class="card-name">${escapeHTML(work.title)}</div>
        <div class="card-meta">${escapeHTML(CATEGORY_LABELS[work.category] || '')} · ${escapeHTML(work.year || '')}</div>
        <div class="card-footer">
          <span class="card-price">${escapeHTML(work.price || '')}</span>
          <span class="card-cue">Bekijk →</span>
        </div>
      </div>`;
    card.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(card);
  });
}

function showWorksMessage(html) {
  const grid = document.getElementById('worksGrid');
  if (grid) grid.innerHTML = `<p class="works-message">${html}</p>`;
}

function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      renderWorks(btn.dataset.filter);
    });
  });
}

/* ---- Detail-lightbox + interesse-mail ---- */

function openLightbox(index) {
  const work = allWorks[index];
  if (!work) return;
  const box = document.getElementById('lightbox');

  currentImages = getImages(work);
  currentSlide = 0;
  buildSlideshow(work.title);

  setText('lbCat', `${CATEGORY_LABELS[work.category] || work.category || ''} · ${work.year || ''}`);
  setText('lbTitle', work.title);

  const priceEl = document.getElementById('lbPrice');
  const priceLabel = document.getElementById('lbPriceLabel');
  if (work.price) {
    priceEl.textContent = work.price;
    priceEl.style.display = '';
    priceLabel.style.display = '';
  } else {
    priceEl.style.display = 'none';
    priceLabel.style.display = 'none';
  }

  setText('lbText', work.description || '');

  const cta = document.getElementById('lbCta');
  cta.href = buildInterestMailto(work);

  box.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('lbClose').focus();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function getImages(work) {
  if (Array.isArray(work.images)) return work.images.filter(Boolean);
  return work.image ? [work.image] : [];
}

function buildSlideshow(title) {
  const multiple = currentImages.length > 1;
  document.getElementById('lbPrev').style.display = multiple ? '' : 'none';
  document.getElementById('lbNext').style.display = multiple ? '' : 'none';

  const dots = document.getElementById('lbDots');
  dots.innerHTML = '';
  if (multiple) {
    currentImages.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'lb-dot';
      dot.setAttribute('aria-label', `Foto ${i + 1}`);
      dot.addEventListener('click', () => showSlide(i));
      dots.appendChild(dot);
    });
  }
  showSlide(0, title);
}

function showSlide(i, title) {
  if (currentImages.length === 0) return;
  currentSlide = (i + currentImages.length) % currentImages.length;
  const img = document.getElementById('lbImage');
  img.src = currentImages[currentSlide];
  if (title != null) img.dataset.title = title;
  img.alt = `${img.dataset.title || ''} — foto ${currentSlide + 1} van ${currentImages.length}`;

  const dots = document.querySelectorAll('.lb-dot');
  dots.forEach((d, idx) => d.classList.toggle('active', idx === currentSlide));
}

function shiftSlide(step) {
  showSlide(currentSlide + step);
}

function buildInterestMailto(work) {
  const subject = `Interesse in "${work.title}"`;
  const priceLine = work.price ? ` (richtprijs ${work.price})` : '';
  const body =
    `Hallo Louise,\n\n` +
    `Ik heb interesse in het werk "${work.title}"${priceLine}.\n\n` +
    `Graag verneem ik meer over beschikbaarheid en verzending.\n\n` +
    `Met vriendelijke groet,\n`;
  return `mailto:${siteEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function setupLightboxDismiss() {
  const box = document.getElementById('lightbox');
  if (!box) return;
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => shiftSlide(-1));
  document.getElementById('lbNext').addEventListener('click', () => shiftSlide(1));
  box.addEventListener('click', (e) => {
    if (e.target === box) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') shiftSlide(-1);
    else if (e.key === 'ArrowRight') shiftSlide(1);
  });
}

/* ---- Helpers ---- */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function escapeAttr(str) {
  return escapeHTML(str);
}

/* *woord* -> hol (outline) woord, voor het bio-citaat */
function renderEmphasis(str) {
  return escapeHTML(str).replace(/\*(.+?)\*/g, '<em>$1</em>');
}

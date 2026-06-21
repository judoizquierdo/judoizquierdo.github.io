/* Izquierdo Club Judo — main.js */

(function () {
  'use strict';

  /* --- NAV: scroll shadow --- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* --- NAV: mobile toggle --- */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- SCROLL ANIMATIONS (Intersection Observer) --- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => {
    /* stagger siblings inside the same parent */
    const siblings = Array.from(el.parentElement.querySelectorAll('.fade-in'));
    if (siblings.length > 1) {
      el.style.transitionDelay = siblings.indexOf(el) * 80 + 'ms';
    }
    observer.observe(el);
  });

  /* --- MASONRY GALLERY --- */
  const lightbox = document.getElementById('lightbox'); // kept for CV modal Escape handler
  function closeLightbox() { if (lightbox) { lightbox.hidden = true; document.body.style.overflow = ''; } }

  const masonryImgs = Array.from(document.querySelectorAll('.masonry__img'));
  if (masonryImgs.length > 1) {
    const ALL = [
      'img/gallery/miembros-club-01.avif',
      'img/gallery/entrenamiento-01.avif',
      'img/gallery/cinturones-negros.avif',
      'img/gallery/examen-cinturon-negro.avif',
      'img/gallery/tecnica-osoto.avif',
      'img/gallery/practicando.avif',
      'img/gallery/entrenamiento-02.avif',
      'img/gallery/exhibicion-01.avif',
      'img/gallery/exhibicion-02.avif',
      'img/gallery/charla.avif',        // pool: not initially visible
      'img/gallery/convivencia.avif',
      'img/gallery/miembros-club-02.avif',
      'img/gallery/foto-grupo.avif',
    ];
    // visible[i] = index in ALL currently shown in cell i
    const visible = masonryImgs.map((_, i) => i);
    // pool = indices not currently shown (photos 9-12)
    const pool = ALL.map((_, i) => i).slice(masonryImgs.length);
    let turn = 0;

    setInterval(() => {
      if (!pool.length) return;
      const i        = turn;
      const img      = masonryImgs[i];
      const outgoing = visible[i];
      const incoming = pool.shift();
      turn = (turn + 1) % masonryImgs.length;

      img.style.opacity = '0';
      setTimeout(async () => {
        const preload = new Image();
        preload.src = ALL[incoming];
        try { await preload.decode(); } catch (_) {}
        img.src = ALL[incoming];
        img.style.opacity = '1';
        visible[i] = incoming;
        pool.push(outgoing);
      }, 700);
    }, 4500);
  }

  /* --- CV MODAL --- */
  const cvBtn     = document.getElementById('cvBtn');
  const cvModal   = document.getElementById('cvModal');
  const cvClose   = document.getElementById('cvClose');
  const cvOverlay = document.getElementById('cvOverlay');

  function openCv() {
    cvModal.hidden = false;
    document.body.style.overflow = 'hidden';
    cvClose.focus();
  }
  function closeCv() {
    cvModal.hidden = true;
    document.body.style.overflow = '';
    cvBtn.focus();
  }

  if (cvBtn) {
    cvBtn.addEventListener('click', openCv);
    cvClose.addEventListener('click', closeCv);
    cvOverlay.addEventListener('click', closeCv);
    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if (lightbox && !lightbox.hidden) closeLightbox();
      else if (!cvModal.hidden) closeCv();
    });
  }

  /* --- SHARE --- */
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn && navigator.share) {
    shareBtn.hidden = false;
    shareBtn.addEventListener('click', () => {
      navigator.share({
        title: 'Izquierdo Club Judo',
        text: 'Club de judo y pilates en el centro de Zaragoza. Más de 35 años formando judokas.',
        url: 'https://www.judoizquierdo.es/'
      }).catch(() => {});
    });
  }

  /* --- FOOTER YEAR --- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();;

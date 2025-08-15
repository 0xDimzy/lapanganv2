document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const animation = entry.target.dataset.animate || "animate__fadeInUp";
        entry.target.style.animationDelay = `${index * 0.5}s`;
        entry.target.classList.add("animate__animated", animation);
      }
    });
  }, { threshold: 0.6 });

  elements.forEach(el => observer.observe(el));
});

document.getElementById('year').textContent = new Date().getFullYear();
const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');

new Swiper('.ringBasketSwiper', {
    loop: true,
    pagination: {
      el: '.ringBasketSwiper .swiper-pagination',
      clickable: true,
    },
  });

  new Swiper('.tiangTenisSwiper', {
    loop: true,
    pagination: {
      el: '.tiangTenisSwiper .swiper-pagination',
      clickable: true,
    },
  });

function closeMenu() {
  if (!menuPanel) return;
  menuPanel.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}
function openMenu() {
  if (!menuPanel) return;
  menuPanel.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
}
if (menuBtn) menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  expanded ? closeMenu() : openMenu();
});
if (menuPanel) menuPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('click', (e) => {
  if (!menuPanel || menuPanel.classList.contains('hidden')) return;
  if (!(menuPanel.contains(e.target) || (menuBtn && menuBtn.contains(e.target)))) closeMenu();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const targetId = a.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();

      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        target.querySelectorAll(".animate-on-scroll").forEach(el => {
          el.classList.remove("animate__animated", el.dataset.animate);
          void el.offsetWidth;
          el.classList.add("animate__animated", el.dataset.animate || "animate__fadeInUp");
        });
      }, 600);

      closeMenu();
    }
  });
});

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 4) navbar.classList.add('shadow-lg');
  else navbar.classList.remove('shadow-lg');
});

const navLinks = Array.from(document.querySelectorAll('.navlink'));
const sections = Array.from(document.querySelectorAll('section[id]'));

function setActiveById(id) {
  navLinks.forEach(a => {
    const target = (a.getAttribute('href') || '').replace('#', '');
    a.classList.toggle('is-active', target === id);
  });
}
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActiveById(entry.target.id);
  });
}, { threshold: 0.5, rootMargin: '-10% 0px -40% 0px' });
sections.forEach(sec => io.observe(sec));
setActiveById('home');

const WA_NUMBER = '6281330852765';
const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Halo, saya ingin konsultasi pembuatan/renovasi lapangan.')}`;
const waPopup = document.getElementById('waPopup');
const waPopupBtn = document.getElementById('waPopupBtn');
const waPopupClose = document.getElementById('waPopupClose');
const waFloat = document.getElementById('waFloat');
const waNumberLink = document.getElementById('waNumber');

if (waPopupBtn) waPopupBtn.href = waLink;
if (waFloat) waFloat.href = waLink;
if (waNumberLink) waNumberLink.href = waLink;

if (waPopup && waFloat) {
  waFloat.classList.add('hidden');
  waPopupClose?.addEventListener('click', () => {
    waPopup.classList.add('hidden');
    waFloat.classList.remove('hidden');
  });
}

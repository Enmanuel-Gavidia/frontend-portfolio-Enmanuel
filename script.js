/* =========================================
   ENMANUEL GAVIDIA — PORTFOLIO JS
   ========================================= */

// ─── CURSOR PERSONALIZADO ───
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Efecto hover en links
document.querySelectorAll('a, button, .tech-card, .project-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(0,229,160,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.width = '36px';
    follower.style.height = '36px';
    follower.style.borderColor = 'rgba(0,229,160,0.4)';
  });
});

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── HAMBURGER MENÚ ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Cerrar menú al hacer click en un link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ─── INTERSECTION OBSERVER - REVEAL ───
const revealElements = document.querySelectorAll('.section-title, .section-label, .about-text, .about-card, .contact-desc, .contact-grid, .project-card');

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ─── TECH CARDS ANIMACIÓN ───
const techCards = document.querySelectorAll('.tech-card');

const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay * 120);
    }
  });
}, { threshold: 0.15 });

techCards.forEach(card => techObserver.observe(card));

// ─── ACTIVE NAV LINK (scroll spy) ───
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--accent)';
    }
  });
});

// ─── FORMULARIO ───
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  const original = btn.innerHTML;

  btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Mensaje enviado!';
  btn.style.background = '#00e5a0';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});

// ─── TYPING EFFECT en hero subtitle ───
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
  const texts = [
    'Full Stack Developer — Junior',
    'Frontend Developer — HTML / CSS / JS',
    'Backend Developer — PHP / MySQL',
    'WordPress Developer'
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      subtitle.innerHTML = current.substring(0, charIndex - 1) + '<span class="separator">|</span>';
      charIndex--;
      typingDelay = 40;
    } else {
      subtitle.innerHTML = current.substring(0, charIndex + 1) + '<span class="separator">|</span>';
      charIndex++;
      typingDelay = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typingDelay = 1800;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingDelay = 400;
    }

    setTimeout(type, typingDelay);
  }

  setTimeout(type, 1500);
}

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── AÑO DINÁMICO EN FOOTER ───
const footerCopy = document.querySelector('.footer-copy');
if (footerCopy) {
  footerCopy.innerHTML = footerCopy.innerHTML.replace('2025', new Date().getFullYear());
}

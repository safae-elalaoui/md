'use strict';

AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: true,
  offset: 80
});

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
  toggleScrollTop();
  animateStats();
  animateSkillBars();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.slice(1);
    link.classList.toggle('active', href === current);
  });
}

const burger = document.getElementById('burger');
const navLinksEl = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinksEl.classList.toggle('open');
});

navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinksEl.classList.remove('open');
  });
});

const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const ribbon = document.querySelector('.stats-ribbon');
  if (!ribbon) return;
  const rect = ribbon.getBoundingClientRect();
  if (rect.top < window.innerHeight - 60) {
    statsAnimated = true;
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.ceil(target / 35);
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current;
      }, 40);
    });
  }
}

let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  const skillSection = document.getElementById('skills');
  if (!skillSection) return;
  const rect = skillSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 60) {
    skillsAnimated = true;
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const w = bar.dataset.width;
      setTimeout(() => { bar.style.width = w + '%'; }, 200);
    });
  }
}

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 8}s;
      animation-duration: ${6 + Math.random() * 6}s;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
}
createParticles();

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

form && form.addEventListener('submit', e => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours…';

  setTimeout(() => {
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
    formSuccess.style.display = 'block';
    form.reset();
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer ma demande';
      formSuccess.style.display = 'none';
    }, 5000);
  }, 1500);
});

const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    const parent = profileImg.parentElement;
    const fallback = document.createElement('div');
    fallback.style.cssText = `
      width: 100%; height: 480px; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: linear-gradient(135deg, #1a0800, #4a1a00);
      font-size: 5rem; user-select: none;
    `;
    fallback.innerHTML = `
      <div style="font-size:6rem;margin-bottom:1rem;" aria-hidden="true">👨‍🏋️</div>
      <div style="font-family:'Rajdhani',sans-serif;font-size:1.4rem;font-weight:700;color:#FF6B00;letter-spacing:1px;">Imad Ech-Chetyoui</div>
      <div style="font-size:.85rem;color:#9090a8;margin-top:.4rem;">Coach Sportif · LES MILLS</div>
    `;
    parent.insertBefore(fallback, profileImg);
    profileImg.style.display = 'none';
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

window.addEventListener('load', () => {
  animateStats();
  animateSkillBars();
  updateActiveNav();
});

document.querySelectorAll('.course-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.course-icon').style.transform = 'scale(1.2) rotate(-8deg)';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.course-icon').style.transform = '';
  });
});

window.addEventListener('mousemove', e => {
  const mx = (e.clientX / window.innerWidth - 0.5) * 6;
  const my = (e.clientY / window.innerHeight - 0.5) * 6;
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    item.style.transform = `translate(${mx * dir * 0.3}px, ${my * dir * 0.3}px)`;
  });
});

console.log('%c💪 Imad Ech-Chetyoui Portfolio', 'color: #FF6B00; font-size: 1.2rem; font-weight: bold;');
console.log('%cCoach Sportif · LES MILLS · Mohammedia, Maroc', 'color: #FFB300;');

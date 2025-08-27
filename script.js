// script.js - simple interactions and animated counters

document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll for anchor links

  document.querySelectorAll('a[href^="#"]').forEach(a => {

    a.addEventListener('click', (e) => {

      const target = document.querySelector(a.getAttribute('href'));

      if (target) {

        e.preventDefault();

        target.scrollIntoView({behavior: 'smooth', block: 'start'});

      }

    });

  });

  // Year in footer

  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dummy button handlers

  const hireBtn = document.getElementById('hireBtn');

  const contactBtn = document.getElementById('contactBtn');

  if (hireBtn) hireBtn.addEventListener('click', () => {

    alert('Thanks! I will reply within 24-48 hours. (Add your contact form here.)');

  });

  if (contactBtn) contactBtn.addEventListener('click', () => {

    document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});

  });

  // Animated counters when visible

  const counters = document.querySelectorAll('.stat-num');

  const speed = 1200; // ms duration

  const animateCount = (el, target) => {

    const start = 0;

    const range = target - start;

    let startTime = null;

    function step(timestamp){

      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / speed, 1);

      el.textContent = Math.floor(progress * range + start);

      if (progress < 1) requestAnimationFrame(step);

      else el.textContent = target; // ensure exact

    }

    requestAnimationFrame(step);

  };

  const onIntersect = entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const el = entry.target;

        const target = parseInt(el.dataset.target, 10) || 0;

        animateCount(el, target);

        observer.unobserve(el);

      }

    });

  };

  const observer = new IntersectionObserver(onIntersect, {threshold:0.4});

  counters.forEach(c => observer.observe(c));

  // Optional: theme toggle for light/dark (very simple)

  const themeToggle = document.getElementById('themeToggle');

  themeToggle?.addEventListener('click', () => {

    document.documentElement.classList.toggle('light-mode');

    // You can expand this to persist preference in localStorage

  });

});
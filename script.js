
    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX - 6 + 'px';
      cursor.style.top = mouseY - 6 + 'px';
    });
    function animateRing() {
      ringX += (mouseX - ringX - 18) * 0.12;
      ringY += (mouseY - ringY - 18) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2)'; cursorRing.style.width = '50px'; cursorRing.style.height = '50px'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; });
    });

    // Navbar scroll
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile nav toggle
    function toggleNav() {
      document.getElementById('navLinks').classList.toggle('open');
    }
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
    });

    // Intersection Observer for fade-up
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Counter animation
    function animateCounter(el, target, suffix = '') {
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString() + suffix;
      }, 16);
    }
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          statsObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-target]').forEach(el => statsObserver.observe(el));

    // Pricing card hover color for non-featured
    document.querySelectorAll('.pricing-btn.outline-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.textContent = 'BOOKING...';
        setTimeout(() => btn.textContent = '✓ BOOKED!', 1200);
      });
    });
    document.querySelector('.pricing-btn.primary-btn').addEventListener('click', function() {
      this.textContent = 'BOOKING...';
      setTimeout(() => this.textContent = '✓ BOOKED!', 1200);
    });

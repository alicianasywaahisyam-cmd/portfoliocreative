/* === [FINAL & PALING STABIL] SCRIPT.JS UNTUK SEMUA HALAMAN === */

document.addEventListener('DOMContentLoaded', () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // 1. FUNGSI GLOBAL (Berjalan di semua halaman)
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            document.addEventListener('mousemove', e => gsap.to(cursor, { duration: 0.3, x: e.clientX, y: e.clientY }));
            const hoverables = document.querySelectorAll('a, button, .focus-card, .project-card-large, .expertise-item, .stack-item');
            hoverables.forEach(el => {
                el.addEventListener('mouseover', () => cursor.classList.add('hover'));
                el.addEventListener('mouseout', () => cursor.classList.remove('hover'));
            });
            const magneticElements = document.querySelectorAll('.magnetic');
            magneticElements.forEach(el => {
                el.addEventListener('mousemove', e => {
                    const pos = el.getBoundingClientRect();
                    const x = e.clientX - pos.left - pos.width / 2;
                    const y = e.clientY - pos.top - pos.height / 2;
                    gsap.to(el, { duration: 0.5, x: x * 0.4, y: y * 0.4, ease: 'power2.out' });
                });
                el.addEventListener('mouseout', () => gsap.to(el, { duration: 0.5, x: 0, y: 0, ease: 'elastic.out(1, 0.3)' }));
            });
        }
    }

    // 2. ANIMASI KHUSUS HALAMAN INDEX.HTML
    if (document.querySelector('.hero')) {
        gsap.from('.hero-content > *', { duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.2 });
        gsap.from('.shape', { duration: 1.5, scale: 0.5, opacity: 0, stagger: 0.2, ease: 'power3.out' }, '-=1');
        gsap.from('.scroll-down-indicator', { duration: 1, opacity: 0, y: -20, ease: 'power2.out', delay: 1.2 });
        const parallaxItems = document.querySelectorAll('.parallax-item');
        document.querySelector('.hero').addEventListener('mousemove', e => {
            let x = (e.clientX / window.innerWidth - 0.5) * 40;
            let y = (e.clientY / window.innerHeight - 0.5) * 40;
            gsap.to(parallaxItems, { x: -x, y: -y, duration: 1, ease: 'power2.out', stagger: 0.05 });
        });
    }
    if (document.querySelector('#focus') && window.matchMedia("(min-width: 769px)").matches) {
        const focusSection = document.querySelector('#focus');
        gsap.from('.focus-card', { scrollTrigger: { trigger: focusSection, start: 'top 70%' }, opacity: 0, y: 100, stagger: 0.1, duration: 0.8, ease: 'power3.out' });
        focusSection.addEventListener('mousemove', e => {
            let rect = focusSection.getBoundingClientRect();
            let x = (e.clientX - rect.left) / rect.width - 0.5;
            let y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to('.card-1', { x: -x * 30, y: -y * 20, rotation: -8, duration: 1, ease: 'power2.out' });
            gsap.to('.card-2', { x: x * 20, y: y * 40, scale: 1.1, duration: 1, ease: 'power2.out' });
            gsap.to('.card-3', { x: x * 40, y: -y * 30, rotation: 10, duration: 1, ease: 'power2.out' });
        });
    }

    // 3. ANIMASI KHUSUS HALAMAN ABOUT.HTML (LOGIKA SUPER SIMPEL & STABIL)
    if (document.querySelector('.about-hero-section')) {
        gsap.from('.about-hero-section .main-heading, .about-hero-section .description', { duration: 1, y: 40, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.3 });
        gsap.from('.scroll-down-indicator', { duration: 1, opacity: 0, y: -20, ease: 'power2.out', delay: 1.2 });
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d'); let particles = []; const particleCount = 70; const colors = ["#E8A0BF", "#F4D3E2", "#FFFFFF"]; const setCanvasSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }; class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.radius = Math.random() * 2 + 1; this.color = colors[Math.floor(Math.random() * colors.length)]; this.velocity = { x: (Math.random() - 0.5) * 0.5, y: (Math.random() - 0.5) * 0.5 }; } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); } update() { this.x += this.velocity.x; this.y += this.velocity.y; if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1; if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1; this.draw(); } } const initParticles = () => { particles = []; for (let i = 0; i < particleCount; i++) { particles.push(new Particle()); } }; const animateParticles = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => p.update()); requestAnimationFrame(animateParticles); }; setCanvasSize(); initParticles(); animateParticles(); window.addEventListener('resize', () => { setCanvasSize(); initParticles(); });
        }

        if (window.matchMedia("(min-width: 769px)").matches) {
            
            // ANIMASI 1: SCROLL HORIZONTAL (TETAP SAMA, KARENA INI KEREN & STABIL)
            const horizontalScrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#timeline-horizontal",
                    start: "top top",
                    end: "2000 top",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true
                }
            });
            horizontalScrollTl.to('.timeline-track', {
                x: () => -(document.querySelector('.timeline-track').scrollWidth - window.innerWidth),
                ease: "none"
            });
            
            // ANIMASI 2: MUNCULNYA SECTION SELANJUTNYA (SUPER SIMPEL & ANTI-GAGAL)
            // Tidak ada lagi transisi rumit. Saat di-scroll, section ini akan muncul.
            gsap.from("#next-steps .container > *", {
                scrollTrigger: {
                    trigger: "#next-steps",
                    start: "top 85%", // Mulai saat section terlihat 15% dari bawah
                    toggleActions: "play none none reverse"
                },
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            });
            
            // ANIMASI UNTUK SETIAP ITEM DI DALAM TIMELINE
            // Tetap berjalan seperti biasa.
            gsap.utils.toArray('.timeline-item').forEach(item => {
                const image = item.querySelector('.timeline-image-wrapper');
                const content = item.querySelector('.timeline-content');
                const tags = item.querySelectorAll('.skill-tag');
                let itemTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: horizontalScrollTl,
                        start: 'left 80%',
                        toggleActions: 'play none none reverse'
                    }
                });
                itemTl.from(image, { opacity: 0, scale: 0.8, duration: 0.8, ease: 'power3.out' })
                      .from(content, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' }, "-=0.6")
                      .from(tags, { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, "-=0.5");
            });
        }
    }
});
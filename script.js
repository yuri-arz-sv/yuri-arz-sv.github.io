document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;

        // Add delay to follower cursor
        gsap.to(cursorFollower, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.5,
            ease: "power3.out"
        });
    });

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .skill-item, .social-link');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('cursor-follower-active');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('cursor-follower-active');
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Typing animation for hero section
    const typingText = document.querySelector('.typing-text');
    const texts = ["Full-Stack Developer", "UI/UX Designer", "Web Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex++;
            if (textIndex === texts.length) textIndex = 0;
            setTimeout(type, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }
    }

    // Start typing animation after 1 second
    setTimeout(type, 1000);

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (isElementInViewport(bar)) {
                bar.style.width = width;
            }
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Run once on load

    // Floating laptop animation
    gsap.to('.laptop', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Screen code animation
    const codeLines = document.querySelectorAll('.code-line');

    codeLines.forEach((line, index) => {
        gsap.from(line, {
            width: 0,
            duration: 0.5,
            delay: index * 0.3,
            ease: "power2.out"
        });
    });

    // Floating particles background
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
    }

    // Form submission
    const contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const formData = new FormData(this);

        // Here you would typically send the form data to a server
        console.log('Form submitted:', Object.fromEntries(formData));

        // Show success message
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = 'var(--success-color)';

        // Reset form after 3 seconds
        setTimeout(() => {
            this.reset();
            submitBtn.textContent = 'Send Message';
            submitBtn.style.backgroundColor = 'var(--primary-color)';
        }, 3000);
    });

    // Scroll reveal animations
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: false
    });

    scrollReveal.reveal('.hero-content, .hero-image', { interval: 200 });
    scrollReveal.reveal('.about-image, .about-text', { interval: 200 });
    scrollReveal.reveal('.skills-category', { interval: 200 });
    scrollReveal.reveal('.contact-info, .contact-form', { interval: 200 });

    // Background canvas animation (existing code)
    const canvas = document.getElementById('canvas-bg');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced particle system
    const PARTICLE_COUNT = 150;
    const PARTICLE_MAX_SIZE = 3;
    const CONNECTION_DISTANCE = 150;
    const MOUSE_INFLUENCE = 150;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * PARTICLE_MAX_SIZE + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.speed = (Math.random() * 1) + 0.5;
            this.angle = Math.random() * Math.PI * 2;
            this.color = `hsl(${Math.random() * 60 + 200}, 80%, 60%)`;
        }

        update() {
            this.angle += 0.01;
            this.baseX += Math.cos(this.angle) * 0.2;
            this.baseY += Math.sin(this.angle) * 0.2;

            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_INFLUENCE) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (MOUSE_INFLUENCE - distance) / MOUSE_INFLUENCE;
                    this.x -= forceDirectionX * force * 10;
                    this.y -= forceDirectionY * force * 10;
                }
            }

            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

            // Add glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }
    }

    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE) {
                    const opacity = 1 - (distance / CONNECTION_DISTANCE);
                    ctx.strokeStyle = `hsla(200, 80%, 60%, ${opacity * 0.5})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.shadowBlur = 0; // Reset shadow after connections
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Add subtle gradient background
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
        gradient.addColorStop(1, 'rgba(15, 23, 42, 1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        drawConnections();
        requestAnimationFrame(animate);
    }

    animate();

    // Laptop glow effect
    const laptop = document.querySelector('.laptop');
    gsap.to(laptop, {
        filter: "drop-shadow(0 0 25px rgba(79, 195, 247, 0.5))",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Scroll down button animation
    const scrollDown = document.querySelector('.scroll-down');
    gsap.to(scrollDown, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Section entrance animations
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Skill bars animation
    const skillsSection = document.querySelector('#skills');

    ScrollTrigger.create({
        trigger: skillsSection,
        start: "top 70%",
        onEnter: () => {
            gsap.to('.skill-progress', {
                width: (i, el) => el.getAttribute('data-width'),
                duration: 1.5,
                ease: "power3.out",
                stagger: 0.1
            });
        }
    });
});
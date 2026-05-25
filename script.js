/* ============================================================
   PREMIUM CONSTRUCTION PORTFOLIO - SCRIPT.JS
   Author: Nguyễn Hữu Trường Portfolio
   Description: Interactive functionality and animations
   ============================================================ */

(function () {
    'use strict';

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTop');
    const typedText = document.getElementById('typedText');
    const heroParticles = document.getElementById('heroParticles');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const contactForm = document.getElementById('contactForm');
    const statNumbers = document.querySelectorAll('.stat-number');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    // ============================================================
    // LOADING SCREEN
    // ============================================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';

            // Initialize AOS after loader
            if (typeof AOS !== 'undefined') {
                AOS.init({
                    duration: 800,
                    easing: 'ease-out-cubic',
                    once: true,
                    offset: 80,
                    delay: 0,
                });
            }

            // Start hero animations after loader
            initHeroAnimations();
        }, 2200);
    });

    // ============================================================
    // HERO ANIMATIONS
    // ============================================================
    function initHeroAnimations() {
        startTypingEffect();
        animateStatCounters();
        createParticles();
    }

    // ============================================================
    // TYPING EFFECT
    // ============================================================
    const typingTitles = [
        'Senior Construction Project Manager',
        'Construction Site Director',
        'Civil Engineering Expert',
        'Infrastructure Development Leader',
        'Project Execution Specialist',
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function startTypingEffect() {
        const currentTitle = typingTitles[titleIndex];

        if (isDeleting) {
            typedText.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            typedText.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 60;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at end of word
            typingSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % typingTitles.length;
            typingSpeed = 500;
        }

        setTimeout(startTypingEffect, typingSpeed);
    }

    // ============================================================
    // STAT COUNTER ANIMATION
    // ============================================================
    let statsAnimated = false;

    function animateStatCounters() {
        if (statsAnimated) return;

        const heroSection = document.getElementById('hero');
        const rect = heroSection.getBoundingClientRect();

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;

            statNumbers.forEach((num) => {
                const target = parseInt(num.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    num.textContent = Math.floor(current);
                }, 16);
            });
        }
    }

    // ============================================================
    // HERO PARTICLES
    // ============================================================
    function createParticles() {
        if (!heroParticles) return;

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const size = Math.random() * 6 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 10;

            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                animation: particleFloat ${duration}s ${delay}s ease-in-out infinite;
            `;

            heroParticles.appendChild(particle);
        }

        // Add particle animation keyframes dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(30px, -50px) scale(1.2);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(-20px, -100px) scale(0.8);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(40px, -50px) scale(1.1);
                    opacity: 0.5;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================================
    // NAVIGATION - Sticky & Active Scroll
    // ============================================================
    function handleScroll() {
        const scrollY = window.scrollY;

        // Sticky navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();

        // Stat counter animation
        animateStatCounters();

        // Skill bar animation
        animateSkillBars();
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================================
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ============================================================
    // BACK TO TOP BUTTON
    // ============================================================
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    // ============================================================
    // SKILL BAR ANIMATION
    // ============================================================
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            skillsAnimated = true;

            skillBars.forEach((bar) => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        }
    }

    // ============================================================
    // PORTFOLIO FILTER
    // ============================================================
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach((card) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'all 0.4s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });

    // ============================================================
    // CONTACT FORM HANDLER
    // ============================================================
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const originalText = btnText.textContent;

        // Simulate form submission
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            btnText.textContent = 'Message Sent!';
            btnIcon.innerHTML = '<i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #16a34a, #4ade80)';

            // Reset form
            contactForm.reset();

            // Reset button after delay
            setTimeout(() => {
                btnText.textContent = originalText;
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });

    // ============================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth',
                });
            }
        });
    });

    // ============================================================
    // PARALLAX EFFECT FOR HERO (subtle)
    // ============================================================
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroSection = document.getElementById('hero');
        if (heroSection && scrollY < window.innerHeight) {
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.15}px)`;
                heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
            }
        }
    }, { passive: true });

    // ============================================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements with data-reveal attribute
    document.querySelectorAll('[data-reveal]').forEach((el) => {
        observer.observe(el);
    });

    // ============================================================
    // YEAR IN FOOTER (dynamic)
    // ============================================================
    const currentYear = new Date().getFullYear();
    const footerCopy = document.querySelector('.footer-bottom p');
    if (footerCopy) {
        footerCopy.innerHTML = footerCopy.innerHTML.replace('2024', currentYear);
    }

    // ============================================================
    // KEYBOARD ACCESSIBILITY
    // ============================================================
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // ============================================================
    // PRELOAD CRITICAL IMAGES
    // ============================================================
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach((img) => {
            const src = img.getAttribute('data-src');
            if (src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = src;
                document.head.appendChild(link);
            }
        });
    }

    preloadImages();

    // ============================================================
    // CONSOLE BRANDING
    // ============================================================
    console.log(
        '%c🏗️ Nguyễn Hữu Trường - Senior Construction Project Manager',
        'background: linear-gradient(135deg, #0f2b5b, #c41e3a); color: white; padding: 12px 24px; font-size: 14px; border-radius: 4px; font-weight: bold;'
    );
    console.log(
        '%cPortfolio Website | 20+ Years of Construction Excellence',
        'color: #5a6577; font-size: 12px;'
    );
})();

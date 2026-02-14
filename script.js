document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Hero Elements
    const heroSection = document.querySelector('.hero');
    const codeWindow = document.querySelector('.code-window');
    const highlightWord = document.querySelector('.hero-title .highlight');

    // --- Navbar Scroll Shadow ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // --- Mobile Menu Toggle ---
    mobileToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }
    });

    // --- Interactive Mouse Movement Effects (Hero Parallax) ---
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX); 
            const yAxis = (window.innerHeight / 2 - e.pageY);

            if (codeWindow) {
                codeWindow.style.transform = `translateY(-10px) rotateY(${xAxis / 40}deg) rotateX(${yAxis / 40}deg)`;
            }
        });

        heroSection.addEventListener('mouseenter', () => {
            if (codeWindow) codeWindow.style.transition = 'transform 0.1s ease-out';
        });

        heroSection.addEventListener('mouseleave', () => {
            if (codeWindow) {
                codeWindow.style.transition = 'transform 0.5s ease';
                codeWindow.style.transform = `translateY(0px) rotateY(2deg) rotateX(-2deg)`;
                
                setTimeout(() => {
                    codeWindow.style.animation = 'floatCode 6s ease-in-out infinite';
                }, 500);
            }
        });
    }

    // --- Cyber-Decode Hover Effect on "Technology" ---
    if (highlightWord) {
        const originalText = highlightWord.innerText;
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

        highlightWord.addEventListener('mouseover', (e) => {
            let iterations = 0;
            const interval = setInterval(() => {
                e.target.innerText = originalText.split("")
                    .map((letter, index) => {
                        if(index < iterations) return originalText[index];
                        return letters[Math.floor(Math.random() * letters.length)];
                    }).join("");

                if(iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3; 
            }, 30);
        });
    }

    // --- Projects Carousel ---
    const projectsTrack = document.getElementById('projects-track');
    if (projectsTrack) {
        const projectCards = Array.from(projectsTrack.querySelectorAll('.project-card'));
        const prevBtn = document.querySelector('.projects-carousel .carousel-btn.prev');
        const nextBtn = document.querySelector('.projects-carousel .carousel-btn.next');
        let currentIndex = 0;

        const goToCard = (index) => {
            if (!projectCards.length) return;
            currentIndex = (index + projectCards.length) % projectCards.length;
            projectCards[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                goToCard(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                goToCard(currentIndex + 1);
            });
        }

        projectsTrack.addEventListener('scroll', () => {
            if (!projectCards.length) return;
            const trackRect = projectsTrack.getBoundingClientRect();
            let closestIndex = 0;
            let closestDistance = Infinity;

            projectCards.forEach((card, index) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenter = cardRect.left + cardRect.width / 2;
                const trackCenter = trackRect.left + trackRect.width / 2;
                const distance = Math.abs(trackCenter - cardCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });

            currentIndex = closestIndex;
        }, { passive: true });
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const project = document.getElementById('project').value;
            if (name && email && project) {
                alert('Thank you for your quote request! We\'ll be in touch within 24 hours.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
});
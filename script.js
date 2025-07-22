
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; 
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
   
    closeMobileMenu();
}

function highlightActiveLink() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const navLink = navLinks[index];
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            
            navLinks.forEach(link => link.classList.remove('active'));
            
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

function addHoverEffects() {
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function init() {
    
    const throttledScrollHandler = throttle(() => {
        handleScroll();
        highlightActiveLink();
    }, 10);
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    navToggle.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    addHoverEffects();
    
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    highlightActiveLink();
}

function addParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

function addLoadingAnimation() {
    window.addEventListener('load', function() {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.6s ease';
        
        setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
        }, 100);
    });
}

function addColorTransition() {
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.pageYOffset / (document.body.offsetHeight - window.innerHeight)) * 100;
        const hue = Math.floor(scrollPercent * 3.6); 
        
        if (navbar.classList.contains('scrolled')) {
            navbar.style.background = `hsla(${hue}, 70%, 50%, 0.95)`;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

addLoadingAnimation();
addParallaxEffect();
addColorTransition();

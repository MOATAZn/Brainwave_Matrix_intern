// DOM Elements
const DOM = {
    preloader: document.querySelector('.preloader'),
    navbar: document.querySelector('.navbar'),
    navToggle: document.querySelector('.nav-toggle'),
    navLinks: document.querySelector('.nav-links'),
    navButtons: document.querySelector('.nav-buttons'),
    modal: document.getElementById('loginModal'),
    loginBtn: document.querySelector('.btn-login'),
    closeModal: document.querySelector('.close-modal'),
    loginForm: document.getElementById('loginForm'),
    stats: document.querySelectorAll('.stat-number'),
    newsletterForm: document.getElementById('newsletterForm'),
    backToTop: document.getElementById('backToTop')
  };
  
  const initAOS = () => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      delay: 50
    });
  };
  
  // Preloader Handler
  const handlePreloader = () => {
    if (document.readyState === 'complete') {
      DOM.preloader.style.opacity = '0';
      setTimeout(() => {
        DOM.preloader.style.display = 'none';
        document.body.style.overflow = 'visible';
      }, 500);
    }
  };
  
  // Navigation Handler
  const handleNavigation = () => {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll > 100) {
        DOM.navbar.style.padding = '0.5rem 0';
        DOM.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        DOM.navbar.style.padding = '1rem 0';
        DOM.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      }
      
      if (currentScroll > lastScroll && currentScroll > 500) {
        DOM.navbar.style.transform = 'translateY(-100%)';
      } else {
        DOM.navbar.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
    
    DOM.navToggle?.addEventListener('click', () => {
      DOM.navLinks.classList.toggle('active');
      DOM.navButtons.classList.toggle('active');
    });
  };
  
  // Modal Handler
  const handleModal = () => {
    const toggleModal = (show) => {
      DOM.modal.style.display = show ? 'block' : 'none';
      document.body.style.overflow = show ? 'hidden' : 'auto';
    };
  
    DOM.loginBtn?.addEventListener('click', () => toggleModal(true));
    DOM.closeModal?.addEventListener('click', () => toggleModal(false));
    
    window.addEventListener('click', (e) => {
      if (e.target === DOM.modal) toggleModal(false);
    });
    
    DOM.loginForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('Login submitted');
      toggleModal(false);
    });
  };
  
  // Stats Counter Handler
  const handleStatsCounter = () => {
    const startCounter = (element) => {
      const target = parseInt(element.getAttribute('data-target'));
      const count = parseInt(element.innerText);
      const increment = target / 100;
      
      if (count < target) {
        element.innerText = Math.ceil(count + increment);
        requestAnimationFrame(() => startCounter(element));
      } else {
        element.innerText = target;
      }
    };
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
  
    DOM.stats.forEach(stat => observer.observe(stat));
  };
  
  const handleNewsletterForm = () => {
    DOM.newsletterForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = e.target.querySelector('input').value;
      const button = e.target.querySelector('button');
      
      console.log('Newsletter subscription:', email);
      
      const originalText = button.textContent;
      button.textContent = 'Subscribed!';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        e.target.reset();
      }, 2000);
    });
  };
  
  // Back to Top Handler
  const handleBackToTop = () => {
    let isScrolling = false;
  
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          DOM.backToTop.classList.toggle('visible', window.scrollY > 500);
          isScrolling = false;
        });
        isScrolling = true;
      }
    });
  
    DOM.backToTop?.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  const handleSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };
  
  // Initialize all handlers
  const init = () => {
    document.addEventListener('DOMContentLoaded', () => {
      initAOS();
      handleNavigation();
      handleModal();
      handleStatsCounter();
      handleNewsletterForm();
      handleBackToTop();
      handleSmoothScroll();
    });
  
    window.addEventListener('load', handlePreloader);
  };
  
  init();
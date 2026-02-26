// ===================================
// INKVOICE INSPIRED STATIC WEBSITE
// Main JavaScript File
// ===================================

// Custom Cursor
class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.custom-cursor');
    this.cursorDot = document.querySelector('.custom-cursor-dot');
    this.init();
  }

  init() {
    if (!this.cursor || !this.cursorDot) return;

    document.addEventListener('mousemove', (e) => this.moveCursor(e));
    document.addEventListener('mousedown', () => this.cursorDown());
    document.addEventListener('mouseup', () => this.cursorUp());
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .cta-button, .portfolio-item, .blog-card, .service-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.cursorHover());
      el.addEventListener('mouseleave', () => this.cursorLeave());
    });

    // Magnetic effect for buttons
    const magneticElements = document.querySelectorAll('.cta-button');
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => this.magneticEffect(e, el));
      el.addEventListener('mouseleave', () => this.resetMagnetic(el));
    });
  }

  moveCursor(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    this.cursor.style.left = x + 'px';
    this.cursor.style.top = y + 'px';
    
    this.cursorDot.style.left = x + 'px';
    this.cursorDot.style.top = y + 'px';
  }

  cursorDown() {
    this.cursor.style.transform = 'scale(0.8)';
  }

  cursorUp() {
    this.cursor.style.transform = 'scale(1)';
  }

  cursorHover() {
    this.cursor.classList.add('hover');
  }

  cursorLeave() {
    this.cursor.classList.remove('hover');
  }

  magneticEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  resetMagnetic(element) {
    element.style.transform = 'translate(0, 0)';
  }
}

// Page Loader
class PageLoader {
  constructor() {
    this.loader = document.querySelector('.page-loader');
    this.init();
  }

  init() {
    if (!this.loader) return;
    
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.loader.classList.add('hidden');
      }, 1000);
    });
  }
}

// Scroll Progress Bar
class ScrollProgress {
  constructor() {
    this.progressBar = document.querySelector('.scroll-progress');
    this.init();
  }

  init() {
    if (!this.progressBar) return;
    
    window.addEventListener('scroll', () => this.updateProgress());
  }

  updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    this.progressBar.style.width = progress + '%';
  }
}

// Header Hide/Show on Scroll
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollTop = 0;
    this.init();
  }

  init() {
    if (!this.header) return;
    
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.header.classList.add('hidden');
    } else {
      this.header.classList.remove('hidden');
    }
    
    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}

// Mobile Menu
class MobileMenu {
  constructor() {
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.menu = document.querySelector('.nav-menu');
    this.init();
  }

  init() {
    if (!this.toggle || !this.menu) return;
    
    this.toggle.addEventListener('click', () => this.toggleMenu());
    
    // Close menu when clicking on links
    const links = this.menu.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
  }

  toggleMenu() {
    this.toggle.classList.toggle('active');
    this.menu.classList.toggle('active');
    document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
  }

  closeMenu() {
    this.toggle.classList.remove('active');
    this.menu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Scroll Reveal Animation
class ScrollReveal {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    this.init();
  }

  init() {
    if (this.revealElements.length === 0) return;
    
    window.addEventListener('scroll', () => this.checkReveal());
    window.addEventListener('load', () => this.checkReveal());
    this.checkReveal();
  }

  checkReveal() {
    this.revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight * 0.8) {
        element.classList.add('active');
      }
    });
  }
}

// Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number');
    this.animated = false;
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;
    
    window.addEventListener('scroll', () => this.checkCounters());
  }

  checkCounters() {
    if (this.animated) return;
    
    const counterSection = document.querySelector('.about-stats');
    if (!counterSection) return;
    
    const sectionTop = counterSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
      this.animateCounters();
      this.animated = true;
    }
  }

  animateCounters() {
    this.counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || parseInt(counter.textContent);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  }
}

// Testimonials Slider
class TestimonialsSlider {
  constructor() {
    this.testimonials = document.querySelectorAll('.testimonial');
    this.currentIndex = 0;
    this.init();
  }

  init() {
    if (this.testimonials.length <= 1) return;
    
    this.showTestimonial(0);
    this.startAutoSlide();
  }

  showTestimonial(index) {
    this.testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.showTestimonial(this.currentIndex);
  }

  startAutoSlide() {
    setInterval(() => this.nextTestimonial(), 5000);
  }
}

// Back to Top Button
class BackToTop {
  constructor() {
    this.button = document.querySelector('.back-to-top');
    this.init();
  }

  init() {
    if (!this.button) return;
    
    window.addEventListener('scroll', () => this.toggleButton());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  toggleButton() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 500) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// Particle Background
class ParticleBackground {
  constructor() {
    this.container = document.querySelector('.particles');
    this.particleCount = 50;
    this.init();
  }

  init() {
    if (!this.container) return;
    
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (15 + Math.random() * 10) + 's';
      this.container.appendChild(particle);
    }
  }
}

// FAQ Accordion
class FAQAccordion {
  constructor() {
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    if (this.faqItems.length === 0) return;
    
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => this.toggleItem(item));
      }
    });
  }

  toggleItem(item) {
    const isActive = item.classList.contains('active');
    
    // Close all items
    this.faqItems.forEach(faqItem => {
      faqItem.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  }
}

// Form Validation (for contact page)
class FormValidation {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Floating labels animation
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => this.handleFocus(input));
      input.addEventListener('blur', () => this.handleBlur(input));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Basic validation
    const name = this.form.querySelector('input[name="name"]');
    const email = this.form.querySelector('input[name="email"]');
    const message = this.form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    
    if (!name.value.trim()) {
      this.showError(name, 'Name is required');
      isValid = false;
    } else {
      this.clearError(name);
    }
    
    if (!email.value.trim() || !this.isValidEmail(email.value)) {
      this.showError(email, 'Valid email is required');
      isValid = false;
    } else {
      this.clearError(email);
    }
    
    if (!message.value.trim()) {
      this.showError(message, 'Message is required');
      isValid = false;
    } else {
      this.clearError(message);
    }
    
    if (isValid) {
      this.showSuccess();
    }
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  showError(input, message) {
    input.classList.add('error');
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearError(input) {
    input.classList.remove('error');
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  showSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully! We\'ll get back to you within 24 hours.';
    successMessage.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      margin-top: 1rem;
      text-align: center;
      animation: fadeInUp 0.5s ease;
    `;
    
    this.form.appendChild(successMessage);
    this.form.reset();
    
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  handleFocus(input) {
    input.parentNode.classList.add('focused');
  }

  handleBlur(input) {
    if (!input.value) {
      input.parentNode.classList.remove('focused');
    }
  }
}

// Blog Filter (for blog listing page)
class BlogFilter {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-button');
    this.blogItems = document.querySelectorAll('.blog-card');
    this.portfolioItems = document.querySelectorAll('.portfolio-item');
    this.init();
  }

  init() {
    if (this.filterButtons.length === 0) return;
    
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => this.filterItems(button));
    });
  }

  filterItems(button) {
    const category = button.getAttribute('data-category');
    
    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter blog items
    if (this.blogItems.length > 0) {
      this.blogItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          setTimeout(() => item.classList.add('active'), 10);
        } else {
          item.classList.remove('active');
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    }
    
    // Filter portfolio items
    if (this.portfolioItems.length > 0) {
      this.portfolioItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
          item.style.display = 'block';
          setTimeout(() => item.classList.add('active'), 10);
        } else {
          item.classList.remove('active');
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    }
  }
}

// Text Split Animation (for hero titles)
class TextSplitAnimation {
  constructor() {
    this.animatedTexts = document.querySelectorAll('[data-split-text]');
    this.init();
  }

  init() {
    if (this.animatedTexts.length === 0) return;
    
    this.animatedTexts.forEach(text => this.splitText(text));
  }

  splitText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.cssText = `
        display: inline-block;
        opacity: 0;
        transform: translateY(50px);
        animation: fadeInUp 0.5s ease ${index * 0.05}s forwards;
      `;
      element.appendChild(span);
    });
  }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  new CustomCursor();
  new PageLoader();
  new ScrollProgress();
  new HeaderScroll();
  new MobileMenu();
  new ScrollReveal();
  new CounterAnimation();
  new TestimonialsSlider();
  new BackToTop();
  new ParticleBackground();
  new FormValidation();
  new BlogFilter();
  new TextSplitAnimation();
  new FAQAccordion();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector('.hero-video');
  const heroContent = document.querySelector('.hero-content');
  
  if (parallax) {
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - scrolled / 800;
  }
});

// Intersection Observer for advanced animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .blog-card').forEach(el => {
  observer.observe(el);
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.classList.add('loaded');
  });
  
  if (img.complete) {
    img.classList.add('loaded');
  }
});

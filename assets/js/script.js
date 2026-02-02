// Credit Monkey - Fully Functional Website with Form Handling

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // Global navigation and footer (single source for all pages)
    const isStatePage = window.location.pathname.includes('/states/');
    const prefix = isStatePage ? '../' : '';

    const navList = document.querySelector('.navbar .navbar-nav');
    if (navList) {
        navList.innerHTML = `
                    <li class="nav-item"><a class="nav-link" href="${prefix}index.html#how-it-works">How It Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="${prefix}how-credit-repair-works">How Credit Repair Works</a></li>
                    <li class="nav-item"><a class="nav-link" href="${prefix}states-we-fix-credit-in">States We Fix Credit In</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="http://secureclientaccess.com/" target="_blank" rel="noopener noreferrer">
                            <i class="bi bi-box-arrow-in-right"></i> Login
                        </a>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <a href="https://calendly.com/creditmonkey/credit-repair-consultation" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary px-3">Free Consultation</a>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <a href="https://credit3278.getcredithelpnow.com/billingselection" class="btn btn-primary px-4" target="_blank" rel="noopener noreferrer">Get Started</a>
                    </li>
        `;
    }

    let footer = document.querySelector('footer');
    if (!footer) {
        footer = document.createElement('footer');
        document.body.appendChild(footer);
    }
    footer.className = 'bg-light py-5 border-top';
    footer.innerHTML = `
        <div class="container">
            <div class="row mb-4">
                <div class="col-12">
                    <div class="payment-methods">
                        <div class="payment-header">
                            <span class="payment-title">WE SUPPORT ALL MAJOR US PAYMENT METHODS</span>
                        </div>
                        <div class="footer-payments">
                            <span class="payment-badge"><span class="payment-logo">V</span>Visa</span>
                            <span class="payment-badge"><span class="payment-logo">MC</span>Mastercard</span>
                            <span class="payment-badge"><span class="payment-logo">AX</span>American Express</span>
                            <span class="payment-badge"><span class="payment-logo">DS</span>Discover</span>
                            <span class="payment-badge"><span class="payment-logo">PP</span>PayPal</span>
                            <span class="payment-badge"><span class="payment-logo">AP</span>Apple Pay</span>
                            <span class="payment-badge"><span class="payment-logo">GP</span>Google Pay</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-lg-4">
                    <h5 class="fw-bold mb-3">About Credit Monkey</h5>
                    <p class="text-secondary">Professional credit repair service helping individuals across all 50 states improve their credit health through accurate reporting, expert guidance, and transparent processes.</p>
                    <h6 class="fw-bold mb-3 mt-4">Newsletter Signup</h6>
                    <form id="newsletterForm" class="mb-3">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email" required id="newsletterEmail">
                            <button class="btn btn-primary" type="submit">Subscribe</button>
                        </div>
                        <small class="text-secondary d-block mt-2">Get credit tips & exclusive offers</small>
                    </form>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Services</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="${prefix}index.html#how-it-works" class="text-dark text-decoration-none">How It Works</a></li>
                        <li class="mb-2"><a href="${prefix}services" class="text-dark text-decoration-none">Services</a></li>
                        <li class="mb-2"><a href="${prefix}pricing" class="text-dark text-decoration-none">Pricing</a></li>
                        <li class="mb-2"><a href="${prefix}build-personal-credit" class="text-dark text-decoration-none">Build Personal Credit</a></li>
                        <li class="mb-2"><a href="${prefix}build-business-credit" class="text-dark text-decoration-none">Build Business Credit</a></li>
                        <li class="mb-2"><a href="${prefix}how-credit-repair-works" class="text-dark text-decoration-none">How Credit Repair Works</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Company</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="${prefix}about-us" class="text-dark text-decoration-none">About Us</a></li>
                        <li class="mb-2"><a href="${prefix}contact-us" class="text-dark text-decoration-none">Contact Us</a></li>
                        <li class="mb-2"><a href="${prefix}index.html#reviews" class="text-dark text-decoration-none">Reviews</a></li>
                        <li class="mb-2"><a href="${prefix}index.html#faq" class="text-dark text-decoration-none">FAQ</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Legal</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="${prefix}privacy-policy" class="text-dark text-decoration-none">Privacy Policy</a></li>
                        <li class="mb-2"><a href="${prefix}terms-of-use" class="text-dark text-decoration-none">Terms of Use</a></li>
                        <li class="mb-2"><a href="#" class="text-dark text-decoration-none">Disclosures</a></li>
                        <li class="mb-2"><a href="${prefix}late-payments" class="text-dark text-decoration-none">Late Payments</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Support</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="http://secureclientaccess.com/" class="text-dark text-decoration-none" target="_blank" rel="noopener noreferrer">Client Login</a></li>
                        <li class="mb-2"><a href="${prefix}contact-us" class="text-dark text-decoration-none">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <hr class="my-4 border-secondary opacity-25">
            <div class="row">
                <div class="col-12 text-center text-muted small">
                    <p class="mb-0">Copyright © 2026 Credit Monkey, Inc. All rights reserved. FICO® is a registered trademark of Fair Isaac Corporation in the United States and other countries. Credit Monkey, Inc does not provide legal advice. Credit Monkey, Inc does not guarantee the permanent removal of verifiable tradelines. Credit Monkey, Inc requires active participation from its clientele regarding requested documents and information, including investigation results for the sought-after outcome of a healthy, accurate credit report. Individual results may vary.</p>
                </div>
            </div>
        </div>
        `;
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animated counters for stats
    const animateCounter = (element, target, duration = 2000) => {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    };
    
    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"], button[onclick^="window.location"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#' && !href.startsWith('#faq')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Credit score animation
    const scoreElement = document.getElementById('scoreCounter');
    if (scoreElement) {
        let score = 650;
        const targetScore = 750;
        const scoreTimer = setInterval(() => {
            score += 2;
            if (score >= targetScore) {
                scoreElement.textContent = targetScore;
                clearInterval(scoreTimer);
            } else {
                scoreElement.textContent = score;
            }
        }, 20);
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
    
    // ========== FORM HANDLING FUNCTIONS ==========
    
    // Phone number formatting
    const formatPhoneNumber = (input) => {
        const value = input.value.replace(/\D/g, '');
        if (value.length <= 3) {
            input.value = value;
        } else if (value.length <= 6) {
            input.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            input.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    };
    
    // Add phone formatting to all phone inputs
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', () => formatPhoneNumber(input));
    });
    
    // Show message helper
    const showMessage = (elementId, message, type = 'success') => {
        const messageEl = document.getElementById(elementId);
        if (!messageEl) return;
        
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill';
        
        messageEl.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
                <i class="bi bi-${icon} me-2"></i>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Auto dismiss after 10 seconds
        setTimeout(() => {
            const alert = messageEl.querySelector('.alert');
            if (alert) {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 10000);
    };
    
    // Store form data to localStorage
    const saveFormData = (formData, formType) => {
        try {
            const submissions = JSON.parse(localStorage.getItem('creditMonkeySubmissions') || '[]');
            submissions.push({
                type: formType,
                data: formData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('creditMonkeySubmissions', JSON.stringify(submissions));
            return true;
        } catch (error) {
            console.error('Error saving form data:', error);
            return false;
        }
    };
    
    // Send to external service (can be configured)
    const submitToService = async (formData, formType) => {
        // For demonstration, we'll log to console and save locally
        // In production, you would send to your backend or service like Formspree
        console.log(`Form Submission - ${formType}:`, formData);
        
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                saveFormData(formData, formType);
                resolve({ success: true });
            }, 500);
        });
    };
    
    // Main Consultation Form Handler
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
            
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                creditScore: document.getElementById('creditScore').value,
                goals: document.getElementById('goals').value,
                consent: document.getElementById('consent').checked
            };
            
            try {
                const result = await submitToService(formData, 'consultation');
                
                if (result.success) {
                    showMessage('formMessage', 
                        'Thank you! Your consultation request has been received. Our team will contact you within 24 hours.',
                        'success'
                    );
                    consultationForm.reset();
                    
                    // Optional: Redirect to thank you page or pricing page
                    setTimeout(() => {
                        window.location.href = 'https://credit3278.getcredithelpnow.com/billingselection';
                    }, 2000);
                }
            } catch (error) {
                showMessage('formMessage', 
                    'Sorry, there was an error submitting your request. Please try again or call us directly.',
                    'error'
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
    
    // Quick Consultation Modal Form Handler
    const quickConsultForm = document.getElementById('quickConsultForm');
    if (quickConsultForm) {
        quickConsultForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';
            
            const formData = {
                name: document.getElementById('quickName').value,
                email: document.getElementById('quickEmail').value,
                phone: document.getElementById('quickPhone').value,
                contactTime: document.getElementById('contactTime').value
            };
            
            try {
                const result = await submitToService(formData, 'quick-consultation');
                
                if (result.success) {
                    showMessage('quickFormMessage', 
                        "Request submitted! We'll contact you during your preferred time.",
                        'success'
                    );
                    quickConsultForm.reset();
                    
                    // Close modal and redirect after 1.5 seconds
                    setTimeout(() => {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('quickConsultModal'));
                        if (modal) modal.hide();
                        window.location.href = 'https://credit3278.getcredithelpnow.com/billingselection';
                    }, 1500);
                }
            } catch (error) {
                showMessage('quickFormMessage', 
                    'Error submitting request. Please try again.',
                    'error'
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
    
    // Newsletter Signup Handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const emailInput = document.getElementById('newsletterEmail');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
            
            const formData = {
                email: emailInput.value
            };
            
            try {
                const result = await submitToService(formData, 'newsletter');
                
                if (result.success) {
                    emailInput.value = '';
                    submitBtn.innerHTML = '<i class="bi bi-check-lg"></i>';
                    submitBtn.classList.remove('btn-primary');
                    submitBtn.classList.add('btn-success');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.classList.add('btn-primary');
                        submitBtn.disabled = false;
                    }, 3000);
                }
            } catch (error) {
                submitBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
                submitBtn.classList.add('btn-danger');
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('btn-danger');
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }
    
    // Track pricing plan selections
    document.querySelectorAll('.pricing-card a').forEach(link => {
        link.addEventListener('click', function(e) {
            const planName = this.closest('.pricing-card').querySelector('h4').textContent;
            const planPrice = this.closest('.pricing-card').querySelector('.display-4').textContent;
            
            // Track selection
            const selection = {
                plan: planName,
                price: planPrice,
                timestamp: new Date().toISOString()
            };
            
            try {
                const selections = JSON.parse(localStorage.getItem('creditMonkeyPlanSelections') || '[]');
                selections.push(selection);
                localStorage.setItem('creditMonkeyPlanSelections', JSON.stringify(selections));
            } catch (error) {
                console.error('Error tracking plan selection:', error);
            }
        });
    });
    
    // Form validation styling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
});

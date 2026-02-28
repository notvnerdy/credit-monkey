// Credit Monkey - Fully Functional Website with Form Handling

// ========== SERVICE WORKER REGISTRATION ==========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('[SW] Registered:', registration.scope);
            })
            .catch(function(error) {
                console.log('[SW] Registration failed:', error);
            });
    });
}

// ========== WEB VITALS TRACKING ==========
function trackWebVitals() {
    // Track Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
        try {
            // LCP
            const lcpObserver = new PerformanceObserver(function(list) {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('[Web Vitals] LCP:', Math.round(lastEntry.startTime), 'ms');
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

            // FID (First Input Delay)
            const fidObserver = new PerformanceObserver(function(list) {
                list.getEntries().forEach(function(entry) {
                    console.log('[Web Vitals] FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
                });
            });
            fidObserver.observe({ type: 'first-input', buffered: true });

            // CLS (Cumulative Layout Shift)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver(function(list) {
                list.getEntries().forEach(function(entry) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                console.log('[Web Vitals] CLS:', clsValue.toFixed(4));
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });

            // FCP (First Contentful Paint)
            const fcpObserver = new PerformanceObserver(function(list) {
                list.getEntries().forEach(function(entry) {
                    if (entry.name === 'first-contentful-paint') {
                        console.log('[Web Vitals] FCP:', Math.round(entry.startTime), 'ms');
                    }
                });
            });
            fcpObserver.observe({ type: 'paint', buffered: true });

            // TTFB (Time to First Byte)
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0) {
                const ttfb = navEntries[0].responseStart - navEntries[0].requestStart;
                console.log('[Web Vitals] TTFB:', Math.round(ttfb), 'ms');
            }
        } catch (e) {
            console.log('[Web Vitals] Not supported');
        }
    }
}

// ========== GLOBAL ERROR HANDLER ==========
window.addEventListener('error', function(event) {
    console.error('[Error]', event.message, 'at', event.filename, ':', event.lineno);
    // You can send this to an analytics service
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('[Unhandled Promise Rejection]', event.reason);
});

// ========== DARK MODE TOGGLE ==========
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Check for saved theme preference (default to light)
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (themeIcon) {
                if (newTheme === 'dark') {
                    themeIcon.classList.remove('bi-moon-fill');
                    themeIcon.classList.add('bi-sun-fill');
                } else {
                    themeIcon.classList.remove('bi-sun-fill');
                    themeIcon.classList.add('bi-moon-fill');
                }
            }
        });
    }

    // Do not auto-switch based on system theme to keep light as default
}

// ========== SCROLL PROGRESS BAR ==========
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ========== LAZY LOAD IMAGES ==========
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px' });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(function(img) {
            img.classList.add('loaded');
        });
    }
}

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = 'success', duration = 5000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `custom-toast ${type}`;
    toast.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === 'success' ? 'check-circle-fill text-success' : 'exclamation-circle-fill text-danger'} me-2"></i>
            <span>${message}</span>
        </div>
    `;

    container.appendChild(toast);

    setTimeout(function() {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, duration);
}

// Initialize AOS (Animate On Scroll) with mobile optimization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();

    // Initialize scroll progress
    initScrollProgress();

    // Initialize lazy loading
    initLazyLoad();

    // Track Web Vitals
    trackWebVitals();
    // Reduce animations on mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Initialize AOS with error handling
    try {
        if (window.AOS) {
            AOS.init({
                duration: isMobile ? 400 : 800,
                once: true,
                offset: isMobile ? 50 : 100,
                disable: false
            });
        }
    } catch (error) {
        console.error('AOS initialization error:', error);
    }
    
    // Cookie Consent Banner
    function initCookieConsent() {
        const cookieConsent = localStorage.getItem('cookieConsent');
        
        if (!cookieConsent) {
            // Create cookie consent banner if it doesn't exist
            let banner = document.getElementById('cookieConsent');
            if (!banner) {
                banner = document.createElement('div');
                banner.id = 'cookieConsent';
                banner.setAttribute('role', 'dialog');
                banner.setAttribute('aria-label', 'Cookie Consent');
                banner.setAttribute('aria-live', 'polite');
                banner.innerHTML = `
                    <div class="cookie-content">
                        <p>
                            <strong>🍪 We use cookies</strong><br>
                            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                            By clicking "Accept", you consent to our use of cookies. 
                            <a href="/privacy-policy" target="_blank">Learn more</a>
                        </p>
                        <div class="cookie-buttons">
                            <button class="btn-accept" aria-label="Accept cookies">Accept All</button>
                            <button class="btn-decline" aria-label="Decline cookies">Decline</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(banner);
            }

            // Load Intercom immediately
            initIntercom();
            
            // Show banner after a short delay
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000);
            
            // Handle accept button
            banner.querySelector('.btn-accept').addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'accepted');
                banner.classList.remove('show');
                setTimeout(() => banner.remove(), 400);
                // Initialize analytics here if accepted
                initAnalytics();
                initIntercom();
            });
            
            // Handle decline button
            banner.querySelector('.btn-decline').addEventListener('click', function() {
                localStorage.setItem('cookieConsent', 'declined');
                banner.classList.remove('show');
                setTimeout(() => banner.remove(), 400);
            });
        } else if (cookieConsent === 'accepted') {
            // Initialize analytics if previously accepted
            initAnalytics();
            initIntercom();
        }
    }
    
    // Initialize analytics (placeholder for Google Analytics, etc.)
    function initAnalytics() {
        // Add Google Analytics or other tracking scripts here
        console.log('Analytics initialized');
    }

    // Initialize Intercom chat (loads after cookie consent acceptance)
    function initIntercom() {
        if (window.__intercomInitialized) {
            return;
        }

        window.intercomSettings = {
            api_base: 'https://api-iam.intercom.io',
            app_id: 'rp6qow0g'
        };

        (function() {
            var w = window;
            var ic = w.Intercom;
            if (typeof ic === 'function') {
                ic('reattach_activator');
                ic('update', w.intercomSettings);
            } else {
                var d = document;
                var i = function() { i.c(arguments); };
                i.q = [];
                i.c = function(args) { i.q.push(args); };
                w.Intercom = i;
                var l = function() {
                    var s = d.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://widget.intercom.io/widget/rp6qow0g';
                    var x = d.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === 'complete') {
                    l();
                } else if (w.attachEvent) {
                    w.attachEvent('onload', l);
                } else {
                    w.addEventListener('load', l, false);
                }
            }
        })();

        window.__intercomInitialized = true;
    }
    
    // Initialize cookie consent
    try {
        initCookieConsent();
    } catch (error) {
        console.error('Cookie consent initialization error:', error);
    }

    // Always initialize Intercom
    try {
        initIntercom();
    } catch (error) {
        console.error('Intercom initialization error:', error);
    }

    function initStickyMobileCta() {
        if (document.getElementById('mobileStickyCta')) {
            return;
        }

        const cta = document.createElement('div');
        cta.id = 'mobileStickyCta';
        cta.className = 'mobile-sticky-cta';
        cta.innerHTML = `
            <a href="tel:+18883873875" class="cta-call" aria-label="Call Credit Monkey now">Call Now</a>
            <a href="https://credit3278.getcredithelpnow.com/billingselection" class="cta-primary" target="_blank" rel="noopener noreferrer" aria-label="Get started with Credit Monkey">Get Started</a>
        `;

        document.body.appendChild(cta);
        document.body.classList.add('has-mobile-cta');
    }

    function initExitIntentPopup() {
        if (window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        if (document.getElementById('exitIntentModal')) {
            return;
        }

        const hasSeen = sessionStorage.getItem('exitIntentShown');
        if (hasSeen) {
            return;
        }

        const modal = document.createElement('div');
        modal.id = 'exitIntentModal';
        modal.className = 'exit-intent-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Free credit repair checklist');
        modal.innerHTML = `
            <div class="exit-intent-backdrop"></div>
            <div class="exit-intent-card">
                <button type="button" class="exit-intent-close" aria-label="Close">&times;</button>
                <h3>Wait! Grab your free credit repair checklist</h3>
                <p>Get a quick, actionable checklist you can use today to start improving your credit.</p>
                <div class="exit-intent-actions">
                    <a href="/assets/downloads/credit-checklist.pdf" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Download the PDF</a>
                    <a href="/contact-us" class="btn btn-outline-primary">Talk to an expert</a>
                </div>
            </div>
        `;

        const closeModal = () => {
            modal.classList.remove('show');
            document.body.classList.remove('exit-intent-open');
        };

        modal.addEventListener('click', (event) => {
            if (event.target.classList.contains('exit-intent-backdrop')) {
                closeModal();
            }
        });

        modal.querySelector('.exit-intent-close').addEventListener('click', closeModal);
        document.body.appendChild(modal);

        const handleExitIntent = (event) => {
            if (event.clientY <= 0) {
                sessionStorage.setItem('exitIntentShown', 'true');
                modal.classList.add('show');
                document.body.classList.add('exit-intent-open');
                document.removeEventListener('mouseout', handleExitIntent);
            }
        };

        document.addEventListener('mouseout', handleExitIntent);
    }

    try {
        initStickyMobileCta();
        initExitIntentPopup();
    } catch (error) {
        console.error('Conversion feature initialization error:', error);
    }

    // Mobile-friendly submenu toggles
    const isMobileMenu = () => window.matchMedia('(max-width: 991px)').matches;
    document.addEventListener('click', function(event) {
        const toggle = event.target.closest('.dropdown-submenu > .dropdown-toggle');
        if (!toggle || !isMobileMenu()) {
            return;
        }

        event.preventDefault();

        const parent = toggle.parentElement;
        const submenu = parent ? parent.querySelector('.dropdown-menu') : null;
        if (!submenu) {
            return;
        }

        const isOpen = submenu.classList.contains('show');
        submenu.classList.toggle('show', !isOpen);
        toggle.classList.toggle('open', !isOpen);
    });

    // States mega menu region switching (desktop)
    const activateStatesRegion = (regionLink) => {
        const region = regionLink.getAttribute('data-region');
        const container = regionLink.closest('.states-mega');
        if (!region || !container) {
            return;
        }

        const regionLinks = container.querySelectorAll('.states-region');
        regionLinks.forEach((link) => link.classList.remove('active'));
        regionLink.classList.add('active');

        const panels = container.querySelectorAll('.states-panel');
        panels.forEach((panel) => panel.classList.remove('active'));
        const activePanel = container.querySelector(`[data-region-panel="${region}"]`);
        if (activePanel) {
            activePanel.classList.add('active');
        }
    };

    document.addEventListener('mouseover', function(event) {
        if (!window.matchMedia('(min-width: 992px)').matches) {
            return;
        }

        const regionLink = event.target.closest('.states-region');
        if (!regionLink) {
            return;
        }

        activateStatesRegion(regionLink);
    });

    document.addEventListener('click', function(event) {
        const regionLink = event.target.closest('.states-region');
        if (!regionLink) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        activateStatesRegion(regionLink);
    });

    // Mega menu hover behavior: only open on hover if no menu is active
    const megaDropdowns = document.querySelectorAll('.mega-dropdown');
    megaDropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (!toggle || typeof bootstrap === 'undefined') {
            return;
        }

        const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);

        dropdown.addEventListener('mouseenter', () => {
            if (!window.matchMedia('(min-width: 992px)').matches) {
                return;
            }

            const openDropdown = document.querySelector('.navbar .dropdown.show');
            if (openDropdown && openDropdown !== dropdown) {
                return;
            }

            instance.show();
            dropdown.dataset.hoverOpen = 'true';
        });

        dropdown.addEventListener('mouseleave', () => {
            if (!window.matchMedia('(min-width: 992px)').matches) {
                return;
            }

            if (dropdown.dataset.hoverOpen === 'true') {
                instance.hide();
                dropdown.dataset.hoverOpen = '';
            }
        });
    });

    // Global navigation and footer (single source for all pages)
    const isStatePage = window.location.pathname.includes('/states/');
    const prefix = isStatePage ? '../' : '';

    const navList = document.querySelector('.navbar .navbar-nav');
    if (navList) {
        const isDesktopMenu = window.matchMedia('(min-width: 992px)').matches;

        const servicesMenu = isDesktopMenu ? `
                    <li class="nav-item dropdown mega-dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="megaMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Our Services</a>
                        <div class="dropdown-menu mega-menu shadow" aria-labelledby="megaMenu">
                            <div class="mega-inner">
                                <div class="mega-column">
                                    <span class="mega-title">Credit Repair</span>
                                    <a class="dropdown-item" href="${prefix}services"><i class="bi bi-shield-check me-2"></i>Full-Service Repair</a>
                                    <a class="dropdown-item" href="${prefix}pricing"><i class="bi bi-tags me-2"></i>Plans & Pricing</a>
                                    <a class="dropdown-item" href="${prefix}how-credit-repair-works"><i class="bi bi-diagram-3 me-2"></i>How It Works</a>
                                </div>
                                <div class="mega-column">
                                    <span class="mega-title">Resources</span>
                                    <a class="dropdown-item" href="${prefix}build-personal-credit"><i class="bi bi-person-check me-2"></i>Build Personal Credit</a>
                                    <a class="dropdown-item" href="${prefix}build-business-credit"><i class="bi bi-briefcase me-2"></i>Build Business Credit</a>
                                    <a class="dropdown-item" href="${prefix}late-payments"><i class="bi bi-exclamation-triangle me-2"></i>Late Payments Help</a>
                                </div>
                                <div class="mega-column">
                                    <span class="mega-title">Coverage</span>
                                    <a class="dropdown-item" href="${prefix}states-we-fix-credit-in"><i class="bi bi-geo-alt me-2"></i>All 50 States</a>
                                    <a class="dropdown-item" href="${prefix}about-us"><i class="bi bi-stars me-2"></i>Why Credit Monkey</a>
                                    <a class="dropdown-item" href="${prefix}contact-us"><i class="bi bi-headset me-2"></i>Talk to an Expert</a>
                                </div>
                                <div class="mega-highlight">
                                    <span class="badge bg-primary-subtle text-primary">Popular</span>
                                    <h6>Free Credit Review</h6>
                                    <p>Get a fast, no-obligation analysis of your credit report.</p>
                                    <a class="btn btn-primary btn-sm" href="https://calendly.com/creditmonkey/credit-repair-consultation" target="_blank" rel="noopener noreferrer">Book Now</a>
                                </div>
                            </div>
                        </div>
                    </li>
        ` : `
                    <li class="nav-item"><a class="nav-link" href="${prefix}services">Our Services</a></li>
        `;

        const statesMenu = isDesktopMenu ? `
                    <li class="nav-item dropdown mega-dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="statesMegaMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">States we Work</a>
                        <div class="dropdown-menu mega-menu states-mega shadow" aria-labelledby="statesMegaMenu">
                            <div class="mega-inner states-mega-inner">
                                <div class="mega-column states-region-column">
                                    <span class="mega-title">Regions</span>
                                    <a class="dropdown-item states-region active" href="#" data-region="west">West</a>
                                    <a class="dropdown-item states-region" href="#" data-region="south">South</a>
                                    <a class="dropdown-item states-region" href="#" data-region="midwest">Midwest</a>
                                    <a class="dropdown-item states-region" href="#" data-region="northeast">Northeast</a>
                                </div>
                                <div class="mega-column states-list-column">
                                    <div class="states-panel active" data-region-panel="west">
                                        <span class="mega-title">West</span>
                                        <a class="dropdown-item" href="${prefix}states/alaska">❄️ Alaska</a>
                                        <a class="dropdown-item" href="${prefix}states/arizona">🌵 Arizona</a>
                                        <a class="dropdown-item" href="${prefix}states/california">🌴 California</a>
                                        <a class="dropdown-item" href="${prefix}states/colorado">🏔️ Colorado</a>
                                        <a class="dropdown-item" href="${prefix}states/hawaii">🌺 Hawaii</a>
                                        <a class="dropdown-item" href="${prefix}states/idaho">🥔 Idaho</a>
                                        <a class="dropdown-item" href="${prefix}states/montana">🦬 Montana</a>
                                        <a class="dropdown-item" href="${prefix}states/nevada">🎰 Nevada</a>
                                        <a class="dropdown-item" href="${prefix}states/new-mexico">🌶️ New Mexico</a>
                                        <a class="dropdown-item" href="${prefix}states/oregon">🌲 Oregon</a>
                                        <a class="dropdown-item" href="${prefix}states/utah">🏜️ Utah</a>
                                        <a class="dropdown-item" href="${prefix}states/washington">☔ Washington</a>
                                        <a class="dropdown-item" href="${prefix}states/wyoming">🦬 Wyoming</a>
                                    </div>
                                    <div class="states-panel" data-region-panel="south">
                                        <span class="mega-title">South</span>
                                        <a class="dropdown-item" href="${prefix}states/alabama">🎸 Alabama</a>
                                        <a class="dropdown-item" href="${prefix}states/arkansas">💎 Arkansas</a>
                                        <a class="dropdown-item" href="${prefix}states/delaware">🦀 Delaware</a>
                                        <a class="dropdown-item" href="${prefix}states/florida">🌴 Florida</a>
                                        <a class="dropdown-item" href="${prefix}states/georgia">🍑 Georgia</a>
                                        <a class="dropdown-item" href="${prefix}states/kentucky">🥃 Kentucky</a>
                                        <a class="dropdown-item" href="${prefix}states/louisiana">⚜️ Louisiana</a>
                                        <a class="dropdown-item" href="${prefix}states/maryland">🦀 Maryland</a>
                                        <a class="dropdown-item" href="${prefix}states/mississippi">🎵 Mississippi</a>
                                        <a class="dropdown-item" href="${prefix}states/north-carolina">🏁 North Carolina</a>
                                        <a class="dropdown-item" href="${prefix}states/oklahoma">🛢️ Oklahoma</a>
                                        <a class="dropdown-item" href="${prefix}states/south-carolina">🌴 South Carolina</a>
                                        <a class="dropdown-item" href="${prefix}states/tennessee">🎸 Tennessee</a>
                                        <a class="dropdown-item" href="${prefix}states/texas">🤠 Texas</a>
                                        <a class="dropdown-item" href="${prefix}states/virginia">🏛️ Virginia</a>
                                        <a class="dropdown-item" href="${prefix}states/west-virginia">⛰️ West Virginia</a>
                                    </div>
                                    <div class="states-panel" data-region-panel="midwest">
                                        <span class="mega-title">Midwest</span>
                                        <a class="dropdown-item" href="${prefix}states/illinois">🏙️ Illinois</a>
                                        <a class="dropdown-item" href="${prefix}states/indiana">🏎️ Indiana</a>
                                        <a class="dropdown-item" href="${prefix}states/iowa">🌽 Iowa</a>
                                        <a class="dropdown-item" href="${prefix}states/kansas">🌾 Kansas</a>
                                        <a class="dropdown-item" href="${prefix}states/michigan">🚗 Michigan</a>
                                        <a class="dropdown-item" href="${prefix}states/minnesota">🛶 Minnesota</a>
                                        <a class="dropdown-item" href="${prefix}states/missouri">🎷 Missouri</a>
                                        <a class="dropdown-item" href="${prefix}states/nebraska">🌽 Nebraska</a>
                                        <a class="dropdown-item" href="${prefix}states/north-dakota">🛢️ North Dakota</a>
                                        <a class="dropdown-item" href="${prefix}states/ohio">🏛️ Ohio</a>
                                        <a class="dropdown-item" href="${prefix}states/south-dakota">🗿 South Dakota</a>
                                        <a class="dropdown-item" href="${prefix}states/wisconsin">🧀 Wisconsin</a>
                                    </div>
                                    <div class="states-panel" data-region-panel="northeast">
                                        <span class="mega-title">Northeast</span>
                                        <a class="dropdown-item" href="${prefix}states/connecticut">🧵 Connecticut</a>
                                        <a class="dropdown-item" href="${prefix}states/maine">🦞 Maine</a>
                                        <a class="dropdown-item" href="${prefix}states/massachusetts">🎓 Massachusetts</a>
                                        <a class="dropdown-item" href="${prefix}states/new-hampshire">🍁 New Hampshire</a>
                                        <a class="dropdown-item" href="${prefix}states/new-jersey">🎢 New Jersey</a>
                                        <a class="dropdown-item" href="${prefix}states/new-york">🗽 New York</a>
                                        <a class="dropdown-item" href="${prefix}states/pennsylvania">🔔 Pennsylvania</a>
                                        <a class="dropdown-item" href="${prefix}states/rhode-island">⛵ Rhode Island</a>
                                        <a class="dropdown-item" href="${prefix}states/vermont">🍁 Vermont</a>
                                    </div>
                                </div>
                                <div class="mega-highlight">
                                    <span class="badge bg-primary-subtle text-primary">Coverage</span>
                                    <h6>We serve all 50 states</h6>
                                    <p>See every location we support and find your state page.</p>
                                    <a class="btn btn-primary btn-sm" href="${prefix}states-we-fix-credit-in">View All States</a>
                                </div>
                            </div>
                        </div>
                    </li>
        ` : `
                    <li class="nav-item"><a class="nav-link" href="${prefix}states-we-fix-credit-in">States we Work</a></li>
        `;

        navList.innerHTML = `
                    <li class="nav-item"><a class="nav-link" href="${prefix}how-credit-repair-works">How Credit Repair Works</a></li>
                    ${servicesMenu}
                    ${statesMenu}
                    <li class="nav-item">
                        <a class="nav-link" href="https://secureclientaccess.com/" target="_blank" rel="noopener noreferrer">
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
                        <li class="mb-2"><a href="${prefix}#reviews" class="text-dark text-decoration-none">Reviews</a></li>
                        <li class="mb-2"><a href="${prefix}#faq" class="text-dark text-decoration-none">FAQ</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Legal</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="${prefix}privacy-policy" class="text-dark text-decoration-none">Privacy Policy</a></li>
                        <li class="mb-2"><a href="${prefix}terms-of-use" class="text-dark text-decoration-none">Terms of Use</a></li>
                        <li class="mb-2"><a href="${prefix}disclosures" class="text-dark text-decoration-none">Disclosures</a></li>
                        <li class="mb-2"><a href="${prefix}late-payments" class="text-dark text-decoration-none">Late Payments</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h6 class="fw-bold mb-3">Support</h6>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="https://secureclientaccess.com/" class="text-dark text-decoration-none" target="_blank" rel="noopener noreferrer">Client Login</a></li>
                        <li class="mb-2"><a href="${prefix}contact-us" class="text-dark text-decoration-none">Contact Us</a></li>
                        <li class="mb-2"><a href="${prefix}flexoffer-test" class="text-dark text-decoration-none">FlexOffers Test</a></li>
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
        if (isNaN(target) || target === null) {
            return; // Skip animation if no valid target
        }
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
                const targetValue = entry.target.dataset.target;
                if (targetValue) {
                    const target = parseInt(targetValue);
                    if (!isNaN(target)) {
                        animateCounter(entry.target, target);
                    }
                }
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
    
    // Show message helper with improved accessibility
    const showMessage = (elementId, message, type = 'success') => {
        const messageEl = document.getElementById(elementId);
        if (!messageEl) return;
        
        const alertClass = type === 'success' ? 'alert-success' : 'alert-danger';
        const icon = type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill';
        const role = type === 'success' ? 'status' : 'alert';
        
        messageEl.innerHTML = `
            <div class="alert ${alertClass} alert-dismissible fade show" role="${role}" aria-live="polite">
                <i class="bi bi-${icon} me-2" aria-hidden="true"></i>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close message"></button>
            </div>
        `;
        
        // Auto dismiss after 10 seconds
        setTimeout(() => {
            const alert = messageEl.querySelector('.alert');
            if (alert) {
                try {
                    const bsAlert = new bootstrap.Alert(alert);
                    bsAlert.close();
                } catch (error) {
                    console.error('Error closing alert:', error);
                }
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
    
    // Capture and persist FlexOffers click ID from the refid query parameter
    const getFlexOffersClickId = () => {
        const params = new URLSearchParams(window.location.search);
        const refId = (params.get('refid') || '').trim();

        if (refId) {
            sessionStorage.setItem('flexoffer_clickid', refId);
            localStorage.setItem('flexoffer_clickid', refId);
            return refId;
        }

        return (
            sessionStorage.getItem('flexoffer_clickid') ||
            localStorage.getItem('flexoffer_clickid') ||
            ''
        ).trim();
    };

    const parsePriceToAmount = (value) => {
        if (value === null || value === undefined) return null;

        const sanitized = String(value).replace(/[^0-9.]/g, '');
        if (!sanitized) return null;

        const parsed = Number.parseFloat(sanitized);
        if (Number.isNaN(parsed) || parsed < 0) return null;

        return parsed.toFixed(2);
    };

    const appendRefIdToBillingLinks = () => {
        const clickId = getFlexOffersClickId();
        if (!clickId) return;

        document.querySelectorAll('a[href*="getcredithelpnow.com/billingselection"]').forEach((link) => {
            try {
                const url = new URL(link.href, window.location.origin);
                if (!url.searchParams.get('refid')) {
                    url.searchParams.set('refid', clickId);
                    link.href = url.toString();
                }
            } catch (error) {
                console.error('Unable to append refid to billing link:', error);
            }
        });
    };

    // Get UTM parameters from URL for tracking
    const getUTMParams = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            utm_source: params.get('utm_source') || null,
            utm_medium: params.get('utm_medium') || null,
            utm_campaign: params.get('utm_campaign') || null,
            utm_term: params.get('utm_term') || null,
            utm_content: params.get('utm_content') || null
        };
    };
    
    // Send to backend API
    const submitToService = async (formData, formType) => {
        // Backend API endpoint
        // For local testing: http://localhost:8000/api/leads
        // For production: https://api.creditmonkey.com/api/leads
        const API_ENDPOINT = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:8000/api/leads'
            : 'https://api.creditmonkey.com/api/leads';
        const clickId = getFlexOffersClickId();
        const requestedOrderAmount = parsePriceToAmount(formData.orderamount);
        
        // Get current state from URL if available
        const pathParts = window.location.pathname.split('/');
        const statesIndex = pathParts.indexOf('states');
        const currentState = statesIndex !== -1 && pathParts[statesIndex + 1] 
            ? pathParts[statesIndex + 1].replace('.html', '').replace(/-/g, ' ')
            : null;
        
        try {
            // Prepare lead data for backend
            const leadData = {
                name: formData.firstName 
                    ? `${formData.firstName} ${formData.lastName || ''}`
                    : formData.name || '',
                email: formData.email || '',
                phone: formData.phone || '',
                state: currentState || formData.state || null,
                message: formData.message || formData.goals || formData.subject || `${formType} form submission`,
                source: formType,
                ...getUTMParams()
            };

            // Include FlexOffers fields so backend can send server-side postback.
            if (clickId) {
                leadData.clickid = clickId;
                leadData.orderamount = requestedOrderAmount || null;
                leadData.ordernumber = formData.ordernumber || null;
                leadData.coupon = formData.coupon || null;
                leadData.currency = (formData.currency || 'USD').toUpperCase();
                leadData.geo = (formData.geo || 'USA').toUpperCase();
                leadData.commissionid = formData.commissionid || null;

                if (Array.isArray(formData.order_items) && formData.order_items.length > 0) {
                    leadData.order_items = formData.order_items;
                }
            }
            
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(leadData)
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            // Also save locally as backup
            saveFormData(formData, formType);
            
            return { success: true, data: result };
            
        } catch (error) {
            console.error('Form submission error:', error);
            
            // Fallback: Save to localStorage if server fails
            const saved = saveFormData(formData, formType);
            
            if (saved) {
                console.log('Form data saved locally. Will retry when connection is restored.');
            }
            
            // Re-throw error to be handled by caller
            throw error;
        }
    };

    // Persist refid and propagate it to checkout links on every page load.
    getFlexOffersClickId();
    appendRefIdToBillingLinks();
    
    // Main Consultation Form Handler
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Submitting...';
            
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
                    'Sorry, there was an error submitting your request. Please try again or call us at (877) 701-7307.',
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
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
            
            const formData = {
                firstName: document.getElementById('contactFirstName').value,
                lastName: document.getElementById('contactLastName').value,
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value,
                consent: document.getElementById('contactConsent').checked
            };
            
            try {
                const result = await submitToService(formData, 'contact');
                
                if (result.success) {
                    showMessage('contactFormMessage', 
                        'Thank you for contacting us! We\'ve received your message and will respond within 24 hours.',
                        'success'
                    );
                    contactForm.reset();
                }
            } catch (error) {
                showMessage('contactFormMessage', 
                    'Sorry, there was an error sending your message. Please try calling us at (877) 701-7307 or email info@creditmonkey.com.',
                    'error'
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.removeAttribute('aria-busy');
                submitBtn.innerHTML = originalText;
            }
        });
    }
    
    // Track pricing plan selections
    document.querySelectorAll('.pricing-card a').forEach(link => {
        link.addEventListener('click', function(e) {
            const planName = this.closest('.pricing-card').querySelector('h4').textContent;
            const planPrice = this.closest('.pricing-card').querySelector('.display-4').textContent;
            const planAmount = parsePriceToAmount(planPrice);
            
            // Track selection
            const selection = {
                plan: planName,
                price: planPrice,
                amount: planAmount,
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

    // Mobile touch optimizations
    if (isMobile) {
        // Improve tap response on buttons
        document.addEventListener('touchstart', function(e) {
            if (e.target.closest('button, a.btn, .nav-link')) {
                e.target.closest('button, a.btn, .nav-link').style.opacity = '0.8';
            }
        }, true);

        document.addEventListener('touchend', function(e) {
            if (e.target.closest('button, a.btn, .nav-link')) {
                e.target.closest('button, a.btn, .nav-link').style.opacity = '1';
            }
        }, true);

        // Prevent hover states on touch devices for better performance
        const styleTag = document.createElement('style');
        styleTag.textContent = '@media (hover: none) { button:hover, a:hover { background-color: inherit; color: inherit; } }';
        document.head.appendChild(styleTag);
    }

    // Smooth scroll behavior for anchors (mobile-friendly)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Auto-close mobile menu when link is clicked
    const navbarToggler = document.querySelector('.navbar-toggler');
    let navbarCollapseElement = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapseElement) {
        document.querySelectorAll('.navbar-nav a:not(.btn)').forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(navbarCollapseElement, {
                    toggle: false
                });
                bsCollapse.hide();
            });
        });
    }

    // Optimize form input keyboard appearance on mobile
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.setAttribute('inputmode', 'tel');
    });

    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.setAttribute('inputmode', 'email');
    });

    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.setAttribute('inputmode', 'numeric');
    });
});

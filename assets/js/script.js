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
                            <strong>Cookie preferences</strong><br>
                            We use cookies to improve site performance, understand traffic, and personalize content.
                            <a href="/privacy-policy" target="_blank">Privacy details</a>
                        </p>
                        <div class="cookie-buttons">
                            <button class="btn-accept">Accept All</button>
                            <button class="btn-decline">Decline</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(banner);
            }

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

    function initStickyMobileCta() {
        if (document.getElementById('mobileStickyCta')) {
            return;
        }

        const cta = document.createElement('div');
        cta.id = 'mobileStickyCta';
        cta.className = 'mobile-sticky-cta';
        cta.innerHTML = `
            <a href="tel:+18883873875" class="cta-call">Call Now</a>
            <a href="https://credit3278.getcredithelpnow.com/billingselection" class="cta-primary" target="_blank" rel="noopener noreferrer">Get Started</a>
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
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const isDirectoryStylePath = window.location.pathname.endsWith('/') && pathSegments.length > 0;
    const prefixDepth = isDirectoryStylePath ? pathSegments.length : Math.max(pathSegments.length - 1, 0);
    const prefix = '../'.repeat(prefixDepth);
    const navbarElement = document.querySelector('.navbar');
    if (navbarElement) {
        navbarElement.classList.remove('navbar-expand-lg');
        navbarElement.classList.remove('navbar-expand-xl');
        navbarElement.classList.add('navbar-expand-xxl');
    }

    const navList = document.querySelector('.navbar .navbar-nav');
    if (navList) {
        const isDesktopMenu = window.matchMedia('(min-width: 1400px)').matches;

        const servicesMenu = isDesktopMenu ? `
                    <li class="nav-item dropdown mega-dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="megaMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
                        <div class="dropdown-menu mega-menu shadow" aria-labelledby="megaMenu">
                            <div class="mega-inner">
                                <div class="mega-column">
                                    <span class="mega-title">Credit Repair</span>
                                    <a class="dropdown-item" href="${prefix}services"><i class="bi bi-shield-check me-2"></i>Full-Service Repair</a>
                                    <a class="dropdown-item" href="${prefix}pricing"><i class="bi bi-tags me-2"></i>Plans & Pricing</a>
                                    <a class="dropdown-item" href="${prefix}how-credit-repair-works"><i class="bi bi-diagram-3 me-2"></i>How It Works</a>
                                </div>
                                <div class="mega-column">
                                    <span class="mega-title">Guides</span>
                                    <a class="dropdown-item" href="${prefix}resources"><i class="bi bi-journal-text me-2"></i>Resource Library</a>
                                    <a class="dropdown-item" href="${prefix}comparisons"><i class="bi bi-columns-gap me-2"></i>Compare Companies</a>
                                    <a class="dropdown-item" href="${prefix}tools"><i class="bi bi-calculator me-2"></i>Credit Repair Tools</a>
                                    <a class="dropdown-item" href="${prefix}build-personal-credit"><i class="bi bi-person-check me-2"></i>Build Personal Credit</a>
                                    <a class="dropdown-item" href="${prefix}build-business-credit"><i class="bi bi-briefcase me-2"></i>Build Business Credit</a>
                                    <a class="dropdown-item" href="${prefix}resources/collections-removal"><i class="bi bi-file-check me-2"></i>Collections Removal</a>
                                    <a class="dropdown-item" href="${prefix}resources/charge-off-removal"><i class="bi bi-clipboard2-x me-2"></i>Charge-Off Removal</a>
                                    <a class="dropdown-item" href="${prefix}resources/medical-collections-removal"><i class="bi bi-hospital me-2"></i>Medical Collections</a>
                                </div>
                                <div class="mega-column">
                                    <span class="mega-title">Coverage</span>
                                    <a class="dropdown-item" href="${prefix}states-we-fix-credit-in"><i class="bi bi-geo-alt me-2"></i>All 50 States</a>
                                    <a class="dropdown-item" href="${prefix}locations/los-angeles"><i class="bi bi-pin-map me-2"></i>Los Angeles Credit Repair</a>
                                    <a class="dropdown-item" href="${prefix}states/california"><i class="bi bi-map me-2"></i>California Credit Repair</a>
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
                    <li class="nav-item"><a class="nav-link" href="${prefix}services">Services</a></li>
        `;

        const statesMenu = isDesktopMenu ? `
                    <li class="nav-item dropdown mega-dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="statesMegaMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Locations</a>
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
                    <li class="nav-item"><a class="nav-link" href="${prefix}states-we-fix-credit-in">Locations</a></li>
        `;

        navList.innerHTML = `
                    <li class="nav-item"><a class="nav-link" href="${prefix}how-credit-repair-works">How It Works</a></li>
                    ${servicesMenu}
                    ${statesMenu}
                    <li class="nav-item"><a class="nav-link" href="${prefix}resources">Resources</a></li>
                    <li class="nav-item"><a class="nav-link" href="${prefix}comparisons">Compare</a></li>
                    <li class="nav-item"><a class="nav-link" href="${prefix}tools">Tools</a></li>
                    <li class="nav-item">
                        <a class="nav-link nav-login" href="https://secureclientaccess.com/" target="_blank" rel="noopener noreferrer">
                            <i class="bi bi-box-arrow-in-right"></i><span>Login</span>
                        </a>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <a href="https://calendly.com/creditmonkey/credit-repair-consultation" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary nav-cta">Free Consult</a>
                    </li>
                    <li class="nav-item ms-lg-2">
                        <a href="https://credit3278.getcredithelpnow.com/billingselection" class="btn btn-primary nav-cta nav-cta-primary" target="_blank" rel="noopener noreferrer">Get Started</a>
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
                    <h2 class="h5 fw-bold mb-3">About Credit Monkey</h2>
                    <p class="text-secondary">Professional credit repair service helping individuals across all 50 states improve their credit health through accurate reporting, expert guidance, and transparent processes.</p>
                    <h3 class="h6 fw-bold mb-3 mt-4">Newsletter Signup</h3>
                    <form id="newsletterForm" class="mb-3">
                        <div class="input-group">
                            <input type="email" class="form-control" placeholder="Enter your email" required id="newsletterEmail">
                            <button class="btn btn-primary" type="submit">Subscribe</button>
                        </div>
                        <small class="text-secondary d-block mt-2">Get credit tips & exclusive offers</small>
                    </form>
                </div>
                <div class="col-lg-2">
                    <h3 class="h6 fw-bold mb-3">Services</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="${prefix}services" class="text-dark text-decoration-none">Services</a></li>
                        <li class="mb-2"><a href="${prefix}pricing" class="text-dark text-decoration-none">Pricing</a></li>
                        <li class="mb-2"><a href="${prefix}build-personal-credit" class="text-dark text-decoration-none">Build Personal Credit</a></li>
                        <li class="mb-2"><a href="${prefix}build-business-credit" class="text-dark text-decoration-none">Build Business Credit</a></li>
                        <li class="mb-2"><a href="${prefix}how-credit-repair-works" class="text-dark text-decoration-none">How Credit Repair Works</a></li>
                        <li class="mb-2"><a href="${prefix}resources" class="text-dark text-decoration-none">Credit Repair Resources</a></li>
                        <li class="mb-2"><a href="${prefix}comparisons" class="text-dark text-decoration-none">Credit Repair Comparisons</a></li>
                        <li class="mb-2"><a href="${prefix}tools" class="text-dark text-decoration-none">Credit Repair Tools</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h3 class="h6 fw-bold mb-3">Company</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="${prefix}about-us" class="text-dark text-decoration-none">About Us</a></li>
                        <li class="mb-2"><a href="${prefix}contact-us" class="text-dark text-decoration-none">Contact Us</a></li>
                        <li class="mb-2"><a href="${prefix}#reviews" class="text-dark text-decoration-none">Reviews</a></li>
                        <li class="mb-2"><a href="${prefix}#faq" class="text-dark text-decoration-none">FAQ</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h3 class="h6 fw-bold mb-3">Legal</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="${prefix}privacy-policy" class="text-dark text-decoration-none">Privacy Policy</a></li>
                        <li class="mb-2"><a href="${prefix}terms-of-use" class="text-dark text-decoration-none">Terms of Use</a></li>
                        <li class="mb-2"><a href="${prefix}disclosures" class="text-dark text-decoration-none">Disclosures</a></li>
                        <li class="mb-2"><a href="${prefix}late-payments" class="text-dark text-decoration-none">Late Payments</a></li>
                    </ul>
                </div>
                <div class="col-lg-2">
                    <h3 class="h6 fw-bold mb-3">Support</h3>
                    <ul class="list-unstyled">
                        <li class="mb-2"><a href="https://secureclientaccess.com/" class="text-dark text-decoration-none" target="_blank" rel="noopener noreferrer">Client Login</a></li>
                        <li class="mb-2"><a href="${prefix}contact-us" class="text-dark text-decoration-none">Contact Us</a></li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h3 class="h6 fw-bold mb-3">California Credit Repair</h3>
                    <ul class="list-unstyled footer-link-columns">
                        <li class="mb-2"><a href="${prefix}states/california" class="text-dark text-decoration-none">Credit Repair California</a></li>
                        <li class="mb-2"><a href="${prefix}locations/los-angeles" class="text-dark text-decoration-none">Credit Repair Los Angeles</a></li>
                        <li class="mb-2"><a href="${prefix}locations/san-diego" class="text-dark text-decoration-none">Credit Repair San Diego</a></li>
                        <li class="mb-2"><a href="${prefix}locations/sacramento" class="text-dark text-decoration-none">Credit Repair Sacramento</a></li>
                        <li class="mb-2"><a href="${prefix}locations/san-francisco" class="text-dark text-decoration-none">Credit Repair San Francisco</a></li>
                        <li class="mb-2"><a href="${prefix}locations/san-jose" class="text-dark text-decoration-none">Credit Repair San Jose</a></li>
                        <li class="mb-2"><a href="${prefix}locations/oakland" class="text-dark text-decoration-none">Credit Repair Oakland</a></li>
                        <li class="mb-2"><a href="${prefix}locations/fresno" class="text-dark text-decoration-none">Credit Repair Fresno</a></li>
                        <li class="mb-2"><a href="${prefix}locations/long-beach" class="text-dark text-decoration-none">Credit Repair Long Beach</a></li>
                        <li class="mb-2"><a href="${prefix}locations/riverside" class="text-dark text-decoration-none">Credit Repair Riverside</a></li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h3 class="h6 fw-bold mb-3">Credit Repair Resources</h3>
                    <ul class="list-unstyled footer-link-columns">
                        <li class="mb-2"><a href="${prefix}resources/credit-score-improvement" class="text-dark text-decoration-none">Credit Score Improvement</a></li>
                        <li class="mb-2"><a href="${prefix}resources/collections-removal" class="text-dark text-decoration-none">Collections Removal</a></li>
                        <li class="mb-2"><a href="${prefix}resources/late-payment-removal" class="text-dark text-decoration-none">Late Payment Removal</a></li>
                        <li class="mb-2"><a href="${prefix}resources/bankruptcy-credit-repair" class="text-dark text-decoration-none">Bankruptcy Credit Repair</a></li>
                        <li class="mb-2"><a href="${prefix}resources/identity-theft-credit-repair" class="text-dark text-decoration-none">Identity Theft Credit Repair</a></li>
                        <li class="mb-2"><a href="${prefix}resources/charge-off-removal" class="text-dark text-decoration-none">Charge-Off Removal</a></li>
                        <li class="mb-2"><a href="${prefix}resources/repossession-removal" class="text-dark text-decoration-none">Repossession Removal</a></li>
                        <li class="mb-2"><a href="${prefix}resources/hard-inquiry-removal" class="text-dark text-decoration-none">Hard Inquiry Removal</a></li>
                        <li class="mb-2"><a href="${prefix}resources/medical-collections-removal" class="text-dark text-decoration-none">Medical Collections Removal</a></li>
                        <li class="mb-2"><a href="${prefix}resources/debt-validation-help" class="text-dark text-decoration-none">Debt Validation Help</a></li>
                        <li class="mb-2"><a href="${prefix}resources/mortgage-credit-repair" class="text-dark text-decoration-none">Mortgage Credit Repair</a></li>
                    </ul>
                </div>
                <div class="col-lg-4">
                    <h3 class="h6 fw-bold mb-3">Compare and Tools</h3>
                    <ul class="list-unstyled footer-link-columns">
                        <li class="mb-2"><a href="${prefix}comparisons/best-credit-repair-services-california" class="text-dark text-decoration-none">Best Credit Repair Services California</a></li>
                        <li class="mb-2"><a href="${prefix}comparisons/best-credit-repair-companies-los-angeles" class="text-dark text-decoration-none">Best Credit Repair Companies Los Angeles</a></li>
                        <li class="mb-2"><a href="${prefix}comparisons/credit-monkey-vs-lexington-law" class="text-dark text-decoration-none">Credit Monkey vs Lexington Law</a></li>
                        <li class="mb-2"><a href="${prefix}comparisons/credit-repair-company-pricing-guide" class="text-dark text-decoration-none">Credit Repair Pricing Guide</a></li>
                        <li class="mb-2"><a href="${prefix}comparisons/diy-credit-repair-vs-credit-repair-company" class="text-dark text-decoration-none">DIY vs Credit Repair Company</a></li>
                        <li class="mb-2"><a href="${prefix}tools/credit-utilization-calculator" class="text-dark text-decoration-none">Credit Utilization Calculator</a></li>
                        <li class="mb-2"><a href="${prefix}tools/dispute-timeline-calculator" class="text-dark text-decoration-none">Dispute Timeline Calculator</a></li>
                        <li class="mb-2"><a href="${prefix}tools/credit-repair-checklist" class="text-dark text-decoration-none">Credit Repair Checklist</a></li>
                        <li class="mb-2"><a href="${prefix}tools/can-this-item-be-disputed" class="text-dark text-decoration-none">Can This Item Be Disputed?</a></li>
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

    const formatDate = (date) => date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const utilizationButton = document.querySelector('[data-calc="utilization"]');
    if (utilizationButton) {
        utilizationButton.addEventListener('click', () => {
            const balance = Number(document.getElementById('balance')?.value || 0);
            const limit = Number(document.getElementById('limit')?.value || 0);
            const result = document.getElementById('utilizationResult');
            if (!result) return;
            if (balance < 0 || limit <= 0) {
                result.textContent = 'Enter a valid balance and a credit limit greater than zero.';
                return;
            }
            const ratio = (balance / limit) * 100;
            let guidance = 'Many scoring models favor lower revolving utilization, especially when balances are kept well below limits.';
            if (ratio <= 9) {
                guidance = 'This is a strong utilization range for many profiles. Keep monitoring every card and report date.';
            } else if (ratio <= 29) {
                guidance = 'This is generally more favorable than high utilization, but lowering balances may still help score planning.';
            } else if (ratio <= 49) {
                guidance = 'This utilization may be holding scores back. Prioritize paydown planning before major applications.';
            } else {
                guidance = 'High utilization can be a major score drag. A staged paydown plan may improve credit readiness.';
            }
            result.innerHTML = `<strong>Estimated utilization: ${ratio.toFixed(1)}%</strong><br>${guidance}`;
        });
    }

    const timelineButton = document.querySelector('[data-calc="timeline"]');
    if (timelineButton) {
        timelineButton.addEventListener('click', () => {
            const input = document.getElementById('startDate');
            const result = document.getElementById('timelineResult');
            if (!input || !result) return;
            const start = input.value ? new Date(`${input.value}T12:00:00`) : new Date();
            if (Number.isNaN(start.getTime())) {
                result.textContent = 'Choose a valid dispute mailing or submission date.';
                return;
            }
            const addDays = (days) => {
                const date = new Date(start);
                date.setDate(date.getDate() + days);
                return formatDate(date);
            };
            result.innerHTML = `
                <strong>Planning milestones from ${formatDate(start)}</strong>
                <ul class="mb-0 mt-2">
                    <li>30 days: ${addDays(30)} - common investigation response checkpoint.</li>
                    <li>45 days: ${addDays(45)} - extended response window to track when extra documentation is involved.</li>
                    <li>60 days: ${addDays(60)} - organize results and prepare follow-up documentation.</li>
                    <li>90 days: ${addDays(90)} - review updated reports and next-step strategy.</li>
                </ul>
            `;
        });
    }

    const decisionButton = document.querySelector('[data-calc="decision"]');
    if (decisionButton) {
        decisionButton.addEventListener('click', () => {
            const issueType = document.getElementById('issueType')?.value;
            const result = document.getElementById('decisionResult');
            if (!result) return;
            const guidance = {
                wrong: 'Review statements, bureau data, account history, and creditor records. Inaccurate balances, dates, payment status, or account type can support a dispute.',
                duplicate: 'Compare account numbers, creditor names, dates opened, balances, and collection ownership. Duplicates may deserve investigation when the same debt appears more than once.',
                identity: 'Treat possible identity theft as urgent. Gather ID documents, police or FTC identity theft reports when applicable, and review all three bureaus.',
                old: 'Check the reported date of first delinquency, account type, and applicable reporting period. Outdated negative items may deserve review.',
                accurate: 'Accurate negative items usually cannot be removed through a dispute simply because they hurt the score. Focus on goodwill options, paydown strategy, and adding positive payment history.'
            };
            result.textContent = guidance[issueType] || 'Select an issue type to review next steps.';
        });
    }
    
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
    
    const BILLING_SELECTION_BASE_URL = 'https://credit3278.getcredithelpnow.com/billingselection';
    const FLEXOFFERS_CLICK_STORAGE_KEY = 'flexoffer_clickid';
    const ADVERTISERMAX_CLICK_STORAGE_KEY = 'AdvertiserMax.clickId';
    const FLEXOFFERS_ADVERTISER_ID = '858300D2-9FD5-4288-94E8-96FB1ECA320F';

    const readRefIdFromSearch = () => {
        const params = new URLSearchParams(window.location.search);

        for (const [key, value] of params.entries()) {
            if (key.toLowerCase() === 'refid') {
                return (value || '').trim();
            }
        }

        return '';
    };

    const persistFlexOffersClickId = (clickId) => {
        const normalizedClickId = (clickId || '').trim();
        if (!normalizedClickId) {
            return '';
        }

        try {
            sessionStorage.setItem(FLEXOFFERS_CLICK_STORAGE_KEY, normalizedClickId);
        } catch (error) {
            console.error('Unable to persist FlexOffers click ID in sessionStorage:', error);
        }

        try {
            localStorage.setItem(FLEXOFFERS_CLICK_STORAGE_KEY, normalizedClickId);
            // Keep AdvertiserMax storage in sync so AdvertiserMaxTrack.track uses the same click id.
            localStorage.setItem(ADVERTISERMAX_CLICK_STORAGE_KEY, normalizedClickId);
        } catch (error) {
            console.error('Unable to persist FlexOffers click ID in localStorage:', error);
        }

        return normalizedClickId;
    };

    // Capture and persist FlexOffers click ID from the refid query parameter.
    const getFlexOffersClickId = () => {
        const refId = readRefIdFromSearch();
        if (refId) {
            return persistFlexOffersClickId(refId);
        }

        const storedClickId = (
            sessionStorage.getItem(FLEXOFFERS_CLICK_STORAGE_KEY) ||
            localStorage.getItem(FLEXOFFERS_CLICK_STORAGE_KEY) ||
            localStorage.getItem(ADVERTISERMAX_CLICK_STORAGE_KEY) ||
            ''
        ).trim();

        return storedClickId ? persistFlexOffersClickId(storedClickId) : '';
    };

    const parsePriceToAmount = (value) => {
        if (value === null || value === undefined) return null;

        const sanitized = String(value).replace(/[^0-9.]/g, '');
        if (!sanitized) return null;

        const parsed = Number.parseFloat(sanitized);
        if (Number.isNaN(parsed) || parsed < 0) return null;

        return parsed.toFixed(2);
    };

    const buildTrackedBillingSelectionUrl = () => {
        const url = new URL(BILLING_SELECTION_BASE_URL);
        const clickId = getFlexOffersClickId();
        if (clickId && !url.searchParams.get('refid')) {
            url.searchParams.set('refid', clickId);
        }
        return url.toString();
    };

    const appendRefIdToBillingLinks = () => {
        document.querySelectorAll('a[href*="getcredithelpnow.com/billingselection"]').forEach((link) => {
            try {
                const url = new URL(link.href, window.location.origin);
                const clickId = getFlexOffersClickId();
                if (clickId && !url.searchParams.get('refid')) {
                    url.searchParams.set('refid', clickId);
                    link.href = url.toString();
                }
            } catch (error) {
                console.error('Unable to append refid to billing link:', error);
            }
        });
    };

    const loadFlexOffersTracking = () => {
        if (window.AdvertiserMaxTrack && window.AdvertiserMaxTrack.invoked) {
            return;
        }

        const queue = window.AdvertiserMaxTrack = window.AdvertiserMaxTrack || [];
        if (!queue.invoked) {
            queue.invoked = true;
            queue.methods = ['init', 'getClick', 'track'];
            queue.factory = function(method) {
                return function() {
                    const args = Array.prototype.slice.call(arguments);
                    args.unshift(method);
                    queue.push(args);
                    return queue;
                };
            };
            for (let i = 0; i < queue.methods.length; i += 1) {
                queue[queue.methods[i]] = queue.factory(queue.methods[i]);
            }
            queue.init = function(advertiserId) {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = 'https://advertisermax.flexoffers.com/vendors/advertisermax/advertisermax.tracking.lib.js';
                const firstScript = document.getElementsByTagName('script')[0];
                firstScript.parentNode.insertBefore(script, firstScript);
                queue.advertiserId = advertiserId;
            };
        }

        queue.init(FLEXOFFERS_ADVERTISER_ID);
        queue.getClick();
    };

    const triggerFlexOffersTrack = (eventName, orderAmount = null) => {
        const clickId = getFlexOffersClickId();
        if (!clickId) {
            return false;
        }

        loadFlexOffersTracking();

        if (!window.AdvertiserMaxTrack || typeof window.AdvertiserMaxTrack.track !== 'function') {
            return false;
        }

        const normalizedAmount = orderAmount !== null && !Number.isNaN(Number(orderAmount))
            ? Number(orderAmount)
            : 0;

        try {
            window.AdvertiserMaxTrack.track({
                order_number: `CM-${eventName}-${Date.now()}`,
                order_amount: normalizedAmount,
                order_name: eventName,
                order_currency: 'USD',
                order_geo: 'USA',
                order_platform: window.location.hostname
            });
            return true;
        } catch (error) {
            console.error('Unable to trigger FlexOffers tracking event:', error);
            return false;
        }
    };

    const getPricingCardAmountForLink = (link) => {
        const pricingCard = link.closest('.pricing-card');
        if (!pricingCard) {
            return null;
        }

        const priceElement = pricingCard.querySelector('.display-4');
        if (!priceElement) {
            return null;
        }

        return parsePriceToAmount(priceElement.textContent || '');
    };

    const bindGetStartedTracking = () => {
        document.querySelectorAll('a[href*="getcredithelpnow.com/billingselection"]').forEach((link) => {
            if (link.dataset.flexoffersBound === '1') {
                return;
            }

            link.dataset.flexoffersBound = '1';
            link.addEventListener('click', () => {
                const priceAmount = getPricingCardAmountForLink(link);
                triggerFlexOffersTrack('get_started_click', priceAmount);
            });
        });
    };

    const trackSignupPageViewIfPresent = () => {
        const path = window.location.pathname.toLowerCase();
        if (!path.includes('signup') && !path.includes('billingselection')) {
            return;
        }

        const dedupeKey = 'flexoffers_signup_page_view_tracked';
        if (sessionStorage.getItem(dedupeKey) === '1') {
            return;
        }

        sessionStorage.setItem(dedupeKey, '1');
        triggerFlexOffersTrack('signup_page_view');
    };

    const redirectToBillingSelection = (eventName, orderAmount = null) => {
        triggerFlexOffersTrack(eventName, orderAmount);
        window.location.href = buildTrackedBillingSelectionUrl();
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
        // Production-only single-server API paths.
        const API_ENDPOINTS = [
            window.location.origin + '/api/leads.php',
            window.location.origin + '/api/leads',
            window.location.origin + '/backend/public/api/leads'
        ];
        const uniqueEndpoints = Array.from(new Set(API_ENDPOINTS));
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
            
            const endpointErrors = [];
            let result = null;
            let usedEndpoint = null;

            for (let i = 0; i < uniqueEndpoints.length; i++) {
                const endpoint = uniqueEndpoints[i];

                try {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(leadData)
                    });

                    const responseBody = await response.json().catch(() => ({}));

                    if (response.ok) {
                        result = responseBody;
                        usedEndpoint = endpoint;
                        break;
                    }

                    const message = responseBody && responseBody.message
                        ? responseBody.message
                        : 'No response message';
                    endpointErrors.push(`${endpoint} returned HTTP ${response.status} (${message})`);
                } catch (requestError) {
                    endpointErrors.push(`${endpoint} failed (${requestError.message})`);
                }
            }

            if (!result) {
                const errorSummary = endpointErrors.length > 0
                    ? endpointErrors.join(' | ')
                    : 'No lead API endpoints were reachable.';
                throw new Error(errorSummary);
            }

            console.log('Lead submitted using endpoint:', usedEndpoint);
            
            // Also save locally as backup
            saveFormData(formData, formType);
            
            return { success: true, data: result, endpoint: usedEndpoint };
            
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
    bindGetStartedTracking();
    trackSignupPageViewIfPresent();
    
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
                    
                    // Redirect users into billing with tracked refid and signup tracking.
                    setTimeout(() => {
                        redirectToBillingSelection('signup_page_redirect');
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
                    
                    // Close modal and redirect into billing with tracked refid and signup tracking.
                    setTimeout(() => {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('quickConsultModal'));
                        if (modal) modal.hide();
                        redirectToBillingSelection('signup_page_redirect');
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

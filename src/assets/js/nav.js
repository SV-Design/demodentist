// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener('click', function() {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
    const onClick = (e) => {
        // Don't toggle if clicking on third-level dropdown links
        if (e.target.closest('.cs-drop-link3')) {
            return;
        }
        item.classList.toggle('cs-active')
    }
    item.addEventListener('click', onClick)
}

// third-level dropdown toggle for mobile
const thirdLevelTriggers = Array.from(document.querySelectorAll('#cs-navigation .cs-drop3-main'));
for (const trigger of thirdLevelTriggers) {
    const onClick = (e) => {
        // Only apply on mobile widths
        if (window.matchMedia('(max-width: 1023px)').matches) {
            e.stopPropagation();
            e.preventDefault();
            const parentLi = trigger.closest('.cs-drop-li');
            if (parentLi) {
                parentLi.classList.toggle('drop3-active');
            }
        }
    };
    trigger.addEventListener('click', onClick);
}

// Prevent third-level dropdown links from closing parent dropdown on mobile
const thirdLevelLinks = Array.from(document.querySelectorAll('#cs-navigation .cs-drop-link3'));
for (const link of thirdLevelLinks) {
    const onClick = (e) => {
        // Only prevent bubbling on mobile widths
        if (window.matchMedia('(max-width: 1023px)').matches) {
            e.stopPropagation();
        }
    };
    link.addEventListener('click', onClick);
}

// after scrolling down 100px, add .scroll class to the #cs-navigation
// Cache DOM element to avoid repeated queries
const navigation = document.querySelector('#cs-navigation');
const backToTopButton = document.querySelector('.back-to-top');
let isScrolled = false;

// Throttled scroll handler to prevent forced reflows
function handleScroll() {
    const scroll = document.documentElement.scrollTop;
    const shouldBeScrolled = scroll >= 100;
    
    // Only update DOM if state actually changed
    if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        if (isScrolled) {
            navigation.classList.add('scroll');
            navigation.classList.remove('top');
            if (backToTopButton) {
                backToTopButton.classList.add('show');
            }
        } else {
            navigation.classList.remove('scroll');
            navigation.classList.add('top');
            if (backToTopButton) {
                backToTopButton.classList.remove('show');
            }
        }
    }
}

// Use requestAnimationFrame to batch scroll events and prevent forced reflows
let scrollTimeout;
document.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = requestAnimationFrame(handleScroll);
}, { passive: true });

// Back to top button click handler
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* Contact form JS */

// Formnpm
const form = document.querySelector("#cs-form-1392");
const fields = {
    name: document.querySelector("#name-1392"),
    email: document.querySelector("#email-1392"),
    phone: document.querySelector("#phone-1392"),
    // subject: document.querySelector("#subject-1392"),
    message: document.querySelector("#message-1392"),
    gdpr: document.querySelector("#gdpr-consent")
};

// Note: Error message styles are now in root.scss
// Note: Error message divs are now in the HTML with -cta suffix

// Validation functions
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Vardas yra privalomas';
        if (value.length < 2) return 'Vardas turi būti bent 2 simbolių ilgio';
        return '';
    },
    email: (value) => {
        if (!value.trim()) return 'El. paštas yra privalomas';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Įveskite teisingą el. pašto adresą';
        return '';
    },
    phone: (value) => {
        if (!value.trim()) return 'Telefono numeris yra privalomas';
        // More forgiving: strip all non-digit characters and check length
        const digitCount = value.replace(/\D/g, '').length;
        // Accept 7-15 digits (covers most international formats)
        if (digitCount < 7 || digitCount > 15) return 'Įveskite teisingą tel. nr.';
        return '';
    },
    subject: (value) => {
        if (!value.trim()) return 'Tema yra privaloma';
        return '';
    },
    message: (value) => {
        if (!value.trim()) return 'Žinutė yra privaloma';
        if (value.length < 10) return 'Žinutė turi būti bent 10 simbolių ilgio';
        return '';
    },
    gdpr: (checked) => {
        if (!checked) return 'Turite sutikti su privatumo politikos sąlygomis';
        return '';
    }
};

// Show error function
function showError(field, message) {
    const errorDiv = document.getElementById(`${field}-error-cta`);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = message ? 'block' : 'none';
        if (message) {
            fields[field].classList.add('input-error', 'shake');
            // Remove shake animation after it completes
            setTimeout(() => {
                fields[field].classList.remove('shake');
            }, 500);
        } else {
            fields[field].classList.remove('input-error');
        }
    }
}

// Real-time validation removed - errors only show on submit
// Validation now only happens when form is submitted

// Form submission handler

if(form){
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        let hasErrors = false;

        // Validate all fields
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field) {
                const error = validators[fieldName](fieldName === 'gdpr' ? field.checked : field.value);
                showError(fieldName, error);
                if (error) hasErrors = true;
            }
        });

        if (hasErrors) {
            // Find first error and scroll to it
            const firstErrorField = Object.keys(fields).find(fieldName =>
                document.getElementById(`${fieldName}-error-cta`)?.style.display === 'block'
            );
            if (firstErrorField) {
                fields[firstErrorField].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Validate reCAPTCHA
        const recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]');
        if (!recaptchaResponse || !recaptchaResponse.value) {
            alert("Prašome patvirtinti, kad nesate robotas.");
            return;
        }

        const formData = new FormData(form);
        const successMessage = document.getElementById("success-message");

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });

            // Hide form and show success message
            form.style.display = "none";
            successMessage.style.display = "flex";
        } catch (error) {
            alert("Įvyko klaida. Prašome bandyti dar kartą.");
        }
    });

}

/* Contact form JS  END*/



// Lazy load reCAPTCHA when user scrolls near the form
document.addEventListener('DOMContentLoaded', () => {
    const formSection = document.getElementById('registruotis');
    let recaptchaScriptLoaded = false;

    if (!formSection) {
        return;
    }

    const lazyLoadRecaptcha = () => {
        if (recaptchaScriptLoaded) {
            return;
        }

        const triggerPoint = formSection.offsetTop - 200;
        if (window.scrollY + window.innerHeight >= triggerPoint) {
            console.log('User is near the form. Loading reCAPTCHA script...');
            recaptchaScriptLoaded = true;

            const script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js?hl=lt';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            window.removeEventListener('scroll', lazyLoadRecaptcha);
        }
    };

    window.addEventListener('scroll', lazyLoadRecaptcha, { passive: true });
    lazyLoadRecaptcha(); // Check immediately in case form is already visible
});

class GallerySwitcher {
    constructor({filtersSelector = "#gallery-1449 .cs-button", imagesSelector = "#gallery-1449 .cs-gallery", activeClass = "cs-active", hiddenClass = "cs-hidden"} = {}) {

        this.filtersSelector = filtersSelector;
        this.imagesSelector = imagesSelector;
        this.activeClass = activeClass;
        this.hiddenClass = hiddenClass;

        this.$activeFilter = document.querySelector(this.filtersSelector);
        this.$images = document.querySelectorAll(this.imagesSelector);
        this.$activeFilter.classList.add(this.activeClass);

        document.querySelectorAll(this.filtersSelector).forEach(btn => {
            btn.addEventListener("click", () => this.onClick(btn));
        });
    }

    onClick(filterBtn) {
        this.filter(filterBtn.dataset.filter);
        this.$activeFilter.classList.remove(this.activeClass);
        filterBtn.classList.add(this.activeClass);
        this.$activeFilter = filterBtn;
    }

    filter(category) {
        const showAll = category === "all";
        this.$images.forEach(img => {
            const match = showAll || img.dataset.category === category;
            img.classList.toggle(this.hiddenClass, !match);
        });
    }
}

// Initialize gallery switcher only if gallery exists
const galleryFilters = document.querySelectorAll("#gallery-1449 .cs-button");
const galleryImages = document.querySelectorAll("#gallery-1449 .cs-gallery");

if (galleryFilters.length > 0 && galleryImages.length > 0) {
    new GallerySwitcher();
}

// Cookie popup functionality
document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const closeButton = document.querySelector('.sv-close');
    const acceptButton = document.querySelector('.sv-button-solid');
    const rejectButton = document.querySelector('.sv-button-outline');

    if (!popup) return;

    // Initialize dataLayer and gtag if they don't exist
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};

    function updateConsentMode(granted) {
        if (granted) {
            // Grant all consent when user accepts
            window.gtag('consent', 'update', {
                'ad_storage': 'granted', 
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted',
            });
        } else {
            // Deny all consent
            window.gtag('consent', 'update', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
            });
        }
    }

    // Check if user declined and if 24 hours have passed
    function shouldShowPopup() {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        const cookiesDeclined = localStorage.getItem('cookiesDeclined');
        const declineTimestamp = localStorage.getItem('cookiesDeclinedTimestamp');

        // Don't show if already accepted
        if (cookiesAccepted === 'true') {
            return false;
        }

        // If declined, check if 24 hours have passed
        if (cookiesDeclined === 'true' && declineTimestamp) {
            const now = Date.now();
            const declinedTime = parseInt(declineTimestamp, 10);
            const hoursPassed = (now - declinedTime) / (1000 * 60 * 60);
            
            // Show again if 24 hours have passed
            return hoursPassed >= 24;
        }

        // Show if never interacted
        return true;
    }

    // Check if cookies were already accepted and grant consent
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
        updateConsentMode(true);
    }

    if (shouldShowPopup()) {
        popup.style.display = "block";
        setTimeout(function () {
            popup.classList.add('sv-show');
        }, 600);
    }

    function closePopup() {
        popup.classList.remove('sv-show');
        localStorage.setItem('cookiesAccepted', 'true');
        // Clear decline data if exists
        localStorage.removeItem('cookiesDeclined');
        localStorage.removeItem('cookiesDeclinedTimestamp');
        
        // Grant consent when user accepts cookies
        updateConsentMode(true);
        
        setTimeout(function () {
            popup.style.display = "none";
        }, 300);
    }

    function rejectCookies() {
        popup.classList.remove('sv-show');
        localStorage.setItem('cookiesDeclined', 'true');
        localStorage.setItem('cookiesDeclinedTimestamp', Date.now().toString());
        // Clear accept data if exists
        localStorage.removeItem('cookiesAccepted');
        
        // Ensure consent remains denied when user rejects
        updateConsentMode(false);
        
        setTimeout(function () {
            popup.style.display = "none";
        }, 300);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }

    if (acceptButton) {
        acceptButton.addEventListener('click', function () {
            closePopup();
        });
    }

    if (rejectButton) {
        rejectButton.addEventListener('click', function () {
            rejectCookies();
        });
    }
});

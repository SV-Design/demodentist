/* Car Form Validation */

// reCAPTCHA loading state
let recaptchaScriptLoaded = false;

// Function to load reCAPTCHA script and show container
function loadRecaptchaForCarForm() {
    const recaptchaContainer = document.getElementById('recaptcha-container-rental');
    if (!recaptchaContainer) return;

    // Show the container
    recaptchaContainer.style.display = 'block';

    // Load script only once
    if (recaptchaScriptLoaded) {
        return;
    }

    // Check if script already exists
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
        recaptchaScriptLoaded = true;
        return;
    }

    console.log('Loading reCAPTCHA script for car form...');
    recaptchaScriptLoaded = true;

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?hl=lt';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
}

// Form and fields
const carForm = document.querySelector("#cs-rental-form");
const carFields = {
    name: document.querySelector("#name-rental"),
    lastname: document.querySelector("#lastname-rental"),
    email: document.querySelector("#email-rental"),
    phone: document.querySelector("#phone-rental"),
    message: document.querySelector("#message-rental"),
    gdpr: document.querySelector("#gdpr-consent-rental")
};

// Validation functions
const carValidators = {
    name: (value) => {
        if (!value.trim()) return 'Vardas yra privalomas';
        if (value.length < 2) return 'Vardas turi būti bent 2 simbolių ilgio';
        return '';
    },
    lastname: (value) => {
        if (!value.trim()) return 'Pavardė yra privaloma';
        if (value.length < 2) return 'Pavardė turi būti bent 2 simbolių ilgio';
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
        const phoneRegex = /^[\d\s+]{8,20}$/;
        if (!phoneRegex.test(value)) return 'Įveskite teisingą tel. nr.';
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
function showCarError(field, message) {
    const errorDiv = document.getElementById(`${field}-error-rental`);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = message ? 'block' : 'none';
        if (message) {
            carFields[field].classList.add('input-error', 'shake');
            // Remove shake animation after it completes
            setTimeout(() => {
                carFields[field].classList.remove('shake');
            }, 500);
        } else {
            carFields[field].classList.remove('input-error', 'shake');
        }
    }
}

// Real-time validation removed - errors only show on submit
// Only load reCAPTCHA when name field has any symbol entered
if (carFields.name) {
    carFields.name.addEventListener('input', () => {
        // Load reCAPTCHA when any symbol is entered in name field
        if (carFields.name.value && carFields.name.value.trim() !== '') {
            loadRecaptchaForCarForm();
        }
    });
}

// Form submission handler
if (carForm) {
    carForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        let hasErrors = false;

        // Validate all fields
        Object.keys(carFields).forEach(fieldName => {
            const field = carFields[fieldName];
            if (field) {
                let error = '';
                if (fieldName === 'gdpr') {
                    error = carValidators[fieldName](field.checked);
                } else {
                    error = carValidators[fieldName](field.value);
                }
                showCarError(fieldName, error);
                if (error) hasErrors = true;
            }
        });

        if (hasErrors) {
            // Find first error and scroll to it
            const firstErrorField = Object.keys(carFields).find(fieldName =>
                document.getElementById(`${fieldName}-error-rental`)?.style.display === 'block'
            );
            if (firstErrorField) {
                carFields[firstErrorField].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Validate reCAPTCHA if name has any value
        const nameValue = carFields.name?.value;
        if (nameValue && nameValue.trim() !== '') {
            const recaptchaResponse = document.querySelector('[name="g-recaptcha-response"]');
            if (!recaptchaResponse || !recaptchaResponse.value) {
                alert("Prašome patvirtinti, kad nesate robotas.");
                const recaptchaContainer = document.getElementById('recaptcha-container-rental');
                if (recaptchaContainer) {
                    recaptchaContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
        }

        const formData = new FormData(carForm);
        const successMessage = document.getElementById("rental-success-message");

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            });

            // Hide form and show success message
            carForm.style.display = "none";
            if (successMessage) {
                successMessage.style.display = "block";
            }
        } catch (error) {
            alert("Įvyko klaida. Prašome bandyti dar kartą.");
        }
    });
}


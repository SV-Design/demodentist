/* Hero Form Validation */

// Form and fields
const heroForm = document.querySelector("#cs-form-1467");
const heroFields = {
    email: document.querySelector("#email-1467"),
    phone: document.querySelector("#phone-1467"),
    city: document.querySelector("#fname-1467"),
    price: document.querySelector("#lname-1467"),
    message: document.querySelector("#message-1467"),
    fileUpload: document.querySelector("#resume-1392"),
    gdpr: document.querySelector("#gdpr-consent-hero")
};

// Store accumulated files
let accumulatedFiles = [];

// Validation functions
const heroValidators = {
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
    city: (value) => {
        if (!value.trim()) return 'Miestas yra privalomas';
        if (value.length < 2) return 'Miestas turi būti bent 2 simbolių ilgio';
        return '';
    },
    price: (value) => {
        if (!value.trim()) return 'Norima kaina yra privaloma';
        // Allow numbers, spaces, and euro symbol
        const priceRegex = /^[\d\s€.,]+$/;
        if (!priceRegex.test(value)) return 'Įveskite teisingą kainą (pvz., 5000 arba 5000€)';
        return '';
    },
    message: (value) => {
        if (!value.trim()) return 'Žinutė yra privaloma';
        if (value.length < 10) return 'Žinutė turi būti bent 10 simbolių ilgio';
        return '';
    },
    fileUpload: (files) => {
        // Use accumulated files array
        const filesToValidate = Array.isArray(files) ? files : accumulatedFiles;
        
        // File upload is optional - no error if empty
        if (!filesToValidate || filesToValidate.length === 0) {
            return '';
        }
        
        // Calculate total file size
        let totalSize = 0;
        for (let i = 0; i < filesToValidate.length; i++) {
            const file = filesToValidate[i];
            
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                return `Failas "${file.name}" nėra nuotrauka. Įkelkite tik nuotraukas.`;
            }
            
            totalSize += file.size;
        }
        
        // Check total size (8MB = 8 * 1024 * 1024 bytes)
        const maxSize = 8 * 1024 * 1024;
        if (totalSize > maxSize) {
            const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
            return `Visų nuotraukų bendras dydis (${totalSizeMB}MB) viršija 8MB limitą. Prašome sumažinti failų dydį arba skaičių.`;
        }
        
        return '';
    },
    gdpr: (checked) => {
        if (!checked) return 'Turite sutikti su privatumo politikos sąlygomis';
        return '';
    }
};

// Show error function
function showHeroError(field, message) {
    const errorDiv = document.getElementById(`${field}-error-hero`);
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = message ? 'block' : 'none';
        if (message) {
            heroFields[field].classList.add('input-error', 'shake');
            // Remove shake animation after it completes
            setTimeout(() => {
                heroFields[field].classList.remove('shake');
            }, 500);
        } else {
            heroFields[field].classList.remove('input-error', 'shake');
        }
    }
}

// Update file upload display text and file list
function updateFileUploadText() {
    const fileInput = heroFields.fileUpload;
    const textElement = fileInput?.parentElement?.querySelector('.file-upload-text');
    
    if (accumulatedFiles.length > 0) {
        const totalSize = accumulatedFiles.reduce((sum, file) => sum + file.size, 0);
        const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
        
        if (accumulatedFiles.length === 1) {
            textElement.textContent = `Pasirinktas 1 failas (${totalSizeMB}MB)`;
        } else {
            textElement.textContent = `Pasirinkta ${accumulatedFiles.length} failai (${totalSizeMB}MB)`;
        }
        textElement.style.display = 'inline';
        textElement.classList.remove('text-danger');
        textElement.classList.add('text-success');
        
        // Show file list
        updateFileList();
    } else if (textElement) {
        textElement.style.display = 'none';
        textElement.textContent = '';
        textElement.classList.remove('text-success', 'text-danger');
        
        // Clear file list
        const fileListElement = document.getElementById('hero-file-list');
        if (fileListElement) {
            fileListElement.innerHTML = '';
        }
    }
}

// Update file list display with remove buttons
function updateFileList() {
    let fileListElement = document.getElementById('hero-file-list');
    
    // Create file list element if it doesn't exist
    if (!fileListElement) {
        fileListElement = document.createElement('div');
        fileListElement.id = 'hero-file-list';
        fileListElement.className = 'file-list';
        const fileWrapper = heroFields.fileUpload?.closest('.file-upload-wrapper');
        if (fileWrapper) {
            // Insert after the small text
            const smallText = fileWrapper.querySelector('.form-text-muted');
            if (smallText) {
                smallText.after(fileListElement);
            }
        }
    }
    
    // Clear and rebuild list
    fileListElement.innerHTML = '';
    
    accumulatedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-list-item';
        
        const fileName = document.createElement('span');
        fileName.className = 'file-name';
        fileName.textContent = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)`;
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'file-remove-btn';
        removeBtn.textContent = '✕';
        removeBtn.setAttribute('aria-label', `Pašalinti ${file.name}`);
        removeBtn.addEventListener('click', () => removeFile(index));
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(removeBtn);
        fileListElement.appendChild(fileItem);
    });
}

// Remove file from accumulated files
function removeFile(index) {
    accumulatedFiles.splice(index, 1);
    updateFileUploadText();
    
    // Revalidate
    const error = heroValidators.fileUpload(accumulatedFiles);
    showHeroError('fileUpload', error);
}

// Real-time validation
Object.keys(heroFields).forEach(fieldName => {
    const field = heroFields[fieldName];
    if (field) {
        if (fieldName === 'fileUpload') {
            // Special handling for file upload - accumulate files
            field.addEventListener('change', (e) => {
                const newFiles = Array.from(e.target.files);
                
                // Add new files to accumulated files
                newFiles.forEach(file => {
                    // Check if file with same name doesn't already exist
                    const exists = accumulatedFiles.some(f => f.name === file.name && f.size === file.size);
                    if (!exists) {
                        accumulatedFiles.push(file);
                    }
                });
                
                // Clear the input so user can select the same file again if needed
                field.value = '';
                
                updateFileUploadText();
                const error = heroValidators[fieldName](accumulatedFiles);
                showHeroError(fieldName, error);
            });
        } else if (fieldName === 'gdpr') {
            // Special handling for checkbox
            field.addEventListener('change', () => {
                const error = heroValidators[fieldName](field.checked);
                showHeroError(fieldName, error);
            });
        } else {
            field.addEventListener('input', () => {
                const error = heroValidators[fieldName](field.value);
                showHeroError(fieldName, error);
            });

            field.addEventListener('blur', () => {
                const error = heroValidators[fieldName](field.value);
                showHeroError(fieldName, error);
            });
        }
    }
});

// Form submission handler
if (heroForm) {
    heroForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        let hasErrors = false;

        // Validate all fields
        Object.keys(heroFields).forEach(fieldName => {
            const field = heroFields[fieldName];
            if (field) {
                let error = '';
                if (fieldName === 'fileUpload') {
                    error = heroValidators[fieldName](accumulatedFiles);
                } else if (fieldName === 'gdpr') {
                    error = heroValidators[fieldName](field.checked);
                } else {
                    error = heroValidators[fieldName](field.value);
                }
                showHeroError(fieldName, error);
                if (error) hasErrors = true;
            }
        });

        if (hasErrors) {
            // Find first error and scroll to it
            const firstErrorField = Object.keys(heroFields).find(fieldName =>
                document.getElementById(`${fieldName}-error-hero`)?.style.display === 'block'
            );
            if (firstErrorField) {
                heroFields[firstErrorField].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Prepare form data with accumulated files
        const formData = new FormData(heroForm);
        
        // Remove the original file input from formData
        formData.delete('resume');
        
        // Add all accumulated files
        accumulatedFiles.forEach((file, index) => {
            formData.append('resume', file);
        });
        
        try {
            await fetch("/", {
                method: "POST",
                body: formData
            });

            // Hide all form inputs and show success message inside form
            const formInputs = heroForm.querySelectorAll('.cs-input-wrapper, .file-upload-wrapper, .cs-submit');
            formInputs.forEach(input => {
                input.style.display = 'none';
            });

            const successMessage = document.getElementById("hero-success-message");
            if (successMessage) {
                successMessage.style.display = "block";
            }

            // Clear accumulated files
            accumulatedFiles = [];

            // Trigger confetti if the manager exists
            if (typeof manager !== 'undefined' && manager.addConfetti) {
                manager.addConfetti();
            }
        } catch (error) {
            alert("Įvyko klaida. Prašome bandyti dar kartą.");
        }
    });
}


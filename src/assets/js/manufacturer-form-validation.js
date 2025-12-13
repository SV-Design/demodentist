/* Manufacturer Form Validation and Submission */

// Form and fields
const manufacturerForm = document.querySelector("#manufacturer .cs-form");

if (manufacturerForm) {
    const fields = {
        marke: manufacturerForm.querySelector('[name="marke"]'),
        modelis: manufacturerForm.querySelector('[name="modelis"]'),
        vardas: manufacturerForm.querySelector('[name="vardas"]'),
        telnr: manufacturerForm.querySelector('[name="telnr"]'),
        gdpr: document.querySelector("#gdpr-consent-manufacturer"),
        nuotraukos: manufacturerForm.querySelector('[name="nuotraukos"]')
    };

    // Store accumulated files
    let accumulatedFiles = [];

    // Validation functions
    const validators = {
        marke: (value) => {
            if (!value.trim()) return 'Markė yra privaloma';
            return '';
        },
        modelis: (value) => {
            if (!value.trim()) return 'Modelis yra privalomas';
            if (value.length < 2) return 'Modelis turi būti bent 2 simbolių ilgio';
            return '';
        },
        vardas: (value) => {
            // Optional field, no validation needed
            return '';
        },
        telnr: (value) => {
            if (!value.trim()) return 'Telefono numeris yra privalomas';
            // Lithuanian phone number pattern: supports +370 format only
            const phoneRegex = /^\+370[0-9\s]{8,12}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Įveskite teisingą tel. nr. (+370...)';
            return '';
        },
        gdpr: (checked) => {
            if (!checked) return 'Turite sutikti su privatumo politikos sąlygomis';
            return '';
        },
        nuotraukos: (files) => {
            if (!files || files.length === 0) return ''; // Optional field
            
            // Check total file size (8MB = 8 * 1024 * 1024 bytes)
            const maxSize = 8 * 1024 * 1024;
            let totalSize = 0;
            
            // Handle both FileList and Array
            const fileArray = Array.isArray(files) ? files : Array.from(files);
            
            for (let i = 0; i < fileArray.length; i++) {
                totalSize += fileArray[i].size;
                
                // Check if file is an image
                if (!fileArray[i].type.startsWith('image/')) {
                    return 'Galima įkelti tik nuotraukas';
                }
            }
            
            if (totalSize > maxSize) {
                const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
                return `Nuotraukų dydis per didelis (${totalMB}MB). Maksimalus dydis: 8MB`;
            }
            
            return '';
        }
    };

    // Show error function
    function showError(field, message) {
        const errorDiv = document.getElementById(`${field}-error-manufacturer`);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = message ? 'block' : 'none';
            if (fields[field] && message) {
                fields[field].classList.add('input-error', 'shake');
                // Remove shake animation after it completes
                setTimeout(() => {
                    fields[field].classList.remove('shake');
                }, 500);
            } else if (fields[field]) {
                fields[field].classList.remove('input-error');
            }
        }
    }

    // Real-time validation
    Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        if (field) {
            field.addEventListener('input', () => {
                let value;
                if (fieldName === 'gdpr') {
                    value = field.checked;
                } else if (fieldName === 'nuotraukos') {
                    value = field.files;
                } else {
                    value = field.value;
                }
                const error = validators[fieldName](value);
                showError(fieldName, error);
            });

            field.addEventListener('blur', () => {
                let value;
                if (fieldName === 'gdpr') {
                    value = field.checked;
                } else if (fieldName === 'nuotraukos') {
                    value = field.files;
                } else {
                    value = field.value;
                }
                const error = validators[fieldName](value);
                showError(fieldName, error);
            });

            // Special handler for file input to accumulate multiple file selections
            if (fieldName === 'nuotraukos') {
                field.addEventListener('change', (e) => {
                    const newFiles = Array.from(e.target.files);
                    
                    // Add new files to accumulated files
                    accumulatedFiles = [...accumulatedFiles, ...newFiles];
                    
                    // Update the display
                    updateFileDisplay();
                    
                    // Validate the accumulated files
                    const error = validators.nuotraukos(accumulatedFiles);
                    showError('nuotraukos', error);
                    
                    // Reset the input so the same file can be selected again if needed
                    e.target.value = '';
                });
            }
        }
    });

    // Function to update file display
    function updateFileDisplay() {
        const wrapper = manufacturerForm.querySelector('.file-upload-wrapper');
        const label = manufacturerForm.querySelector('.file-upload-label');
        
        // Remove existing file list if present
        let fileList = wrapper.querySelector('.file-list');
        if (fileList) {
            fileList.remove();
        }
        
        if (accumulatedFiles.length > 0) {
            let totalSize = 0;
            accumulatedFiles.forEach(file => totalSize += file.size);
            const totalMB = (totalSize / (1024 * 1024)).toFixed(2);
            
            const fileText = accumulatedFiles.length === 1 ? '1 nuotrauka' : `${accumulatedFiles.length} nuotraukos`;
            label.querySelector('.file-upload-button').innerHTML = 
                `<img alt="upload icon" height="20" src="/assets/svgs/icon-upload.svg" width="20" style="margin-right:8px"> Pridėti daugiau nuotraukų`;
            
            // Create file list display
            fileList = document.createElement('div');
            fileList.className = 'file-list';
            
            const fileListTitle = document.createElement('div');
            fileListTitle.className = 'file-list-title';
            fileListTitle.textContent = `${fileText} (${totalMB}MB):`;
            fileList.appendChild(fileListTitle);
            
            accumulatedFiles.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                fileName.textContent = `${file.name} (${fileSizeMB}MB)`;
                
                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'file-remove-btn';
                removeBtn.textContent = '×';
                removeBtn.setAttribute('aria-label', `Pašalinti ${file.name}`);
                removeBtn.addEventListener('click', () => removeFile(index));
                
                fileItem.appendChild(fileName);
                fileItem.appendChild(removeBtn);
                fileList.appendChild(fileItem);
            });
            
            wrapper.insertBefore(fileList, wrapper.querySelector('.form-text-muted'));
        } else {
            label.querySelector('.file-upload-button').innerHTML = 
                '<img alt="upload icon" height="20" src="/assets/svgs/icon-upload.svg" width="20" style="margin-right:8px"> Įkelkite automobilio nuotraukas';
        }
    }

    // Function to remove a file from the list
    function removeFile(index) {
        accumulatedFiles.splice(index, 1);
        updateFileDisplay();
        
        // Validate after removal
        const error = validators.nuotraukos(accumulatedFiles);
        showError('nuotraukos', error);
    }

    // Form submission handler
    manufacturerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        let hasErrors = false;

        // Validate all required fields
        Object.keys(fields).forEach(fieldName => {
            const field = fields[fieldName];
            if (field) {
                let value;
                if (fieldName === 'gdpr') {
                    value = field.checked;
                } else if (fieldName === 'nuotraukos') {
                    value = accumulatedFiles; // Use accumulated files instead of field.files
                } else {
                    value = field.value;
                }
                const error = validators[fieldName](value);
                showError(fieldName, error);
                if (error) hasErrors = true;
            }
        });

        if (hasErrors) {
            // Find first error and scroll to it
            const firstErrorField = Object.keys(fields).find(fieldName =>
                document.getElementById(`${fieldName}-error-manufacturer`)?.style.display === 'block'
            );
            if (firstErrorField && fields[firstErrorField]) {
                fields[firstErrorField].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Create FormData for Netlify submission
        const formData = new FormData(manufacturerForm);
        
        // Remove the empty file input and add accumulated files
        formData.delete('nuotraukos');
        accumulatedFiles.forEach((file, index) => {
            formData.append('nuotraukos', file);
        });

        try {
            // Submit to Netlify
            await fetch("/", {
                method: "POST",
                body: formData
            });

            // Hide all form rows and show success message inside form
            const formRows = manufacturerForm.querySelectorAll('.manufacturer-form-row');
            formRows.forEach(row => {
                row.style.display = 'none';
            });

            const successMessage = document.getElementById("manufacturer-success-message");
            if (successMessage) {
                successMessage.style.display = "block";
            }

            // Reset accumulated files
            accumulatedFiles = [];

            // Trigger confetti if the manager exists
            if (typeof manager !== 'undefined' && manager.addConfetti) {
                manager.addConfetti();
            }

        } catch (error) {
            console.error('Submission error:', error);
            alert("Įvyko klaida. Prašome bandyti dar kartą arba susisiekti tiesiogiai.");
        }
    });
}


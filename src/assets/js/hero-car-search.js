/**
 * Hero Car Search Form
 * Handles the car search form in the hero section
 */

class HeroCarSearch {
    constructor() {
        this.form = document.getElementById('hero-car-search-form');
        this.categoryTrigger = document.getElementById('hero-category-trigger');
        this.transmissionTrigger = document.getElementById('hero-transmission-trigger');
        this.seatsTrigger = document.getElementById('hero-seats-trigger');
        this.categoryDropdown = document.getElementById('hero-category-dropdown');
        this.transmissionDropdown = document.getElementById('hero-transmission-dropdown');
        this.seatsDropdown = document.getElementById('hero-seats-dropdown');
        this.transmissionOptions = document.getElementById('hero-transmission-options');
        this.seatsOptions = document.getElementById('hero-seats-options');
        
        if (!this.form || !window.categoryOptionsData) return;
        
        this.currentCategory = null;
        this.selectedTransmission = [];
        this.selectedSeats = [];
        
        this.init();
    }
    
    init() {
        // Set default category (first checked radio button)
        const checkedCategory = this.categoryDropdown?.querySelector('input[type="radio"]:checked');
        if (checkedCategory) {
            this.currentCategory = checkedCategory.value;
        } else {
            // Fallback to first category if none checked
            const categories = Object.keys(window.categoryOptionsData);
            if (categories.length > 0) {
                this.currentCategory = categories[0];
                // Check the first radio button
                const firstRadio = this.categoryDropdown?.querySelector('input[type="radio"]');
                if (firstRadio) {
                    firstRadio.checked = true;
                    firstRadio.closest('.cs-dropdown-checkbox-label')?.classList.add('cs-checked');
                }
            }
        }
        
        this.updateCategoryDisplay();
        this.updateFilterOptions();
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        // Category selection
        this.categoryDropdown?.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.currentCategory = e.target.value;
                    this.updateCategoryDisplay();
                    this.updateFilterOptions();
                    // Reset transmission and seats selections
                    this.selectedTransmission = [];
                    this.selectedSeats = [];
                    this.updateTransmissionDisplay();
                    this.updateSeatsDisplay();
                    
                    // Update checked state for labels
                    this.categoryDropdown.querySelectorAll('.cs-dropdown-checkbox-label').forEach(label => {
                        label.classList.remove('cs-checked');
                    });
                    e.target.closest('.cs-dropdown-checkbox-label')?.classList.add('cs-checked');
                }
            });
        });
        
        // Transmission selection - use event delegation for dynamically created checkboxes
        this.transmissionOptions?.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.handleFilterCheckbox(e.target, 'transmission', this.selectedTransmission, this.transmissionTrigger);
            }
        });
        
        // Seats selection - use event delegation for dynamically created checkboxes
        this.seatsOptions?.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.handleFilterCheckbox(e.target, 'seats', this.selectedSeats, this.seatsTrigger);
            }
        });
        
        // Dropdown triggers
        [this.categoryTrigger, this.transmissionTrigger, this.seatsTrigger].forEach(trigger => {
            trigger?.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdownId = trigger.dataset.dropdown;
                const dropdown = document.getElementById(dropdownId);
                const isOpen = dropdown?.classList.contains('cs-open');
                
                // Close all dropdowns
                document.querySelectorAll('.cs-dropdown-panel').forEach(panel => {
                    panel.classList.remove('cs-open');
                });
                document.querySelectorAll('.cs-dropdown-trigger').forEach(t => {
                    t.classList.remove('cs-open');
                });
                
                // Toggle current dropdown
                if (!isOpen && dropdown) {
                    dropdown.classList.add('cs-open');
                    trigger.classList.add('cs-open');
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.cs-dropdown-wrapper')) {
                document.querySelectorAll('.cs-dropdown-panel').forEach(panel => {
                    panel.classList.remove('cs-open');
                });
                document.querySelectorAll('.cs-dropdown-trigger').forEach(t => {
                    t.classList.remove('cs-open');
                });
            }
        });
        
        // Form submission
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSearch();
        });
    }
    
    updateCategoryDisplay() {
        if (!this.categoryTrigger || !this.currentCategory) return;
        const triggerText = this.categoryTrigger.querySelector('.cs-dropdown-text');
        if (triggerText) {
            triggerText.textContent = this.currentCategory;
        }
    }
    
    handleFilterCheckbox(checkbox, filterType, filterArray, trigger) {
        const value = checkbox.value;
        const label = checkbox.closest('.cs-dropdown-checkbox-label');
        const isAllOption = checkbox.classList.contains('cs-checkbox-all');
        const triggerText = trigger?.querySelector('.cs-dropdown-text');
        const container = checkbox.closest('.cs-dropdown-checkboxes');
        
        if (isAllOption) {
            // Handle "Visos" option
            if (checkbox.checked) {
                // Uncheck all other checkboxes in this dropdown and clear filter
                if (container) {
                    container.querySelectorAll('.cs-dropdown-checkbox').forEach(cb => {
                        if (cb !== checkbox) {
                            cb.checked = false;
                            const cbLabel = cb.closest('.cs-dropdown-checkbox-label');
                            if (cbLabel) cbLabel.classList.remove('cs-checked');
                        }
                    });
                }
                filterArray.length = 0;
                if (label) label.classList.add('cs-checked');
                if (triggerText) triggerText.textContent = checkbox.nextElementSibling.textContent;
            } else {
                if (label) label.classList.remove('cs-checked');
            }
        } else {
            // Handle regular option
            if (checkbox.checked) {
                // Uncheck "Visos" if it's checked
                if (container) {
                    const allCheckbox = container.querySelector('.cs-checkbox-all');
                    if (allCheckbox && allCheckbox.checked) {
                        allCheckbox.checked = false;
                        const allLabel = allCheckbox.closest('.cs-dropdown-checkbox-label');
                        if (allLabel) allLabel.classList.remove('cs-checked');
                    }
                }
                
                if (!filterArray.includes(value)) {
                    filterArray.push(value);
                }
                if (label) label.classList.add('cs-checked');
            } else {
                const index = filterArray.indexOf(value);
                if (index > -1) {
                    filterArray.splice(index, 1);
                }
                if (label) label.classList.remove('cs-checked');
                
                // If no filters selected, check "Visos"
                if (filterArray.length === 0) {
                    if (container) {
                        const allCheckbox = container.querySelector('.cs-checkbox-all');
                        if (allCheckbox) {
                            allCheckbox.checked = true;
                            const allLabel = allCheckbox.closest('.cs-dropdown-checkbox-label');
                            if (allLabel) {
                                allLabel.classList.add('cs-checked');
                                if (triggerText) triggerText.textContent = allCheckbox.nextElementSibling.textContent;
                            }
                        }
                    }
                }
            }
            
            // Update trigger text
            if (triggerText) {
                const selectedCount = filterArray.length;
                if (selectedCount === 0) {
                    const allCheckbox = container?.querySelector('.cs-checkbox-all');
                    if (allCheckbox) {
                        triggerText.textContent = allCheckbox.nextElementSibling.textContent;
                    }
                } else if (selectedCount === 1) {
                    triggerText.textContent = filterArray[0];
                } else {
                    triggerText.textContent = `Pasirinkta: ${selectedCount}`;
                }
            }
        }
    }
    
    updateTransmissionDisplay() {
        if (!this.transmissionTrigger) return;
        const triggerText = this.transmissionTrigger.querySelector('.cs-dropdown-text');
        if (triggerText) {
            const selectedCount = this.selectedTransmission.length;
            if (selectedCount === 0) {
                triggerText.textContent = 'Visos';
            } else if (selectedCount === 1) {
                triggerText.textContent = this.selectedTransmission[0];
            } else {
                triggerText.textContent = `Pasirinkta: ${selectedCount}`;
            }
        }
    }
    
    updateSeatsDisplay() {
        if (!this.seatsTrigger) return;
        const triggerText = this.seatsTrigger.querySelector('.cs-dropdown-text');
        if (triggerText) {
            const selectedCount = this.selectedSeats.length;
            if (selectedCount === 0) {
                triggerText.textContent = 'Visos';
            } else if (selectedCount === 1) {
                triggerText.textContent = this.selectedSeats[0];
            } else {
                triggerText.textContent = `Pasirinkta: ${selectedCount}`;
            }
        }
    }
    
    updateFilterOptions() {
        if (!this.currentCategory || !window.categoryOptionsData[this.currentCategory]) return;
        
        const categoryData = window.categoryOptionsData[this.currentCategory];
        
        // Update transmission options
        if (this.transmissionOptions) {
            const allCheckbox = `
                <label class="cs-dropdown-checkbox-label cs-checked">
                    <input type="checkbox" class="cs-dropdown-checkbox cs-checkbox-all" value="" checked>
                    <span>Visos</span>
                </label>
            `;
            
            const transmissionOptions = categoryData.transmissions.map(transmission => `
                <label class="cs-dropdown-checkbox-label">
                    <input type="checkbox" class="cs-dropdown-checkbox" value="${transmission}">
                    <span>${transmission}</span>
                </label>
            `).join('');
            
            this.transmissionOptions.innerHTML = allCheckbox + transmissionOptions;
        }
        
        // Update seats options
        if (this.seatsOptions) {
            const allCheckbox = `
                <label class="cs-dropdown-checkbox-label cs-checked">
                    <input type="checkbox" class="cs-dropdown-checkbox cs-checkbox-all" value="" checked>
                    <span>Visos</span>
                </label>
            `;
            
            const seatsOptions = categoryData.seats.map(seat => `
                <label class="cs-dropdown-checkbox-label">
                    <input type="checkbox" class="cs-dropdown-checkbox" value="${seat}">
                    <span>${seat}</span>
                </label>
            `).join('');
            
            this.seatsOptions.innerHTML = allCheckbox + seatsOptions;
        }
        
        // Reset selections
        this.selectedTransmission = [];
        this.selectedSeats = [];
        this.updateTransmissionDisplay();
        this.updateSeatsDisplay();
    }
    
    handleSearch() {
        if (!this.currentCategory || !window.categoryOptionsData[this.currentCategory]) return;
        
        const categoryData = window.categoryOptionsData[this.currentCategory];
        const categoryUrl = categoryData.url;
        
        // Build URL with query parameters
        const params = new URLSearchParams();
        if (this.selectedTransmission.length > 0) {
            // For multiple selections, join with comma or use first one
            // Using first selection for simplicity (can be extended to support multiple)
            params.append('transmission', this.selectedTransmission[0]);
        }
        if (this.selectedSeats.length > 0) {
            // For multiple selections, join with comma or use first one
            // Using first selection for simplicity (can be extended to support multiple)
            params.append('seats', this.selectedSeats[0]);
        }
        
        const queryString = params.toString();
        const finalUrl = queryString ? `${categoryUrl}?${queryString}` : categoryUrl;
        
        // Navigate to category page
        window.location.href = finalUrl;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new HeroCarSearch());
} else {
    new HeroCarSearch();
}


/**
 * Car Filters Module
 * Handles filtering and sorting of cars in category pages
 */

class CarFilters {
    constructor() {
        this.carsList = document.getElementById('cars-list');
        this.filtersPanel = document.getElementById('filters-panel');
        this.clearFiltersBtn = document.getElementById('clear-filters');
        this.sortSelect = document.getElementById('sort-select');
        this.sortTrigger = document.getElementById('sort-trigger');
        this.sortDropdown = document.getElementById('sort-dropdown');
        this.filterToggleBtn = document.getElementById('filter-toggle-btn');
        this.resultsCount = document.getElementById('results-count');
        this.totalCount = document.getElementById('total-count');
        this.activeFiltersContainer = document.getElementById('active-filters');
        this.currentSortValue = 'default';
        
        if (!this.carsList) return; // Exit if not on a car category page
        
        this.cars = Array.from(this.carsList.querySelectorAll('.cs-item'));
        this.filters = {
            priceMin: null,
            priceMax: null,
            brand: [],
            transmission: [],
            fuelType: [],
            yearMin: null,
            yearMax: null,
            seats: [],
            powerMin: null,
            powerMax: null,
            engineMin: null,
            engineMax: null,
            airConditioning: false,
            navigation: false,
            bluetooth: false,
            category: []
        };
        
        this.init();
    }
    
    init() {
        this.populateFilterOptions();
        this.attachEventListeners();
        // Apply URL parameters if present
        this.applyUrlParameters();
        // Update results with correct filter state
        this.updateResults();
        // Apply sort from URL if present (after filtering)
        this.applySortFromUrl();
    }
    
    applyUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Apply brand filter (supports multiple values comma-separated)
        const brandParam = urlParams.get('brand');
        if (brandParam) {
            const brandValues = brandParam.split(',').map(v => v.trim()).filter(v => v);
            brandValues.forEach(brandValue => {
                const checkbox = document.querySelector(`.cs-dropdown-checkbox[data-filter="brand"][value="${brandValue}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    const label = checkbox.closest('.cs-dropdown-checkbox-label');
                    if (label) label.classList.add('cs-checked');
                    
                    if (!this.filters.brand.includes(brandValue)) {
                        this.filters.brand.push(brandValue);
                    }
                }
            });
            
            if (brandValues.length > 0) {
                // Uncheck "Visos" option
                const allCheckbox = document.querySelector('.cs-dropdown-checkbox[data-filter="brand"].cs-checkbox-all');
                if (allCheckbox) {
                    allCheckbox.checked = false;
                    allCheckbox.closest('.cs-dropdown-checkbox-label')?.classList.remove('cs-checked');
                }
                
                // Update trigger text
                const trigger = document.querySelector('[data-dropdown="brand-dropdown"]');
                const triggerText = trigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    if (brandValues.length === 1) {
                        triggerText.textContent = brandValues[0];
                    } else {
                        triggerText.textContent = `Pasirinkta: ${brandValues.length}`;
                    }
                }
            }
        }
        
        // Apply transmission filter (supports multiple values comma-separated)
        const transmissionParam = urlParams.get('transmission');
        if (transmissionParam) {
            const transmissionValues = transmissionParam.split(',').map(v => v.trim()).filter(v => v);
            transmissionValues.forEach(transmissionValue => {
                const checkbox = document.querySelector(`.cs-dropdown-checkbox[data-filter="transmission"][value="${transmissionValue}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    const label = checkbox.closest('.cs-dropdown-checkbox-label');
                    if (label) label.classList.add('cs-checked');
                    
                    if (!this.filters.transmission.includes(transmissionValue)) {
                        this.filters.transmission.push(transmissionValue);
                    }
                }
            });
            
            if (transmissionValues.length > 0) {
                // Uncheck "Visos" option
                const allCheckbox = document.querySelector('.cs-dropdown-checkbox[data-filter="transmission"].cs-checkbox-all');
                if (allCheckbox) {
                    allCheckbox.checked = false;
                    allCheckbox.closest('.cs-dropdown-checkbox-label')?.classList.remove('cs-checked');
                }
                
                // Update trigger text
                const trigger = document.querySelector('[data-dropdown="transmission-dropdown"]');
                const triggerText = trigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    if (transmissionValues.length === 1) {
                        triggerText.textContent = transmissionValues[0];
                    } else {
                        triggerText.textContent = `Pasirinkta: ${transmissionValues.length}`;
                    }
                }
            }
        }
        
        // Apply fuel type filter (supports multiple values comma-separated)
        const fuelTypeParam = urlParams.get('fuelType');
        if (fuelTypeParam) {
            const fuelTypeValues = fuelTypeParam.split(',').map(v => v.trim()).filter(v => v);
            fuelTypeValues.forEach(fuelTypeValue => {
                const checkbox = document.querySelector(`.cs-dropdown-checkbox[data-filter="fuelType"][value="${fuelTypeValue}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    const label = checkbox.closest('.cs-dropdown-checkbox-label');
                    if (label) label.classList.add('cs-checked');
                    
                    if (!this.filters.fuelType.includes(fuelTypeValue)) {
                        this.filters.fuelType.push(fuelTypeValue);
                    }
                }
            });
            
            if (fuelTypeValues.length > 0) {
                // Uncheck "Visi" option
                const allCheckbox = document.querySelector('.cs-dropdown-checkbox[data-filter="fuelType"].cs-checkbox-all');
                if (allCheckbox) {
                    allCheckbox.checked = false;
                    allCheckbox.closest('.cs-dropdown-checkbox-label')?.classList.remove('cs-checked');
                }
                
                // Update trigger text
                const trigger = document.querySelector('[data-dropdown="fuel-dropdown"]');
                const triggerText = trigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    if (fuelTypeValues.length === 1) {
                        triggerText.textContent = fuelTypeValues[0];
                    } else {
                        triggerText.textContent = `Pasirinkta: ${fuelTypeValues.length}`;
                    }
                }
            }
        }
        
        // Apply seats filter (supports multiple values comma-separated)
        const seatsParam = urlParams.get('seats');
        if (seatsParam) {
            const seatsValues = seatsParam.split(',').map(v => v.trim()).filter(v => v);
            seatsValues.forEach(seatsValue => {
                const checkbox = document.querySelector(`.cs-dropdown-checkbox[data-filter="seats"][value="${seatsValue}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    const label = checkbox.closest('.cs-dropdown-checkbox-label');
                    if (label) label.classList.add('cs-checked');
                    
                    if (!this.filters.seats.includes(seatsValue)) {
                        this.filters.seats.push(seatsValue);
                    }
                }
            });
            
            if (seatsValues.length > 0) {
                // Uncheck "Visos" option
                const allCheckbox = document.querySelector('.cs-dropdown-checkbox[data-filter="seats"].cs-checkbox-all');
                if (allCheckbox) {
                    allCheckbox.checked = false;
                    allCheckbox.closest('.cs-dropdown-checkbox-label')?.classList.remove('cs-checked');
                }
                
                // Update trigger text
                const trigger = document.querySelector('[data-dropdown="seats-dropdown"]');
                const triggerText = trigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    if (seatsValues.length === 1) {
                        triggerText.textContent = seatsValues[0];
                    } else {
                        triggerText.textContent = `Pasirinkta: ${seatsValues.length}`;
                    }
                }
            }
        }
        
        // Apply category filter (supports multiple values comma-separated)
        const categoryParam = urlParams.get('category');
        if (categoryParam) {
            const categoryValues = categoryParam.split(',').map(v => v.trim()).filter(v => v);
            categoryValues.forEach(categoryValue => {
                const checkbox = document.querySelector(`.cs-dropdown-checkbox[data-filter="category"][value="${categoryValue}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    const label = checkbox.closest('.cs-dropdown-checkbox-label');
                    if (label) label.classList.add('cs-checked');
                    
                    if (!this.filters.category.includes(categoryValue)) {
                        this.filters.category.push(categoryValue);
                    }
                }
            });
            
            if (categoryValues.length > 0) {
                // Uncheck "Visos" option
                const allCheckbox = document.querySelector('.cs-dropdown-checkbox[data-filter="category"].cs-checkbox-all');
                if (allCheckbox) {
                    allCheckbox.checked = false;
                    allCheckbox.closest('.cs-dropdown-checkbox-label')?.classList.remove('cs-checked');
                }
                
                // Update trigger text
                const trigger = document.querySelector('[data-dropdown="category-dropdown"]');
                const triggerText = trigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    if (categoryValues.length === 1) {
                        triggerText.textContent = categoryValues[0];
                    } else {
                        triggerText.textContent = `Pasirinkta: ${categoryValues.length}`;
                    }
                }
            }
        }
    }
    
    applySortFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const sortParam = urlParams.get('sort');
        if (sortParam) {
            const sortValue = sortParam;
            // Find the corresponding label
            const sortLabel = this.sortDropdown?.querySelector(`[data-sort-value="${sortValue}"]`);
            if (sortLabel) {
                // Update current sort value
                this.currentSortValue = sortValue;
                
                // Apply the sort (but don't update URL again to avoid loop)
                const visibleCars = Array.from(this.carsList.querySelectorAll('.cs-item:not(.cs-hidden)'));
                
                visibleCars.sort((a, b) => {
                    switch(sortValue) {
                        case 'price-asc':
                            return (parseInt(a.dataset.price) || 0) - (parseInt(b.dataset.price) || 0);
                        case 'price-desc':
                            return (parseInt(b.dataset.price) || 0) - (parseInt(a.dataset.price) || 0);
                        case 'year-desc':
                            return (parseInt(b.dataset.year) || 0) - (parseInt(a.dataset.year) || 0);
                        case 'year-asc':
                            return (parseInt(a.dataset.year) || 0) - (parseInt(b.dataset.year) || 0);
                        case 'power-desc':
                            return (parseInt(b.dataset.power) || 0) - (parseInt(a.dataset.power) || 0);
                        case 'power-asc':
                            return (parseInt(a.dataset.power) || 0) - (parseInt(b.dataset.power) || 0);
                        default:
                            return 0;
                    }
                });
                
                // Reorder in DOM
                visibleCars.forEach(car => this.carsList.appendChild(car));
                
                // Update trigger text
                const triggerText = this.sortTrigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    if (sortValue === 'default') {
                        triggerText.textContent = 'Rikiavimas';
                    } else {
                        const selectedText = sortLabel.querySelector('span').textContent;
                        triggerText.textContent = selectedText;
                    }
                }
                
                // Update active state
                const sortLabels = this.sortDropdown?.querySelectorAll('.cs-dropdown-checkbox-label');
                if (sortLabels) {
                    sortLabels.forEach(l => l.classList.remove('cs-checked'));
                    sortLabel.classList.add('cs-checked');
                }
            }
        }
    }
    
    updateUrlParameters() {
        const url = new URL(window.location);
        const params = url.searchParams;
        
        // Update brand parameter
        if (this.filters.brand.length > 0) {
            params.set('brand', this.filters.brand.join(','));
        } else {
            params.delete('brand');
        }
        
        // Update transmission parameter
        if (this.filters.transmission.length > 0) {
            params.set('transmission', this.filters.transmission.join(','));
        } else {
            params.delete('transmission');
        }
        
        // Update fuel type parameter
        if (this.filters.fuelType.length > 0) {
            params.set('fuelType', this.filters.fuelType.join(','));
        } else {
            params.delete('fuelType');
        }
        
        // Update seats parameter
        if (this.filters.seats.length > 0) {
            params.set('seats', this.filters.seats.join(','));
        } else {
            params.delete('seats');
        }
        
        // Update category parameter
        if (this.filters.category.length > 0) {
            params.set('category', this.filters.category.join(','));
        } else {
            params.delete('category');
        }
        
        // Update sort parameter
        if (this.currentSortValue && this.currentSortValue !== 'default') {
            params.set('sort', this.currentSortValue);
        } else {
            params.delete('sort');
        }
        
        // Update URL without page reload
        window.history.replaceState({}, '', url.toString());
    }
    
    populateFilterOptions() {
        // Collect unique values from cars
        const brands = new Set();
        const transmissions = new Set();
        const fuelTypes = new Set();
        const seats = new Set();
        const categories = new Set();

        this.cars.forEach(car => {
            const brand = car.dataset.brand?.trim();
            const transmission = car.dataset.transmission?.trim();
            const fuelType = car.dataset.fuelType?.trim();
            const seat = car.dataset.seats?.trim();
            const category = car.dataset.category?.trim();

            if (brand) brands.add(brand);
            if (transmission) transmissions.add(transmission);
            if (fuelType) fuelTypes.add(fuelType);
            if (seat) seats.add(seat);
            if (category) categories.add(category);
        });

        // Populate dropdown filters with checkboxes
        this.populateDropdownCheckboxes('brand-dropdown', Array.from(brands).sort(), 'brand', 'Visos');
        this.populateDropdownCheckboxes('transmission-dropdown', Array.from(transmissions).sort(), 'transmission', 'Visos');
        this.populateDropdownCheckboxes('fuel-dropdown', Array.from(fuelTypes).sort(), 'fuelType', 'Visi');
        this.populateDropdownCheckboxes('seats-dropdown', Array.from(seats).sort((a, b) => parseInt(a) - parseInt(b)), 'seats', 'Visos');
        
        // Only populate category dropdown if it exists (for /automobiliai/ page)
        const categoryDropdown = document.getElementById('category-dropdown');
        if (categoryDropdown) {
            this.populateDropdownCheckboxes('category-dropdown', Array.from(categories).sort(), 'category', 'Visos');
        }
    }
    
    populateDropdownCheckboxes(dropdownId, values, filterType, allLabel) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;
        
        const checkboxesContainer = dropdown.querySelector('.cs-dropdown-checkboxes');
        if (!checkboxesContainer) return;
        
        // Add "Visos/Visi" option first (checked by default)
        const allCheckbox = `
            <label class="cs-dropdown-checkbox-label cs-checked">
                <input type="checkbox" class="cs-dropdown-checkbox cs-checkbox-all" data-filter="${filterType}" value="" data-all="true" checked>
                <span>${allLabel}</span>
            </label>
        `;
        
        // Add other options
        const otherOptions = values.map(value => `
            <label class="cs-dropdown-checkbox-label">
                <input type="checkbox" class="cs-dropdown-checkbox" data-filter="${filterType}" value="${value}">
                <span>${value}</span>
            </label>
        `).join('');
        
        checkboxesContainer.innerHTML = allCheckbox + otherOptions;
        
        // Attach event listeners
        checkboxesContainer.querySelectorAll('.cs-dropdown-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.handleDropdownCheckboxFilter(checkbox));
        });
    }
    
    attachEventListeners() {
        // Dropdown triggers
        document.querySelectorAll('.cs-dropdown-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdownId = trigger.dataset.dropdown;
                const dropdown = document.getElementById(dropdownId);
                const isOpen = dropdown.classList.contains('cs-open');
                
                // Close all dropdowns
                document.querySelectorAll('.cs-dropdown-panel').forEach(panel => {
                    panel.classList.remove('cs-open');
                });
                document.querySelectorAll('.cs-dropdown-trigger').forEach(t => {
                    t.classList.remove('cs-open');
                });
                
                // Toggle current dropdown
                if (!isOpen) {
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
        
        // Clear filters button
        if (this.clearFiltersBtn) {
            this.clearFiltersBtn.addEventListener('click', () => this.clearAllFilters());
        }
        
        // Filter toggle button
        if (this.filterToggleBtn && this.filtersPanel) {
            const toggleFilters = () => {
                const isExpanded = this.filterToggleBtn.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    this.filtersPanel.classList.remove('cs-open');
                    this.filterToggleBtn.setAttribute('aria-expanded', 'false');
                } else {
                    this.filtersPanel.classList.add('cs-open');
                    this.filterToggleBtn.setAttribute('aria-expanded', 'true');
                }
            };
            
            this.filterToggleBtn.addEventListener('click', toggleFilters);
            this.filterToggleBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFilters();
                }
            });
        }
        
        // Sort dropdown (custom)
        if (this.sortDropdown) {
            const sortLabels = this.sortDropdown.querySelectorAll('.cs-dropdown-checkbox-label');
            sortLabels.forEach(label => {
                label.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const sortValue = label.dataset.sortValue || 'default';
                    this.handleSort(sortValue);
                    
                    // Update trigger text
                    const triggerText = this.sortTrigger?.querySelector('.cs-dropdown-text');
                    if (triggerText) {
                        // If default option is selected, show "Rikiavimas", otherwise show the selected option text
                        if (sortValue === 'default') {
                            triggerText.textContent = 'Rikiavimas';
                        } else {
                            const selectedText = label.querySelector('span').textContent;
                            triggerText.textContent = selectedText;
                        }
                    }
                    
                    // Update active state
                    sortLabels.forEach(l => l.classList.remove('cs-checked'));
                    label.classList.add('cs-checked');
                    
                    // Close dropdown
                    this.sortDropdown.classList.remove('cs-open');
                    this.sortTrigger?.classList.remove('cs-open');
                });
            });
            
            // Set default as checked
            const defaultLabel = this.sortDropdown.querySelector('[data-sort-value="default"]');
            if (defaultLabel) {
                defaultLabel.classList.add('cs-checked');
                // Set initial trigger text to "Rikiavimas"
                const triggerText = this.sortTrigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    triggerText.textContent = 'Rikiavimas';
                }
            }
        }
    }
    
    setupRangeSliders(minSlider, maxSlider, minDisplayId, maxDisplayId, callback) {
        const minDisplay = document.getElementById(minDisplayId);
        const maxDisplay = document.getElementById(maxDisplayId);
        const container = minSlider.closest('.cs-range-slider-container');
        
        const updateDisplay = () => {
            if (minDisplay) minDisplay.textContent = minSlider.value;
            if (maxDisplay) maxDisplay.textContent = maxSlider.value;
        };
        
        const updateTrack = () => {
            if (!container) return;
            
            const min = parseInt(minSlider.value);
            const max = parseInt(maxSlider.value);
            const minRange = parseInt(minSlider.min);
            const maxRange = parseInt(maxSlider.max);
            
            const minPercent = ((min - minRange) / (maxRange - minRange)) * 100;
            const maxPercent = ((max - minRange) / (maxRange - minRange)) * 100;
            
            container.style.setProperty('--min-percent', `${minPercent}%`);
            container.style.setProperty('--max-percent', `${maxPercent}%`);
        };
        
        minSlider.addEventListener('input', () => {
            const min = parseInt(minSlider.value);
            const max = parseInt(maxSlider.value);
            if (min > max) {
                minSlider.value = max;
            }
            updateDisplay();
            updateTrack();
            callback();
        });
        
        maxSlider.addEventListener('input', () => {
            const min = parseInt(minSlider.value);
            const max = parseInt(maxSlider.value);
            if (max < min) {
                maxSlider.value = min;
            }
            updateDisplay();
            updateTrack();
            callback();
        });
        
        // Initial display and track update
        updateDisplay();
        updateTrack();
    }
    
    handlePriceFilter() {
        const priceMin = document.getElementById('price-min');
        const priceMax = document.getElementById('price-max');
        
        const minVal = priceMin?.value ? parseInt(priceMin.value) : 0;
        const maxVal = priceMax?.value ? parseInt(priceMax.value) : 500;
        const minRange = priceMin ? parseInt(priceMin.min) : 0;
        const maxRange = priceMax ? parseInt(priceMax.max) : 500;
        
        this.filters.priceMin = (minVal > minRange) ? minVal : null;
        this.filters.priceMax = (maxVal < maxRange) ? maxVal : null;
        
        this.updateResults();
    }
    
    handleYearFilter() {
        const yearMin = document.getElementById('year-min');
        const yearMax = document.getElementById('year-max');
        
        const minVal = yearMin?.value ? parseInt(yearMin.value) : 2000;
        const maxVal = yearMax?.value ? parseInt(yearMax.value) : 2030;
        const minRange = yearMin ? parseInt(yearMin.min) : 2000;
        const maxRange = yearMax ? parseInt(yearMax.max) : 2030;
        
        this.filters.yearMin = (minVal > minRange) ? minVal : null;
        this.filters.yearMax = (maxVal < maxRange) ? maxVal : null;
        
        this.updateResults();
    }
    
    handlePowerFilter() {
        const powerMin = document.getElementById('power-min');
        const powerMax = document.getElementById('power-max');
        
        const minVal = powerMin?.value ? parseInt(powerMin.value) : 0;
        const maxVal = powerMax?.value ? parseInt(powerMax.value) : 300;
        const minRange = powerMin ? parseInt(powerMin.min) : 0;
        const maxRange = powerMax ? parseInt(powerMax.max) : 300;
        
        this.filters.powerMin = (minVal > minRange) ? minVal : null;
        this.filters.powerMax = (maxVal < maxRange) ? maxVal : null;
        
        this.updateResults();
    }
    
    handleEngineFilter() {
        const engineMin = document.getElementById('engine-min');
        const engineMax = document.getElementById('engine-max');
        
        const minVal = engineMin?.value ? parseInt(engineMin.value) : 0;
        const maxVal = engineMax?.value ? parseInt(engineMax.value) : 5000;
        const minRange = engineMin ? parseInt(engineMin.min) : 0;
        const maxRange = engineMax ? parseInt(engineMax.max) : 5000;
        
        this.filters.engineMin = (minVal > minRange) ? minVal : null;
        this.filters.engineMax = (maxVal < maxRange) ? maxVal : null;
        
        this.updateResults();
    }
    
    handleDropdownCheckboxFilter(checkbox) {
        const filterType = checkbox.dataset.filter;
        const value = checkbox.value;
        const label = checkbox.closest('.cs-dropdown-checkbox-label');
        const isAllOption = checkbox.dataset.all === 'true';
        const trigger = checkbox.closest('.cs-dropdown-wrapper')?.querySelector('.cs-dropdown-trigger');
        const triggerText = trigger?.querySelector('.cs-dropdown-text');
        
        if (!this.filters[filterType]) {
            this.filters[filterType] = [];
        }
        
        if (isAllOption) {
            // Handle "Visos/Visi" option
            if (checkbox.checked) {
                // Uncheck all other checkboxes in this dropdown and clear filter
                const container = checkbox.closest('.cs-dropdown-checkboxes');
                if (container) {
                    container.querySelectorAll('.cs-dropdown-checkbox').forEach(cb => {
                        if (cb !== checkbox) {
                            cb.checked = false;
                            const cbLabel = cb.closest('.cs-dropdown-checkbox-label');
                            if (cbLabel) cbLabel.classList.remove('cs-checked');
                        }
                    });
                }
                this.filters[filterType] = [];
                if (label) label.classList.add('cs-checked');
                if (triggerText) triggerText.textContent = checkbox.nextElementSibling.textContent;
            } else {
                if (label) label.classList.remove('cs-checked');
            }
        } else {
            // Handle regular option
            if (checkbox.checked) {
                // Uncheck "Visos/Visi" if it's checked
                const container = checkbox.closest('.cs-dropdown-checkboxes');
                if (container) {
                    const allCheckbox = container.querySelector('.cs-checkbox-all');
                    if (allCheckbox && allCheckbox.checked) {
                        allCheckbox.checked = false;
                        const allLabel = allCheckbox.closest('.cs-dropdown-checkbox-label');
                        if (allLabel) allLabel.classList.remove('cs-checked');
                    }
                }
                
                if (!this.filters[filterType].includes(value)) {
                    this.filters[filterType].push(value);
                }
                if (label) label.classList.add('cs-checked');
            } else {
                this.filters[filterType] = this.filters[filterType].filter(v => v !== value);
                if (label) label.classList.remove('cs-checked');
                
                // If no filters selected, check "Visos/Visi"
                if (this.filters[filterType].length === 0) {
                    const container = checkbox.closest('.cs-dropdown-checkboxes');
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
                const selectedCount = this.filters[filterType].length;
                if (selectedCount === 0) {
                    const allCheckbox = checkbox.closest('.cs-dropdown-checkboxes')?.querySelector('.cs-checkbox-all');
                    if (allCheckbox) {
                        triggerText.textContent = allCheckbox.nextElementSibling.textContent;
                    }
                } else if (selectedCount === 1) {
                    triggerText.textContent = this.filters[filterType][0];
                } else {
                    triggerText.textContent = `Pasirinkta: ${selectedCount}`;
                }
            }
        }
        
        this.updateResults();
        this.updateUrlParameters();
    }
    
    handleSort(sortValue) {
        this.currentSortValue = sortValue;
        
        const visibleCars = Array.from(this.carsList.querySelectorAll('.cs-item:not(.cs-hidden)'));
        
        visibleCars.sort((a, b) => {
            switch(sortValue) {
                case 'price-asc':
                    return (parseInt(a.dataset.price) || 0) - (parseInt(b.dataset.price) || 0);
                case 'price-desc':
                    return (parseInt(b.dataset.price) || 0) - (parseInt(a.dataset.price) || 0);
                case 'year-desc':
                    return (parseInt(b.dataset.year) || 0) - (parseInt(a.dataset.year) || 0);
                case 'year-asc':
                    return (parseInt(a.dataset.year) || 0) - (parseInt(b.dataset.year) || 0);
                case 'power-desc':
                    return (parseInt(b.dataset.power) || 0) - (parseInt(a.dataset.power) || 0);
                case 'power-asc':
                    return (parseInt(a.dataset.power) || 0) - (parseInt(b.dataset.power) || 0);
                default:
                    return 0;
            }
        });
        
        // Reorder in DOM
        visibleCars.forEach(car => this.carsList.appendChild(car));
        
        // Update URL parameters
        this.updateUrlParameters();
    }
    
    matchesFilters(car) {
        // Brand filter
        if (this.filters.brand.length > 0) {
            const brand = car.dataset.brand?.trim();
            if (!brand || !this.filters.brand.includes(brand)) return false;
        }
        
        // Transmission filter
        if (this.filters.transmission.length > 0) {
            const transmission = car.dataset.transmission?.trim();
            if (!transmission || !this.filters.transmission.includes(transmission)) return false;
        }
        
        // Fuel type filter
        if (this.filters.fuelType.length > 0) {
            const fuelType = car.dataset.fuelType?.trim();
            if (!fuelType || !this.filters.fuelType.includes(fuelType)) return false;
        }
        
        // Seats filter
        if (this.filters.seats.length > 0) {
            const seats = car.dataset.seats?.trim();
            if (!seats || !this.filters.seats.includes(seats)) return false;
        }
        
        // Category filter
        if (this.filters.category.length > 0) {
            const category = car.dataset.category?.trim();
            if (!category || !this.filters.category.includes(category)) return false;
        }
        
        return true;
    }
    
    updateResults() {
        let visibleCount = 0;
        
        // Make sure cars array is up to date
        if (!this.cars || this.cars.length === 0) {
            this.cars = Array.from(this.carsList.querySelectorAll('.cs-item'));
        }
        
        this.cars.forEach(car => {
            if (this.matchesFilters(car)) {
                car.classList.remove('cs-hidden');
                visibleCount++;
            } else {
                car.classList.add('cs-hidden');
            }
        });
        
        // Update results count
        if (this.resultsCount) {
            this.resultsCount.textContent = visibleCount;
        }
        
        // Update total count
        if (this.totalCount) {
            this.totalCount.textContent = this.cars.length;
        }
        
        // Update active filters display
        this.updateActiveFilters();
        
        // Show/hide empty state
        this.showEmptyState(visibleCount === 0);
    }
    
    updateActiveFilters() {
        if (!this.activeFiltersContainer) return;
        
        const activeFilters = [];
        
        // Brand
        this.filters.brand.forEach(brand => {
            activeFilters.push({ type: 'brand', value: brand, label: `Markė: ${brand}` });
        });
        
        // Transmission
        this.filters.transmission.forEach(transmission => {
            activeFilters.push({ type: 'transmission', value: transmission, label: `Pavarų dėžė: ${transmission}` });
        });
        
        // Fuel type
        this.filters.fuelType.forEach(fuelType => {
            activeFilters.push({ type: 'fuelType', value: fuelType, label: `Kuro tipas: ${fuelType}` });
        });
        
        // Seats
        this.filters.seats.forEach(seats => {
            activeFilters.push({ type: 'seats', value: seats, label: `Vietos: ${seats}` });
        });
        
        // Category
        this.filters.category.forEach(category => {
            activeFilters.push({ type: 'category', value: category, label: `Kategorija: ${category}` });
        });
        
        if (activeFilters.length === 0) {
            this.activeFiltersContainer.innerHTML = '';
            this.activeFiltersContainer.classList.remove('cs-has-filters');
            return;
        }
        
        this.activeFiltersContainer.classList.add('cs-has-filters');
        this.activeFiltersContainer.innerHTML = `
            <div class="cs-active-filters-content">
                <span class="cs-active-label">Aktyvūs filtrai:</span>
                <div class="cs-filter-chips">
                    ${activeFilters.map(filter => `
                        <span class="cs-filter-chip">
                            ${filter.label}
                            <button class="cs-filter-chip-remove" data-filter-type="${filter.type}" data-filter-value="${filter.value || ''}" aria-label="Pašalinti filtrą">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </button>
                        </span>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Attach remove listeners
        this.activeFiltersContainer.querySelectorAll('.cs-filter-chip-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.dataset.filterType;
                const filterValue = btn.dataset.filterValue;
                this.removeFilter(filterType, filterValue);
            });
        });
    }
    
    removeFilter(filterType, filterValue) {
        if (filterType === 'brand' || filterType === 'transmission' || filterType === 'fuelType' || filterType === 'seats' || filterType === 'category') {
            // Handle dropdown checkbox filters
            this.filters[filterType] = this.filters[filterType].filter(v => v !== filterValue);
            const checkbox = document.querySelector(`.cs-dropdown-checkbox[data-filter="${filterType}"][value="${filterValue}"]`);
            if (checkbox) {
                checkbox.checked = false;
                const label = checkbox.closest('.cs-dropdown-checkbox-label');
                if (label) label.classList.remove('cs-checked');
            }
            
            // If no filters selected, check "Visos/Visi"
            if (this.filters[filterType].length === 0) {
                const container = checkbox?.closest('.cs-dropdown-checkboxes');
                if (container) {
                    const allCheckbox = container.querySelector('.cs-checkbox-all');
                    const trigger = container.closest('.cs-dropdown-wrapper')?.querySelector('.cs-dropdown-trigger');
                    const triggerText = trigger?.querySelector('.cs-dropdown-text');
                    if (allCheckbox) {
                        allCheckbox.checked = true;
                        const allLabel = allCheckbox.closest('.cs-dropdown-checkbox-label');
                        if (allLabel) {
                            allLabel.classList.add('cs-checked');
                            if (triggerText) triggerText.textContent = allCheckbox.nextElementSibling.textContent;
                        }
                    }
                }
            } else {
                // Update trigger text
                const trigger = checkbox?.closest('.cs-dropdown-wrapper')?.querySelector('.cs-dropdown-trigger');
                const triggerText = trigger?.querySelector('.cs-dropdown-text');
                if (triggerText) {
                    const selectedCount = this.filters[filterType].length;
                    if (selectedCount === 1) {
                        triggerText.textContent = this.filters[filterType][0];
                    } else {
                        triggerText.textContent = `Pasirinkta: ${selectedCount}`;
                    }
                }
            }
        }
        
        this.updateResults();
        this.updateUrlParameters();
    }
    
    updateSliderDisplay(minDisplayId, maxDisplayId, minSlider, maxSlider) {
        const minDisplay = document.getElementById(minDisplayId);
        const maxDisplay = document.getElementById(maxDisplayId);
        if (minDisplay && minSlider) minDisplay.textContent = minSlider.value;
        if (maxDisplay && maxSlider) maxDisplay.textContent = maxSlider.value;
    }
    
    updateSliderTrack(minSlider, maxSlider) {
        if (!minSlider || !maxSlider) return;
        const container = minSlider.closest('.cs-range-slider-container');
        if (!container) return;
        
        const min = parseInt(minSlider.value);
        const max = parseInt(maxSlider.value);
        const minRange = parseInt(minSlider.min);
        const maxRange = parseInt(maxSlider.max);
        
        const minPercent = ((min - minRange) / (maxRange - minRange)) * 100;
        const maxPercent = ((max - minRange) / (maxRange - minRange)) * 100;
        
        container.style.setProperty('--min-percent', `${minPercent}%`);
        container.style.setProperty('--max-percent', `${maxPercent}%`);
    }
    
    clearAllFilters() {
        // Check if there are any active filters before clearing
        const hasActiveFilters = this.filters.brand.length > 0 || 
                                 this.filters.transmission.length > 0 || 
                                 this.filters.fuelType.length > 0 || 
                                 this.filters.seats.length > 0 ||
                                 this.filters.category.length > 0;
        
        // If there are no active filters, close the filters panel
        if (!hasActiveFilters && this.filtersPanel && this.filterToggleBtn) {
            this.filtersPanel.classList.remove('cs-open');
            this.filterToggleBtn.setAttribute('aria-expanded', 'false');
            return;
        }
        
        // Clear dropdown checkboxes - check "Visos/Visi" options and uncheck others
        const dropdownIds = ['brand-dropdown', 'transmission-dropdown', 'fuel-dropdown', 'seats-dropdown', 'category-dropdown'];
        dropdownIds.forEach(dropdownId => {
            const dropdown = document.getElementById(dropdownId);
            if (dropdown) {
                const allCheckbox = dropdown.querySelector('.cs-checkbox-all');
                const otherCheckboxes = dropdown.querySelectorAll('.cs-dropdown-checkbox:not(.cs-checkbox-all)');
                const trigger = dropdown.closest('.cs-dropdown-wrapper')?.querySelector('.cs-dropdown-trigger');
                const triggerText = trigger?.querySelector('.cs-dropdown-text');
                
                if (allCheckbox) {
                    allCheckbox.checked = true;
                    const allLabel = allCheckbox.closest('.cs-dropdown-checkbox-label');
                    if (allLabel) allLabel.classList.add('cs-checked');
                    if (triggerText) triggerText.textContent = allCheckbox.nextElementSibling.textContent;
                }
                
                otherCheckboxes.forEach(cb => {
                    cb.checked = false;
                    const label = cb.closest('.cs-dropdown-checkbox-label');
                    if (label) label.classList.remove('cs-checked');
                });
            }
        });
        
        // Reset sort
        if (this.sortSelect) {
            this.sortSelect.value = 'default';
        }
        
        // Reset filters object
        this.filters = {
            brand: [],
            transmission: [],
            fuelType: [],
            seats: [],
            category: []
        };
        
        this.updateResults();
        this.updateUrlParameters();
    }
    
    showEmptyState(show) {
        let emptyState = document.getElementById('no-results-message');
        
        if (show) {
            // Hide the cars list
            if (this.carsList) {
                this.carsList.style.display = 'none';
            }
            
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.id = 'no-results-message';
                emptyState.className = 'cs-no-results';
                emptyState.innerHTML = `
                    <p class="cs-no-results-text">Pagal pasirinktus filtrus automobilių nerasta.</p>
                    <span class="cs-button-solid" onclick="document.getElementById('clear-filters').click()">Išvalyti filtrus</span>
                `;
                this.carsList.parentNode.insertBefore(emptyState, this.carsList);
            } else {
                emptyState.style.display = 'block';
            }
        } else {
            // Show the cars list
            if (this.carsList) {
                this.carsList.style.display = '';
            }
            
            if (emptyState) {
                emptyState.style.display = 'none';
            }
        }
    }
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CarFilters());
} else {
    new CarFilters();
}


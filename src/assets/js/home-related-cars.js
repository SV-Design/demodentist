// Home Page Category Cars Sliders
(function() {
    let KeenSlider = null;
    const sliderInstances = {};
    let currentCategory = 'krovininiai';
    let sliderHeight = null;

    // Function to initialize a slider
    function initSlider(sliderId, overlayId, containerSelector) {
        const sliderElement = document.getElementById(sliderId);
        if (!sliderElement || !KeenSlider) return null;

        // Destroy existing slider if it exists
        if (sliderInstances[sliderId]) {
            try {
                sliderInstances[sliderId].destroy();
            } catch (e) {
                // Slider might already be destroyed
            }
        }

        const slider = new KeenSlider(sliderElement, {
            loop: true,
            slides: {
                perView: 1.2,
                spacing: 16,
            },
            breakpoints: {
                '(min-width: 48rem)': {
                    slides: {
                        perView: 2,
                        spacing: 16,
                    },
                },
                '(min-width: 64rem)': {
                    slides: {
                        perView: 3,
                        spacing: 16,
                    },
                },
            },
        });

        sliderInstances[sliderId] = slider;

        // Hide overlay once slider is initialized
        const overlay = document.getElementById(overlayId);
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }

        const container = document.querySelector(containerSelector);
        if (container) {
            const prevButton = container.querySelector('.cs-slider-prev');
            const nextButton = container.querySelector('.cs-slider-next');

            if (prevButton) {
                // Store slider reference on button to avoid duplicate listeners
                if (prevButton._sliderHandler) {
                    prevButton.removeEventListener('click', prevButton._sliderHandler);
                }
                prevButton._sliderHandler = () => slider.prev();
                prevButton.addEventListener('click', prevButton._sliderHandler);
            }
            if (nextButton) {
                // Store slider reference on button to avoid duplicate listeners
                if (nextButton._sliderHandler) {
                    nextButton.removeEventListener('click', nextButton._sliderHandler);
                }
                nextButton._sliderHandler = () => slider.next();
                nextButton.addEventListener('click', nextButton._sliderHandler);
            }
        }

        return slider;
    }

    // Function to switch between category sliders
    function switchCategory(category) {
        if (category === currentCategory) return;

        const categoryButtons = document.querySelectorAll('.cs-category-btn');
        const categorySliders = document.querySelectorAll('.cs-category-slider');
        const viewAllBtn = document.getElementById('view-all-category-btn');
        const activeButton = document.querySelector(`.cs-category-btn[data-category="${category}"]`);

        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Get current slider height before hiding
        const currentSlider = document.querySelector(`.cs-category-slider[data-category="${currentCategory}"]`);
        if (currentSlider && currentSlider.offsetHeight > 0) {
            sliderHeight = currentSlider.offsetHeight;
        }

        // Hide all sliders
        categorySliders.forEach(slider => {
            slider.style.display = 'none';
        });

        // Show target slider with fixed height for smooth transition
        const targetSlider = document.querySelector(`.cs-category-slider[data-category="${category}"]`);
        if (targetSlider) {
            // Show overlay while initializing
            const overlayId = `home-${category}-slider-overlay`;
            const overlay = document.getElementById(overlayId);
            if (overlay) {
                overlay.style.display = 'block';
                overlay.style.opacity = '1';
            }

            // Set fixed height for smooth transition
            if (sliderHeight && sliderHeight > 0) {
                targetSlider.style.height = sliderHeight + 'px';
            }
            targetSlider.style.display = 'block';
            targetSlider.style.opacity = '0';
            targetSlider.style.transition = 'opacity 0.3s ease';

            // Initialize slider if not already initialized
            const sliderId = `home-${category}-slider`;
            const containerSelector = `.cs-category-slider[data-category="${category}"]`;
            
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                initSlider(sliderId, overlayId, containerSelector);
                
                // Update height after initialization
                requestAnimationFrame(() => {
                    const newHeight = targetSlider.offsetHeight;
                    if (newHeight > 0) {
                        sliderHeight = newHeight;
                        targetSlider.style.height = newHeight + 'px';
                    }
                    
                    // Fade in slider
                    setTimeout(() => {
                        targetSlider.style.opacity = '1';
                        
                        // Remove fixed height after transition completes
                        setTimeout(() => {
                            targetSlider.style.height = '';
                            targetSlider.style.transition = '';
                        }, 300);
                    }, 50);
                });
            }, 50);
        }

        // Update view all button
        if (viewAllBtn && activeButton) {
            const categoryUrl = activeButton.getAttribute('data-category-url');
            viewAllBtn.textContent = 'Peržiūrėti visus';
            viewAllBtn.href = categoryUrl;
        }

        currentCategory = category;
    }

    // Load Keen Slider script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.js';
    script.onload = function() {
        KeenSlider = window.KeenSlider;
        
        // Initialize only the default slider (Krovininiai) on load
        initSlider('home-krovininiai-slider', 'home-krovininiai-slider-overlay', '.cs-category-slider[data-category="krovininiai"]');
        
        // Initialize the general related cars slider if it exists
        initSlider('home-related-cars-slider', 'home-related-cars-slider-overlay', '#home-related-cars-section');

        // Set up category button click handlers
        const categoryButtons = document.querySelectorAll('.cs-category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                switchCategory(category);
            });
        });
    };
    document.head.appendChild(script);

    // Initialize logo carousel infinite scroll
    function initLogoCarousel() {
        const logosSlide = document.querySelector('.cs-logos-slide');
        if (logosSlide) {
            const copy = logosSlide.cloneNode(true);
            const logosContainer = document.querySelector('.cs-logos');
            if (logosContainer) {
                logosContainer.appendChild(copy);
            }
        }
    }

    // Initialize logo carousel when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLogoCarousel);
    } else {
        initLogoCarousel();
    }
})();


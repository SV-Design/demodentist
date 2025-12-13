// Services Slider
(function() {
    let KeenSlider = null;
    let sliderInstance = null;

    function initServicesSlider() {
        const sliderElement = document.getElementById('services1-slider');
        if (!sliderElement || !KeenSlider) return;

        // Destroy existing slider if it exists
        if (sliderInstance) {
            try {
                sliderInstance.destroy();
            } catch (e) {
                // Slider might already be destroyed
            }
        }

        // Initialize slider with responsive breakpoints
        sliderInstance = new KeenSlider(sliderElement, {
            loop: true,
            slides: {
                perView: 1.2,
                spacing: 16,
            },
            breakpoints: {
                '(min-width: 26.25rem)': { // 420px
                    slides: {
                        perView: 2,
                        spacing: 16,
                    },
                },
                '(min-width: 48rem)': { // 768px - tablet
                    slides: {
                        perView: 3,
                        spacing: 16,
                    },
                },
                '(min-width: 64rem)': { // 1024px - desktop
                    slides: {
                        perView: 4,
                        spacing: 16,
                    },
                },
            },
        });

        // Hide overlay once slider is initialized
        const overlay = document.getElementById('services1-slider-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }

        // Set up navigation buttons
        const prevButton = document.querySelector('#services1 .cs-slider-prev');
        const nextButton = document.querySelector('#services1 .cs-slider-next');

        if (prevButton) {
            if (prevButton._sliderHandler) {
                prevButton.removeEventListener('click', prevButton._sliderHandler);
            }
            prevButton._sliderHandler = () => sliderInstance.prev();
            prevButton.addEventListener('click', prevButton._sliderHandler);
        }

        if (nextButton) {
            if (nextButton._sliderHandler) {
                nextButton.removeEventListener('click', nextButton._sliderHandler);
            }
            nextButton._sliderHandler = () => sliderInstance.next();
            nextButton.addEventListener('click', nextButton._sliderHandler);
        }
    }

    // Load Keen Slider script dynamically if not already loaded
    if (window.KeenSlider) {
        KeenSlider = window.KeenSlider;
        initServicesSlider();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.js';
        script.onload = function() {
            KeenSlider = window.KeenSlider;
            initServicesSlider();
        };
        document.head.appendChild(script);
    }
})();


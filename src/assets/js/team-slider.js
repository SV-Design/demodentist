// Team Slider
(function() {
    let KeenSlider = null;
    let sliderInstance = null;

    function initTeamSlider() {
        const sliderElement = document.getElementById('team-slider');
        if (!sliderElement || !KeenSlider) return;

        // Destroy existing slider if it exists
        if (sliderInstance) {
            try {
                sliderInstance.destroy();
            } catch (e) {
                // Slider might already be destroyed
            }
        }

        // Create and manage dots
        // const dotsContainer = document.getElementById('team-slider-dots');
        // const slides = sliderElement.querySelectorAll('.keen-slider__slide');
        // let dots = [];

        // function createDots() {
        //     if (!dotsContainer) return;
        //     
        //     dotsContainer.innerHTML = '';
        //     dots = [];
        //     
        //     slides.forEach((slide, index) => {
        //         const dot = document.createElement('button');
        //         dot.className = 'cs-dot';
        //         dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        //         dot.addEventListener('click', () => {
        //             sliderInstance.moveToIdx(index);
        //         });
        //         dotsContainer.appendChild(dot);
        //         dots.push(dot);
        //     });
        // }

        // function updateDots(instance) {
        //     if (!instance || !instance.track || !instance.track.details) return;
        //     const currentSlide = instance.track.details.rel;
        //     dots.forEach((dot, index) => {
        //         if (index === currentSlide) {
        //             dot.classList.add('active');
        //         } else {
        //             dot.classList.remove('active');
        //         }
        //     });
        // }

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
                        perView: 2,
                        spacing: 24,
                    },
                },
                '(min-width: 64rem)': { // 1024px - desktop
                    slides: {
                        perView: 3,
                        spacing: 24,
                    },
                },
            },
            created: function(instance) {
                // Hide overlay once slider is initialized
                const overlay = document.getElementById('team-slider-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 300);
                }
                
                // Create dots after slider is created
                // createDots();
                // updateDots(instance);
            },
            // slideChanged: function(instance) {
            //     updateDots(instance);
            // },
        });

        // Set up navigation buttons
        const prevButton = document.querySelector('#team-section .cs-slider-prev');
        const nextButton = document.querySelector('#team-section .cs-slider-next');

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
        initTeamSlider();
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.js';
        script.onload = function() {
            KeenSlider = window.KeenSlider;
            initTeamSlider();
        };
        document.head.appendChild(script);
    }
})();


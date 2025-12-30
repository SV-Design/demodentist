function getScrollbarWidth() {
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    outer.style.msOverflowStyle = 'scrollbar';
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
    outer.parentNode.removeChild(outer);
    return scrollbarWidth;
}

const elementsToCompensate = document.querySelectorAll('.js-compensate-scrollbar');

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    // Get references to modal elements
    const modal = document.getElementById('modal');
    // ... (rest of the variable declarations: modalImg, modalName, etc.)
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalTitle = document.getElementById('modal-title');
    const modalLicense = document.getElementById('modal-license');
    const modalBio = document.getElementById('modal-bio');

    // Check if modal element exists
    if (!modal) {
        console.error("CRITICAL: Modal element with ID 'modal' not found!");
        return; // Stop script execution if modal isn't found
    }
    console.log("Modal element found:", modal);

    // --- Doctor Data (Ensure this is correct) ---
    const doctorsData = {
        'demo-doctor-1': {
            name: 'DEMO Gydytojas 1',
            title: 'DEMO Specializacija 1',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d1.jpg',
            license: 'DEMO-001',
            bioHtml: '<p>DEMO - Tai yra demonstracinė informacija. Tikras gydytojo profilis bus pridėtas vėliau.</p>'
        },
        'demo-doctor-2': {
            name: 'DEMO Gydytoja 2',
            title: 'DEMO Specializacija 2',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d5.jpg',
            license: 'DEMO-002',
            bioHtml: '<p>DEMO - Tai yra demonstracinė informacija. Tikras gydytojo profilis bus pridėtas vėliau.</p>'
        }
    };
    // --- End of Data Object ---


    // Function to open the modal
    window.openModal = function(doctorId) {
        console.log("Attempting to open modal for:", doctorId);
        const doctor = doctorsData[doctorId];
        if (!doctor || !modal) {
            console.error('ERROR: Doctor data/modal missing. ID:', doctorId, 'Modal:', modal);
            return;
        }
        console.log("Doctor data found:", doctor);

        // Store current scroll position and prevent body scroll
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        document.body.dataset.scrollY = scrollY.toString();
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';

        // --- Scrollbar compensation ---
        const bodyHasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        let scrollbarWidth = 0; // Initialize width

        if (bodyHasScrollbar) {
            scrollbarWidth = getScrollbarWidth();
            console.log("Scrollbar detected, width:", scrollbarWidth);

            document.body.style.paddingRight = `${scrollbarWidth}px`;

            elementsToCompensate.forEach(el => {
                // Check computed style in case element isn't always fixed/sticky
                const computedStyle = window.getComputedStyle(el);
                if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
                    el.style.paddingRight = `${scrollbarWidth}px`;
                }
            });
        }
        // Populate modal fields
        modalImg.src = doctor.imgSrc;
        modalImg.alt = doctor.name;
        modalName.textContent = doctor.name;
        modalTitle.textContent = doctor.title;
        modalLicense.textContent = doctor.license || 'Nėra informacijos';
        modalBio.innerHTML = doctor.bioHtml || '<p>Informacija nerasta.</p>';

        // Display the modal using CSS class for better control
        console.log("Opening modal by adding 'modal-open' class");
        modal.style.display = 'flex'; // Still use flex for centering
        document.body.classList.add('modal-open'); // Add class to body for potential overflow handling
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        // Scroll modal content to top
        modal.querySelector('.modal-content').scrollTop = 0;
    }

    // Function to close the modal
    window.closeModal = function() {
        console.log("Closing modal by removing 'modal-open' class");
        if (modal) {
            modal.style.display = 'none'; // Hide the modal
            document.body.classList.remove('modal-open'); // Remove class from body
        }

        // Restore scroll position - get it before removing styles
        const scrollY = document.body.dataset.scrollY ? parseInt(document.body.dataset.scrollY, 10) : 0;
        
        // Remove fixed positioning and restore scroll in one synchronous operation
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        
        // Restore scroll position immediately and synchronously
        if (scrollY) {
            // Use both methods to ensure compatibility
            document.documentElement.scrollTop = scrollY;
            document.body.scrollTop = scrollY;
        }
        
        delete document.body.dataset.scrollY;

        elementsToCompensate.forEach(el => {
            el.style.paddingRight = '';

            console.log(`Removed paddingRight from element:`, el);
        });
    }

    // --- Event Listener Setup ---
    const doctorItems = document.querySelectorAll('#meet-team-2080 .cs-item[data-doctor-id]');
    console.log("Found doctor items:", doctorItems.length, doctorItems);

    doctorItems.forEach(item => {
        const doctorId = item.dataset.doctorId;
        console.log(`Processing item for doctor ID: ${doctorId}`);

        if (doctorId && doctorsData[doctorId]) {
            console.log(`Attaching click listener to: ${doctorId}`);
            item.addEventListener('click', (event) => {
                console.log(`CLICK detected on: ${doctorId}`);
                event.preventDefault();
                openModal(doctorId);
            });
        } else {
            console.warn(`No data/ID match for item:`, item);
        }
    });

    // Keyboard accessibility
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });

    console.log("Event listeners setup complete.");

}); // End of DOMContentLoaded listener

ate = document.querySelectorAll('.js-compensate-scrollbar');
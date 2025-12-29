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
        'kristina-vaitkeviciene': {
            name: 'Kristina Vaitkevičienė',
            title: 'Gydytoja-ortodontė',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d5.jpg', // Corrected image source
            license: 'OPL-01810',
            bioHtml: `
                    <h4>Išsilavinimas ir Kvalifikacija</h4>
                    <ul>
                        <li>2005 m. baigė VU antrinę rezidentūrą, įgijo gyd. ortodonto kvalifikaciją</li>
                        <li>2001 m. baigė VU odontologijos studijas</li>
                        <li>1996 m. baigė Utenos aukštesniąją mokyklą, įgijo dantų techniko specialybę</li>
                    </ul>

                    <h4>Papildoma informacija</h4>
                    <ul>
                        <li>Nuo 2008 m. Utenos kolegijos SPSR fakultete skaito paskaitas ododntologų padėjėjams, burnos higienistams ir dantų technologams</li>
                        <li>Domisi ir plačiai taiko įvairias naujausias medžiagas ir technologijas gydant pacientus išimamais ir neišimamais ortodontiniais aparatais.</li>
                        <li><em>Savo profesines žinias nuolat tobulina tarptautiniuose kongresuose ir kursuose, kur turi galimybę įgyti žinių iš daugelio plačiai žinomų užsienio specialistų.</em></li>
                    </ul>

                    <h4>Kursai ir Seminarai</h4>
                    <ul>
                        <li>"Dabartinės idėjos ortodontiškai gydant smilkininio apatinio žandikaupo sąnario sutrikimus", 2011.10.3. Vilnius</li>
                        <li>"Moderni temporomandibupnių sutrikimų diagnostika ir gydymas" 2011.6.17-18. Vilnius</li>
                        <li>"Baltijos šapų ortodontų asociacijos VII kongresas. Prieškongresiniai kursai.2011.5 26-28. Kaunas</li>
                        <li>"Class II treatment" 2010.10.9 .Ryga</li>
                        <li>"Ortodontinių vielų lankstymo technika" 2010.3.16-17. Birštonas</li>
                        <li>"Mikrosraigtų panaudojimas ortodontijos kpnikinėje prektikoje" 2009.11.25. Kaunas</li>
                        <li>"Ortodontinių anomapjų gydymas bepgatūriniais breketais" 2008.2. 1-2. Vilnius</li>
                        <li>6th Congress of Baltic Orthodontic Association 2008. 5. 27-28. Ryga</li>
                        <li>"Micro-implant Anchorage in Orthodontic Treatment" 2007.10.20-21. Atėnai</li>
                        <li>"Ortodontinių anomapjų gydymas Twin Block aparatais" 2007.9.8 , Kaunas</li>
                        <li>Tarptautinis odontologijos kongresas 2007.5 25-26, Druskininkai</li>
                        <li>"Malocclusion conserning maxillary growth and development" 2006.11.10-12. Vilnius</li>
                        <li>"Practical fixed apppance therapy in connection with Class II therapy",2006.5.5-7, Vilnius</li>
                        <li>"Ortodontija ir ortognatinė chirurgija" 2006.3.4-5.Vilnius</li>
                        <li>"The A-Z of Class II Patient" 2005.10.28-30. Vilnius</li>
                        <li>"Damon -2 breketų sistema. Efektyvesnis gydymas: teorija ir praktika" 2004.5 18-22. Vilnius</li>
                        <li>"Nauji ortodontinių anomapjų diagnostikos ir gydymo metodai" 2003.12.20. Kaunas</li>
                        <li>"Modern Orthodontics:Quapty &Efficiancy" 2003.9.27-28 . Ryga</li>
                        <li>"Metallkeramik Verarbeitung und Brenntechnik" 1996.5.7. Vilnius</li>
                        <li>"Metalokeraminių ir metaloakripnių dirbinių technologija", 1996.1. 22-24, Utena</li>
                        <li>Stažuotė "Rubepng & Klar Dental-Labor" dantų technikų laboratorijoje 1995.8 - 9 mėn. Berlynas</li>
                        <li>"Ivoclar -Vivadent Prothetic- Seminar 1994.11.28, Vilnius</li>
                    </ul>`
        },
        'sigute-vitkuniene': {
            name: 'Sigutė Vitkūnienė',
            title: 'Gydytoja odontologė',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d5.jpg', // Corrected image source
            license: 'OPL-03812',
            bioHtml: `
                    <h4>Išsilavinimas</h4>
                    <ul>
                       <li>2010 m. magistro diplomas, gydytojo odontologo profesinė kvalifikacija, Kauno medicinos universitetas, Odontologijos fakultetas</li>
                    </ul>

                    <h4>Kvalifikacijos tobulinimas</h4>
                    <ul>
                        <li>2015 –11 „ Estetika ir funkcija“. Tarptautinė Europos konferencija. Lektoriai Dr. Jan Hajto ( Vokietija), Dr. Tristan Staas ( Nyderlandai), Harri Lathi ( Suomija) Dr. Robert Marus ( JAV), Soheil Bechara ( Lietuva).</li>
                        <li>2015- 10 “ Dantų šlifavimas mikroprotezavimui keramikos ir aukso restauracijoms“. Lektorius Prof. dr. h.c. Georg B. Meyer ( Vokietija).</li>
                        <li>2015- 04 “ Tiesioginės estetinės dantų restauracijos estetinėje zonoje su kursų dalyvių praktika“. Veda: gyd. odont. Ingrida Ivancė. Vilnius.</li>
                        <li>2014- 10 “ Krūminių dantų vainikų defektų atstatymas, panaudojant šiuolaikinius kompozitus ir adhezyvus – teorija ir praktika“. Lektorė doc. dr. Rūta Bendinskaitė. Vilnius.</li>
                        <li>2014 09 „ Kompozicinės restauracijos – funkcijos ir estetikos menas „ Demonstraciniai ir praktiniai kursai. Lektorius Wolfgang – M. Boer ( Vokietija).</li>
                        <li>2013 10 “ Kasdieninis priekinių dantų estetinis plombavimas. Style Italiano koncepcija. „ Lektoriai gyd. Povilas Kalesinskas, gyd Žana Sakalauskienė. Vilnius.</li>
                        <li>2012 - 10 „Gydyti negalima palikti (Kur dėt kablelį ? -atsakys lektoriai)“ Konferencija, Druskininkai.</li>
                        <li>2012 – 04 „Naujovės ir aktualijos odontologo praktikoje“ Konferencija, Palanga.</li>
                        <li>2011 – 10 „Estetinis priekinių ir krūminių dantų restauravimas kompozitais ir stiklojonomerais“. Praktinis – teorinis seminaras, Med. Dr. V. Vilkinis, Kaunas</li>
                        <li>2011 – 05 „Burnos sveikata visiems“ Tarptautinis kongresas, Druskininkai.</li>
                        <li>2011 – 02 „Profesionalūs sprendimai odontologijos praktikoje“, Teorinis seminaras Lektoriai: Med Dr. G. Janužis ir gyd. odon. A. Tursa, Kaunas.</li>
                        <li>2010- 11 Kompozicinės restauracijos „State of the Art“ , Teorinis - praktinis seminaras - Lektorius Wolfgang – M. Boer ( Vokietija), Vilnius.</li>
                        <li>2010 – 10 „Pažangūs metodai odontologijoje“ Teorinis seminaras Lekt. K. Bušauskas, A. Tamulienė, R. Pletkus, A. Auškalnis, R. Bagdonas, T. Venskutonis, Dr. A. Puišys, Panevėžys.</li>
                        <li>2009- 04 „Estetinės odontologijos aktualijos studijų kontekste“, Tarptautinė studentų konferencija Kaunas.</li>
                    </ul>`
        },
        'rita-grybiene': {
            name: 'Rita Grybienė',
            title: 'Gydytoja periodontologė',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d5.jpg', // Corrected image source
            license: 'OPL-04372',
            // NOTE: Rita's original data already used UL lists extensively, so we mainly add headings.
            bioHtml: `
                    <p>Specializacijos metu atlieka chirurgines burnos intervencijas, susijusias su periodontito gydymu, periodonto audinių regeneracija, minkštųjų burnos audinių, pasaitėlių plastika, dantų eilių defektų ar kaulinių defektų atstatymu, implantacija, paruošimu protezavimui, dantų rovimus ir kt.</p>

                    <h4>Išsilavinimas ir Specializacija</h4>
                    <ul>
                        <li>2012 m. baigė periodontologijos rezidentūrą ir Lietuvos sveikatos mokslų universitete įgijo gydytojos periodontologės specializaciją.</li>
                        <li>2009 m. internatūra Vilniaus implantologijos centro klinikoje.</li>
                        <li>2008 m. baigė Vilniaus universiteto Medicinos fakultetą, įgijo gydytojo odontologo specialybę.</li>
                    </ul>

                    <h4>Kvalifikacijos kėlimas</h4>
                    <ul>
                        <li>2016 10 Quintessence Vilnius 2016, tarptautinis burnos chirurgijos ir periodontologijos kongresas</li>
                        <li>2016 04 <strong>"</strong>Waterlase iPlus lazerio panaudojimas periodontologijoje“ </li>
                        <li>2016 03 "Nauji pjezocizijos pasiekimai: kaip integruoti juos į odontologo praktiką". Prof. S.Dibart ir doc. dr. E.I.Keser, Vilnius.</li>
                        <li>2016 02 “Aktualijos periodontologijoje”. Lietuvos periodontologų draugijos kasmetinė konferencija.Vilnius.</li>
                        <li>2015 12 „Dantų implantologija: chirurginiai ir ortopediniai niuansai“. Gyd. Raimondas Savickas, Vilnius.</li>
                        <li>2015 11 „Implantacijos kursas pažengusiems“, gyd. Soheil Bechara</li>
                        <li>2015 11 “Quintessence of periodontology and implantology” kongresas Vilniuje</li>
                        <li>2015 11 “Profesionalaus higienisto svarba odontologo praktikoje 2015“, Kaunas. Skaitytas pranešimas tema „Dantenų ir burnos gleivinės pažeidimai. Lazerio panaudojimas jų gydyme“</li>
                        <li>2015 10 „Periimplantito problema implantologijoje. Profilaktika ir gydymas“. Prof. Frank Schwarz, Vilnius</li>
                        <li>2015 06 Europerio 8, tarptautinė periodontologų konferencija, Londonas, Didžioji Britanija.</li>
                        <li>2015 04 a-PRF ir i-PRF (centrifūguoto kraujo substratų) naudojimas minkštųjų ir kietųjų audinių augmentacijai.</li>
                        <li>2015 03 “Minkštųjų audinių estetika apie dantų implantus“, lektorius dr. Stephen Chu, Vilnius.</li>
                        <li>2015 02 “Aktualijos periodontologijoje”. Lietuvos periodontologų draugijos kasmetinė konferencija.Vilnius.</li>
                        <li>2014 11 „Profesionalaus higienisto svarba odontologo praktikoje“, Kaunas</li>
                        <li>2014 09 „Pažangioji odontologija šiandien“, Druskininkai.</li>
                        <li>2014 09 Lazerio terapija (LLLT) odontologijoje, Vilnius.</li>
                        <li>2014 06 Kietųjų-minkštųjų audinių lazerio teoriniai ir praktiniai mokymai Aachen universitete, Vokietija.</li>
                        <li>2014 04 “Naujovės ir aktualijos odontologo praktikoje“, Praktinė odontologija, Palanga.</li>
                        <li>2014 03 “Aktualijos periodontologijoje”. Lietuvos periodontologų draugijos kasmetinė konferencija.Vilnius.</li>
                        <li>2013 “Aktualijos periodontologijoje”. Lietuvos periodontologų draugijos kasmetinė konferencija.Vilnius.</li>
                        <li>2012 10 Profesionalaus higienisto svarba odontologo praktikoje, Praktinė odontologija, Kaunas.</li>
                        <li>2012 06 Europerio 7, tarptautinė periodontologų konferencija, Viena, Austrija.</li>
                        <li>2012 04 “Naujovės ir aktualijos odontologo praktikoje“, Praktinė odontologija, Palanga.</li>
                        <li>2012 02 “Aktualijos periodontologijoje”. Lietuvos periodontologų draugijos kasmetinė konferencija.Vilnius.</li>
                        <li>2011 10 “Estetika, funkcija ir pažangios technologijos odontologijoje“. Praktinės odontologijos konferencija. Kaunas.</li>
                        <li>2011 10 “Prevencija, ankstyvoji diagnostika, minimali invazija”. Gydytojų odontologų draugijos konferencija. Druskininkai.</li>
                        <li>2010 09 Antrasis tarptautinis BOA kongresas "Nauji pasiekimai dantų implantacijoje".</li>
                        <li>2007 – 2016 kiti įvairūs kursai Lietuvoje.</li>
                     </ul>

                    <h4>Naujausi pranešimai</h4>
                    <ul>
                        <li>2015 11 Pranešimas „Dantenų ir burnos gleivinės pažeidimai. Lazerio panaudojimas jų gydyme“. Konferencija burnos higienistams, Kaunas</li>
                        <li>2014 11 Pranešimas „Lazeris kasdieniame darbe: nuo ko pradėti?“. „Praktinės odontologijos“ konferencija burnos higienistams, Kaunas.</li>
                        <li>2012 10 Pranešimas „Burnos higienisto darbas: ko tikisi periodontologas?“. „Praktinės odontologijos“ seminaras burnos higienistams, Kaunas.</li>
                        <li>2012 04 Pranešimas “Jatrogeninės ir trauminės kilmės dantenų pažeidimai: etiologija, gydymas, klinikinių atvejų analizė“. „Praktinės odontologijos“ organizuota konferencija, Palanga.</li>
                        <li>2012 02 Klinikinio atvejo pristatymas. Tarptautinė konferencija „Aktualijos periodontologijoje“, Vilnius.</li>
                    </ul>

                    <h4>Narystės</h4>
                    <p>Nuolat dalyvauja įvairiuose odontologiniuose seminaruose, kursuose, kongresuose Lietuvoje ir užsienyje. Yra Lietuvos Respublikos odontologų rūmų narė, Baltijos osteointegracijos akademijos (BOA) narė, Lietuvos periodontologų draugijos (LPD) narė.</p>`
        },
        // --- Keep placeholders for others ---
        'daiva-sabaliauskiene': {
            name: 'Daiva Sabaliauskienė',
            title: 'Gydytoja endodontė',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d5.jpg', // Corrected image source
            license: 'Nėra informacijos',
            bioHtml: '<p>Išsamesnė informacija ruošiama.</p>'
        },
        'jolanta-buinovska': {
            name: 'Jolanta Buinovska',
            title: 'Burnos ir žandikaulių chirurgė',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d5.jpg', // Corrected image source
            license: 'Nėra informacijos',
            bioHtml: '<p>Išsamesnė informacija ruošiama.</p>'
        },
        'vilte-gabalyte': {
            name: 'Viltė Gabalytė',
            title: 'Gydytoja odontologė',
            imgSrc: 'https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/People/d5.jpg', // Corrected image source
            license: 'Nėra informacijos',
            bioHtml: '<p>Išsamesnė informacija ruošiama.</p>'
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
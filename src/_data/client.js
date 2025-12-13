module.exports = {
    name: "AutoVerus",
    email: "info@autoverus.lt",
    email2: "vilnius@autoverus.lt",
    phoneForTel: "+37060328333",
    phoneFormatted: "+370 603 28333",
    phone2ForTel: "+37067253339",
    phone2Formatted: "+370 672 53339",
    address: {
        lineOne: "Pramonės pr. 103",
        lineTwo: "",
        city: "Kaunas",
        state: "",
        zip: "",
        country: "Lietuva",
        mapLink: "",
    },
    address2: {
        lineOne: "Lentvario g. 14",
        lineTwo: "",
        city: "Vilnius",
        state: "",
        zip: "",
        country: "Lietuva",
        mapLink: "",
    },
    socials: {
        facebook: "https://www.facebook.com/AutoVerus",
        instagram: "https://www.instagram.com/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.autoverus.lt",
    // Passing the isPsroduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
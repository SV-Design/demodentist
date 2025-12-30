module.exports = {
    name: "Belomeda",
    email: "info@belomeda.lt",
    email2: "info@belomeda.lt",
    phoneForTel: "+37052762233",
    phoneFormatted: "+370 5 2762233",
    phone2ForTel: "+37052762233",
    phone2Formatted: "+370 5 2762233",
    companyAge: "22",
    address: {
        lineOne: "Kalvarijų g. 119/2",
        lineTwo: "",
        city: "Vilnius",
        state: "",
        zip: "",
        country: "Lietuva",
        mapLink: "",
    },
    address2: {
        lineOne: "Kalvarijų g. 119/2",
        lineTwo: "",
        city: "Vilnius",
        state: "",
        zip: "",
        country: "Lietuva",
        mapLink: "",
    },
    socials: {
        facebook: "https://www.facebook.com/Belomeda",
        instagram: "https://www.instagram.com/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.Belomeda.lt",
    // Passing the isPsroduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
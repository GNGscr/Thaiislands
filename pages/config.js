// import { useEffect } from "react";
let language = "en";
let media = "desktop";

// const setGlobalValues = () => {
//     useEffect(() => {
//         const mainHtml = document.querySelector('html');
//  console.log(mainHtml);
 
// }, []);
// }
module.exports = {
    getGlobalLanguage: () => language,
    setGlobalLanguage: (lang) => { language = lang; },
    getMedia: () => media,
    setMedia: (media) => { media = media; },
};
let language = "en";
let currentMedia = "desktop";
module.exports = {
    getGlobalLanguage: () => language,
    setGlobalLanguage: (lang) => { language = lang; },
    getMedia: () => currentMedia,
    setMedia: (media) => { currentMedia = media; },
};
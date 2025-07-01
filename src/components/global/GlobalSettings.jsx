import React, { useState, createContext, useContext, useEffect } from 'react';

const GlobalSettingsContext = createContext();
export const useGlobalSettings = () => useContext(GlobalSettingsContext);

const GlobalSettingsProvider = ({ children }) => {
  const [language, setLanguageState] = useState("en");
  const [currentMedia, setCurrentMedia] = useState("desktop");

  const setLanguage = (lang) => {
    if (lang !== "en" && lang !== "he") return;

    setLanguageState(lang);
    localStorage.setItem("language", lang);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url.toString());

    document.documentElement.lang = lang === "he" ? "he-IL" : "en-US";
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const savedLang = localStorage.getItem("language");

    if (urlLang === "en" || urlLang === "he") {
      setLanguage(urlLang);
    } else if (savedLang === "en" || savedLang === "he") {
      setLanguage(savedLang);
    }

    const width = window.innerWidth;
    const media =
      width < 680 ? "mobile" :
      width < 1080 ? "tablet" :
      "desktop";
    setCurrentMedia(media);
    localStorage.setItem("media", media);
  }, []);

  return (
    <GlobalSettingsContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      currentMedia,
      setCurrentMedia
    }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;




// import React, { useState, createContext, useContext, useEffect } from 'react';

// const GlobalSettingsContext = createContext();

// export const useGlobalSettings = () => {
//   return useContext(GlobalSettingsContext);
// };

// const GlobalSettingsProvider = ({ children }) => {
//   const [language, setLanguage] = useState("en");
//   const [currentMedia, setCurrentMedia] = useState("desktop");

//     useEffect(() => {
//       // Save to localStorage or cookies whenever the settings change
      
//       localStorage.setItem("language", language);
//     if (window.innerWidth < 680) {
//       setCurrentMedia("mobile");
//       localStorage.setItem("media", "mobile");
//     } else if (window.innerWidth < 1080) {
//       setCurrentMedia("tablet");
//       localStorage.setItem("media", "tablet");
//     } else {
//       setCurrentMedia("desktop");
//       localStorage.setItem("media", "desktop");
//     }

//     }, [language, currentMedia]);

//     useEffect(() => {
//   const width = window.innerWidth;
//   const newMedia =
//     width < 680 ? "mobile" :
//     width < 1080 ? "tablet" : "desktop";

//   if (newMedia !== currentMedia) {
//     setCurrentMedia(newMedia);
//     localStorage.setItem("media", newMedia);
//   }
// }, [currentMedia]);

//   // Optionally, you can sync the values with localStorage or cookies
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language");
//     const savedMedia = localStorage.getItem("media");
//     const params = new URLSearchParams(window.location.search);
//     const lang = params.get("lang");

//     if (savedLanguage) {
//       setLanguage(savedLanguage);
//     }

//     if (savedMedia) {
//       setCurrentMedia(savedMedia);
//     }

//     if (lang === "en" || lang === "he") {
//       setLanguage(lang);
//     }
//   }, []);

//   return (
//     <GlobalSettingsContext.Provider
//       value={{
//         language,
//         setLanguage,
//         currentMedia,
//         setCurrentMedia
//       }}>
//       {children}
//     </GlobalSettingsContext.Provider>
//   );
// };

// export default GlobalSettingsProvider;

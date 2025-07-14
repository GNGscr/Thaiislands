import React, { useState, createContext, useContext, useEffect } from 'react';

const GlobalSettingsContext = createContext();

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error("useGlobalSettings must be used within a GlobalSettingsProvider");
  }
  return context;
}


const GlobalSettingsProvider = ({ children }) => {
  const [language, setLanguageState] = useState("en");
  const [currentMedia, setCurrentMedia] = useState("desktop");

  useEffect(() => {
    // Load language and media from URL or localStorage
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    const savedLang = localStorage.getItem("language");

    if (urlLang === "en" || urlLang === "he") {
      setLanguageState(urlLang);
    } else if (savedLang === "en" || savedLang === "he") {
      setLanguageState(savedLang);
    }

    // Detect media based on screen width
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
      setLanguage: setLanguageState,
      currentMedia,
      setCurrentMedia
    }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;

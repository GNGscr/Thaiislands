import React, { useState, createContext, useContext, useEffect } from 'react';

const GlobalSettingsContext = createContext();

export const useGlobalSettings = () => {
  return useContext(GlobalSettingsContext);
};

const GlobalSettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [currentMedia, setCurrentMedia] = useState("desktop");

    useEffect(() => {
      // Save to localStorage or cookies whenever the settings change
      
      localStorage.setItem("language", language);
    if (window.innerWidth < 680) {
      setCurrentMedia("mobile");
      localStorage.setItem("media", "mobile");
    } else if (window.innerWidth < 1080) {
      setCurrentMedia("tablet");
      localStorage.setItem("media", "tablet");
    } else {
      setCurrentMedia("desktop");
      localStorage.setItem("media", "desktop");
    }

    }, [language, currentMedia]);

  // Optionally, you can sync the values with localStorage or cookies
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    const savedMedia = localStorage.getItem("media");

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    if (savedMedia) {
      setCurrentMedia(savedMedia);
    }
  }, []);

  return (
    <GlobalSettingsContext.Provider
      value={{
        language,
        setLanguage,
        currentMedia,
        setCurrentMedia
      }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;

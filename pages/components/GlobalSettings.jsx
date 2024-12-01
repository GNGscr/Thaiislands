import React, { useState, createContext, useContext, useEffect } from 'react';

// Create context for global settings
const GlobalSettingsContext = createContext();

// Create a custom hook to use the global settings context
export const useGlobalSettings = () => {
  return useContext(GlobalSettingsContext);
};

// GlobalSettings component that provides global state
const GlobalSettingsProvider = ({ children }) => {
  
  const [language, setLanguage] = useState("en");
  const [currentMedia, setCurrentMedia] = useState("desktop");

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

  useEffect(() => {
    // Save to localStorage or cookies whenever the settings change
    localStorage.setItem("language", language);
    localStorage.setItem("media", currentMedia);
  }, [language, currentMedia]);

  return (
    <GlobalSettingsContext.Provider value={{ language, setLanguage, currentMedia, setCurrentMedia }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;

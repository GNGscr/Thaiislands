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

    // Effect hook to watch changes in currentMedia and perform actions
    // useEffect(() => {

    // if (window.innerWidth < 680) {
    //   setCurrentMedia("mobile");
    //   localStorage.setItem("media", "mobile");
    //   console.log('currentMedia: ', currentMedia);
    // } else if (window.innerWidth < 1080) {
    //   setCurrentMedia("tablet");
    //   localStorage.setItem("media", "tablet");
    //   console.log('currentMedia: ', currentMedia);
    // } else {
    //   setCurrentMedia("desktop");
    //   localStorage.setItem("media", "desktop");
    //   console.log('currentMedia: ', currentMedia);
    // }
    // }, [currentMedia]); 

    useEffect(() => {
      // Save to localStorage or cookies whenever the settings change
      
      localStorage.setItem("language", language);
    if (window.innerWidth < 680) {
      setCurrentMedia("mobile");
      localStorage.setItem("media", "mobile");
      // console.log('currentMedia: ', currentMedia);
    } else if (window.innerWidth < 1080) {
      setCurrentMedia("tablet");
      localStorage.setItem("media", "tablet");
      // console.log('currentMedia: ', currentMedia);
    } else {
      setCurrentMedia("desktop");
      localStorage.setItem("media", "desktop");
      // console.log('currentMedia: ', currentMedia);
    }
      // localStorage.setItem("media", currentMedia);
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

  // useEffect(() => {
  //   // Save to localStorage or cookies whenever the settings change
    
  //   localStorage.setItem("language", language);
  //   localStorage.setItem("media", currentMedia);
  // }, [language, currentMedia]);

  return (
    <GlobalSettingsContext.Provider value={{ language, setLanguage, currentMedia, setCurrentMedia }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;

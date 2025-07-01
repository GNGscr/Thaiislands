import { useGlobalSettings } from "../components/global/GlobalSettings";

export const useLanguage = () => {
  const { language, setLanguage: setLangState } = useGlobalSettings();

  const setLanguage = (lang) => {
    if (lang !== "en" && lang !== "he") return;

    setLangState(lang);
    localStorage.setItem("language", lang);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url.toString());

    document.documentElement.lang = lang === "he" ? "he-IL" : "en-US";
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  return { language, setLanguage, toggleLanguage };
};

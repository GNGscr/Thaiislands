import { useEffect, useState } from "react";
import { useGlobalSettings } from '../components/GlobalSettings';

const HE_IL = 'he-IL';
const EN_US = 'en-US';
const he = 'he';
const en = 'en';

export default function useLanguageToggle() {
  const { language, setLanguage } = useGlobalSettings();
  const [mainHtml, setMainHtml] = useState(null);

  useEffect(() => {
    const html = document.querySelector('html');
    setMainHtml(html);
    if (html) html.setAttribute('lang', language === he ? HE_IL : EN_US);
  }, [language]);

  const toggleLanguage = () => {
    if (mainHtml) {
      const currentLang = mainHtml.getAttribute('lang');
      mainHtml.setAttribute('lang', currentLang === HE_IL ? EN_US : HE_IL);
    }
    setLanguage(language === en ? he : en);
  };

  return { language, toggleLanguage };
}

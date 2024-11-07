import { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import SocialsSection from "./components/SocialsSection";
import StickyFooter from "./components/StickyFooter";
import SectionAnimation from "./components/SectionAnimation";
import mainData from "./public/data/data.json";

export default function Phuket({ media, language, toggleLanguage }) {
    let [menuIsActive, setMenuIsActive] = useState(false);

    return (
        <>

        <Navbar
          data={mainData}
          lang={mainData['language-text'][language] || "he"}
          toggleLanguage={toggleLanguage}
          activateMenuIsActive={(bool) => setMenuIsActive(bool)} 
          media={media}
          />
  
        <div id="home" />
  
        <Main
          activateMenuIsActive={(bool) => setMenuIsActive(bool)}
          data={mainData}
          lang={mainData['language-text'][language] || "he"}
          media={media}
          title="Phuket" />
  
        <div id="media"><SocialsSection data={mainData} lang={mainData['language-text'][language] || "he"} /></div>
        
        <StickyFooter data={mainData} lang={mainData['language-text'][language] || "he"} />
  
        <SectionAnimation menuIsActive={menuIsActive} title="Phuket" />
      </>
    )
}
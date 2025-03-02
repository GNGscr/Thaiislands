import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useGlobalSettings } from './GlobalSettings';
import { motion } from "framer-motion";


export default function Layout() {
  const { language, setCurrentMedia } = useGlobalSettings();
  const scope = useRef(null);
  const [ isSideNavToggleSvgVisible, setIsSideNavToggleSvgVisible ] = useState(false);
  const [ isSideNavToggleVisible, setIsSideNavToggleVisible ] = useState(false);
  
  // const router = useRouter()
  const pathname = usePathname();
  let globalLanguage = language;

  const links = [
    { "en": "About", "he": "עלינו", "link": "/about" },
    { "en": "Koh Phangan", "he": "קופנגן", "link": "/koh-phangan" },
    { "en": "Koh Samui", "he": "קוסמוי", "link": "/koh-samui" },
    { "en": "Koh Tao", "he": "קוטאו", "link": "/koh-tao" },
    // { "en": "Phuket", "he": "פוקט", "link": "/phuket" },
    // { "en": "Chang Mae", "he": "צ׳אנג מאי ", "link": "/changmai" },
    // { "en": "Pai", "he": "פאי", "link": "/pai" },
    // { "en": "Krabi", "he": "קראבי", "link": "krabi" }
  ];

  useEffect(() => {

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
     
  });

  const goToLink = e => {
    setIsSideNavToggleSvgVisible(true);
    setIsSideNavToggleVisible(false);
  }

  const mouseEnter = () => {
    setIsSideNavToggleSvgVisible(true);
    setIsSideNavToggleVisible(true);
  }
  const mouseleave = () => {
    setIsSideNavToggleSvgVisible(false);
    setIsSideNavToggleVisible(false);
  }

  const setLinksLang = (en, he) => {
    return globalLanguage === "en" ? en : he;
  }

  const variants = {
    initial: { x: "-115%", width: "175px" },
    animate: { x: 0, transition: { duration: .4 } }
  };

  return (
    <div ref={scope}
      className="layout-wrapper fixed w-full flex align-center top-[0rem]"
      style={{ zIndex: 3 }}>
      <motion.div
        id="layout"
        variants={variants}
        className={`links-layout p-2 m-3 relative w-full flex align-center top-[0.75rem]`}
        initial="initial"
        whileHover="animate"
        animate={isSideNavToggleVisible ? "animate" : "initial"}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseleave}
      >
        <div className="side-toggle-svg-wrapper">

          {/* svg is in position absolute to it's parent, so it's out of links flow */}
          <svg id="side-toggle-svg" className="cursor-pointer"
            style={{ opacity: isSideNavToggleSvgVisible ? 0 : 1, stroke: '#aaa', transform: "scale(1.5)", rotate: "90deg", }}
            xmlns="http://www.w3.org/2000/svg" width="14.002" height="6.5" viewBox="0 0 15.802 8.73"><path fill="#fff" data-name="angle-small-down" d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21A1,1,0,0,0,5.29,9.62l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" transform="translate(19.001 16.087) rotate(180)"></path>
          </svg>
        </div>

        {
          links.map(({ en, he, link }, index) => {
            return (
              <Link
                key={index}
                href={link}
                onClick={e => goToLink(e)}
                className={`link ${pathname === link ? 'active-link' : ''}`}
              >
                {setLinksLang(en, he)}
              </Link>
            )
          })
        }
      </motion.div>
    </div>
  );
}
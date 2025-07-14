import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useGlobalSettings } from '../global/GlobalSettings';
import { motion } from "framer-motion";
import links from "../../public/data/links.json";
import setInnerWidth from "../../public/utils/set-inner-width";

export default function SideNavigationWrapper() {
  const { language, currentMedia, setCurrentMedia } = useGlobalSettings() || {};
  const [ isSideNavToggleSvgVisible, setIsSideNavToggleSvgVisible ] = useState(false);
  const [ isSideNavToggleVisible, setIsSideNavToggleVisible ] = useState(false);
  
  let globalLanguage = language;
  const pathname = usePathname();
  
  const sendCurrentMedia = media => setCurrentMedia(media);
  const isMobile = currentMedia === "mobile";

  useEffect(() => {
    setInnerWidth(sendCurrentMedia);
  }); 

  const setSideVisibility = (navTglSvg, navTgl) => {
    setIsSideNavToggleSvgVisible(navTglSvg);
    setIsSideNavToggleVisible(navTgl);
  };

  const sideNavVariants = {
    initial: { x: "-115%", width: "175px" },
    animate: { x: "0%", transition: { duration: 0.4 } }
  };

  return (
    <div
      className="layout-wrapper fixed w-full flex align-center top-[0rem]"
      style={{ zIndex: 3 }}>
      <motion.div
        id="layout"
        className={`links-layout p-2 m-3 relative w-full flex align-center top-[0.75rem]`}
        variants={sideNavVariants}
        initial="initial"
        animate={isSideNavToggleVisible ? "animate" : "initial"}
        whileHover={{ x: "-5%", transition: { duration: .4 } }}
        onMouseLeave={() => setSideVisibility(false, false)}
        onMouseEnter={() => setSideVisibility(true, true)}
        onClick={() => {
          if (isMobile) {
            setIsSideNavToggleVisible(!isSideNavToggleVisible);
          } else {
            setIsSideNavToggleVisible(true);
          }
        }}
      >
        <div className="side-toggle-svg-wrapper">

          {/* svg is in position absolute to it's parent, so it's out of links flow */}
          <svg id="side-toggle-svg" className="cursor-pointer"
            style={{ opacity: isSideNavToggleSvgVisible ? 0 : 1 }}
            xmlns="http://www.w3.org/2000/svg" width="14.002" height="6.5" viewBox="0 0 15.802 8.73"><path fill="#fff" data-name="angle-small-down" d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21A1,1,0,0,0,5.29,9.62l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" transform="translate(19.001 16.087) rotate(180)"></path>
          </svg>
        </div>

        {
          links.map(({ link }, index) => {
            return (
              <Link
                key={index}
                href={link}
                onClick={() => {
                  setSideVisibility(true, false);
                  if (isMobile) setIsSideNavToggleVisible(false);
                }}
                className={`link ${pathname === link ? 'active-link' : ''}`}
              >
                {links[index][globalLanguage]}
              </Link>
          )})
        }
        {isMobile && (
          <button
            className="mobile-toggle-btn text-white text-2xl font-bold absolute left-12.5 bottom-5 z-50"
            onClick={() => {
              setIsSideNavToggleVisible(prev => !prev);
              setSideVisibility(false, !isSideNavToggleVisible);
            }}
            aria-label="Toggle Navigation"
          >
            X
          </button>
        )}
      </motion.div>
    </div>
  );
}
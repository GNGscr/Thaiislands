import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useGlobalSettings } from '../global/GlobalSettings';
import { motion } from "framer-motion";
import links from "../../public/data/links.json";
import setInnerWidth from "../../public/utils/set-inner-width";
import styles from '../styles/Navbar.module.css';

export default function Layout() {
  const { language, setCurrentMedia } = useGlobalSettings();
  const [ isSideNavToggleSvgVisible, setIsSideNavToggleSvgVisible ] = useState(false);
  const [ isSideNavToggleVisible, setIsSideNavToggleVisible ] = useState(false);
  
  let globalLanguage = language;
  const pathname = usePathname();
  
  const sendCurrentMedia = media => setCurrentMedia(media);

  useEffect(() => {
    setInnerWidth(sendCurrentMedia);
  }); 

  const setSideVisibility = (navTglSvg, navTgl) => {
    setIsSideNavToggleSvgVisible(navTglSvg);
    setIsSideNavToggleVisible(navTgl);
  };

  return (
    <div
      className={`${styles.layoutWrapper} fixed w-full flex align-center top-[0rem]`}
      style={{ zIndex: 3 }}>
      <motion.div
        id="layout"
        className={`${styles.linksLayout} p-2 m-3 relative w-full flex align-center top-[0.75rem]`}
        initial={{ x: "-115%", width: "175px" }}
        whileHover={{ x: "-5%", transition: { duration: .4 } }}
        animate={isSideNavToggleVisible ? "animate" : "initial"}
        onMouseLeave={() => setSideVisibility(false, false)}
        onMouseEnter={() => setSideVisibility(true, true)}
      >
        <div className={styles.sideToggleSvgWrapper}>

          {/* svg is in position absolute to it's parent, so it's out of links flow */}
          <svg id={styles.sideToggleSvg} className="cursor-pointer"
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
                onClick={() => setSideVisibility(true, false)}
                className={`${styles.link} ${pathname === link ? `${styles.activeLink}` : ''}`}
              >
                {links[index][globalLanguage]}
              </Link>
          )})
        }
      </motion.div>
    </div>
  );
}
import { useState, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, useAnimate } from "framer-motion";
// import SectionAnimation from "./SectionAnimation";


export default function Layout() {
  const scope = useRef(null);
  let [menuIsActive, setMenuIsActive] = useState(false);
  const [isNavbarVisible, setIsSideNavbarVisible] = useState(false);
  const [isSideNavToggleSvgVisible, setIsNavToggleSvgVisible] = useState(false);
  // const [scope, animate] = useAnimate();

  const pathname = usePathname();
  const router = useRouter()

  const goToLink = e => {
    // e.preventDefault()
    // console.log(e.target.href);
    // setIsNavToggleSvgVisible(true);
    // setTimeout(() => {
    //   setIsNavToggleSvgVisible(false);
    //   router.push(e.target.href);
    // }, 500);
    
  }

  const mouseEnter = () => setIsNavToggleSvgVisible(true);
  const handleMouseLeave = () => setIsNavToggleSvgVisible(false);

  const variants = {
    // initial: { y: "-155%" },
    initial: { x: "-115%", width: "175px" },
    animate: { x: 0, transition: { duration: .4 } }
  };

  return (
    <div ref={scope} className="layout-wrapper fixed w-full flex align-center top-[0rem]" style={{ zIndex: '1' }}>
      <motion.div
        id="layout"
        variants={variants}
        className={`links-layout p-2 m-3  relative w-full flex align-center top-[0.75rem]`}
        initial="initial"
        whileHover="animate"
        // animate={!isSideNavToggleSvgVisible}
        onMouseEnter={() => setIsNavToggleSvgVisible(true)}
        onMouseLeave={() => setIsNavToggleSvgVisible(false)}
      >
      <div onClick={() => setIsSideNavbarVisible(true)} className="side-toggle-svg-wrapper">
        <svg id="side-toggle-svg" className="cursor-pointer" style={{ opacity: isSideNavToggleSvgVisible ? 0 : 1, stroke: '#aaa', transform: "scale(1.5)", rotate: "90deg", }} xmlns="http://www.w3.org/2000/svg" width="14.002" height="6.5" viewBox="0 0 15.802 8.73"><path fill="#fff" data-name="angle-small-down" d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21A1,1,0,0,0,5.29,9.62l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" transform="translate(19.001 16.087) rotate(180)"></path></svg>
      </div>

        <Link href="/Home" onClick={e => goToLink(e)}  className={`link ${pathname === '/About' ? 'active-link' : ''}`}>ABOUT US</Link>
        <Link href="/KohPhangan" onClick={e => goToLink(e)}  className={`link ${pathname === '/KohPhangan' ? 'active-link' : ''}`}>Koh Phangan</Link>
        <Link href="/KohSamui" onClick={e => goToLink(e)} className={`link ${pathname === '/KohSamui' ? 'active-link' : ''}`}>Koh Samui</Link>
        <Link href="/KohTao" onClick={e => goToLink(e)} className={`link ${pathname === '/KohTao' ? 'active-link' : ''}`}>Koh Tao</Link>
      </motion.div>
      {/* <SectionAnimation menuIsActive={false} /> */}
    </div>
  );
}
{/* <Link href="/KohChung" className={`link ${pathname === '/KohChung' ? 'active-link' : ''}`}>Koh Chung</Link>
<Link href="/ChangMai" className={`link ${pathname === '/ChangMai' ? 'active-link' : ''}`}>Chang Mai</Link>
<Link href="/Phuket" className={`link ${pathname === '/Phuket' ? 'active-link' : ''}`}>Phuket</Link>
<Link href="/Kunchunabury" className={`link ${pathname === '/Kunchunabury' ? 'active-link' : ''}`}>Kunchunabury</Link> */}
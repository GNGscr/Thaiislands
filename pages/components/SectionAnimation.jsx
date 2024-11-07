import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import mainLogo from '../public/images/svg-logo-loader.svg';

const SectionAnimation = ({ menuIsActive, title }) => {
    return (
        <motion.div
            className="slide-in"
            initial={{ scaleY: 0 }}
            animate={ menuIsActive ? { scaleY: 1 } : { scaleY: 0 } }
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <h1 className="slide-in-header text-9xl font-bold">{title}</h1>
            {/* <Image className="main-logo" src={mainLogo} alt="img" /> */}
        </motion.div>
    );
};

export default SectionAnimation;


// style={{
//     // backgroundImage: 'url("https://www.hover.dev/black-noise.png")',
//     backgroundImage: 'url("https://www.hover.dev/noise.png")',
//   }}
//   className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
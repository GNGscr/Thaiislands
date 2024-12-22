import React, { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { usePathname } from 'next/navigation';
import CreatedBy from "./CreatedBy";

export default function Noise({ data, lang }) {

  const pathname = usePathname();
  const pages = [
    {
      "district": "Surathani",
      "paths": [
        { "label": "KohPhangan", "link": "/koh-phangan", "isActive": true },
        { "label": "KohSamui", "link": "/koh-samui", "isActive": true },
        { "label": "KohTao", "link": "/koh-tao", "isActive": true }
      ]
    },
    {
      "district": "Mueang",
      "paths": [
        { "label": "Phuket", "link": "/", "isActive": false },
        { "label": "KohChang", "link": "/", "isActive": false },
        { "label": "someIsland", "link": "/", "isActive": false }
      ]
    },
    {
      "district": "North",
      "paths": [
        { "label": "ChiangMai", "link": "/", "isActive": false },
        { "label": "kanchanaburi", "link": "/", "isActive": false },
        { "label": "someIsland", "link": "/", "isActive": false }
      ]
    },
  ];

  return (
    // NOTE: An overflow of hidden will be required on a wrapping
    // element to see expected results
    <div className="relative overflow-hidden">
      <ExampleContent pages={pages} pathname={pathname} />
      <NoiseComponent />
    </div>
  );
};

const NoiseComponent = () => {
  return (
    <motion.div
      initial={{ transform: "translateX(-10%) translateY(-10%)" }}
      animate={{
        transform: "translateX(10%) translateY(10%)",
      }}
      transition={{
        repeat: Infinity,
        duration: 0.2,
        ease: "linear",
        repeatType: "mirror",
      }}
      // You can download these PNGs here:
      // https://www.hover.dev/black-noise.png
      // https://www.hover.dev/noise.png
      style={{
        backgroundImage: 'url("https://www.hover.dev/black-noise.png")',
        // backgroundImage: 'url("https://www.hover.dev/noise.png")',
      }}
      className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
  );
};

const ExampleContent = ({pages, pathname}) => {
  const [isColorRed, setIsColorRed] = useState(false);
  const linkClicked = (e, isActive) => !isActive ?? e.preventDefault(); // Prevent default anchor behavior;
  return (
    <div className="relative grid h-[350px] place-content-center space-y-6 bg-neutral-950 p-8 text-white">
      <div className="inner-footer relative -top-[30] text-neutral-20 w-fit px-4 py-2 font-semibold text-neutral-200 transition-colors">
        <div className="flex gap-[15rem] w-[50%]">
            {
                pages.map((page, i) => {
                    return (
                        <div key={i} className="text-[1.1rem] pt-3">

                            <div className="footer-th font-bold pb-2">{page.district}</div>
                            {
                              page.paths.map(({label, link, isActive}, i) => {
                                return (
                                  <a key={i} href={isActive ? link : '/about'}
                                    onClick={(e) => !isActive ?? e.preventDefault()}
                                    className={isActive ? '' : 'disabled'}
                                    style={isActive ? { opacity: 1 } : { opacity: 0.5} }
                                  >
                                    <motion.div
                                      className="footer-link flex"
                                      style={{ color: isColorRed === false && pathname === link ? '#ff0000' : '#fff' }}
                                      whileHover={ isActive ? { color: '#ff0000' } : {} }
                                      onMouseEnter={() => isActive ? setIsColorRed(true) : null}
                                      onMouseLeave={() => isActive ? setIsColorRed(false) : null}>
                                        {label.split('').map((letter, index) => <div key={index}>{letter}</div>)}
                                    </motion.div>
                                  </a>
                                )
                              })
                            }

                        </div>
                    )
                })
            }
        </div>
        <div className="credits mt-[4.15rem] mb-[1.5rem] text-[0.95rem]">

          <CreatedBy />

          <div className="rights-reserved">
              All rights reserved to 
              <span
                className="text-[#ff0000] ml-1 mr-1 font-bold"
                style={{opacity: 0.9}}>
                  Daniel Ehrlich
              </span>
              <span className="text-[2rem] mt-[-1.5rem] ml-[-0.15rem]">
                .
              </span>
          </div>
        </div>
        </div>
    </div>
  );
};
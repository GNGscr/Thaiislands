import React, { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import CreatedBy from "./CreatedBy";

export default function Noise({ data, lang }) {
  return (
    // NOTE: An overflow of hidden will be required on a wrapping
    // element to see expected results
    <div className="relative overflow-hidden">
      <ExampleContent />
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

const ExampleContent = () => {
  const [isColorRed, setIsColorRed] = useState(false);
  const [scope, animate] = useAnimate();

    // // Set menu main div to be y position 0 visible and toggleSvg bool value on initial load
    useEffect(() => {
      // console.log(scope.current.children)
      animate(scope.current.children, { color: '#ff0000', duration: 1, });
      // Cleanup function to reset the menu main div after initial load for further animations
      return () => {
        // animate(scope.current.children.main, { color: '#fff' });
      };
    }, [isColorRed]);

  return (
    <div className="relative grid h-[350px] place-content-center space-y-6 bg-neutral-950 p-8 text-white">
      <div className="relative -top-[30] text-neutral-20 w-fit px-4 py-2 font-semibold text-neutral-200 transition-colors">
        <div className="flex gap-[15rem] w-[50%]">
            {
                [...Array(3)].map((_, i) => {
                    return (
                        <div key={i} className="text-[1.1rem] pt-3">

                            <div className="footer-th font-bold pb-2">Networks</div>
                            {
                              [
                                {net: 'Facebook', link: ''},
                                {net: 'Instagram', link: ''},
                                {net: 'LinkedIn', link: ''}
                              ].map((network, i) => {
                                return (
                                  <a href={network.link} key={i}>
                                    <motion.div className="flex" whileHover={() => setIsColorRed(true)} ref={scope}>
                                      {network.net.split('').map((letter, index) => {
                                        return (
                                          <div key={index}>{letter}</div>
                                          )
                                        })}
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
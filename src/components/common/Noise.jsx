import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import CreatedBy from "../landing/CreatedBy";
import FooterNoisePages from "../../public/data/footerNoisePages.json";

export default function Noise() {

  const pathname = usePathname();
  return (
    // NOTE: An overflow of hidden will be required on a wrapping  element to see expected results
    <div className="relative overflow-hidden">
      <PagesLinks pages={FooterNoisePages} pathname={pathname} />

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
        style={{
          backgroundImage: 'url("https://www.hover.dev/black-noise.png")',
        }}
        className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
    />
    </div>
  );
};

const PagesLinks = ({ pages, pathname }) => {

  const [isColorRed, setIsColorRed] = useState(false);

  if (!pages) return;

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
                    page.paths.map(({ label, link, isActive }, i) => {
                      const isCurrent = pathname === link;
                      const disabled = !isActive;

                      return (
                        <a key={i}
                          href={isActive ? link : '/about'}
                          onClick={(e) => {
                            if (disabled) e.preventDefault();
                          }}
                          className={disabled ? 'disabled' : ''}
                          style={{ opacity: disabled ? 0.5 : 1 }}
                          aria-disabled={disabled}
                          tabIndex={disabled ? -1 : 0}
                          aria-label={label}
                        >
                          <motion.div
                            className="footer-link flex"
                            style={{ color: !isColorRed && isCurrent ? '#ff0000' : '#fff' }}
                            whileHover={isActive ? { color: '#ff0000' } : {}}
                            onMouseEnter={() => setIsColorRed(true)}
                            onMouseLeave={() => setIsColorRed(false)}>
                            {label.split('').map((letter, index) => <div key={index}>{letter}</div>)}
                          </motion.div>
                        </a>
                      )
                    })
                  }

                </div>
              )
              })}
        </div>
        <div className="credits mt-[4.15rem] mb-[1.5rem] text-[0.95rem]">

          <CreatedBy />

          <div className="rights-reserved">
            All rights reserved to
            <span
              className="text-[#ff0000] ml-1 mr-1 font-bold"
              style={{ opacity: 0.9 }}>
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
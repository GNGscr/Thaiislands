"use client";
import React, { useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';

export default function ScreenFitText({text, isOnCarousal}) {
  
  const pathname = usePathname();
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    resizeText();

    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  const resizeText = () => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) {
      return;
    }

    const containerWidth = container.offsetWidth;
    let min = 1;
    let max = 2500;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = mid + "px";

      if (text.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    text.style.fontSize = max + "px";
  };

  return (
    <div
      className={`screen-fix-txt flex h-[250px] w-full items-center justify-center overflow-hidden
        relative ${isOnCarousal ? 'bottom-[-35rem] mt-[-20rem]' : 'mt-[-15rem]'}`}
      ref={containerRef}
    >
      <span
        style={ pathname === '/koh-samui'
          ? { bottom: '-50px'}
          : pathname === '/koh-tao'
          ? { bottom: '-105px'}
          : { bottom: 0 }
          }
        className="absolute bottom-0 left-0 whitespace-nowrap text-center
          font-bold uppercase text-slate-700 opacity-[0.03]"
        ref={textRef}
      >
        {text}
      </span>
    </div>
  );
};









// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { getGlobalLanguage } from "../config";
// import { usePathname } from 'next/navigation';

// export default function ScreenFitText({text, isOnCarousal}) {
  
//   const [ language, setLanguage ] = useState("en");
//   const containerRef = useRef(null);
//   const pathname = usePathname().replace('/', '');
//   const textRef = useRef(null);
  
//   useEffect(() => {
//     resizeText();
//     window.addEventListener("resize", resizeText);

//     return () => {
//       window.removeEventListener("resize", resizeText);
//     };
//   }, [language === getGlobalLanguage()]);

//   const resizeText = () => {
//     const container = containerRef.current;
//     const text = textRef.current;

//     if (!container || !text) {
//       return;
//     }

//     const containerWidth = container.offsetWidth;
//     let min = 1;
//     let max = 2500;

//     while (min <= max) {
//       const mid = Math.floor((min + max) / 2);
//       text.style.fontSize = mid + "px";

//       if (text.offsetWidth <= containerWidth) {
//         min = mid + 1;
//       } else {
//         max = mid - 1;
//       }
//     }

//     text.style.fontSize = max + "px";
//   };

//   return (
//     <div
//       className={`screen-fix-txt flex h-[${pathname === 'koh-samui' && !isOnCarousal ? '300px' : '250px'}]
//         w-full items-center justify-center overflow-hidden
//         relative ${isOnCarousal ? 'bottom-[-35rem] mt-[-20rem]' : 'mt-[-15rem]'}`}
//       ref={containerRef}
//     >
//       <span
//         className={`absolute bottom-0 left-0 whitespace-nowrap text-center
//         font-bold uppercase text-slate-700 opacity-[0.03]
//         ${pathname === 'koh-samui' && isOnCarousal ? 'top: 3rem' : ''}`}
//         ref={textRef}
//       >
//         {text}
//       </span>
//     </div>
//   );
// };

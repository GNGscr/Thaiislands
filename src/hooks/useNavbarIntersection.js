"use client";
import { useEffect } from "react";

export default function useNavbarIntersection({
  data,
  language,
  currentMedia,
  setCurrentButton,
  setPosition,
  navButtonsPositionMedia,
  directionToOffset
}) {
    useEffect(() => {

        const intersections =
          document.querySelectorAll([...data["navbar"][currentMedia][language].map((item) =>
            item.intersectionId)]);
        const intersectionsIterator = (entries) => {
    
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const intersectingEntry = entry.target.id.replace('#', '');
              setCurrentButton(intersectingEntry); // Saves the intersecting button
              setPosition({
                [directionToOffset[language]]:
                  navButtonsPositionMedia[currentMedia][language][intersectingEntry][directionToOffset[language]],
                width: navButtonsPositionMedia[currentMedia][language][intersectingEntry].width,
                opacity: 1,
              });
            }
          });
        };
        
        const observer = new IntersectionObserver(intersectionsIterator);
        [...intersections].forEach(intersection => observer.observe(intersection));
    
        return () => observer.disconnect(); // Cleanup observer
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [data, language, currentMedia]);
}

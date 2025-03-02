import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SelectInput({ regions = [], filterRegion, isFiltering }) {
  let regionNames = regions ? ["All Regions", ...regions.map(r => r.regionName.en)] : [];
  const [value, setValue] = useState(regionNames[0]);

  useEffect(() => {}, [value]);

  if (!regions && !regionNames) return;

  const filterChange = e => {
    setValue(e.target.value);
    filterRegion(e.target.value);
  };
  
  return (
    <motion.div 
      className="filter-selector"
      transition={{ duration: 0.5, delay: 0 }}
      initial={{ display: 'none', x: '0.5rem', opacity: 0 }}
      animate={{
        display: isFiltering ? 'flex' : 'none',
        x: isFiltering ? "-0.5rem" : 0,
        opacity: isFiltering ? 1 : 0
      }}
    >
      <select
        value={value}
        onChange={e => filterChange(e)}
      >
        {regionNames.map((rName, index) => {
          return <option key={index} value={rName}>{rName}</option>;
        })}
      </select>
      
      {/* <button className="filter-btn" onClick={() => filterRegion(value)}>Filter</button> */}
    </motion.div>
  );
}



// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function SelectInput({ regions=[], filterRegion, isFiltering }) {
    
//     let regionNames = regions ? ["All Regions", ...regions.map(r => r.regionName.en)] : [];
//     const [value, setValue] = useState(regionNames[0]);

//     useEffect(() => {
//     }, [value]);
  
//     if (!regions && !regionNames) return;
//     return (
//       <motion.div className="filter-selector"
//         transition={{ duration: 0.5, delay: 0 }}
//         initial={{ display: 'none', x: '0.5rem', opacity: 0 }}
//         animate={{
//             display: isFiltering ? 'flex' : 'none',
//             x: isFiltering ? "-0.5rem" : 0,
//             opacity: isFiltering ? 1 : 0
//         }}>
//         <select
//           value={value}
//           onChange={e => setValue(e.target.value)}
//         >
//             {regionNames.map((rName, index) => {
//                 return <option key={index} value={rName}>{rName}</option>
//             })}
//         </select>
  
//         <button className="filter-btn" onClick={() => filterRegion(value)}>Filter</button>
//       </motion.div>
//     );
//   }





        // "he": "אתר אגודה יותר מומלץ במזרח ולכן החלטתי לשתף לינקים שלהם, כחלק שירותי של האפליקציה, אני משתף קישורים ישירים למלונות שלהם. אני מתכנת מעצב ומאפיין. אם אתם נהנים מהחוויה של האתר, ותרצו שאבנה לכם משהו גם, אתם מוזמנים לפנות אליי דרך הקישור שבסוף העמוד.",
        // "en": "Agoda's site is more recommended in the east, so I decided to become their affiliate. As part of my service, I share direct links to their hotels. When you book through the link....."
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SelectInput({ regions, filterRegion, isFiltering }) {
    
    let regionNames = ["All Regions", ...regions.map(r => r.regionName.en)];
    const [value, setValue] = useState(regionNames[0]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
    }, [value]);
  
    if (!regionNames) return;
    return (
      <motion.div className="filter-selector"
        transition={{ duration: 0.5, delay: 0 }}
        initial={{ display: 'none', x: '0.5rem', opacity: 0 }}
        animate={{
            display: isFiltering ? 'flex' : 'none',
            x: isFiltering ? "-0.5rem" : 0,
            opacity: isFiltering ? 1 : 0
        }}>
        <select
          value={value}
          onChange={handleChange}
        >
            {regionNames.map((rName, index) => {
                return <option key={index} value={rName}>{rName}</option>
            })}
        </select>
  
        <button className="filter-btn" onClick={() => filterRegion(value)}>Filter</button>
      </motion.div>
    );
  }
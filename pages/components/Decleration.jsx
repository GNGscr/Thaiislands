import { motion } from "framer-motion";

export default function Decleration ({ data, lang }) {
    if (!data) return;
    return (
      <div className="decleration-wrapper">
        <motion.div
          className="decleration"
          initial={{ opacity: 0, y: "120%", }}
          whileInView={{ opacity: 1, y: 0, }}
          transition={{ duration: 0.75, type: "spring" }}
        >
          <span className="text-7xl text-[#ccc] relative top-[-0.75rem]"></span>
          {data["article-second-paragraph"][lang]}
          <div
            className={`blink-emoji text-[2.25rem] absolute bottom-[-0.5rem]
              ${lang === 'he' ? 'left-80' : 'right-60'} pl-9`}>
            😉
          </div>
          <span className="text-7xl text-[#ccc]" style={{ transform: "rotateZ(180deg)" }}></span>
        </motion.div>
    </div>
    )
  }
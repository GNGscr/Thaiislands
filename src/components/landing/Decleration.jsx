import { motion } from "framer-motion";
import styles from '../styles/Main.module.css';
import emojiStyles from '../styles/BlinkEmoji.module.css';

export default function Decleration ({ data, lang }) {
    if (!data) return;
    return (
      <div className={styles.declerationWrapper}>
        <motion.div
          className={styles.decleration}
          initial={{ opacity: 0, y: "120%", }}
          whileInView={{ opacity: 1, y: 0, }}
          transition={{ duration: 0.75, type: "spring" }}
        >
          <span className="text-7xl text-[#ccc] relative top-[-0.75rem]"></span>
          {data["article-second-paragraph"][lang]}
          <div
            className={`${emojiStyles.blinkEmoji} text-[2.25rem] absolute bottom-[-0.5rem]
              ${lang === 'he' ? emojiStyles.he : emojiStyles.en} pl-9`}>
            😉
          </div>
          <span className="text-7xl text-[#ccc]" style={{ transform: "rotateZ(180deg)" }}></span>
        </motion.div>
    </div>
    )
  }
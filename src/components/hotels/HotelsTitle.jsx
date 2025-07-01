import { motion } from "framer-motion";

export default function HotelsTitle({ title }) {
  return (
    <motion.h2
      className="hotels-title"
      initial={{ opacity: 0, letterSpacing: '10px' }}
      whileInView={{ opacity: 0.7, letterSpacing: '0px' }}
      transition={{ duration: 0.5 }}
    >
      {title}
    </motion.h2>
  );
}

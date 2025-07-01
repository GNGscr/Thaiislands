import { motion } from "framer-motion";
import Link from "next/link";
import lang from '../public/data/en.json';

const NotFoundMessage = ({ message }) => {
  const { LANG } = lang;
  return (
    <div className="centered-content">
      <Link href='/' className="back-btn">
        {LANG.BACK_BTN}
      </Link>
      <motion.p
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 2.15, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}>
          {message} 😕
      </motion.p>
    </div>
  )
}

export default NotFoundMessage;
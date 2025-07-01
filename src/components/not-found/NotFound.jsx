import { motion } from "framer-motion";
import Link from "next/link";
import { LANG } from "@/src/constants/lang/en";

const NotFoundMessage = ({ message }) => {
  const { BACK_BTN } = LANG;
  return (
    <div className="centered-content">
      <Link href='/' className="back-btn">
        {BACK_BTN}
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
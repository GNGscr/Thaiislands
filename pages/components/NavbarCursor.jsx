import { motion } from "framer-motion";
export default function NavbarCursor ({ position, currentMedia }) {
    return (
      <motion.li
        animate={{ ...position }}
        className="absolute z-0 h-7 rounded-full bg-black md:h-12"
        style={
          currentMedia === 'mobile' ? { height: '2.25rem' }
            : currentMedia === 'tablet' ? { height: '2.65rem' }
              : { height: '3rem' }
        }
      />
    );
  };
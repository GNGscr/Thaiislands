import Image from "next/image";
import { motion } from "framer-motion";
import InstagramPlainIcon from '../public/images/instagram-plain.svg';

const ShineButton = ({ isLogoSection }) => {
  
    return (
        <a style={{ zIndex: 0 }}
          href={isLogoSection
          ? "https://facebook.com" 
          : "https://www.instagram.com/daniel__ehrlich/"}
          target="_blank" rel="noopener noreferrer">
          <motion.button
            className={`w-full flex justify-center rounded bg-neutral-900 px-9 py-3 text-xl
              text-white transition-colors md:w-fit shadow-lg`}
            style={{ minWidth: 180 }}
            initial={{ "--x":  "100%", scale: 1}}
            animate={{ "--x":  "-100%" }}
            whileTap={{ scale: 0.97 }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              repeatDelay: 1,
              type: "spring",
              stiffness: 20,
              damping: 15,
              mass: 2,
              scale: {
                  type: "spring",
                  stiffness: 10,
                  damping: 5,
                  mass: 0.1
              }
            }}
            >
              <span className={`text-neutral-100 tracking-wide flex justify-center
                font-light h-full w-full block relative linear-mask`}>
                {
                  isLogoSection
                  ? <div className="instagram-icon-btn">
                        <svg data-name="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.5 58" fill="#fff" style={{ width: '12px', marginRight: '-1.25px' }}>
                          <path d="m20.72,22.16c2.77,0,5.55.02,8.32.03.4,0,.8.02,1.2.03.07.06.14.13.21.19-.28,1.58-.56,3.16-.83,4.75-.32,1.87-.64,3.74-.99,5.76-1.37.13-2.76-.07-4.14-.04-1.36.03-2.72,0-4.2,0-.13,8.38.12,16.72.11,25.11h-11.17v-24.91H0v-10.81h9.16c.04-.39.11-.71.11-1.02-.01-1.58-.05-3.17-.06-4.75-.01-1.62-.16-3.26.02-4.85.19-1.69.64-3.35,1.52-4.86,1.36-2.33,3.28-4.06,5.58-5.4,1.39-.81,2.94-1.25,4.52-1.3C24.28-.03,27.71.02,31.15,0c.07,0,.13.05.35.14.04,3.3-.29,6.66-.18,10.11-1.13,0-2.15.03-3.17,0-1.57-.07-3.15-.06-4.65.46-1.42.49-2.46,1.4-2.89,2.95-.3,1.08-.36,2.16-.34,3.25.04,1.69.13,3.38.2,5.07.08.06.16.13.24.19Z"></path>
                        </svg>
                        <div>acebook</div>
                    </div>
                  : <div className="instagram-icon-btn">
                      <Image src={InstagramPlainIcon} width="16" alt="instagram icon" />
                      Instagram
                    </div>
                }
              </span>
          </motion.button>
        </a>
    )
}

export default ShineButton;
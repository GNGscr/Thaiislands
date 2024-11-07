import { motion } from "framer-motion";
import Image from "next/image";
import LinkTreeIcon from '../public/images/linktree-logo.svg';
import InstagramPlainIcon from '../public/images/instagram-plain.svg';

const ShineButton = ({ isLogoSection, data }) => {
  // if (data) {
  //   console.log('data', data.linktreeLink);
  //   console.log('data', data.instagramLink);
  // }
  
    return (
        <a
          href={isLogoSection
          ? "https://linktr.ee/bagditravel" 
          : "https://www.instagram.com/idobagdi/"}
          >
          <motion.button
            className={`w-full flex justify-center rounded bg-neutral-900 px-9 py-3 text-xl
              text-white transition-colors md:w-fit mt-5 z-8 shadow-lg`}
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
                  ? <Image src={LinkTreeIcon} width="85" className="py-1" alt="linktree icon" />
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
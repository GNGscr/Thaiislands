/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import starSvg from '../public/images/star.svg';

const DefaultCard = ({
    hotelName="",
    numOfStars=2,
    content="",
    googleScore=0,
    link="",
    image="",
    lang,
    media
}) => {

    const [ isContentVisible, setIsContentVisible  ] = useState(false);
    const ctaButtonLang = {
        "he": "להזמנת חדר במלון",
        "en": "Order Room",
      };

    const handleClick = () => {
        setIsContentVisible(!isContentVisible);
    }

    return (
        <div className="flex items-center justify-center">
        <div className="flip-card w-[352px] h-[294.42px] rounded-md" 
          onClick={() => handleClick()}>
            <div className="flip-card-inner w-[100%] h-[100%]">
              <div className={`flip-card-front w-[100%] h-[100%] bg-cover
                  border-[1px] text-white rounded-[6px] relative`}
                style={{ backgroundImage: `url(${image})` }}>

                <img src={image} width="100" height="100" alt="img" 
                    style={!!isContentVisible ? { filter: 'blur(2.5px) brightness(0.75)'} : {} }
                    className="w-[100%] h-[100%] rounded-[6px] absolute top-0 left-0 z-1" />

                <div className="card-front-mask" />
                <motion.div initial={{ opacity: 1 }}
                    animate={{ opacity: !isContentVisible ? 1 : 0 }}
                    transition={{ duration: 0.15, type: 'spring' }}
                    className="stars-wrapper flex gap-[0.1rem] z-2 absolute top-5 left-5">
                    {
                    [...Array(numOfStars)].map((_, i) => {
                        return <Image key={i} src={starSvg} className="star-icon" alt="img"  />
                    })
                    }
                </motion.div>

                <motion.div initial={{ opacity: 1, width: '100%' }}
                    animate={!isContentVisible ? { opacity: 1, width: '100%' } : { opacity: 0, width: 0  }}
                    transition={{ duration: 0.15, type: 'spring' }}
                    className="front-hotel-name-wrapper">
                  <motion.div className="card-front-hotel-name"
                    initial={{ opacity: 1 }}
                    animate={!isContentVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.15, type: 'spring' }}
                    style={media === "mobile"
                        ? { "WebkitTextStroke": "0.15px #333" }
                        : { "WebkitTextStroke": "0.65px #777" }}>
                    {hotelName}
                  </motion.div>  
                </motion.div>
                <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isContentVisible ? 1 : 0 }}
                transition={{ duration: 0.15, type: 'spring' }}
                className={`w-[100%] h-[100%] bg-cover text-black rounded-[6px] relative flex flex-col p-[0.5rem]`}>
                    <motion.div initial={{ opacity: 0 }}
                        animate={{ opacity: isContentVisible ? 1 : 0 }}
                        transition={{ duration: 0.15, type: 'spring', delay: 0.15 }}
                        className="flip-card-back-inner">
                            <div className="card-header">{hotelName}</div>
                            <div className="card-content">{content}</div>
                            <div className="score-wrapper">
                                <div className="google-score">
                                    <div>{googleScore}</div>
                                    <div>-</div>
                                    <div>
                                      {lang === 'he' ? 'ציון גוגל' : 'Google Score'}
                                    </div>
                                </div>

                                <div className="star-score flex gap-[0.25rem]">
                                    {
                                        [...Array(numOfStars)].map((star, i) => {
                                            return <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 34" width="13" height="13" id="star">
                                                        <path fill="#FFED76" d="M19.6859343,0.861782958 L24.8136328,8.05088572 C25.0669318,8.40601432 25.4299179,8.6717536 25.8489524,8.80883508 L34.592052,11.6690221 C35.6704701,12.021812 36.2532905,13.1657829 35.8938178,14.2241526 C35.8056709,14.4836775 35.6647294,14.7229267 35.4795411,14.9273903 L29.901129,21.0864353 C29.5299163,21.4962859 29.3444371,22.0366367 29.3872912,22.5833831 L30.1116131,31.8245163 C30.1987981,32.9368499 29.3506698,33.9079379 28.2172657,33.993502 C27.9437428,34.0141511 27.6687736,33.9809301 27.4085205,33.8957918 L18.6506147,31.0307612 C18.2281197,30.8925477 17.7713439,30.8925477 17.3488489,31.0307612 L8.59094317,33.8957918 C7.51252508,34.2485817 6.34688429,33.6765963 5.98741159,32.6182265 C5.90066055,32.3628116 5.86681029,32.0929542 5.88785051,31.8245163 L6.61217242,22.5833831 C6.65502653,22.0366367 6.46954737,21.4962859 6.09833466,21.0864353 L0.519922484,14.9273903 C-0.235294755,14.0935658 -0.158766688,12.8167745 0.690852706,12.0755971 C0.899189467,11.8938516 1.14297067,11.7555303 1.40741159,11.6690221 L10.1505113,8.80883508 C10.5695458,8.6717536 10.9325319,8.40601432 11.1858308,8.05088572 L16.3135293,0.861782958 C16.9654141,-0.0521682813 18.2488096,-0.274439442 19.1800736,0.365326425 C19.3769294,0.500563797 19.5481352,0.668586713 19.6859343,0.861782958 Z"></path>
                                                        <path fill="#83751b" d="M18.7022469,29.7633426 L29.1611722,33.6861584 C28.8859085,33.8576358 28.5650147,33.9672494 28.2172657,33.993502 C27.9437428,34.0141511 27.6687736,33.9809301 27.4085205,33.8957918 L18.6506147,31.0307612 C18.2281197,30.8925477 17.7713439,30.8925477 17.3488489,31.0307612 L8.59094317,33.8957918 C7.98083887,34.0953792 7.34281791,33.9989813 6.83864817,33.6859784 L17.2977531,29.7633426 C17.7505234,29.5935537 18.2494766,29.5935537 18.7022469,29.7633426 Z"></path>
                                                    </svg>
                                        })
                                    }
                                </div>
                            </div>

                            <a href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-[100%] z-10 card-button">
                                {ctaButtonLang[lang]}
                            </a>
                    </motion.div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: !isContentVisible ? 1 : 0 }}
                    transition={{ duration: 0.15, type: 'spring' }}
                    style={{ rotate: '180deg' }}
                    className="absolute bottom-[2rem]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30.002" height="15" viewBox="0 0 15.802 8.73"><path fill="#fff" data-name="angle-small-down" d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21A1,1,0,0,0,5.29,9.62l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" transform="translate(19.001 16.087) rotate(180)"></path></svg>
                </motion.div>
              </div>
            </div>
        </div>
    </div>
    )
}; 

export default DefaultCard;
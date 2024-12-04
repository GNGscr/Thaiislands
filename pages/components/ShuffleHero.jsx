
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import imgSrc from '../../pages/public/images/summer-luxury-beach-resort-and-spa.webp';
import kohPhanganData from "../public/data/kohPhanganData.json";
import { useGlobalSettings } from './GlobalSettings';
import Navbar from "./Navbar";
import RevealLinks from "./RevealLinks";
// import squareDataJson from "../../pages/public/data/squareData.json";

const he = "he";
const en = "en";
const HE_IL = 'he-IL';
const EN_US = 'en-US';

export default function ShuffleHero() {
  const { language, setLanguage, currentMedia } = useGlobalSettings();
  let [menuIsActive, setMenuIsActive] = useState(false);
  const [ stateLanguage, setStateLanguage ] = useState("en");
  let globalLanguage = language;
  
  // let mainHtml;
  // useEffect(() => {
  // }, [stateLanguage]);

  const toggleLanguage = () => {

    if (globalLanguage === en) {
      setStateLanguage(he);
      setLanguage(he);
    } else { 
      setStateLanguage(en);
      setLanguage(en); 
    }
  }
  
  return (
    <section className={`w-full mt-[-1.25rem] px-8 py-12 grid grid-cols-1 md:grid-cols-2
        items-center gap-[7.5rem] max-w-6xl mx-auto text-white`}
        style={{ textAlign: globalLanguage === en ? 'left' : 'right'}}>
      <div className="about-nav flex justify-end w-full h-[60px] fixed top-[1rem] right-0">
        <RevealLinks toggleLanguage={toggleLanguage} lang={language} />
      </div>
      <div className="about-us">
        <h3 className={`text-1xl md:text-[2rem] font-semibold about-us-title`}>
          {kohPhanganData.aboutUsPage.header[globalLanguage]}
        {/* 😉 */}
        </h3>
        <p className={`text-base md:text-3xl text-slate-700 my-4 md:my-6 about-us-title text-white`}>
          {kohPhanganData.aboutUsPage.subHeader[globalLanguage]}
        </p>
        <div className="flex justify-between mt-[7.5rem] w-[96%] z-5 page-btns-wrp">
          {
            kohPhanganData.aboutUsPage.pages.map((page, index) => {
              return (
                <motion.a
                  key={index}
                  href={page.link}
                  className={`w-[32%] page-btn font-medium w-[100%]
                      py-3 px-4 rounded transition-all active:scale-95`}
                    initial={{ color: "#000", backgroundColor: "#fff", rotateX: 0 }}
                    whileHover={{ fontWeight: 600, letterSpacing: "0.005rem", color: "rgb(252 165 165 / 1)", backgroundColor: "#000", rotateX: 360 }}
                    transition={{ duration: .1, delay: 0.065 }}>
                    {page.label[globalLanguage]}
                </motion.a>
              )
            })}
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    link: "https://agoda.tp.st/3D7ZBbac",
    label: "Sabaii Bay Resort",
    id: 1,
    src: "https://pix8.agoda.net/hotelImages/281786/-1/91b569d25172cb7afc157ae5f01e64cf.jpg?ca=21&ce=0&s=1024x",
  },
  {
    link: "V-View Beach Resort",
    label: "https://agoda.tp.st/l7yX8nfw",
    id: 2,
    src: "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/518472395.jpg?k=363cd4b3eba3d3331c5813fb147aac64a0b15e9e66ca401dc9c42664c04cdc67&o=&s=600x",
  },
  {
    link: "https://agoda.tp.st/KPKaWglL",
    label: "Samutra Residences",
    id: 3,
    src: "https://pix8.agoda.net/hotelImages/6361579/-1/ceb6fd59eeaa5ac5818fd085fb590183.jpg?ca=9&ce=1&s=1024x",
  },
  {
    link: "https://agoda.tp.st/Zc2a5DmZ",
    label: "The Briza Beach Resort",
    id: 4,
    src: "https://pix8.agoda.net/property/56142378/0/26611d48d5e085b1a8a39add64625deb.jpeg?ce=0&s=1024x",
  },
  {
    link: "https://www.agoda.com/he-il/the-stay-chaweng-beach-resort/hotel/koh-samui-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2025-01-14&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-TeBqFx.Gq7i7pgefvXOOuw&tspTypes=16,8&los=9&searchrequestid=fba4760c-b2f8-4831-a69d-5b5065c8d1b8",
    label: "The Stay Chaweng Beach Resort",
    id: 5,
    src: "https://pix8.agoda.net/hotelImages/12535923/-1/9e0057b7ea6c163ef5c61197e6894e86.png?ce=0&s=600x",
  },
  {
    link: "https://www.agoda.com/he-il/sala-samui-chaweng-beach/hotel/koh-samui-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2024-12-26&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-TeBqFx.Gq7i7pgefvXOOuw&tspTypes=16%2C8&los=5&searchrequestid=089a5992-f7b4-4261-be60-11e1bb696892&ds=zTngnL4FZMhoJG6Z",
    label: "SALA Samui Chaweng Beach Resort",
    id: 6,
    src: "https://pix8.agoda.net/hotelImages/1624710/-1/2383a9ca837d5376485954b13d82b53d.jpg?ca=0&ce=1",
  },
  {
    link: "https://www.agoda.com/he-il/prana-resorts-samui/hotel/koh-samui-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2024-12-26&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-TeBqFx.Gq7i7pgefvXOOuw&tspTypes=16%2C8&los=5&searchrequestid=089a5992-f7b4-4261-be60-11e1bb696892&ds=zTngnL4FZMhoJG6Z",
    label: "https://pix8.agoda.net/hotelImages/711844/-1/40fe3be7479b8633315481ffce0f0773.jpg?ca=10&ce=1",
    id: 7,
    src: "https://pix8.agoda.net/hotelImages/711844/-1/40fe3be7479b8633315481ffce0f0773.jpg?ca=10&ce=1",
  },
  {
    link: "https://www.agoda.com/he-il/blue-diamond-resort/hotel/koh-tao-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2025-01-14&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-FzCArkm4t4jZzY4Dp5zh1g&tspTypes=16&los=11&searchrequestid=59795f23-f4cd-4d4c-aba2-d34ec072eca3",
    label: "Blue Diamond Resort",
    id: 8,
    src: "https://pix8.agoda.net/hotelImages/276726/-1/a04891291da1efe410d26e8dde38ed50.jpg?ce=0&s=600x",
  },
  {
    link: "https://www.agoda.com/he-il/ananda-villa/hotel/koh-tao-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2025-01-14&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-FzCArkm4t4jZzY4Dp5zh1g&tspTypes=2,16,-1&los=11&searchrequestid=59795f23-f4cd-4d4c-aba2-d34ec072eca3",
    label: "Ananda Villa",
    id: 9,
    src: "https://pix8.agoda.net/hotelImages/186821/-1/b6069893536e38105d7f8bfb29a608a6.jpg?ca=0&ce=1&s=600x",
  },
  {
    link: "https://www.agoda.com/he-il/koh-tao-regal-resort/hotel/koh-tao-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2025-01-14&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-FzCArkm4t4jZzY4Dp5zh1g&tspTypes=9,16&los=11&searchrequestid=59795f23-f4cd-4d4c-aba2-d34ec072eca3",
    label: "Koh Tao Regal Resort",
    id: 10,
    src: "https://pix8.agoda.net/hotelImages/187066/-1/f45fa58631e95b464d15aa088363cc87.jpg?ca=20&ce=0&s=600x",
  },
  {
    link: "https://agoda.tp.st/KohTaoVilla",
    label: "Ao Leuk Villa",
    id: 11,
    src: "https://pix8.agoda.net/hotelImages/6361579/-1/ceb6fd59eeaa5ac5818fd085fb590183.jpg",
  },
  {
    link: "https://www.agoda.com/he-il/ban-s-diving-resort/hotel/koh-tao-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2025-01-14&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-FzCArkm4t4jZzY4Dp5zh1g&tspTypes=9,16&los=11&searchrequestid=59795f23-f4cd-4d4c-aba2-d34ec072eca3",
    label: "Ban's Diving Resort",
    id: 12,
    src: "https://pix8.agoda.net/hotelImages/300564/-1/092f3610af4c2444051e5dd4112e99c9.jpg?ca=20&ce=0&s=600x",
  },
  {
    link: "https://www.agoda.com/he-il/prana-resorts-samui/hotel/koh-samui-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2024-12-26&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-TeBqFx.Gq7i7pgefvXOOuw&tspTypes=16%2C8&los=5&searchrequestid=089a5992-f7b4-4261-be60-11e1bb696892&ds=zTngnL4FZMhoJG6Z",
    label: "PRANA RESORT NANDANA",
    id: 13,
    src: "https://pix8.agoda.net/hotelImages/711844/-1/40fe3be7479b8633315481ffce0f0773.jpg?ca=10&ce=1",
  },
  {
    link: "https://www.agoda.com/he-il/le-murraya-resort/hotel/koh-samui-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2024-12-26&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-TeBqFx.Gq7i7pgefvXOOuw&los=5&searchrequestid=089a5992-f7b4-4261-be60-11e1bb696892&ds=zTngnL4FZMhoJG6Z",
    label: "Le Murraya Resort",
    id: 14,
    src: "https://pix8.agoda.net/hotelImages/109095/-1/d72596229f1907d120f503f214b4a231.jpg?ca=20&ce=0",
  },
  {
    link: "https://www.agoda.com/he-il/weekender-resort/hotel/koh-samui-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2024-12-26&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-TeBqFx.Gq7i7pgefvXOOuw&tspTypes=2%2C16%2C8&los=5&searchrequestid=089a5992-f7b4-4261-be60-11e1bb696892&ds=zTngnL4FZMhoJG6Z",
    label: "Weekender Resort",
    id: 15,
    src: "https://pix8.agoda.net/hotelImages/10822/-1/c2b62e500b078c959b7316c371b1453e.jpg?ca=25&ce=0",
  },
  {
    link: "https://www.agoda.com/he-il/the-samui-beach-resort/hotel/koh-samui-th.html?finalPriceView=2&isShowMobileAppPrice=false&cid=1802322&numberOfBedrooms=&familyMode=false&adults=1&children=0&rooms=1&maxRooms=0&checkIn=2024-12-26&isCalendarCallout=false&childAges=&numberOfGuest=0&missingChildAges=false&travellerType=0&showReviewSubmissionEntry=false&currencyCode=ILS&isFreeOccSearch=false&tag=S.SrDsqSOWQ-TeBqFx.Gq7i7pgefvXOOuw&tspTypes=16&los=5&searchrequestid=089a5992-f7b4-4261-be60-11e1bb696892&ds=zTngnL4FZMhoJG6Z",
    label: "The Samui Beach Resort",
    id: 16,
    src: "https://pix8.agoda.net/hotelImages/1184542/-1/b00a577c9d4bcc115dda0a3db1d8326f.png?ca=25&ce=0",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 4500);
  };

  return (
    <div className="shuffle grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

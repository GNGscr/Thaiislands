/* eslint-disable @next/next/no-img-element */
import locationSVG from "../public/images/location-sign-svgrepo-com.svg";

export default function Card({ card, media }) {
    if (!card) return;
    return (
      <div
        key={card.id}
        className={`horizontal-scroll-group 
          relative h-[91.5${media === 'desktop' ? 'vh' : 'dvh'}] w-[97.5vw] overflow-hidden 
          bg-neutral-200 rounded-3xl`}>
        <div
          style={{
            backgroundImage: `url(${[card.url]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="rest-link">
          <a href={card.link} target="_blank" rel="noopener noreferrer">
            <img src={locationSVG.src} width="50" height="50" alt="location icon" />
          </a>
        </div>
        <div className="absolute inset-0 z-10 grid place-content-center">
          <p style={{ textAlign: 'center' }}
            className={`bg-gradient-to-br from-white/20 to-white/0 p-8 
            text-6xl font-black uppercase text-white backdrop-blur-lg`}>
            {card.title}
          </p>
        </div>
        <div className="rest-card-content"> {card.content ? card.content : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vero cum deserunt vel voluptatum officiis nisi, ipsam totam fugiat? Facere voluptates dolor id nesciunt quod.'}</div>
      </div>
    );
  };
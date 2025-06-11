"use client";
import { useEffect, useState } from "react";

export default function MapEmbed({ link, lang }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !link || !lang) return null;

  return (
    <div className="map-responsive">
        <iframe src={data.googleMap.link}
        width={lang === "Koh Phangan" ? "600" : "100%"}
        height="450"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Responsive Google Map">
        </iframe>
    </div>
  );
}

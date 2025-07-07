import StickyImage from "./StickyImage";
import OverlayOpacity from "../common/OverlayOpacity";

export default function TextParallaxContent ({
    imgUrl,
    subheading,
    heading,
    isMapVisible,
    isCtaButton,
    isHeader,
    data,
    lang,
    activateMenuIsActive,
    title,
    media,
    router,
    children
  }) {
    return (
      <div style={{ paddingLeft: 12, paddingRight: 12, height: '100svh' }}>
        <div className={`relative h-[150vh] ${!isMapVisible ? 'not-map' : ''}`} id={`${isMapVisible ? 'map-img' : ''}`}>
          <StickyImage imgUrl={imgUrl} isMapVisible={isMapVisible} data={data} media={media} router={router} />
          <OverlayOpacity
            heading={heading}
            subheading={subheading}
            isCtaButton={isCtaButton}
            isHeader={isHeader}
            data={data}
            lang={lang}
            activateMenuIsActive={activateMenuIsActive}
            title={title}
            media={media}
          />
        </div>
        {children}
      </div>
    );
  };
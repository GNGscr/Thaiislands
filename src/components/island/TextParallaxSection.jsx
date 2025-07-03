"use client";
import StickyImage from "./StickyImage";
import OverlayCopy from "../common/OverlayOpacity";

const IMG_PADDING = 12;

export default function TextParallaxSection({
    imgUrl,
    subheading,
    heading,
    children,
    isMapVisible,
    isCtaButton,
    isHeader,
    data,
    lang,
    activateMenuIsActive,
    title,
    media,
    router
  }) {
    
    return (
      <div
        style={{
          paddingLeft: IMG_PADDING,
          paddingRight: IMG_PADDING,
        }}
      >
        <div className={`relative h-[150vh]`} id={`${isMapVisible ? 'map-img' : ''}`}>
          <StickyImage imgUrl={imgUrl} isMapVisible={isMapVisible} data={data} media={media} router={router} />
          <OverlayCopy
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
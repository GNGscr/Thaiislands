const setInnerWidth = ({ sendCurrentMedia }) => {
  const innerWidth = window.innerWidth;
  switch (innerWidth) {
    case innerWidth < 680:
      sendCurrentMedia("mobile");
      localStorage.setItem("media", "mobile");
      break;
    case innerWidth < 1080:
      sendCurrentMedia("tablet");
      localStorage.setItem("media", "tablet");
      break;
    case innerWidth > 1080:
      sendCurrentMedia("desktop");
      localStorage.setItem("media", "desktop");
      break;
  
    default:
      break;
  }
};

export default setInnerWidth;
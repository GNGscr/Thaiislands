const RegionsTitleAnimationJson = {
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      slideStart: { y: ["15px", 0], opacity: [0, 1] },
      slideEnd: { y: [0, "15px"], opacity: [1, 0] }
    },
    initial: ["hidden"],
    whileInView: ["hidden", "slideStart"],
    exit: ["visible", "slideEnd"],
    viewport: { amount: 0.4 },
    transition: { type: "spring", duration: 1, bounce: 0 }
};

export default RegionsTitleAnimationJson;
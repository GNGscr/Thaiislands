const MobileOneRowCardsAnimationJson = {
    0: {
      variants: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        slideStart: { y: [0, "50px"], opacity: [0, 0] },
        slideEnd: { y: ["50px", 0], opacity: [0, 1] },
      },
      initial: ["hidden", "slideStart"],
      whileInView: ["visible", "slideEnd"],
      exit: ["visible", "slideStart"],
      viewport: { amount: 0.4 },
      transition: { type: "tween", duration: 0.4, bounce: 0.15, stiffness: 75, },
    }
};

export default MobileOneRowCardsAnimationJson;
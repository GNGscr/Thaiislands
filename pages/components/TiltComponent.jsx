import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import ShineButton from "./ShineButton";

const TiltComponent = ({ isLogoSection, data }) => {
  return (
    <div className={`grid h-[30px] w-[175px] place-content-center ${isLogoSection ? 'mb-16' : ''}`}>
      <TiltCardComponent isLogoSection={isLogoSection} data={data} />
    </div>
  );
};

const ROTATION_RANGE = 22.5;
const HALF_ROTATION_RANGE = 22.5 / 2;

const TiltCardComponent = ({ isLogoSection, data }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-16 w-48"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transform, zIndex: 0 }}>
      <div className="absolute inset-4 grid place-content-center"
          style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
            <p className="tilt-card text-gray-600 text-center text-2xl font-bold shadow-lg"
              style={{ transform: "translateZ(50px)" }}>
                <ShineButton isLogoSection={isLogoSection} data={data} />
            </p>
      </div>
    </motion.div>
  );
};

export default TiltComponent;
import Image from "next/image";
import smallSvgLoader from "../public/images/small-svg-logo-loader.svg";

export default function LogoLoader() {
  return (
    <section className="svg-logo-loader-wrapper relative">
      <Image src={smallSvgLoader.src} alt="small svg loader" width="50" height="50" />
    </section>
  );
}
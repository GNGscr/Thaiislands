import Tab from "./Tab";
import Cursor from "./Cursor";

export default function NavTabs({ data, lang, position, setPosition, pathname, currentMedia, onButtonClick, directionToOffset }) {
  const navbar = data["navbar"][currentMedia][lang];

  return (
    <ul className={`navbar-ul mx-auto rounded-full gap-3 p-1 ${['/about', '/'].includes(pathname) ? 'invisible' : 'visible'}`}>
      {navbar.map(({ href, label }) => (
        <a key={label} href={href} onClick={(e) => onButtonClick(e, label, href.replace('#', ''))}>
          <Tab
            lang={lang}
            setPosition={setPosition}
            label={label}
            directionToOffset={directionToOffset}
          >
            {label}
          </Tab>
        </a>
      ))}
      <Cursor position={position} currentMedia={currentMedia} />
    </ul>
  );
}

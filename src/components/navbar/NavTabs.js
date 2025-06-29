import Tab from "./Tab";
import Cursor from "./Cursor";

export default function NavTabs({ data, lang, position, setPosition, pathname, currentMedia, onButtonClick, directionToOffset }) {
  if (!data) return;
  const navbar = data["navbar"][currentMedia][lang];

  return (
    <ul className={`navbar-ul mx-auto rounded-full gap-3 p-1 ${['/about', '/'].includes(pathname) ? 'invisible' : 'visible'}`}>
      {navbar.map(({ href, label }) => (
        <li
          key={label}
        >
          <a
          href={href}
          onClick={(e) => onButtonClick(e, label, href.replace('#', ''))}
        >
          <Tab
            lang={lang}
            setPosition={setPosition}
            label={label}
            directionToOffset={directionToOffset}
          >
            {label}
          </Tab>
        </a>

        </li>
      ))}
      <Cursor position={position} currentMedia={currentMedia} />
    </ul>
  );
}

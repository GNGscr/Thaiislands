import NavbarTab from './NavbarTab';
import NavbarCursor from './NavbarCursor';

export default function NavbarSlideTabs ({ setPosition, position, navbar, lang, onButtonClick, pathname, currentMedia, directionToOffset }) {  
    return (
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className={`navbar-ul mx-auto rounded-full gap-3 p-1
          ${pathname === '/about' || pathname === '/' ? 'invisible' : 'visible'}`}
      >
        { navbar ?
          navbar.map(({ href, label }) => {
            return (
              <a 
                href={href}  // Set current button on click
                onClick={(e) => onButtonClick(e, label, href.replace('#', ''))}
                key={label}>
                <NavbarTab
                  lang={lang}
                  setPosition={setPosition}
                  directionToOffset={directionToOffset}
                >
                  {label}
                </NavbarTab>
              </a>
            );
          }) : ''
        }
        <NavbarCursor position={position} currentMedia={currentMedia} />
      </ul>
    );
  };
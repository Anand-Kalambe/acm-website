import React, { useState, useMemo } from 'react';

const navLinks = [
  { title: 'Home', path: '#' },
  { title: 'Events', path: 'Event' },
  { title: 'Team', path: 'Team' },
  { title: 'Publications', path: 'Publications' },
  { title: 'Blogs', path: 'Blog' },
];

const Navbar = ({ isMobile }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const styles = useMemo(() => ({
    nav: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end', // Aligns menu to the right
      alignItems: 'center',
      padding: isMobile ? '1.5rem 2rem' : '1.5rem 4rem',
      boxSizing: 'border-box',
      zIndex: 1000,
      fontFamily: "'Inter', sans-serif",
    },
    desktopMenu: {
      display: 'flex',
      gap: '2.5rem',
    },
    // desktopLink styles are now in index.css
    burger: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      width: '2rem',
      height: '2rem',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      zIndex: 10,
    },
    burgerLine: {
      width: '2rem',
      height: '0.25rem',
      background: 'white',
      borderRadius: '10px',
      transition: 'all 0.3s linear',
      position: 'relative',
      transformOrigin: '1px',
    },
    burgerLine1Open: {
      transform: 'rotate(45deg)',
    },
    burgerLine2Open: {
      opacity: 0,
      transform: 'translateX(20px)',
    },
    burgerLine3Open: {
      transform: 'rotate(-45deg)',
    },
    mobileMenu: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.9)',
      height: '100vh',
      width: '100vw',
      textAlign: 'center',
      padding: '2rem',
      position: 'fixed',
      top: 0,
      left: 0,
      transition: 'transform 0.3s ease-in-out',
      transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
    },
    mobileLink: {
      fontSize: '2rem',
      textTransform: 'uppercase',
      padding: '2rem 0',
      fontWeight: 'bold',
      letterSpacing: '0.5rem',
      color: 'white',
      textDecoration: 'none',
      transition: 'color 0.3s linear',
    },
  }), [isMobile, menuOpen]);

  return (
    <nav style={styles.nav}>
      {isMobile ? (
        <>
          <button onClick={() => setMenuOpen(!menuOpen)} style={styles.burger} aria-label="Toggle menu">
            <div style={{ ...styles.burgerLine, ...(menuOpen ? styles.burgerLine1Open : {}) }} />
            <div style={{ ...styles.burgerLine, ...(menuOpen ? styles.burgerLine2Open : {}) }} />
            <div style={{ ...styles.burgerLine, ...(menuOpen ? styles.burgerLine3Open : {}) }} />
          </button>
          <div style={styles.mobileMenu}>
            {navLinks.map((link) => (
              <a key={link.title} href={link.path} style={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                {link.title}
              </a>
            ))}
          </div>
        </>
      ) : (
        <div style={styles.desktopMenu}>
          {navLinks.map((link) => (
            // --- THIS IS THE CHANGED PART ---
            <a
              key={link.title}
              href={link.path}
              className="desktop-nav-link" // We use a class instead of inline styles
            >
              {link.title}
            </a>
            // --- END OF CHANGE ---
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
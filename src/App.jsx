import React from 'react';
import PublicationsTimeline from './components/PublicationsTimeline';
import Footer from './components/Footer';

// --- NEW IMPORTS ---
import Header from './components/Header';
import Logo from './components/Logo';

// Import the images for the header
import Home from './assets/Home.png';
import Events from './assets/Events.png';
import Publications from './assets/Publications.png';
import OurTeam from './assets/Our_Team.png';
import Blog from './assets/Blogs.png';

// The new Header has its own CSS, so we import it
import './components/Header.css';
import './components/Logo.css';


function App() {
  // 1. Initialize the items array as requested
  const items = [
    {
      label: "Home",
      bgImage: Home,
      textColor: "#fff",
      href: "/",
    },
    {
      label: "Events",
      bgImage: Events,
      textColor: "#fff",
      href: "/Events",
    },
    {
      label: "Publications",
      bgImage: Publications,
      textColor: "#fff",
      href: "/Publications",
    },
    {
      label: "Our Team",
      bgImage: OurTeam,
      textColor: "#fff",
      href: "/Our-Team",
    },
    {
      label: "Blog",
      bgImage: Blog,
      textColor: "#fff",
      href: "/Blogs",
    }
  ];

  return (
    // This is correct. It's relative, and does NOT
    // block the height of the page.
    <div className="relative">
      
      {/* Screen 1: Your Header */}
      <Header
        logo={<Logo />}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      
      {/* Screen 2 & 3: Your Publications component */}
      <PublicationsTimeline />
      
      {/* Screen 4: Your Footer */}
      <Footer />
    </div>
  );
}

export default App;
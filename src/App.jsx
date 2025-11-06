import React from 'react';
import PublicationsTimeline from './components/PublicationsTimeline';
import Footer from './components/Footer';

// --- NEW IMPORTS ---



// Import the images for the header


// The new Header has its own CSS, so we import it




function App() {
  // 1. Initialize the items array as requested
 

  return (
    // This is correct. It's relative, and does NOT
    // block the height of the page.
    <div className="relative">
      
      {/* Screen 1: Your Header */}
     
      
      {/* Screen 2 & 3: Your Publications component */}
      <PublicationsTimeline />
      
      {/* Screen 4: Your Footer */}
      <Footer />
    </div>
  );
}

export default App;
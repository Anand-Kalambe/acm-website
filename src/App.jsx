import React from 'react';
import PublicationsTimeline from './components/PublicationsTimeline';
import Navbar from './components/Navbar';
import useIsMobile from './hooks/useIsMobile';

function App() {
  const isMobile = useIsMobile(); // Hook will return true/false

  return (
    <>
      <Navbar isMobile={isMobile} />
      <PublicationsTimeline />
    </>
  );
}

export default App;
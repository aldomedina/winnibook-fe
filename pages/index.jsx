import { useState } from 'react';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';
const bottomNavItems = [
  { id: 'search', name: 'search', icon: 'search' },
  { id: 'featured', name: 'Featured business' },
  { id: 'latest', name: 'Latest stories' },
  { id: 'top', name: 'Top search this week' },
  { id: 'map', name: 'Winnimap' }
];

const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [showLogo, setShowLogo] = useState(true);
  return (
    <div>
      <TopNav logoActive={showLogo} />
      <BottomNav
        items={bottomNavItems}
        active={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
};
export default Home;

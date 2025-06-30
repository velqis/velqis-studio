import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiVideo, 
  FiImage, 
  FiMusic, 
  FiClock, 
  FiSettings 
} from 'react-icons/fi';

const SidebarContainer = styled.div`
  width: 80px;
  background: ${props => props.theme.secondary};
  border-right: 1px solid ${props => props.theme.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  background: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
  cursor: pointer;
`;

const NavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const NavItem = styled(motion.button)`
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 12px;
  background: ${props => props.active ? props.theme.accent : 'transparent'};
  color: ${props => props.active ? '#ffffff' : props.theme.textSecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${props => props.active ? props.theme.accent : props.theme.border};
    color: ${props => props.active ? '#ffffff' : props.theme.text};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  left: 60px;
  background: ${props => props.theme.secondary};
  color: ${props => props.theme.text};
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  border: 1px solid ${props => props.theme.border};
  z-index: 1000;
  pointer-events: none;
`;

const BottomItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const navItems = [
  { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/video', icon: FiVideo, label: 'Video' },
  { path: '/image', icon: FiImage, label: 'Image' },
  { path: '/music', icon: FiMusic, label: 'Music' },
  { path: '/history', icon: FiClock, label: 'History' }
];

const bottomItems = [
  { path: '/settings', icon: FiSettings, label: 'Settings' }
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = React.useState(null);

  const isActive = (path) => location.pathname === path;

  return (
    <SidebarContainer>
      <Logo onClick={() => navigate('/dashboard')}>
        V
      </Logo>
      
      <NavItems>
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            active={isActive(item.path)}
            onClick={() => navigate(item.path)}
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon />
            {hoveredItem === item.path && (
              <Tooltip
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {item.label}
              </Tooltip>
            )}
          </NavItem>
        ))}
      </NavItems>

      <BottomItems>
        {bottomItems.map((item) => (
          <NavItem
            key={item.path}
            active={isActive(item.path)}
            onClick={() => navigate(item.path)}
            onMouseEnter={() => setHoveredItem(item.path)}
            onMouseLeave={() => setHoveredItem(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <item.icon />
            {hoveredItem === item.path && (
              <Tooltip
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {item.label}
              </Tooltip>
            )}
          </NavItem>
        ))}
      </BottomItems>
    </SidebarContainer>
  );
}

export default Sidebar; 
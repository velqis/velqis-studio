import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiVideo, FiImage, FiMusic, FiArrowRight } from 'react-icons/fi';
import { GRADIENTS } from '../constants';

const DashboardContainer = styled.div`
  padding: 40px;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Space Grotesk', sans-serif;
  background: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.textSecondary};
  font-weight: 400;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const ToolCard = styled(motion.div)`
  background: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 30px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient};
  }
`;

const ToolIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: ${props => props.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    width: 28px;
    height: 28px;
    color: white;
  }
`;

const ToolTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 8px;
`;

const ToolDescription = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  margin-bottom: 20px;
  line-height: 1.5;
`;

const ToolButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${props => props.theme.accent};
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
  }
`;

const QuickStats = styled.div`
  background: ${props => props.theme.secondary};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 24px;
`;

const StatsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => props.theme.text};
  margin-bottom: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.accent};
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.textSecondary};
`;

const tools = [
  {
    id: 'video',
    title: 'Video Generator',
    description: 'Create stunning videos from text prompts or transform images into dynamic video content',
    icon: FiVideo,
    gradient: GRADIENTS.video,
    path: '/video'
  },
  {
    id: 'image',
    title: 'Image Generator', 
    description: 'Generate high-quality images from text descriptions using advanced AI models',
    icon: FiImage,
    gradient: GRADIENTS.image,
    path: '/image'
  },
  {
    id: 'music',
    title: 'Music Generator',
    description: 'Compose original music tracks with AI based on your creative descriptions',
    icon: FiMusic,
    gradient: GRADIENTS.music,
    path: '/music'
  }
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <DashboardContainer>
      <Header>
        <Title>Welcome to Velqis AI Studio</Title>
        <Subtitle>Create amazing content with our AI-powered creative tools</Subtitle>
      </Header>

      <ToolsGrid>
        {tools.map((tool, index) => (
          <ToolCard
            key={tool.id}
            gradient={tool.gradient}
            onClick={() => navigate(tool.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ToolIcon gradient={tool.gradient}>
              <tool.icon />
            </ToolIcon>
            <ToolTitle>{tool.title}</ToolTitle>
            <ToolDescription>{tool.description}</ToolDescription>
            <ToolButton>
              Get Started <FiArrowRight />
            </ToolButton>
          </ToolCard>
        ))}
      </ToolsGrid>

      <QuickStats>
        <StatsTitle>Quick Stats</StatsTitle>
        <StatsGrid>
          <StatItem>
            <StatValue>0</StatValue>
            <StatLabel>Videos Created</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>0</StatValue>
            <StatLabel>Images Generated</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>0</StatValue>
            <StatLabel>Music Tracks</StatLabel>
          </StatItem>
        </StatsGrid>
      </QuickStats>
    </DashboardContainer>
  );
}

export default Dashboard; 
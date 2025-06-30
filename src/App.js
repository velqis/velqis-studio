import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import VideoTool from './components/VideoTool';
import ImageTool from './components/ImageTool';
import MusicTool from './components/MusicTool';
import Settings from './components/Settings';
import History from './components/History';
import Dashboard from './components/Dashboard';

import { THEMES, ANIMATIONS } from './constants';
import { useElectronStore } from './hooks/useElectronStore';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.accent};
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${props => props.theme.primary};
`;

const PageContainer = styled(motion.div)`
  flex: 1;
  overflow: auto;
  position: relative;
`;

function App() {
  const [currentTheme, setCurrentTheme] = useElectronStore('theme', 'dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.electronAPI) {
      const handleSwitchTool = (event, tool) => {
        window.location.hash = `#/${tool}`;
      };

      const handleOpenSettings = () => {
        window.location.hash = '#/settings';
      };

      const handleNewProject = () => {
        window.location.hash = '#/dashboard';
      };

      window.electronAPI.menu.onSwitchTool(handleSwitchTool);
      window.electronAPI.menu.onOpenSettings(handleOpenSettings);
      window.electronAPI.menu.onNewProject(handleNewProject);

      return () => {
        window.electronAPI.removeAllListeners('switch-tool');
        window.electronAPI.removeAllListeners('open-settings');
        window.electronAPI.removeAllListeners('new-project');
      };
    }
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider theme={THEMES[currentTheme]}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <TitleBar />
          <ContentContainer>
            <Sidebar />
            <MainContent>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <PageContainer {...ANIMATIONS.fadeIn}>
                        <Dashboard />
                      </PageContainer>
                    } 
                  />
                  <Route 
                    path="/video" 
                    element={
                      <PageContainer {...ANIMATIONS.slideUp}>
                        <VideoTool />
                      </PageContainer>
                    } 
                  />
                  <Route 
                    path="/image" 
                    element={
                      <PageContainer {...ANIMATIONS.slideUp}>
                        <ImageTool />
                      </PageContainer>
                    } 
                  />
                  <Route 
                    path="/music" 
                    element={
                      <PageContainer {...ANIMATIONS.slideUp}>
                        <MusicTool />
                      </PageContainer>
                    } 
                  />
                  <Route 
                    path="/history" 
                    element={
                      <PageContainer {...ANIMATIONS.fadeIn}>
                        <History />
                      </PageContainer>
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <PageContainer {...ANIMATIONS.scale}>
                        <Settings onThemeChange={setCurrentTheme} />
                      </PageContainer>
                    } 
                  />
                </Routes>
              </AnimatePresence>
            </MainContent>
          </ContentContainer>
        </AppContainer>
      </Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: THEMES[currentTheme].secondary,
            color: THEMES[currentTheme].text,
            border: `1px solid ${THEMES[currentTheme].border}`
          }
        }}
      />
    </ThemeProvider>
  );
}

export default App; 
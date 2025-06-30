import React from 'react';
import styled from 'styled-components';

const TitleBarContainer = styled.div`
  height: 30px;
  background: ${props => props.theme.secondary};
  border-bottom: 1px solid ${props => props.theme.border};
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
  user-select: none;
  position: relative;
`;

const TitleText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme.textSecondary};
  font-family: 'Inter', sans-serif;
`;

const WindowControls = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  display: flex;
  -webkit-app-region: no-drag;
`;

const ControlButton = styled.button`
  width: 46px;
  height: 30px;
  border: none;
  background: transparent;
  color: ${props => props.theme.textSecondary};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.danger ? '#e74c3c' : props.theme.border};
    color: ${props => props.danger ? '#ffffff' : props.theme.text};
  }

  &.close:hover {
    background: #e74c3c;
    color: white;
  }
`;

function TitleBar() {
  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.window?.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI) {
      window.electronAPI.window?.toggleMaximize();
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.window?.close();
    }
  };

  const platform = window.electronAPI?.platform || 'win32';

  if (platform === 'darwin') {
    return null;
  }

  return (
    <TitleBarContainer>
      <TitleText>Velqis AI Studio</TitleText>
      <WindowControls>
        <ControlButton onClick={handleMinimize} title="Minimize">
          ⎼
        </ControlButton>
        <ControlButton onClick={handleMaximize} title="Maximize">
          ⧠
        </ControlButton>
        <ControlButton onClick={handleClose} className="close" title="Close">
          ✕
        </ControlButton>
      </WindowControls>
    </TitleBarContainer>
  );
}

export default TitleBar; 
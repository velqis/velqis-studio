# Velqis AI Studio - Desktop Application

A powerful desktop application for AI-powered content creation. Generate videos, images, and music directly on your computer using advanced artificial intelligence models.

## Project Description

Velqis AI Studio is a cross-platform desktop application built with Electron and React that provides an intuitive interface for creating multimedia content using AI. The application integrates with the Velqis API to offer professional-grade AI tools for creative professionals, content creators, and anyone looking to leverage artificial intelligence for content generation.

The application features a modern, dark-themed interface with smooth animations and a streamlined workflow that makes AI content creation accessible to users of all skill levels. Built with performance and user experience in mind, it provides real-time feedback, progress tracking, and local storage of generation history.

## Key Features

**Video Generation**
- Create videos from text descriptions
- Transform static images into dynamic video content
- Support for multiple AI models including Runway Gen-3, Stable Video Diffusion, and Velqis Video Pro
- Configurable duration settings from 3 to 30 seconds
- High-quality output in multiple resolutions

**Image Generation**
- Generate high-quality images from text prompts
- Multiple variation support (1-4 images per generation)
- Advanced AI models including Flux Pro, DALL-E 3, and Velqis Image Pro
- Various aspect ratios and resolutions
- Batch processing capabilities

**Music Generation**
- Compose original music tracks using AI
- Detailed prompt-based music creation
- Multiple duration options from 10 seconds to 3 minutes
- Support for various musical styles and genres
- High-quality audio output formats

**Application Features**
- Cross-platform compatibility (Windows, macOS, Linux)
- Modern dark/light theme interface
- Real-time generation progress tracking
- Local project history and management
- Drag-and-drop file upload support
- Keyboard shortcuts for enhanced productivity
- Automatic updates and error handling

## Technology Stack

- **Electron** - Cross-platform desktop application framework
- **React** - Modern UI framework for component-based architecture
- **Styled Components** - CSS-in-JS styling solution
- **Framer Motion** - Animation library for smooth transitions
- **React Router** - Client-side routing for navigation
- **React Hot Toast** - Elegant notification system
- **React Dropzone** - File upload functionality
- **Velqis API** - AI service integration

## Installation

### Prerequisites
- Node.js 16.0.0 or higher
- npm 8.0.0 or higher

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/velqis/desktop.git
   cd velqis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API settings**
   - Launch the application
   - Navigate to Settings
   - Enter your Velqis API key
   - Configure endpoint preferences

## Development

### Development Mode
```bash
npm run dev
```
This command starts both the React development server and Electron in development mode with hot reloading.

### Production Build
```bash
npm run build
npm start
```

### Platform-Specific Builds
```bash
# Windows installer
npm run build:win

# macOS disk image
npm run build:mac

# Linux AppImage
npm run build:linux
```

## Usage Guide

### Video Generation
1. Open the Video tool (Ctrl/Cmd + 1)
2. Enter a detailed description of the desired video
3. Optionally upload a base image
4. Select AI model and duration preferences
5. Click Generate Video to start the process

### Image Generation
1. Access the Image tool (Ctrl/Cmd + 2)
2. Provide a comprehensive image description
3. Choose the number of variations (1-4)
4. Select the preferred AI model
5. Initiate generation with the Generate Image button

### Music Generation
1. Navigate to the Music tool (Ctrl/Cmd + 3)
2. Describe the desired musical style and mood
3. Set the track duration
4. Start generation process

## Configuration Options

**API Settings**
- API Endpoint - Velqis API server URL
- API Key - Authentication credentials
- WebSocket Endpoint - Real-time communication

**Application Preferences**
- Output Directory - Local file save location
- Default Models - Preferred AI models for each content type
- Theme Selection - Dark or light interface theme
- Auto-open Results - Automatically display generated content

## Project Structure

```
velqis/
├── src/
│   ├── components/          # React UI components
│   │   ├── Dashboard.js     # Main dashboard interface
│   │   ├── VideoTool.js     # Video generation interface
│   │   ├── ImageTool.js     # Image generation interface
│   │   ├── MusicTool.js     # Music generation interface
│   │   ├── Sidebar.js       # Navigation sidebar
│   │   ├── TitleBar.js      # Custom title bar
│   │   ├── Settings.js      # Application settings
│   │   └── History.js       # Generation history
│   ├── hooks/               # Custom React hooks
│   │   └── useElectronStore.js
│   ├── utils/               # Utility functions and API clients
│   ├── constants.js         # Application constants and configuration
│   ├── main.js              # Electron main process
│   ├── preload.js           # Electron preload script
│   ├── App.js               # Root React component
│   └── index.js             # Application entry point
├── public/                  # Static assets
├── assets/                  # Application icons and resources
└── package.json             # Dependencies and build scripts
```

## API Integration

The application communicates with the Velqis API for:
- Content generation requests across multiple AI models
- Real-time progress tracking via WebSocket connections
- Model availability and capability queries
- User authentication and usage tracking

## Build Configuration

The application uses Electron Builder for creating distributable packages:
- Windows: NSIS installer with automatic updates
- macOS: DMG disk image with code signing support
- Linux: AppImage with desktop integration

## Development Guidelines

**Code Style**
- ESLint configuration for consistent code formatting
- Styled Components for component styling
- Functional React components with hooks
- TypeScript-ready architecture

**Testing**
- Jest testing framework integration
- Component unit testing capabilities
- End-to-end testing with Playwright

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support and Documentation

- **Email Support**: support@velqis.ai
- **Community Discord**: [Velqis Community](https://discord.gg/velqis)
- **API Documentation**: [docs.velqis.ai](https://docs.velqis.ai)
- **Issue Tracking**: [GitHub Issues](https://github.com/velqis/desktop/issues)
- **Release Notes**: [GitHub Releases](https://github.com/velqis/desktop/releases)

## System Requirements

**Minimum Requirements**
- Operating System: Windows 10, macOS 10.15, or Ubuntu 18.04
- Memory: 4 GB RAM
- Storage: 500 MB available space
- Network: Internet connection for API access

**Recommended Requirements**
- Memory: 8 GB RAM or higher
- Storage: 2 GB available space for generated content
- Graphics: Dedicated GPU for optimal performance 
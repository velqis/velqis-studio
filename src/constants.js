const API_ENDPOINTS = {
  PRODUCTION: 'https://api.velqis.ai/v1',
  DEVELOPMENT: 'http://localhost:8080/api/v1',
  STAGING: 'https://staging-api.velqis.ai/v1'
};

const WS_ENDPOINTS = {
  PRODUCTION: 'wss://ws.velqis.ai',
  DEVELOPMENT: 'ws://localhost:8080',
  STAGING: 'wss://staging-ws.velqis.ai'
};

const MODELS = {
  VIDEO: {
    runway: 'Runway Gen-3',
    stable: 'Stable Video Diffusion',
    pika: 'Pika Labs 1.0',
    zeroscope: 'Zeroscope XL',
    velqis: 'Velqis Video Pro'
  },
  IMAGE: {
    flux: 'Flux Pro 1.1',
    sdxl: 'Stable Diffusion XL',
    dalle: 'DALL-E 3',
    midjourney: 'Midjourney v6',
    velqis: 'Velqis Image Pro'
  },
  MUSIC: {
    musicgen: 'Meta MusicGen',
    suno: 'Suno v3.5',
    mubert: 'Mubert AI',
    velqis: 'Velqis Music Pro'
  }
};

const DURATIONS = {
  VIDEO: [3, 5, 10, 15, 30],
  MUSIC: [10, 15, 30, 60, 120, 180]
};

const RESOLUTIONS = {
  VIDEO: {
    '720p': { width: 1280, height: 720 },
    '1080p': { width: 1920, height: 1080 },
    '4K': { width: 3840, height: 2160 }
  },
  IMAGE: {
    'Square': { width: 1024, height: 1024 },
    'Portrait': { width: 768, height: 1344 },
    'Landscape': { width: 1344, height: 768 },
    'Wide': { width: 1536, height: 640 }
  }
};

const FILE_FORMATS = {
  VIDEO: ['.mp4', '.mov', '.webm'],
  IMAGE: ['.jpg', '.jpeg', '.png', '.webp'],
  MUSIC: ['.mp3', '.wav', '.flac', '.ogg']
};

const MAX_PROMPT_LENGTH = {
  VIDEO: 500,
  IMAGE: 400,
  MUSIC: 250
};

const DEFAULT_CONFIG = {
  apiEndpoint: API_ENDPOINTS.PRODUCTION,
  wsEndpoint: WS_ENDPOINTS.PRODUCTION,
  apiKey: '',
  outputDir: './downloads',
  maxConcurrent: 3,
  autoOpen: false,
  saveHistory: true,
  theme: 'dark',
  defaultModels: {
    video: 'velqis',
    image: 'flux',
    music: 'velqis'
  },
  defaultResolutions: {
    video: '1080p',
    image: 'Square'
  }
};

const THEMES = {
  dark: {
    primary: '#000000',
    secondary: '#1a1a1a',
    accent: '#00D4FF',
    text: '#ffffff',
    textSecondary: '#888888',
    border: '#333333',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336'
  },
  light: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    accent: '#00D4FF',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336'
  }
};

const GRADIENTS = {
  video: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  music: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  primary: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)'
};

const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }
};

const STATUS_TYPES = {
  IDLE: 'idle',
  LOADING: 'loading',
  GENERATING: 'generating',
  SUCCESS: 'success',
  ERROR: 'error'
};

module.exports = {
  API_ENDPOINTS,
  WS_ENDPOINTS,
  MODELS,
  DURATIONS,
  RESOLUTIONS,
  FILE_FORMATS,
  MAX_PROMPT_LENGTH,
  DEFAULT_CONFIG,
  THEMES,
  GRADIENTS,
  ANIMATIONS,
  STATUS_TYPES
}; 
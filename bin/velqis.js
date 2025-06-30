#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const boxen = require('boxen');
const gradientString = require('gradient-string');
const fs = require('fs');
const path = require('path');

const videoCommands = require('../src/commands/video');
const imageCommands = require('../src/commands/image');
const musicCommands = require('../src/commands/music');
const configManager = require('../src/utils/config');
const { displayBanner, displayHelp } = require('../src/utils/display');

const program = new Command();

function showWelcome() {
  console.log(gradientString.pastel.multiline(
    figlet.textSync('VELQIS', { 
      horizontalLayout: 'full',
      font: 'ANSI Shadow'
    })
  ));
  
  console.log(boxen(
    chalk.white('AI Creative Tools - Command Line Interface\n') +
    chalk.gray('Generate videos, images, and music with AI\n\n') +
    chalk.cyan('🎬 Video Generation') + chalk.gray(' - Create videos from text or images\n') +
    chalk.magenta('🎨 Image Generation') + chalk.gray(' - Generate images from descriptions\n') +
    chalk.green('🎵 Music Generation') + chalk.gray(' - Compose music with AI'),
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
      backgroundColor: '#1a1a1a'
    }
  ));
}

program
  .name('velqis')
  .description('Velqis AI Creative Tools - CLI')
  .version('1.0.0')
  .hook('preAction', (thisCommand, actionCommand) => {
    if (actionCommand.name() === 'velqis') {
      showWelcome();
    }
  });

program
  .command('video')
  .description('🎬 Generate videos with AI')
  .action(() => {
    videoCommands.showVideoMenu();
  });

program
  .command('generate-video')
  .alias('gv')
  .description('Generate a video from text prompt')
  .option('-p, --prompt <text>', 'Video generation prompt')
  .option('-i, --image <path>', 'Input image for video generation')
  .option('-d, --duration <seconds>', 'Video duration (5, 10)', '5')
  .option('-m, --model <model>', 'AI model to use', 'runway')
  .option('-o, --output <path>', 'Output directory', './downloads')
  .action(videoCommands.generateVideo);

program
  .command('image')
  .description('🎨 Generate images with AI')
  .action(() => {
    imageCommands.showImageMenu();
  });

program
  .command('generate-image')
  .alias('gi')
  .description('Generate images from text prompt')
  .option('-p, --prompt <text>', 'Image generation prompt')
  .option('-v, --variations <number>', 'Number of image variations (1-4)', '1')
  .option('-m, --model <model>', 'AI model to use', 'flux')
  .option('-o, --output <path>', 'Output directory', './downloads')
  .action(imageCommands.generateImage);

program
  .command('music')
  .description('🎵 Generate music with AI')
  .action(() => {
    musicCommands.showMusicMenu();
  });

program
  .command('generate-music')
  .alias('gm')
  .description('Generate music from text prompt')
  .option('-p, --prompt <text>', 'Music generation prompt')
  .option('-d, --duration <seconds>', 'Music duration', '30')
  .option('-o, --output <path>', 'Output directory', './downloads')
  .action(musicCommands.generateMusic);

program
  .command('config')
  .description('⚙️  Manage configuration settings')
  .action(() => {
    configManager.showConfigMenu();
  });

program
  .command('setup')
  .description('🔧 Initial setup and API key configuration')
  .action(() => {
    configManager.runSetup();
  });

program
  .command('history')
  .description('📜 Show generation history')
  .option('-t, --type <type>', 'Filter by type (video, image, music)')
  .option('-l, --limit <number>', 'Limit results', '10')
  .action((options) => {
    require('../src/utils/storage').showHistory(options);
  });

program
  .command('status')
  .description('📊 Show API status and usage')
  .action(() => {
    require('../src/utils/api').showStatus();
  });

program
  .command('open')
  .description('🌐 Open Velqis web interface')
  .action(() => {
    const open = require('open');
    open('https://morphio.xyz');
    console.log(chalk.cyan('🌐 Opening Velqis web interface...'));
  });

program.on('command:*', function () {
  console.error(chalk.red('Invalid command: %s\n'), program.args.join(' '));
  console.log(chalk.yellow('See --help for a list of available commands.'));
  process.exit(1);
});

if (!process.argv.slice(2).length) {
  showWelcome();
  program.outputHelp();
}

program.parse(process.argv); 
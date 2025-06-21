#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { generateEasterEgg, AdditionalOptions } from './generator';

interface CliArguments {
  interactive: boolean;
  output: string;
}

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .option('interactive', {
    alias: 'i',
    type: 'boolean',
    description: 'Run in interactive mode',
    default: true
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: 'Output directory for generated files',
    default: './output'
  })
  .help()
  .alias('help', 'h')
  .version()
  .alias('version', 'v')
  .parseSync() as CliArguments;

async function main(): Promise<void> {
  console.log(chalk.cyan.bold('🥚 Easter Egg Generator'));
  console.log(chalk.gray('Generate JavaScript easter eggs for your website!\n'));

  if (argv.interactive) {
    await runInteractiveMode();
  } else {
    console.log(chalk.yellow('Non-interactive mode not implemented yet. Use --interactive or -i'));
  }
}

async function runInteractiveMode(): Promise<void> {
  try {
    // Get user/company information
    const userInfo = await inquirer.prompt([
      {
        type: 'input',
        name: 'companyName',
        message: 'What is your company/project name?',
        validate: input => input.length > 0 || 'Please enter a company/project name'
      },
      {
        type: 'input',
        name: 'website',
        message: 'What is your website URL? (optional)',
        default: ''
      },
      {
        type: 'input',
        name: 'description',
        message: 'Brief description of your project:',
        validate: input => input.length > 0 || 'Please enter a description'
      }
    ]);

    // Get available easter eggs
    const easterEggTypes = [
      {
        name: 'Console Message - Welcome message in browser console',
        value: 'console-message'
      },
      {
        name: 'Konami Code - Classic up-up-down-down-left-right-left-right-B-A sequence',
        value: 'konami-code'
      },
      {
        name: 'Secret Click Counter - Hidden click counter on logo/element',
        value: 'click-counter'
      },
      {
        name: 'Key Sequence - Custom key sequence trigger',
        value: 'key-sequence'
      },
      {
        name: 'Mouse Shake - Shake the mouse to trigger easter egg',
        value: 'mouse-shake'
      },
      {
        name: 'Cursor Followers - Egg emojis that follow your cursor (triggers when all eggs found)',
        value: 'cursor-followers'
      },
      {
        name: 'Gravity Mode - Makes all page elements fall down when reaching bottom of page',
        value: 'gravity-mode'
      },
      {
        name: 'Matrix Rain Effect - Classic green digital rain overlay when DevTools are opened',
        value: 'matrix-rain'
      }
    ];

    const easterEggSelection = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'selectedEggs',
        message: 'Select the easter eggs you want to include:',
        choices: easterEggTypes,
        validate: input => input.length > 0 || 'Please select at least one easter egg'
      }
    ]);

    // Generate additional options based on selected easter eggs
    const additionalOptions = await getAdditionalOptions(easterEggSelection.selectedEggs);

    // Generate the easter egg file
    const config = {
      userInfo,
      selectedEggs: easterEggSelection.selectedEggs,
      additionalOptions,
      outputDir: argv.output
    };

    console.log(chalk.green('\n✨ Generating your easter eggs...'));
    
    const outputPath = await generateEasterEgg(config);
    
    console.log(chalk.green.bold('\n🎉 Easter eggs generated successfully!'));
    console.log(chalk.cyan(`📁 Output file: ${outputPath}`));
    console.log(chalk.gray('\nTo use the easter eggs, include the generated JavaScript file in your HTML:'));
    console.log(chalk.yellow('<script src="path/to/easter-eggs.js"></script>'));

  } catch (error: any) {
    console.error(chalk.red('❌ Error generating easter eggs:'), error.message);
    process.exit(1);
  }
}

async function getAdditionalOptions(selectedEggs: string[]): Promise<AdditionalOptions> {
  const options: AdditionalOptions = {};
  
  for (const egg of selectedEggs) {
    switch (egg) {
      case 'console-message':
        const consoleOptions = await inquirer.prompt([
          {
            type: 'input',
            name: 'customMessage',
            message: 'Custom console message (optional):',
            default: ''
          }
        ]);
        options.consoleMessage = consoleOptions;
        break;
        
      case 'konami-code':
        const konamiOptions = await inquirer.prompt([
          {
            type: 'input',
            name: 'successMessage',
            message: 'Message to show when Konami code is entered:',
            default: '🎮 Konami Code activated! You found the secret!'
          }
        ]);
        options.konamiCode = konamiOptions;
        break;
        
      case 'click-counter':
        const clickOptions = await inquirer.prompt([
          {
            type: 'input',
            name: 'targetSelector',
            message: 'CSS selector for the element to click (e.g., .logo, #header):',
            default: '.logo'
          },
          {
            type: 'number',
            name: 'clickCount',
            message: 'Number of clicks needed to trigger:',
            default: 10
          }
        ]);
        options.clickCounter = clickOptions;
        break;
        
      case 'key-sequence':
        const keyOptions = await inquirer.prompt([
          {
            type: 'input',
            name: 'keySequence',
            message: 'Enter key sequence (e.g., "hello", "secret"):',
            validate: input => input.length > 0 || 'Please enter a key sequence'
          }
        ]);
        options.keySequence = keyOptions;
        break;
        
      case 'cursor-followers':
        const cursorOptions = await inquirer.prompt([
          {
            type: 'input',
            name: 'eggEmoji',
            message: 'Emoji to use for cursor followers:',
            default: '🥚'
          }
        ]);
        options.cursorFollowers = cursorOptions;
        break;
    }
  }
  
  return options;
}

export { main };

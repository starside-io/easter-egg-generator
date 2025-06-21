<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Easter Egg Generator Project

This is a TypeScript-based Node.js CLI application that generates JavaScript easter eggs for websites using yargs for command-line parsing and webpack for bundling.

## When adding new easter eggs:
- Follow the existing modular structure
- Implement proper TypeScript interfaces
- Ensure compatibility with the CLI configuration flow
- YOU MUST Update the html demo file to showcase new features

## Project Structure
- `src/cli.ts` - Main CLI interface using yargs and inquirer with TypeScript
- `src/generator.ts` - Core generator logic with webpack bundling
- `src/index.ts` - Entry point for the CLI tool
- `src/easter-eggs/` - Modular easter egg implementations
  - `console-message.ts` - Console welcome messages
  - `konami-code.ts` - Classic up-up-down-down cheat code
  - `click-counter.ts` - Hidden click counter functionality
  - `key-sequence.ts` - Custom keyboard shortcuts
  - `mouse-shake.ts` - Mouse movement detection
  - `index.ts` - Easter egg registry and helper functions
- `src/templates/` - Base template files for code generation
- `src/test-dev.ts` - Development testing script
- `output/` - Directory where generated files are saved
- `test/` - Demo files and test easter eggs
- `dist/` - Compiled TypeScript output (created during build)

## Key Technologies
- **TypeScript** - Full type safety with declarations and interfaces
- **yargs** - Command-line argument parsing with help system
- **inquirer** - Interactive command-line prompts with validation
- **webpack** - JavaScript bundling and minification for production
- **babel** - JavaScript transpilation for browser compatibility
- **chalk** - Colored console output for better user experience
- **fs-extra** - Enhanced file system operations with promises
- **tsx** - TypeScript execution for development without compilation
- **turbo** - Fast build system for monorepo support

## CLI Arguments and Flow
The CLI uses yargs with the following structure:
- `--interactive` / `-i` (boolean, default: true) - Run in interactive mode
- `--output` / `-o` (string, default: './output') - Output directory
- `--help` / `-h` - Show help information
- `--version` / `-v` - Show version number

Interactive flow:
1. Collect user/company information (name, website, description)
2. Select easter egg types via checkbox prompt
3. Configure options for each selected easter egg type
4. Generate webpack-bundled JavaScript file
5. Create documentation README

## Easter Egg Types
1. **Console Messages** - Welcome messages and ASCII art in browser console
   - Options: custom message
   - Creates interactive `companyInfo()` function
2. **Konami Code** - Classic up-up-down-down-left-right-left-right-B-A sequence
   - Options: success message
   - Tracks key sequence with proper timing
3. **Click Counter** - Hidden click counter on specified elements
   - Options: CSS selector, click count threshold
   - Visual feedback and celebration effects
4. **Key Sequence** - Custom keyboard shortcuts that trigger actions
   - Options: key sequence string
   - Sparkle animations and timeout reset
5. **Mouse Shake** - Rapid mouse movement detection
   - No options required
   - Screen shake effects and notifications

## Test Scripts and Development
- `npm run dev` - Run with tsx for development
- `npm run dev:interactive` - Run with interactive flag
- `npm run dev:test` - Run development test script
- `npm run build` - Compile TypeScript to JavaScript
- `npm run type-check` - Check types without emitting
- `test/demo.html` - HTML demo file for testing generated easter eggs

## Build Process
The tool generates raw JavaScript code from TypeScript templates using a modular easter egg registry, then uses webpack to bundle and minify the output for production use. The build pipeline includes:
1. TypeScript compilation and type checking
2. Template-based code generation with user configuration
3. Webpack bundling with Babel transpilation
4. Minification for production deployment
5. Automatic documentation generation

## Package Structure
- Main entry: `dist/index.js` (compiled from `src/index.ts`)
- Binary commands: `easter-egg-generator` and `egg-gen`
- TypeScript declarations included in `dist/`
- Dependencies: chalk, fs-extra, inquirer, yargs
- Dev dependencies: TypeScript toolchain, webpack, babel, tsx, turbo

## Development Guidelines
- Keep easter eggs non-intrusive and fun
- Ensure cross-browser compatibility
- Generate clean, minified JavaScript output
- Provide clear documentation for users



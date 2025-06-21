# 🥚 Easter Egg Generator

A fun CLI tool built with **TypeScript** that generates JavaScript easter eggs for your website! Create engaging hidden features that delight your users and showcase your creativity.

## Features

- **TypeScript Built** - Fully typed codebase for better development experience
- **Interactive CLI** - Easy-to-use command-line interface with prompts
- **Multiple Easter Egg Types** - Console messages, Konami code, click counters, key sequences, and more
- **Optimized Output** - Webpack-bundled and minified JavaScript for production
- **Zero Dependencies** - Generated files work standalone without external libraries
- **Cross-Browser Compatible** - Works in all modern browsers
- **Non-Intrusive** - Won't interfere with your existing website functionality
- **Turbo-Ready** - Built with Turbo for fast builds and future monorepo support

## Installation

### Global Installation (Recommended)
```bash
npm install -g easter-egg-generator
```

### Local Installation
```bash
npm install easter-egg-generator
```

## Usage

### Interactive Mode (Default)
```bash
easter-egg-generator
# or
egg-gen
```

### Command Line Options

The CLI supports the following options via yargs:

```bash
# Run in interactive mode (default)
easter-egg-generator --interactive
easter-egg-generator -i

# Specify custom output directory
easter-egg-generator --output ./custom-output
easter-egg-generator -o ./custom-output

# Show help
easter-egg-generator --help
easter-egg-generator -h

# Show version
easter-egg-generator --version
easter-egg-generator -v

# Example with multiple options
easter-egg-generator --interactive --output ./my-easter-eggs
```

### Arguments Reference

| Option | Alias | Type | Default | Description |
|--------|-------|------|---------|-------------|
| `--interactive` | `-i` | boolean | `true` | Run in interactive mode with prompts |
| `--output` | `-o` | string | `./output` | Output directory for generated files |
| `--help` | `-h` | - | - | Show help information |
| `--version` | `-v` | - | - | Show version number |

## Easter Egg Types

### 🖥️ Console Message
Displays welcome messages and fun text in the browser's developer console.
- Perfect for recruiting developers
- Customizable messages
- Styled console output

### 🎮 Konami Code
Classic gaming easter egg activated with the famous cheat code sequence:
`↑ ↑ ↓ ↓ ← → ← → B A`

### 👆 Click Counter
Hidden functionality triggered by clicking an element multiple times.
- Configurable target element (CSS selector)
- Customizable click count threshold
- Visual feedback and celebration effects

### ⌨️ Key Sequence
Secret codes activated by typing specific letter sequences.
- Custom word/phrase triggers
- Sparkle animations
- Timeout reset for natural typing

### 🐭 Mouse Shake
Detects rapid mouse movement to trigger surprises.
- Automatic sensitivity adjustment
- Screen shake effects
- Fun notifications

## Generated Files

The tool creates:
- `easter-eggs.js` - Production-ready minified JavaScript
- `README.md` - Documentation specific to your generated easter eggs

## Example Output Structure

```
output/
├── easter-eggs.js      # Main JavaScript file to include in your website
└── README.md          # Documentation for your easter eggs
```

## Integration

Add the generated file to your website:

```html
<script src="path/to/easter-eggs.js"></script>
```

Or load asynchronously:
```html
<script>
  const script = document.createElement('script');
  script.src = 'path/to/easter-eggs.js';
  script.async = true;
  document.head.appendChild(script);
</script>
```

## Development

### Setup
```bash
git clone <repository-url>
cd easter-egg-generator
npm install
```

### Development Mode
```bash
npm run dev              # Run in development mode
npm run dev:interactive  # Run with interactive flag
npm run dev:test         # Run test development script
```

### Build
```bash
npm run build
```

### Test
```bash
npm test                 # Run tests (currently placeholder)
npm run dev:test         # Run development test script
```

### Development Tools
```bash
npm run start           # Start production build
npm run lint            # Run linting (placeholder)
```

### Clean Build
```bash
npm run clean
npm run build
```

### Package for Publishing
```bash
npm run prepublishOnly  # Automatic build before publishing
npm run prepack         # Build before packaging
npm pack               # Create package tarball
```

### Type Check
```bash
npm run type-check      # Check TypeScript types without emitting
```

## Build Process

The generator uses a sophisticated build pipeline powered by **TypeScript** and **Turbo**:

1. **TypeScript Compilation** - Source code is compiled from TypeScript to JavaScript
2. **Type Checking** - Ensures type safety and catches errors at build time
3. **Template Generation** - Creates JavaScript from user inputs and templates
4. **Webpack Bundling** - Bundles code with optimal settings
5. **Babel Transpilation** - Ensures compatibility with older browsers
6. **Minification** - Reduces file size for production
7. **Documentation** - Generates usage instructions

### Technology Stack
- **TypeScript** - Type-safe development with full type declarations
- **Turbo** - Fast build system and monorepo support
- **Webpack** - Module bundling and minification
- **Babel** - JavaScript transpilation for browser compatibility
- **Yargs** - Command-line argument parsing with built-in help
- **Inquirer** - Interactive command-line prompts
- **Chalk** - Colored terminal output for better UX
- **fs-extra** - Enhanced file system operations
- **tsx** - TypeScript execution for development

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Internet Explorer 11+

## Requirements

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

## Publishing

This package is ready for npm publishing with:

- TypeScript declarations included
- Proper package.json configuration
- GitHub Actions CI/CD pipeline
- Automated testing and building
- Source maps for debugging

```bash
# For maintainers
npm version patch|minor|major
git push --tags
# CI will automatically publish to npm on release
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this in your projects!

## Changelog

### v1.0.0
- Initial release
- Interactive CLI interface
- 5 easter egg types
- Webpack build pipeline
- Cross-browser compatibility

---

**Made with ❤️ for developers who love hidden surprises!**

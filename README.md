# Vite Plugin Total Bundle Size

**This readme was generated by GPT-4**

This repository contains a Vite plugin designed to calculate and display the total bundle size of your project. It leverages the power of Vite's build system to provide you with insights into the size of your production build, helping you to keep your application's performance optimized.

## Features

- Calculates total bundle size after Vite build
- Displays bundle size in the console
- Helps in optimizing application performance

## Installation

To install the plugin, run the following command in your project directory:

```bash
npm install vite-plugin-total-bundle-size --save-dev
```

or if you are using `yarn`:

```bash
yarn add vite-plugin-total-bundle-size --dev
```

## Usage

To use the plugin, import it into your `vite.config.js` or `vite.config.ts` file and add it to the `plugins` array:

```js
import totalBundleSize from 'vite-plugin-total-bundle-size';
export default {
  plugins: [totalBundleSize()],
};
```

or with options:

```js
import totalBundleSize from 'vite-plugin-total-bundle-size';
export default {
  plugins: [
    totalBundleSize({
      fileNameRegex: /\.(js|css)$/,
    }),
  ],
};
```

## Configuration

Currently, the plugin does not require any configuration. It works out of the box once added to your Vite configuration.

## Dependencies

- `chalk`: For colored console output.

## Development

To contribute to the development of this plugin, ensure you have the following tools installed:

- Node.js (version 12 or higher)
- npm/yarn

Clone the repository, install dependencies, and start making your changes:

```bash
git clone https://github.com/your-username/vite-plugin-total-bundle-size.git
cd vite-plugin-total-bundle-size
npm install
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.
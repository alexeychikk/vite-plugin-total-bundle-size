<a href="https://www.npmjs.com/package/vite-plugin-total-bundle-size">
  <img alt="NPM Version" src="https://img.shields.io/npm/v/vite-plugin-total-bundle-size">
</a>

# Vite Plugin Total Bundle Size

_This readme was generated by GPT-4_

## Features

- Calculates total bundle size after Vite build
- Displays bundle size in the console

## Installation

To install the plugin, run the following command in your project directory:

```bash
npm i -D vite-plugin-total-bundle-size
```

## Usage

To use the plugin, import it into your `vite.config.js` or `vite.config.ts` file and add it to the `plugins` array:

```typescript
import { totalBundleSize } from 'vite-plugin-total-bundle-size';
export default {
  plugins: [totalBundleSize()],
};
```

or with options:

```typescript
import { totalBundleSize } from 'vite-plugin-total-bundle-size';
export default {
  plugins: [
    totalBundleSize({
      fileNameRegex: /\.(js|css)$/,
      printFileStats: true,
      calculateGzip: false,
    }),
  ],
};
```

## Development

To contribute to the development of this plugin, ensure you have the following tools installed:

- Node.js (version 16 or higher)

Clone the repository, install dependencies, and start making your changes:

```bash
git clone https://github.com/your-username/vite-plugin-total-bundle-size.git
cd vite-plugin-total-bundle-size
npm install
```

## License

This project is licensed under the ISC License.

import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { gzip } from 'zlib';

import chalk from 'chalk';
import { type PluginContext } from 'rollup';
import { type Plugin } from 'vite';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const gzipPromise = promisify(gzip);
const readFile = promisify(fs.readFile);

async function calculateTotalSize(
  this: PluginContext,
  dir: string,
  fileNameRegex?: RegExp,
  calculateGzip: boolean = false,
) {
  let totalSize = 0;
  let gzipSize = 0;

  const calculate = async (dir: string) => {
    const files = await readdir(dir);
    for (const file of files) {
      const filePath = path.resolve(dir, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        await calculate(filePath);
      } else if (!fileNameRegex || fileNameRegex.test(file)) {
        totalSize += fileStat.size;
        if (calculateGzip) {
          const fileContent = await readFile(filePath);
          const gzippedContent = await gzipPromise(fileContent);
          gzipSize += gzippedContent.length;
        }
      }
    }
  };

  await calculate(dir);
  return { totalSize, gzipSize };
}

function formatSize(size: number) {
  return `${(size / 1024).toFixed(2)} kB`;
}

export interface TotalBundleSizeOptions {
  /**
   * A regular expression to match the file names to calculate the total size.
   */
  fileNameRegex?: RegExp;
  /**
   * Whether to calculate the gzip size.
   * @default true
   */
  calculateGzip?: boolean;
}

export function totalBundleSize({
  fileNameRegex,
  calculateGzip = true,
}: TotalBundleSizeOptions = {}) {
  let outDir: string;

  const plugin: Plugin = {
    name: 'vite-plugin-total-bundle-size',
    writeBundle(options) {
      outDir = options.dir || 'dist';
    },
    async closeBundle() {
      const { totalSize, gzipSize } = await calculateTotalSize.call(
        this,
        outDir,
        fileNameRegex,
        calculateGzip,
      );

      let output = chalk
        .redBright('Total: ')
        .concat(chalk.bold(chalk.gray(formatSize(totalSize))));

      if (calculateGzip) {
        output = output.concat(chalk.gray(` | gzip: ${formatSize(gzipSize)}`));
      }

      console.log(output);
    },
  };

  return plugin as any;
}

export default totalBundleSize;

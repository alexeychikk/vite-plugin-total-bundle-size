import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import chalk from 'chalk';
import type { Plugin } from 'vite';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function calculateTotalSize(
  dir: string,
  fileNameRegex?: RegExp,
): Promise<number> {
  let totalSize = 0;
  async function calculate(dir: string): Promise<void> {
    const files = await readdir(dir);
    for (const file of files) {
      const filePath = path.resolve(dir, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        await calculate(filePath);
      } else if (!fileNameRegex || fileNameRegex.test(file)) {
        totalSize += fileStat.size;
      }
    }
  }
  await calculate(dir);
  return totalSize;
}

export interface TotalBundleSizeOptions {
  /**
   * A regular expression to match the file names to calculate the total size.
   * @default /\.(html|css|js)$
   */
  fileNameRegex?: RegExp;
}

export function totalBundleSize({
  fileNameRegex = /\.(html|css|js)$/,
}: TotalBundleSizeOptions = {}): Plugin {
  let totalSize = 0;

  return {
    name: 'vite-plugin-total-bundle-size',
    async writeBundle(options) {
      const outDir = options.dir || 'dist';
      totalSize = await calculateTotalSize(outDir, fileNameRegex);
    },
    closeBundle() {
      this.info(chalk.redBright(`Total: ${(totalSize / 1024).toFixed(2)} kB`));
    },
  };
}

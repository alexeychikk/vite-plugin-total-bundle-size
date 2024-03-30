import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import chalk from 'chalk';
import { type PluginContext } from 'rollup';
import { type Plugin } from 'vite';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function calculateTotalSize(
  this: PluginContext,
  dir: string,
  fileNameRegex?: RegExp,
): Promise<number> {
  let totalSize = 0;
  const calculate = async (dir: string) => {
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
  };
  await calculate(dir);
  return totalSize;
}

export interface TotalBundleSizeOptions {
  /**
   * A regular expression to match the file names to calculate the total size.
   */
  fileNameRegex?: RegExp;
}

export function totalBundleSize({
  fileNameRegex,
}: TotalBundleSizeOptions = {}) {
  let totalSize = 0;
  let outDir: string;

  const plugin: Plugin = {
    name: 'vite-plugin-total-bundle-size',
    writeBundle(options) {
      outDir = options.dir || 'dist';
    },
    async closeBundle() {
      totalSize = await calculateTotalSize.call(this, outDir, fileNameRegex);
      console.log(
        chalk
          .redBright('Total: ')
          .concat(
            chalk.bold(chalk.gray(`${(totalSize / 1024).toFixed(2)} kB`)),
          ),
      );
    },
  };

  // some weird TS error when returning as Plugin
  return plugin as any;
}

export default totalBundleSize;

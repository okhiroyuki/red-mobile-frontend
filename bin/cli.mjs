#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import { rimrafSync } from "rimraf";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const source = path.join(__dirname, "../dist");

yargs(hideBin(process.argv))
  .command(
    "copy <path>",
    "Path to the file to be copied",
    () => {},
    (argv) => {
      rimrafSync(argv.path);
      fs.copySync(source, argv.path);
      console.info(`Copied ${source} to ${argv.path}`);
    },
  )
  .demandCommand(1)
  .parse();

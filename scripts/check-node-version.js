#!/usr/bin/env node

/**
 * This script checks if the current Node.js version meets the minimum required version
 * and exits with an error if it doesn't.
 */

const REQUIRED_NODE_VERSION = 22;

// Get the current Node.js major version
const currentVersion = parseInt(process.versions.node.split(".")[0], 10);

// Check if the current version meets the requirement
if (currentVersion < REQUIRED_NODE_VERSION) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    `Error: Node.js version ${REQUIRED_NODE_VERSION}+ is required.`,
    `\nCurrent version: ${process.versions.node}`,
    `\n\nPlease upgrade your Node.js version by using:`,
    `\n- nvm: nvm install ${REQUIRED_NODE_VERSION} && nvm use ${REQUIRED_NODE_VERSION}`,
    `\n- fnm: fnm install ${REQUIRED_NODE_VERSION} && fnm use ${REQUIRED_NODE_VERSION}`,
    `\n- Or download from https://nodejs.org/`,
  );
  process.exit(1);
} else {
  // Optional: Print a success message when running the script directly
  if (require.main === module) {
    console.log(
      "\x1b[32m%s\x1b[0m",
      `✅ Node.js version ${currentVersion} satisfies the requirement (${REQUIRED_NODE_VERSION}+).`,
    );
  }
}

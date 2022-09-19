#! /usr/bin/env node
const util = require("util");
const path = require("path");
const fs = require("fs");

const { execSync } = require("child_process");

// Utility functions
const exec = util.promisify(require("child_process").exec);
async function runCmd(command) {
  try {
    const { stderr, stdout } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch (err) {
    (err) => {
      console.log(err);
    };
  }
}

// Validate arguments
if (process.argv.length < 3) {
  console.log("Please specify the target project directory.");
  console.log("For example:");
  console.log("    npx qp-create-react-app my-app");
  console.log("    OR");
  console.log("    npm init qp-create-react-app my-app");
  process.exit(1);
}

// Define constants
const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = "https://github.com/Quaese/qp-react-template.git";

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === "EEXIST") {
    console.log("Directory already exists");
  } else {
    console.log(err);
  }

  process.exit(1);
}

async function setup() {
  try {
    console.log(`Downloading files from repo ${repo}`);

    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    console.log("Cloned successfully");
    console.log("");

    // change directory
    process.chdir(appPath);

    // Install dependencies
    console.log("Installing dependencies");
    await runCmd("npm install");

    console.log("Dependencies installed successfully");
    console.log();

    // if needed extra steps like removing files
    fs.unlinkSync(path.join(appPath, "src", "api", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "assests", "audio", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "assests", "fonts", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "assests", "images", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "assests", "styles", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "auth", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "components", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "constants", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "dictionary", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "hooks", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "state", "actions", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "state", "reducers", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "state", "store", "readme.md"));
    fs.unlinkSync(path.join(appPath, "src", "utils", "readme.md"));

    console.log("Installation is complete");

    console.log("We suggest that you start by typing :");
    console.log(`       cd ${folderName}`);
    console.log(`       npm start`);
    console.log();
    console.log(
      "Enjoy your intermediate folder structure and start building your React application"
    );
  } catch (err) {
    console.log(err);
  }
}

setup();

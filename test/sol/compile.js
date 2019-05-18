'use strict';

const easySolc = require('./easy-solc');
const fs = require('fs-extra');
const path = require('path');
const mkdirpCallback = require('mkdirp')
const rimrafCallback = require('rimraf');

const mkdirp = (p) => new Promise((resolve, reject) => mkdirpCallback(p, (err) => err ? reject(err) : resolve()));
const rimraf = (p) => new Promise((resolve, reject) => rimrafCallback(p, (err) => err ? reject(err) : resolve()));

const buildPath = path.join(__dirname, 'build');

const build = async (fileName) => {
  let out;
  try {
    out = easySolc(fileName, await fs.readFile(path.join(__dirname, 'contracts', `${fileName}.sol`), 'utf8'));
  } catch (e) {
    if (e.errors) return e.errors.forEach((err) => console.error(err.formattedMessage));
    throw e;
  }
  await fs.writeFile(path.join(buildPath, `${fileName}.json`), JSON.stringify(out));
  console.log('saved to ' + path.join('build', `${fileName}.json`));
}

rimraf(buildPath)
  .then(() => mkdirp(buildPath))
  .then(() => build('M3gaWallet'))
  .then(() => build('M3gastrar'))
  .catch((err) => console.error(err.stack || err.message || err));

'use strict';

const easySolc = require('./easy-solc');
const fs = require('fs-extra');
const path = require('path');
const mkdirpCallback = require('mkdirp')
const rimrafCallback = require('rimraf');

const mkdirp = (p) => new Promise((resolve, reject) => mkdirpCallback(p, (err) => err ? reject(err) : resolve()));
const rimraf = (p) => new Promise((resolve, reject) => rimrafCallback(p, (err) => err ? reject(err) : resolve()));

const buildPath = path.join(__dirname, 'build');

(async () => {
  let out;
  try {
    out = easySolc('MegaWallet', await fs.readFile(path.join(__dirname, 'contracts', 'MegaWallet.sol'), 'utf8')).bytecode;
  } catch (e) {
    if (e.errors) return e.errors.forEach((err) => console.error(err.formattedMessage));
    throw e;
  }
  await rimraf(buildPath);
  await mkdirp(buildPath);
  await fs.writeFile(path.join(buildPath, 'MegaWallet.json'), JSON.stringify(out));
  console.log('saved to ' + path.join('build', 'MegaWallet.json'));
})().catch((err) => console.error(err.stack || err.message || err));

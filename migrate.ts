'use strict';

import * as Umzug from 'umzug';

import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './src/shared/config/data-base.config';

const DB_NAME = process.env.POSTGRES_DB || 'postgres';
const DB_USER = process.env.POSTGRES_USER || 'postgres';

let config;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
  case 'dev':
  case 'development':
  default:
    config = databaseConfig.development;
}

const sequelize = new Sequelize(config);

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },

  migrations: {
    params: [
      sequelize,
      sequelize.constructor,
    ],
    path: './migrations',
    pattern: /\.ts$/,
  },

  logging() {
    console.log.apply(null, arguments);
  },
});

function logUmzugEvent(eventName) {
  return function(name, migration) {
    console.log(`${name} ${eventName}`);
  };
}

umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated', logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted', logUmzugEvent('reverted'));

function cmdMigrate() {
  return umzug.up();
}

function cmdReset() {
  return umzug.down({ to: 0 });
}

const cmd = process.argv[2].trim();
let executedCmd;

console.log(`${cmd.toUpperCase()} BEGIN`);
switch (cmd) {
  case 'up':
  case 'migrate':
    executedCmd = cmdMigrate();
    break;

  case 'down':
  case 'reset':
    executedCmd = cmdReset();
    break;

  default:
    console.log(`invalid cmd: ${cmd}`);
    process.exit(1);
}

executedCmd
  .then(result => {
    const doneStr = `${cmd.toUpperCase()} DONE`;
    console.log(doneStr);
    console.log(
      '=============================================================================='
    );
  })
  .catch(err => {
    const errStr = `${cmd.toUpperCase()} ERROR`;
    console.log(errStr);
    console.log(
      '=============================================================================='
    );
  });

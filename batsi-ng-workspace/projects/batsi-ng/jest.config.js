const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      // does currently not work https://github.com/just-jeb/angular-builders/issues/1408
      // move tsconfig.spec.json back to projects/batsi-ng/, once solved
      tsconfig: '<rootDir>/projects/batsi-ng/tsconfig.spec.json'
    }
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    'batsi-models': '<rootDir>/projects/batsi-models/src/lib/typescript-client',
    'dayjs/esm': 'dayjs'
  },
  modulePathIgnorePatterns: ['<rootDir>/dist']
};

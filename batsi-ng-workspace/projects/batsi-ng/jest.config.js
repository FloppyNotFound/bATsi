const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/batsi-ng/tsconfig.spec.json'
    }
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    'batsi-models': '<rootDir>/projects/batsi-models/src/lib/typescript-client'
  },
  modulePathIgnorePatterns: ['<rootDir>/dist']
};

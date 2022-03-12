/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  forceExit: true, // https://stackoverflow.com/questions/68437734/jest-has-detected-the-following-1-open-handle-potentially-keeping-jest-from-exit
  silent: true // https://stackoverflow.com/questions/44467657/jest-better-way-to-disable-console-inside-unit-tests
};
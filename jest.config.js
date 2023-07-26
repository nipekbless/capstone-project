/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // allow Jest to work with TypeScript
  testEnvironment: 'node', 
  testMatch: ['**/__tests__/**/*.test.ts'], //tells Jest to look for test files in a __tests__ folder with a '.test.ts' extension.
  verbose:true, //Enables verbose mode, which displays detailed information about the tests and their results.
  forceExit:true, //Forces Jest to exit after all tests have completed, even if there are no errors. It ensures that Jest doesn't hang after running tests.
  clearMocks:true //Clears all mock calls and instances before each test. This helps to isolate tests and avoid any unintended interactions between them.
};

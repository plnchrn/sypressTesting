// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 30000,
  // Это всё! Никаких globalSetup/globalTeardown не нужно
};

// /** @type {import('jest').Config} */
// const config = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//
//   globalSetup: "./jest.setup.js", // запускаем браузер один раз
//   globalTeardown: "./jest.teardown.js", // закрываем после всех тестов
//   testTimeout: 30000, // Puppeteer медленный
//
//   roots: ["<rootDir>/src", "<rootDir>/__tests__"],
//   testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   clearMocks: true,
//   collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
// };
//
// module.exports = config;

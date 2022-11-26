export default {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*.d.ts',
    '!<rootDir>/src/index.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}

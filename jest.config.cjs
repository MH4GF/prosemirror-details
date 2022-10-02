module.exports = {
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest-setup.ts']
}

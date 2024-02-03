module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/seatmap/(.*)$': '<rootDir>/features/seatmap/$1',
  },
}

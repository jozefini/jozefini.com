module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
		'^$app/(.*)$': '<rootDir>/app/$1',
		'^$components/(.*)$': '<rootDir>/components/$1',
		'^$hooks/(.*)$': '<rootDir>/hooks/$1',
		'^$services/(.*)$': '<rootDir>/services/$1',
	},
}

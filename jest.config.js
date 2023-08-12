module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^$app/(.*)$': '<rootDir>/app/$1',
		'^$components/(.*)$': '<rootDir>/components/$1',
		'^$hooks/(.*)$': '<rootDir>/hooks/$1',
		'^$services/(.*)$': '<rootDir>/services/$1',
		'^$store/(.*)$': '<rootDir>/store/$1',
		'^$utils/(.*)$': '<rootDir>/utils/$1',
	},
}

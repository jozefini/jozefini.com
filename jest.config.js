module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@api/(.*)$': '<rootDir>/api/$1',
		'^@app/(.*)$': '<rootDir>/app/$1',
		'^@components/(.*)$': '<rootDir>/components/$1',
		'^@hooks/(.*)$': '<rootDir>/hooks/$1',
		'^@stores/(.*)$': '<rootDir>/stores/$1',
		'^@ui/(.*)$': '<rootDir>/ui/$1',
		'^@utils/(.*)$': '<rootDir>/utils/$1',
	},
}

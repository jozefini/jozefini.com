const fs = require('fs')
const { Octokit } = require('@octokit/rest')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

// Read the linter report file
const report = JSON.parse(fs.readFileSync('eslint-report.json', 'utf8'))

// Format the warnings into a single message
const warnings = report.map(
	(warning) => `${warning.filePath}:${warning.line}:${warning.column} - ${warning.message}`,
)
const message = `## Linter Warnings\n\n${warnings.join('\n')}`

// Create an annotation on the pull request
const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
	request: {
		fetch,
	},
})
octokit.checks.create({
	owner: process.env.GITHUB_REPOSITORY_OWNER,
	repo: process.env.GITHUB_REPOSITORY,
	name: 'Lint',
	head_sha: process.env.GITHUB_SHA,
	conclusion: 'neutral',
	output: {
		title: 'Linter Warnings',
		summary: message,
		annotations: [
			{
				path: '.github/workflows/lint.yml',
				start_line: 1,
				end_line: 1,
				annotation_level: 'warning',
				message,
			},
		],
	},
})

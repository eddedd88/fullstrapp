module.exports = {
  scripts: {
    coverage: 'react-scripts test --env=jsdom --coverage && flow-coverage-report',
    analyze: 'yarn build && source-map-explorer build/static/js/main.*',
    ci: 'yarn test && yarn flow',
    'ci:local': 'CI=true yarn ci && CI=true yarn build',
    deploy: 'firebase deploy --token \"$FIREBASE_TOKEN\"',
    flow: 'flow',
    format: 'prettier-standard \"src/**/*.js\"'
  },
  jest: {
    'coverageThreshold': {
      'global': {
        'branches': 100,
        'functions': 100,
        'lines': 100,
        'statements': 100
      }
    }
  },
  'flow-coverage-report': {
    'flowCommandPath': 'node_modules/.bin/flow',
    'excludeGlob': [
      'node_modules/**',
      'build/**',
      'coverage/**',
      'flow-coverage/**',
      'public/**',
      'src/registerServiceWorker.js',
      'src/index.js'
    ],
    'includeGlob': [
      'src/**/*.js',
      'src/**/*.jsx'
    ],
    'threshold': 100,
    'type': [
      'text',
      'html',
      'json'
    ]
  },
  'husky': {
    'hooks': {
      'pre-commit': 'lint-staged'
    }
  },
  'lint-staged': {
    'linters': {
      'src/**/*.js': [
        'prettier-standard',
        'git add'
      ]
    }
  }
}
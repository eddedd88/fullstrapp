module.exports = {
  scripts: {
    coverage: 'react-scripts test --coverage',
    analyze: 'yarn build && source-map-explorer build/static/js/main.*',
    ci: 'yarn test',
    'ci:local': 'CI=true yarn ci && CI=true yarn build',
    deploy: 'firebase deploy --token \"$FIREBASE_TOKEN\"',
    format: 'prettier --write --single-quote --no-semi \"src/**/*.{ts,tsx,js,json,css,md}\"'
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
  'husky': {
    'hooks': {
      'pre-commit': 'lint-staged'
    }
  },
  'lint-staged': {
    'linters': {
      'src/**/*.{ts,tsx,js,json,css,md}': [
        'prettier --write --single-quote --no-semi',
        'git add'
      ]
    }
  }
}

module.exports = {
  scripts: {
    coverage: 'react-scripts test --coverage --watchAll=false',
    analyze: 'yarn build && source-map-explorer build/static/js/main.*',
    ci: 'yarn test',
    'ci:local': 'CI=true yarn ci && CI=true yarn build'
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
    'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': [
      'prettier --write --single-quote --no-semi --jsx-single-quote',
      'git add'
    ]
  }
}

#!/usr/bin/env node

const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs-extra')
const os = require('os')
const inquirer = require('inquirer')
const deepmerge = require('deepmerge')
const envfile = require('envfile')
const execSync = require('child_process').execSync
const packageJsonTemplate = require('./template/packageJson.js')
const tsConfigJsonTemplate = require('./template/tsconfig.js')

const appName = process.argv[2]
const appDirectory = `${process.cwd()}/${appName}`

const globalCommands = ['yarn']

const packages = [
  '@types/node',
  '@types/react',
  '@types/react-dom',
  '@types/react-router-dom',
  '@types/react-swipeable-views',
  '@material-ui/core',
  '@material-ui/icons',
  'react-router',
  'react-router-dom',
  'react-swipeable-views',
  'react-transition-group',
  'typescript',
  'typeface-roboto',
  'firebase',
  'firebaseui'
]

const devPackages = [
  '@types/jest',
  '@types/react-test-renderer',
  'firebase-tools',
  'husky',
  'jest-localstorage-mock',
  'lint-staged',
  'prettier',
  'react-test-renderer',
  'source-map-explorer'
]

const checkGlobalCommandsAreAvailable = () => {
  let aCommandIsMissing = false

  globalCommands.forEach(command => {
    const commandIsAvailable = shell.which(command)
    if (!commandIsAvailable) {
      console.log(`Global command ${chalk.cyan(command)} was not found`)
      aCommandIsMissing = true
    }
  })

  return !aCommandIsMissing
}

const promptDestinationConfirmation = destination => {
  const destinationExists = fs.existsSync(destination)
  if (destinationExists) {
    console.log(
      `It seems there already is a project at ${chalk.cyan(destination)}\n`
    )
    return inquirer.prompt({
      name: 'confirmUpdate',
      type: 'confirm',
      message: `Would you like to update ${chalk.cyan(destination)}?`
    })
  } else {
    return {
      confirmUpdate: true
    }
  }
}

const createReactApp = appName => {
  console.log('')
  execSync(`yarn create react-app ${appName} --typescript`, {
    stdio: 'inherit'
  })
  console.log(chalk.green('\nCreated react app with create-react-app'))
}

const installPackages = (packages, forDev) => {
  if (!packages || packages.length < 1) {
    return
  }

  console.log(
    `\nInstalling ${forDev ? 'dev ' : ''}dependencies ${chalk.cyan(
      packages.join(', ')
    )} \n`
  )

  const installCommand = forDev ? 'yarn add --dev' : 'yarn add'

  execSync(`${installCommand} ${packages.join(' ')}`, {
    stdio: 'inherit'
  })
  console.log(
    chalk.green(`\nFinished installing ${forDev ? 'dev ' : ''}depencies`)
  )
}

const installDependencies = () => {
  installPackages(packages)
  installPackages(devPackages, true)
}

const copyTemplate = () => fs.copy(`${__dirname}/template`, `${appDirectory}`)

const enhanceJsonFile = (jsonFilePath, jsonTemplate) => {
  const jsonFile = fs.readJsonSync(jsonFilePath)
  const mergedJson = deepmerge(jsonFile, jsonTemplate, {
    arrayMerge: (destinationArray, sourceArray, options) => sourceArray
  })

  return fs.writeFile(
    jsonFilePath,
    JSON.stringify(mergedJson, null, 2) + os.EOL
  )
}

const createGitCommit = () => {
  execSync('git add -A', { stdio: 'ignore' })
  execSync('git commit -m "Initial commit from fullstrapp"', {
    stdio: 'ignore'
  })
  console.log('\nCommitted changes to git.')
}

const run = async () => {
  console.log(chalk.magenta('\nfullstrapping...'))

  if (!checkGlobalCommandsAreAvailable()) {
    console.log('Please install the missing global commands\n')
    return false
  }

  if (!appName) {
    console.log(chalk.red('No app name was provided.'))
    console.log(
      `Provide an app name in the following format: ${chalk.cyan(
        'fullstrapp app-name'
      )}\n`
    )
    return false
  }

  const { confirmUpdate } = await promptDestinationConfirmation(appName)
  if (!confirmUpdate) {
    return false
  }

  const firebaseRcJson =
    fs.existsSync(`${appDirectory}/.firebaserc`) &&
    fs.readJsonSync(`${appDirectory}/.firebaserc`)

  const localEnvVars =
    fs.existsSync(`${appDirectory}/.env.local`) &&
    envfile.parseFileSync(`${appDirectory}/.env.local`)

  let fbApiKey = localEnvVars
    ? localEnvVars.REACT_APP_FIREBASE_API_KEY
    : undefined

  const updatingProject = fs.existsSync(appName)
  if (!updatingProject) {
    createReactApp(appName)
  }

  shell.cd(appName)

  // remove unnecessary create-react-app files
  if (!updatingProject) {
    shell.rm('./README.md')
    shell.rm('./src/logo.svg')
    shell.rm('./src/App*')
  }

  installDependencies()

  await copyTemplate()
  await enhanceJsonFile(`${appDirectory}/package.json`, packageJsonTemplate)
  await enhanceJsonFile(`${appDirectory}/tsconfig.json`, tsConfigJsonTemplate)
  shell.rm('./packageJson.js')
  shell.rm('./tsconfig.js')

  if (!updatingProject) {
    createGitCommit()
  }
  console.log(`\nAll done!. You are ${chalk.magenta('fullstrapped')}!\n`)
}

run()

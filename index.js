#!/usr/bin/env node

const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs-extra')
const os = require('os')
const inquirer = require('inquirer')
const deepmerge = require('deepmerge')
const envfile = require('envfile')
const packageJsonTemplate = require('./templates/packageJson.js')
const execSync = require('child_process').execSync

const appName = process.argv[2]
const appDirectory = `${process.cwd()}/${appName}`

const globalCommands = ['yarn', 'flow-typed']

const packages = {
  core: [
    '@material-ui/core',
    '@material-ui/icons',
    'react-router',
    'react-router-dom',
    'react-swipeable-views',
    'react-transition-group'
  ],
  firebase: ['firebase', 'firebaseui']
}

const devPackages = {
  core: [
    'firebase-tools',
    'flow-bin',
    'flow-coverage-report',
    'husky',
    'jest-localstorage-mock',
    'lint-staged',
    'prettier',
    'react-test-renderer',
    'source-map-explorer',
    'flow-inlinestyle'
  ]
}

const flowTypes = {
  core: [
    // '@material-ui/core' - latest version doesnt match with flow-typed
    'jest-localstorage-mock',
    'react-router',
    'react-router-dom',
    'react-test-renderer',
    'react-swipeable-views',
    'react-transition-group'
  ],
  firebase: [
    'firebase'
    // 'firebaseui' - this is not in fow-typed
  ]
}

const filesToIgnoreWhenUpdating = ['.firebaserc']

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

const promptCoreQuestions = defaultFirebaseProjectId =>
  inquirer.prompt([
    {
      name: 'useFirebase',
      type: 'confirm',
      message: 'Would you like to include Firebase Database & Authentication?'
    },
    {
      name: 'useGoogleAnalytics',
      type: 'confirm',
      message: 'Would you like to include Google Analytics to track app usage?'
    },
    {
      name: 'firebaseProjectId',
      type: 'input',
      message: 'Enter your Firebase Project ID:',
      default: defaultFirebaseProjectId,
      validate: val => !!val || 'This is required in order to host your app.'
    }
  ])

const promptFirebaseQuestions = defaultFirebaseApiKey =>
  inquirer.prompt([
    {
      name: 'firebaseApiKey',
      type: 'input',
      message: 'Enter your Firebase Web API Key:',
      default: defaultFirebaseApiKey,
      validate: val =>
        !!val ||
        'This is required in order to connect to Firebase Database and Authentication locally'
    }
  ])

const createReactApp = appName => {
  console.log('')
  execSync(`yarn create react-app ${appName}`, {
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

const installDependencies = setupType => {
  installPackages(packages[setupType])
  installPackages(devPackages[setupType], true)
}

const copyTemplates = setupType =>
  fs.copy(`${__dirname}/templates/${setupType}`, `${appDirectory}`)

const installFlowTypes = setupType =>
  new Promise(resolve => {
    fs.readJson(`${appDirectory}/package.json`, (err, currentPkgJson) => {
      console.log(
        `\nInstalling types for ${chalk.cyan(
          flowTypes[setupType].join(', ')
        )} \n`
      )

      const allDeps = {
        ...currentPkgJson.dependencies,
        ...currentPkgJson.devDependencies
      }

      let packagesWithVersion = flowTypes[setupType].map(
        packageName => `${packageName}@${allDeps[packageName]}`
      )

      if (setupType === 'core') {
        // add material-ui version 1 - latest in flow-typed
        packagesWithVersion.push('@material-ui/core@1')

        // add latest jest version that is bundled with cra
        packagesWithVersion.push('jest@23')
      }

      execSync(`flow-typed install ${packagesWithVersion.join(' ')}`, {
        stdio: 'inherit'
      })
      console.log(
        chalk.green('Finished installing flow types for dependencies')
      )
      resolve()
    })
  })

const enhancePackageJson = () =>
  fs.readJson(`${appDirectory}/package.json`, (err, currentPkgJson) => {
    const enhancedPkgJson = deepmerge(currentPkgJson, packageJsonTemplate, {
      arrayMerge: (destinationArray, sourceArray, options) => sourceArray
    })
    return fs.writeFile(
      `${appDirectory}/package.json`,
      JSON.stringify(enhancedPkgJson, null, 2) + os.EOL
    )
  })

const updateFirebaseRc = firebaseProjectId =>
  fs.readJson(`${appDirectory}/.firebaserc`, (err, firebaseRcFile) => {
    const newFirebaseRcFile = deepmerge(firebaseRcFile, {
      projects: {
        default: firebaseProjectId
      }
    })

    return fs.writeFile(
      `${appDirectory}/.firebaserc`,
      JSON.stringify(newFirebaseRcFile, null, 2) + os.EOL
    )
  })

const createFirebaseEnvVars = ({ firebaseApiKey, firebaseProjectId }) =>
  fs.writeFile(
    `${appDirectory}/.env.local`,
    `REACT_APP_FIREBASE_PROJECT_ID=${firebaseProjectId}\nREACT_APP_FIREBASE_API_KEY=${firebaseApiKey}`
  )

const createGitCommit = () => {
  execSync('git add -A', { stdio: 'ignore' })
  execSync('git commit -m "Initial commit from fullstrapp"', {
    stdio: 'ignore'
  })
  console.log('\nCommitted changes to git.')
}

const run = async () => {
  console.log(chalk.magenta('\nfullstrapping...\n'))

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

  const defaultFirebaseProjectId =
    (firebaseRcJson && firebaseRcJson.projects.default) ||
    (localEnvVars && localEnvVars.REACT_APP_FIREBASE_PROJECT_ID) ||
    undefined

  const {
    firebaseProjectId,
    useFirebase,
    useGoogleAnalytics
  } = await promptCoreQuestions(defaultFirebaseProjectId)

  let fbApiKey = localEnvVars
    ? localEnvVars.REACT_APP_FIREBASE_API_KEY
    : undefined

  if (useFirebase) {
    const { firebaseApiKey } = await promptFirebaseQuestions(fbApiKey)
    fbApiKey = firebaseApiKey
  }

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

  installDependencies('core')
  await copyTemplates('core')
  await installFlowTypes('core')
  await enhancePackageJson()
  await updateFirebaseRc(firebaseProjectId)

  if (useFirebase) {
    installDependencies('firebase')
    await copyTemplates('firebase')
    await installFlowTypes('firebase')
    await createFirebaseEnvVars({
      firebaseProjectId,
      firebaseApiKey: fbApiKey
    })
  }

  if (useGoogleAnalytics) {
    await copyTemplates('analytics')
  }

  if (!updatingProject) {
    createGitCommit()
  }
  console.log(`\nAll done!. You are ${chalk.magenta('fullstrapped')}!\n`)
}

run()

#!/usr/bin/env node

const shell = require('shelljs')
const chalk = require('chalk')
const fs = require('fs-extra')
const os = require('os')
const inquirer = require('inquirer')
const deepmerge = require('deepmerge')
const { execSync } = require('child_process')
const packageJsonTemplate = require('./templates/packageJson.js')

const appName = process.argv[2]
const appDirectory = `${process.cwd()}/${appName}`

const globalCommands = [
  'yarn',
  'flow-typed'
]

const packages = {
  core: [
    '@material-ui/core',
    '@material-ui/icons',
    'react-router',
    'react-router-dom',
    'react-swipeable-views',
    'react-transition-group'
  ],
  firebase: [
    'firebase',
    'firebaseui'
  ]
}

const devPackages = {
  core: [
    'firebase-tools',
    'flow-bin',
    'flow-coverage-report',
    'husky',
    'jest-localstorage-mock',
    'lint-staged',
    'prettier-standard',
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
    'firebase',
    // 'firebaseui' - this is not in fow-typed
  ]
}

const checkGlobalCommandsAreAvailable = () => {
  let aCommandIsMissing = false

  globalCommands.forEach(
    command => {
      const commandIsAvailable = shell.which(command)
      if (!commandIsAvailable) {
        console.log(`Global command ${chalk.cyan(command)} was not found`)
        aCommandIsMissing = true
      }
    }
  )

  return !aCommandIsMissing
}

const promptQuestions = () => inquirer.prompt([
   {
     name: 'firebaseProjectId',
     type: 'input',
     message: 'Enter your Firebase Project ID:',
     validate: val => !!val || 'This is required in order to host your app.'
   },
   {
     name: 'useFirebase',
     type: 'confirm',
     message: 'Would you like to use Firebase Database & Authentication?'
   },
   {
     name: 'useGoogleAnalytics',
     type: 'confirm',
     message: 'Would you like to use Google Analytics to track app usage?'
   }
])

const promptFirebaseQuestions = () => inquirer.prompt([
  {
    name: 'firebaseApiKey',
    type: 'input',
    message: 'Enter your Firebase Web API Key:',
    validate: val => !!val ||
      'This is required in order to connect to Firebase Database and Authentication locally'
  }
])

const createReactApp = appName => new Promise(
  resolve => {
    if (appName) {
      shell.exec(`yarn create react-app ${appName}`, () => {
        console.log(chalk.green('\nCreated react app with create-react-app'))
        resolve(true)
      })
    } else {
      console.log(chalk.red('\nNo app name was provided.'))
      console.log(`\nProvide an app name in the following format: ${chalk.cyan('fullstrapp app-name')}\n`)
      resolve(false)
    }
  }
)

const installPackages = (packages, forDev) => new Promise(
  resolve => {
    if (!packages || packages.length < 1) {
      resolve()
    }

    console.log(`\nInstalling ${forDev ? 'dev ' : '' }dependencies ${chalk.cyan(packages.join(', '))} \n`)

    const installCommand = forDev
      ? 'yarn add --dev'
      : 'yarn add'

    shell.exec(`${installCommand} ${packages.join(' ')}`, () => {
      console.log(chalk.green(`\nFinished installing ${forDev ? 'dev ' : '' }depencies`))
      resolve()
    })
  }
)

const installDependencies = setupType =>
  installPackages(packages[setupType])
    .then(() => installPackages(devPackages[setupType], true))

const copyTemplates = setupType =>
  fs.copy(
    `${__dirname}/templates/${setupType}`,
    `${appDirectory}`
  )

const installFlowTypes = setupType => new Promise(
  resolve => {
    fs.readJson(`${appDirectory}/package.json`,
      (err, currentPkgJson) => {
        console.log(`\nInstalling types for ${chalk.cyan(flowTypes[setupType].join(', '))} \n`)

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

        shell.exec(`flow-typed install ${packagesWithVersion.join(' ')}`, () => {
          console.log(chalk.green('Finished installing flow types for dependencies'))
          resolve()
        })
      }
    )
  }
)

const enhancePackageJson = () =>
  fs.readJson(`${appDirectory}/package.json`,
    (err, currentPkgJson) => {
      const enhancedPkgJson = deepmerge(currentPkgJson, packageJsonTemplate)
      return fs.writeFile(
        `${appDirectory}/package.json`,
        JSON.stringify(enhancedPkgJson, null, 2) + os.EOL
      )
    }
  )

const updateFirebaseRc = firebaseProjectId =>
  fs.readJson(`${appDirectory}/.firebaserc`,
    (err, firebaseRcFile) => {
      console.log(firebaseProjectId)
      const newFirebaseRcFile = deepmerge(firebaseRcFile, {
        projects: {
          default: firebaseProjectId
        }
      })

      return fs.writeFile(
        `${appDirectory}/.firebaserc`,
        JSON.stringify(newFirebaseRcFile, null, 2) + os.EOL
      )
    }
  )

const createFirebaseEnvVars = ({
  firebaseApiKey,
  firebaseProjectId
}) => fs.writeFile(
  `${appDirectory}/.env.local`,
  `REACT_APP_FIREBASE_PROJECT_ID=${firebaseProjectId}\nREACT_APP_FIREBASE_API_KEY=${firebaseApiKey}`
)

const run = async () => {
  console.log(chalk.magenta('\nfullstrapping...\n'))

  if (!checkGlobalCommandsAreAvailable()) {
    console.log('\nPlease install the missing global commands\n')
    return false
  }

  const {
    firebaseProjectId,
    useFirebase,
    useGoogleAnalytics
  } = await promptQuestions()

  let fbApiKey = ''
  if (useFirebase) {
    const { firebaseApiKey } = await promptFirebaseQuestions()
    fbApiKey = firebaseApiKey
  }

  const success = await createReactApp(appName)
  if(!success){
    return false
  }

  // setup the essentials for a new app
  shell.cd(appName)
  shell.rm('./README.md')
  shell.rm('./src/logo.svg')
  shell.rm('./src/App*')
  await copyTemplates('core')
  await installDependencies('core')
  await installFlowTypes('core')
  await enhancePackageJson()
  await updateFirebaseRc(firebaseProjectId)

  if (useFirebase) {
    await copyTemplates('firebase')
    await installDependencies('firebase')
    await installFlowTypes('firebase')
    await createFirebaseEnvVars({
      firebaseProjectId,
      firebaseApiKey: fbApiKey
    })
  }
  console.log('')

  if (useGoogleAnalytics) {
    await copyTemplates('analytics')
  }

  console.log(`All done!. You are ${chalk.magenta('fullstrapped')}!\n`)
}

run()

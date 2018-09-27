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
    'jest',
    'jest-localstorage-mock',
    'lint-staged',
    'prettier-standard',
    'react-test-renderer',
    'source-map-explorer'
  ]
}

const flowTypes = {
  core: [
    // '@material-ui/core', latest version doesnt match with flow-typed
    'jest',
    'jest-localstorage-mock',
    'react-router',
    'react-router-dom',
    'react-test-renderer',
    'react-swipeable-views',
    'react-transition-group'
  ],
  firebase: [
    'firebase',
    'firebaseui'
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
     message: 'Enter your Firebase project ID:'
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
    .then(() => fs.copy(
      `${__dirname}/templates/${setupType}`,
      `${appDirectory}`
    ))
    .catch(console.error)

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

        // add material-ui version 1 - latest in flow-typed
        packagesWithVersion.push('@material-ui/core@1')

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

const run = async () => {
  console.log(chalk.magenta('\nfullstrapping...\n'))

  if (!checkGlobalCommandsAreAvailable()) {
    console.log('\nPlease install the missing global commands\n')
    return false
  }

  const { firebaseProjectId } = await promptQuestions()
  console.log('')

  if (!firebaseProjectId) {
    console.log('\nPlease try again and enter a Firebase Project ID,')
    console.log('this is required in order to be able to host your app.')
    return false
  }

  const success = await createReactApp(appName)
  if(!success){
    return false
  }

  shell.cd(appName)
  shell.rm('./README.md')
  shell.rm('./src/logo.svg')
  shell.rm('./src/App*')
  await installDependencies('core')
  await installFlowTypes('core')
  await enhancePackageJson()
  await updateFirebaseRc(firebaseProjectId)
  console.log(`\nAll done!. You are ${chalk.magenta('fullstrapped')}!\n`)
}

run()

<img src="./src/assets/icon.png" width="200" />

# fullstrapp
Launch a production ready PWA in very little time, without compromising on scalability and quality.

This project tries to make as many opinionated choices as possible, in a sensible manner, about the dev stack, in order to quickly build a product that could sustain a significant amount of traffic/users.

The following big choices have been made:
- **React** front-end framework
- **material-ui** component library
- **Progressive Web App** mobile first
- **create-react-app** as a starting project which provides: testing (jest), linting and building
- **flow** for type checking
- **prettier-standard** for formatting and enforcing coding styles
- **Firebase** for Hosting, Database (Firestore), and Authentication
- **CircleCI** to automate tests and deploys
- **Google Analytics** to track app usage

This project builds into this [demo](https://material-pwa-c6ebb.firebaseapp.com). But you can easily create your app and point to it following the guides below.

### Getting Started
COMING SOON...

## Table of Contents
- Setup Guides
  - [How to setup Firebase Hosting?](#how-to-setup-firebase-hosting)
  - [How to setup Firestore (Firebase Database)?](#how-to-setup-firestore)
  - [How to setup Firebase Authentication?](#how-to-setup-firebase-authentication)
  - [How to setup CircleCI?](#how-to-setup-circleci)
  - [How to deploy to Firebase with CircleCI?](#deploy-to-firebase-with-circleci)
  - [How to Setup Google Analytics?](#how-to-setup-google-analytics)
- Components
  - Signin: firebaseui-web pre-configured to use all signin methods
  - MobileOnboarding
  - WebOnboarding
- Github Flow
- Commit Guidelines
- Issue Templates
- [Project Goals & Strategy](#goals)
- [Alternatives](#alternatives)

## How to setup Firebase Hosting
- **Signup** at https://firebase.com for a Firebase account
- **Start a new project**
- Copy the *Project ID* from the *project settings* in Firebase
- In the file **.firebaserc** set the *default* project to your new *project id*
- Deploy manually by running command: `yarn firebase deploy`, or [deploy with CircleCI (recommended)](#deploy-to-firebase-with circleci)

## How to setup Firestore
- Create a **.env.local** file to store environment variables
- Add your new *project id* as a local environment variable called: `REACT_APP_FIREBASE_PROJECT_ID`
- Copy the *Web API Key* from the *project settings* in Firebase
- Add the *Web API Key* as a local environment variable called `REACT_APP_FIREBASE_API_KEY`
- Create a Firestore in Firebase

The environment variables will allow your local environment to connect to Firebase

## How to setup Firebase Authentication
- Do the first 4 steps of [How to setup Firestore](#how-to-setup-firestore)
- Enable Firebase Authentication and Sign-in methods of choice
- Update the sign-in methods in the `src/components/Signin` component

## How to setup CircleCI
- **Signup** at https://circleci.com/ for a CircleCI account
- Add your github repo as a Project
- Press the **Start Building** button (this may fail if Firebase is not setup)

Every time a commit is pushed to github, CircleCI will automatically run CI tests. See command `ci` in `package.json`.

## Deploy to Firebase with CircleCI
- Create a Firebase token: `yarn firebase login:ci`
- Add the token to CircleCI as an environment variable named `FIREBASE_TOKEN`
- Add the previously created environment variables to CircleCI:
  - `REACT_APP_FIREBASE_PROJECT_ID`
  - `REACT_APP_FIREBASE_API_KEY`

Every time a pull request is merged into master, CircleCI will deploy to firebase if all the tests succeed

## How to setup Google Analytics
- Find your tracking id: https://support.google.com/analytics/answer/1008080?hl=en
- Add the *tracking id* to CircleCI as an environment variable called `REACT_APP_GA_TRACKING_ID`

---

### Goals
- To **launch an MVP** as fast as possible: **within a day**
- To iterate on features quickly: **under 2 minute tests and deploys**
- To provide **tools and guidelines for teams of up to 5 people**
- To support up to at least **10K active users per month**
- To be affordable for the hobbyist developer: **free until meaningful traction**

Reaching any of the limits should make it easier to raise enough funding to cover increased costs, or to pursue other endeavors to mitigate costs, or to request for free services for a non-profit.

### Strategy
- Create a mobile first Progressive Web App (PWA) to target many environments
- Use tools to advance the MVP as further as possible with the least amount of work
- Automate as many things as possible: formatting, tests, and deploys
- Use services at a free tier level, where cost would only materialize if the product gets traction
- Put in place guidelines and templates

---

## Alternatives
The best alternative to this project I've found:
- [react-most-wanted](https://www.react-most-wanted.com/)

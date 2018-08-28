<img src="./src/assets/icon.png" width="200" style="border-radius: 25px" />

# fullstrapp
Launch a production PWA for every platform in very little time, without compromising on scalability and quality.

#### Dependencies:
- create-react-app
- Material UI
- Flow
- prettier-standard
- Husky + lint-staged
- CircleCI
- Firebase

## Getting Started
TODO

## Table of Contents

### Core
- Add To Home: prompts the user to add the PWA to their home screen
- Update App: notification that shows up when a new version of the PWA is available
- Google Analytics

#### Components
- ExpandableSearch
- PersistentSearch
- BottomNavBar
- AppBar
- FormDialog
- Signin: firebaseui signin component

#### Prototypes
- Feed Page
- Feed Item
- Profile Page
- Onboarding
- Grid Page

#### DevOps
- CircleCI: scripts to test, build and deploy
- Firebase: hosting, firestore, auth, and file storage configured

#### Guidelines and templates:
- Workflow guideline
- Commit guidelines
- Issue Templates: bug, feature, support

## How to setup CircleCI
- **Signup** at https://circleci.com/ for a CircleCI account
- Add your github repo as a Project
- Press the **Start Building** button (this may fail because Firebase is not setup)

Every time a commit is pushed to the *master* branch, CircleCI will automatically run in CI tests. See command `ci` in `package.json`.

## How to deploy to Firebase Hosting
### Setup Project
- **Signup** at https://firebase.com for a Firebase account
- **Start a new project**
- Copy the **Project ID** from the *project settings* and in the file **.firebaserc** replace *PROJECT_ID* with your new *project id*

### Deploy with CircleCI
- Create a Firebase token: `yarn firebase login:ci`
- Add the token to CircleCI as an environment variable named `FIREBASE_TOKEN`

Every time a pull request is merged into master, CircleCI will deploy to firebase if all the tests succeed

## How to deploy to Netlify (alternative to Firebase hosting)
### Create a new site
- **Signup** at https://www.netlify.com/
- Create a new site linked to your repo

---

### Goals
- creating a mobile first Progressive Web App (PWA) to target many environments
- using tools to advance the MVP as further as possible with the least amount of work
- automating as many things as possible: formatting, tests, and deploys
- using services at a free tier level, where cost would only materialize if the product gets traction
- putting in place guidelines and templates

### Key Performance Measures
- to **launch an MVP** as fast as possible: **within a day**
- to iterate on features quickly: **under 2 minute tests and deploys**
- to provide **tools and guidelines for teams of up to 5 people**
- to support up to at least **10K active users per month**
- to be affordable for the hobbyist developer: **free until meaningful traction**

Reaching any of the limits should make it easier to raise enough funding to cover increased costs, or to pursue other endeavors to mitigate costs, or to request for free services for a non-profit.

---

## Alternatives
The best alternative to this project I've found:
- [react-most-wanted](https://www.react-most-wanted.com/)

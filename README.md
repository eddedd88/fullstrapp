# Material PWA

### Extends *create-react-app*, and adds the following:
- Material UI + Icons
- Flow
- prettier-standard
- Husky + lint-staged
- CircleCI*
- Firebase hosting*
- Firestore*
- Issue templates
- React templates (Atom)
- Workflow guideline
- Commit guidelines

\* Requires extra steps to setup

## Launch a production PWA for every platform within a day
The main goal of the project is to be able launch a product in very little time, without compromising on scalability and quality.

### We achieve this is by doing the following:
- creating a mobile first Progressive Web App (PWA) to target many environments
- using tools to advance the MVP as further as possible with the least amount of work:
  - react
  - material-ui & material-ui-icons
- automating as many things as possible: formatting, tests, and deploys
  - create-react-app
  - flow
  - prettier + standard
  - husky + lint-staged
- using services at a free tier level, where cost would only materialize if the product gets traction
  - CircleCi: CI & CD
  - Firebase: hosting, DB, authentication
- establishing guidelines and templates:
  - Commit guidelines
  - Issue templates
  - React templates

### Key Performance Measures:
- to **launch an MVP** as fast as possible: **within a day**
- to iterate on features quickly: **under 2 minute tests and deploys**
- to provide **tools for teams of up to 5 people**
- to support up to at least **10K active users per month**
- to be affordable for the hobbyist developer: **free until meaningful traction**

Reaching any of the limits should qualify you to raise enough funding to cover increased costs, or to pursue other endeavors to mitigate costs, or to request for free services for a non-profit.

---

## Table of Contents

#### PWA specific components
- UpdateAppToast
- AddToHome (TBD)

#### Reusable components that extend material-ui
- ExpandableSearch
- PersistentSearch

#### Full Fledge components
- LoginPage

#### Pre-built prototypes
- FeedPage
- FeedItem
- ProfilePage
- Onboarding
- GridPage

#### DevOps scripts and Steps to add services
- CircleCI
- Firebase

#### Guidelines and templates:
- React component atom template
- Workflow guideline
- Commit guidelines

## How to setup CircleCI
- **Signup** at https://circleci.com/ for a CircleCI account
- Add your github repo as a Project
- Push a commit to the master branch in your github repo

Every time a commit is pushed to the *master* branch, CircleCI will automatically run in CI tests. See command `ci` in `package.json`.

## How to deploy to Firebase
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
## Alternatives
The best alternative to this project I've found:
- [react-most-wanted](https://www.react-most-wanted.com/)

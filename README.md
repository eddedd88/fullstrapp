<img src="https://raw.githubusercontent.com/eddedd88/fullstrapp/master/icon.png" width="200" />

# fullstrapp
Bootstrap a full stack application with pre-configured: hosting, database, authentication, analytics, CI, CD, code templates, issue templates.

This project tries to make as many opinionated choices as possible about the dev stack in order to quickly build a product that could sustain a significant amount of traffic/users.

Tech Stack:
- **React** front-end framework
- **create-react-app** as a starting project which provides: testing (jest), linting and building
- **material-ui** component library
- **Typescript** for type checking
- **Firebase** for Hosting, Database (Firestore), Authentication, and Analytics
- **Github Actions** to automate tests and deploys
- **prettier** for formatting code base

[Take a look at this demo app created with **fullstrapp**](https://material-pwa-c6ebb.firebaseapp.com/)

## Table of Contents
- [Getting Started](#getting-started)
- Components
  - Signin: [firebaseui-web](https://github.com/firebase/firebaseui-web) pre-configured to use all signin methods
- Issue Templates: Bug Report & Enhancement(User Story)
- [Project Goals & Strategy](#goals)
- [Alternatives](#alternatives)


### Getting Started
#### 1. Install and create app

```
yarn global add fullstrapp

fullstrapp myapp
```

#### 2. Setup Firebase
- Make sure you have enabled **Firebase Analytics** in your project
- Copy your firebase config located at *Firebase Project > Project Settings > Firebase SDK snippet > Config*
- Paste the firebase config to `src/firebase/firebase.ts` for the respective environment

#### 3. Setup Github CI/CD to automate deploys
CI tests are configured out of the box, but to enable deploys to Firebase do the following:
- Add firebase tools: `yarn global add firebase-tools`
- Create a Firebase Auth Token locally: `firebase login:ci`
- Add the Firebase token to Github as a *secret* called `FIREBASE_TOKEN`. You can add secrets at *Github Project > Settings > Secrets*.
- Open the file `.github/workflows/ci.yml` and uncomment the lines `51-56` 

Every time a commit is pushed to github, Github will automatically run the CI tests; and every time there is a push to master Github will deploy the new version to Firebase. See the ci workflow in `.github/workflows/ci.yml` for more details.

### Goals & Strategy
- To **launch an MVP** as fast as possible by using tools and templates to advance the MVP as further as possible with the least amount of work. Basically bootstrap the back-end and front-end of an app.

- To iterate on features quickly by automating as many things as possible (tests, builds and deploys). The **CI cycles should take less than 5 minutes**

- To be affordable for the hobbyist developer: **free until meaningful traction**


Note: I am turning this into a template, https://github.com/eddedd88/react-firebase-template
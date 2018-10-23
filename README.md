<img src="https://raw.githubusercontent.com/eddedd88/fullstrapp/master/icon.png" width="200" />

# fullstrapp
Launch a production ready PWA in very little time, without compromising on scalability and quality.

This project tries to make as many opinionated choices as possible, in a sensible manner, about the dev stack, in order to quickly build a product that could sustain a significant amount of traffic/users.

The following choices have been made:
- **React** front-end framework
- **create-react-app** as a starting project which provides: testing (jest), linting and building
- **material-ui** component library
- **Progressive Web App** mobile first development approach
- **flow** for type checking
- **prettier** for formatting code base
- **Firebase** for Hosting, Database (Firestore), and Authentication
- **CircleCI** to automate tests and deploys
- **Google Analytics** to track app usage

## Table of Contents
- [Getting Started](#getting-started)
- Components
  - Signin: [firebaseui-web](https://github.com/firebase/firebaseui-web) pre-configured to use all signin methods
- Github Flow
- Commit Guidelines
- Issue Templates
- [Project Goals & Strategy](#goals)
- [Alternatives](#alternatives)


### Getting Started
#### 1. Install and create app

```
yarn global add fullstrapp

fullstrapp myapp
```
Firebase Project ID and Web API Key can be found in your Firebase Project settings.

#### 2. Setup CircleCI
  - Add your github repo as Project
  - Press **Start Building** or follow your project.


#### 3. Add the environment variables created in `.env.local` to CircleCI:
  - `REACT_APP_FIREBASE_PROJECT_ID`
  - `REACT_APP_FIREBASE_API_KEY`


#### 4. Add a Firebase Auth Token to CircleCI
  - Create a Firebase token: `yarn firebase login:ci`
  - Add the token to CircleCI as an environment variable named `FIREBASE_TOKEN`


#### 5. Setup Google Analytics
  - Find your tracking id: https://support.google.com/analytics/answer/1008080?hl=en
  - Add the *tracking id* to CircleCI as an environment variable called `REACT_APP_GA_TRACKING_ID`

Every time a commit is pushed to github, CircleCI will automatically run CI tests. See command `ci` in `package.json`.

Every time a pull request is merged into master, CircleCI will deploy to firebase if all the tests succeed.

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

### Alternatives
The best alternative to this project I've found:
- [react-most-wanted](https://www.react-most-wanted.com/)

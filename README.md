# Event Mobi Assessment

## guidelines

### `npm i`

Run this command to install all dependencies.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn cypress open`

Keep `yarn start` running, execute above command to run e2e test, it works for a mock user name with mocked api response. 

![Tests List](/cypress/snapshots/1.png)
![Tests Execution](/cypress/snapshots/2.png)

## `yarn cypress run`

Use this command to run e2e test in background.

## Structure

```bash
Relevant files

Root
|__ cypress              // e2e tests
|___ integration
|_____ List.e2e.tsx
|__ src
|____ assets              // Assets related to filetype badges
|____ components
|______ models
|________ Gist.tsx        // API return types
|______ BadgesSection.tsx
|______ ForkUserSection.tsx
|______ List.tsx
|____ test
|______ components
|________ gists
|__________ BadgesSection.test.tsx
|__________ ForkUserSection.test.tsx
|__________ List.test.tsx
|____ App.css             // Common css


```
### List.tsx

This is a main component which renders text box and with fetch button, once user enter username and press fetch button it fetches all provided gists against that user. If user doesn't exist of no gists are found against that user, it will populate empty table.

This component subsequently renders 2 child components

#### 1.  BadgesSection.tsx
    This component is responsible for rendering badges of respective file extensions, like JS badge for all files related to javascript. It takes files object against each gist. For each row/gist of table in List.tsx this component would rendered.

#### 2.  ForkUserSection.tsx
    This will subsequently make api call for each gist record to fetch the users data who has forked this gist.

Application has integration tests for all components working in happy flow.

## Highlights

Application is mainly focusing on Happy flow due to time constraint, however I feel in real world following techniques could have flourished the App.

### Redux
    In real we use Redux mainly, in this app it is not used purposely due to its limited scope.
### Unit Test
    GistService could have been unit tested, it has very few logics and rest are the thing would have been mocked.
### CSS
    Currently all CSS are in App.css which could have been decoupled based on its usage.
### Test Coverage
    Test coverage is not 100%, which we can make ensure given the time available.
### Cypress/e2e Tests
    I have used cypress for e2e testing with limited happy flow, in real world it can be extended to cover maximum corner cases.

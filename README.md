# NY Times News Feed Mobile App

This project is a React-Native Assignment that is a news feed app. The app displays the “top stories” feed of the New York Times.

The app displays an article list and allows the user to open an article.

- The app allows the user to switch between the different sections of top stories, e.g.
  science, travel or sports etc.
- The app allows the user to quickly filter articles by location or description
  keywords.
- The app is able to remember the section of the top stories selected by the user,
  so when the app is reopened the user can start where he left off.
- As this app will be used in remote areas it is important that the app is resilient to an
  unreliable network connection, i.e. offline capability.

## Documentation

### Features
- Top Story Sections
- Filter by Location and Description Keywords
- Open the Article URL
- Save Article Offline
- Pulldown to refresh
- Image caching/prefetching
- UI/UX Loading for prefetching articles
- Toast for UI/UX network state change event.
- Webview Error Component

### News Sections
These are the news section: 

- Home
- Arts
- Automobiles
- Books
- Business
- Fashion
- Health
- Insider
- Magazine
- Movies
- NY Region
- Obituaries
- Opinion
- Politics
- Realestate
- Science
- Sports
- Sunday Review
- Technology
- Theater
- T-magazine
- Travel
- Upshot
- US
- World

### Filter by Location or Keyword

You can click the two buttons below the screen to  filter the article depending on location and keyword.

### Open Article

You can click the article to open URL. Caching is enabled so you can view the articles offline if you save it. However, those articles which are saved but has not been opened will display an error view.

![Image of Top Stories](https://z-p3-scontent.fmnl4-1.fna.fbcdn.net/v/t1.15752-9/108035761_308336260296776_4697131958473476428_n.png?_nc_cat=104&_nc_sid=b96e70&_nc_eui2=AeF9MkAdzAFoUBCJtmz5p5kKDBs52haaUhcMGznaFppSF0LCjcZ22M3idMfMAtSkOlw&_nc_ohc=iocAVdSGvdEAX-LW29T&_nc_ht=z-p3-scontent.fmnl4-1.fna&oh=58f4fc73ee4004d682745e0dc15146ed&oe=5F342827)
![Image of Articles](https://z-p3-scontent.fmnl4-6.fna.fbcdn.net/v/t1.15752-9/107848189_572663783411339_3922754423984798708_n.png?_nc_cat=107&_nc_sid=b96e70&_nc_eui2=AeE38Kztl1tlAkwOeaojO0-ZPe_r2hu54j097-vaG7niPRJqac3mLNGh550tMaWFYfo&_nc_ohc=L4QCOm0UOykAX9kaUs_&_nc_ht=z-p3-scontent.fmnl4-6.fna&oh=76f00b5784daa754a6a73525258f62dc&oe=5F350BFE)

### Save/Unsave Article

You can click the download icon to download article offline.

![Image of Offline Library](https://z-p3-scontent.fmnl4-4.fna.fbcdn.net/v/t1.15752-9/107868983_1172178203148577_4436889195094067977_n.png?_nc_cat=100&_nc_sid=b96e70&_nc_eui2=AeGJCXIwN-3lnH6MljZctbXrzzraLWZhp0zPOtotZmGnTGQ6sr5Eme8nkyYG0WC-G1I&_nc_ohc=kKAHqs5hB5IAX89_c6N&_nc_ht=z-p3-scontent.fmnl4-4.fna&oh=ad802917d1ee153dbbd0d5a59dfff830&oe=5F33171F)
![Image of Offline Library](https://z-p3-scontent.fmnl4-6.fna.fbcdn.net/v/t1.15752-9/107594107_559261411417052_1881391026547689059_n.png?_nc_cat=107&_nc_sid=b96e70&_nc_eui2=AeHUd0Dt8e0SCPTQug4dnMzJ34F65Rg8yrHfgXrlGDzKsalOZU7fyFC_g2k4JNTq068&_nc_ohc=nHZGbUkjWIcAX_RbN0m&_nc_ht=z-p3-scontent.fmnl4-6.fna&oh=a2665f06df49adf9aa711ff60457e170&oe=5F334511)


### Sample Screens

![Image of Splash Screen](https://z-p3-scontent.fmnl4-6.fna.fbcdn.net/v/t1.15752-9/107158025_3584026038292872_6836950695194561672_n.png?_nc_cat=107&_nc_sid=b96e70&_nc_eui2=AeFy67HgPYf7pqVwguKnUVw0gqY9NfsGPeeCpj01-wY9544sQW-WkhO4-h9mj6EIui8&_nc_ohc=n9EICf19UK8AX_3CdXF&_nc_ht=z-p3-scontent.fmnl4-6.fna&oh=0c7140df5cac7eeb1f7094ba2db46c6f&oe=5F345901)

## Environment Setup

- [Node 12.x](https://nodejs.org/en/) (use [NVM](https://github.com/nvm-sh/nvm))
- [Yarn](https://classic.yarnpkg.com/en/)
- [Expo](https://expo.io/)

## Install

```
$ yarn install
```

## Usage

```
$ yarn start
```

### Other Scripts

- `yarn lint`
- `yarn lint:watch`
- `yarn test`
- `yarn android`
- `yarn ios`

## Standards

Take these guidelines to heart. These will be enforced by hook or by crook.

### Coding

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to automatically format the code to fit coding standards. This project extends from the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), with some overrides and additional rules:

#### Errors

- `indent`, `no-tabs`, `react/jsx-indent`, `react/jsx-indent-props`: Because tabs, and here's [why](https://www.reddit.com/r/javascript/comments/c8drjo/nobody_talks_about_the_real_reason_to_use_tabs/).
- `no-alert`, `no-console`, `no-debugger`: If you need to leave log or debug messages in production, use [Reactotron](https://github.com/infinitered/reactotron).
- `no-use-before-define`: To guide [atomic functions](https://www.codementor.io/@seantullis/improve-your-code-with-atomic-functions-r6dt43fy7) to the upper part of the file.
- `react/jsx-filename-extension`: For filename consistency.
- `react/jsx-sort-default-props`, `react/jsx-sort-props`, `react/sort-prop-types`, `sort-destructure-keys/sort-destructure-keys`: Helps find necessary declarations easier at the later time and also reduces diff churn.
- `react/jsx-key`: For performance reasons.
- `react/no-did-mount-set-state`: Updating the state after a component mount will trigger a second `render()` call and can lead to property/layout thrashing. Use `getDerivedStateFromProps`, [as suggested by Dan Abramov](https://twitter.com/dan_abramov/status/977181473424932864).
- `react/no-direct-mutation-state`: Mutation is generally a bad idea (except X-Men).

#### Warnings

- `consistent-return`: Downgraded from `error` to `warn` while its purpose remains to be seen.

### Commit Messages

We need to stop the habit of writing vague commit messages such as "WIP" or "Update". Writing commit messages that follow a specific format makes us mindful of the code we write. It encourages us to break down the task into small chunks, so there are no haf-baked commits.

Having a standard way of writing commits also helps us during the release process. Changelogs and versioning can now be automated.

And last but not the least, it is now easier to have an overview of the type of workload the team had for a certain period. "Did we do mostly bugfixing this week?" "How many features did we release last month?" Those questions can now be easily answered using the terminal.

Inspired by: [How are you writing a commit message?](https://dev.to/puritanic/how-are-you-writing-a-commit-message-1ih7)

#### Type

Must be one of the following:

- build: Changes that affect the build system or external dependencies
- ci: Changes to CI configuration files and scripts
- chore: Other tasks such as releasing new versions, resolving lint issues, or updating internal dependencies
- docs: Documentation-only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- revert: Reverting an existing commit
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- test: Adding missing tests or correcting existing tests

#### Scope

- android
- core
- ios
- navigation
- release
- #{bug reference number} (for fixes)

#### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

**Do not even think of writing `chore: update`.**

To learn more, check out [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines).

### Directory Structure

- All modules should be on the same level. No nesting of modules.
- Screen components should have Screen suffix in component name.
- Modal components should have Modal suffix in component name.
- All components other than the main container or index, actions, libraries, modals, models, reducers, screens, and validators should be inside the components folder.
- Filename formats:
  - Constants: `camelCase`
  - Module directories: `kebab-case`
  - Components: `PascalCase`
  - Libraries and models: `dot.notation`
  - Utils: `camelCase`
- Example:

```
    📂 src
        📂 assets
            📂 fonts
            📂 images
        📁 components
        📂 constants
            📄 env.js
            📄 formats.js
            📄 modes.js
        📁 logger
        📂 modules
            📁 _global
            📁 auth
            📂 i18n
                📂 locale
                    📄 en-US.json
                📄 index.js
            📂 notification
                📄 notification.library.js
            📂 <module>
                📁 assets
                📂 components
                    📄 <Component>.js
                    📄 <Component>.style.js
                    📄 <Component>Form.js
                📂 modals
                    📄 <Component>Modal.js
                📂 screens
                    📄 <Component>Screen.js
                📄 index.js
                📄 <module>.actions.js
                📄 <module>.library.js
                📄 <module>.modals.js
                📄 <module>.model.js
                📄 <module>.model.validator.js
                📄 <module>.reducer.js
        📁 navigation
        📁 store
        📂 utils
            📄 api.js
            📄 navigation.js
    📁 scripts
```

### Importing Modules

- Modules and components should be imported in this order:
  - expo
  - expo-\* modules
    - Sorted alphabetically by module name, not variable name
    - If a module is scoped, base it on the module name
  - &lt;blank line&gt;
  - react
  - react-\* modules
    - Sorted alphabetically by module name, not variable name
    - If a module is scoped, base it on the module name
  - &lt;blank line&gt;
  - npm modules
    - Sorted alphabetically by module name, not variable name
    - If a module is scoped, base it on the module name
  - &lt;blank line&gt;
  - assets, constants, utils, and other files outside the modules folder
    - Use directory aliases (see `babel.config.js` for available aliases)
    - Sorted alphabetically by directory name, then by filename
  - &lt;blank line&gt;
  - components, libraries, modals, models, screens, and others from \_global and other modules
    - Use directory aliases (see `babel.config.js` for available aliases)
    - Sorted alphabetically by module name
    - Folders first before files
    - Components first
  - &lt;blank line&gt;
  - components, libraries, modals, models, screens, and others from the same module
    - Do not use directory aliases. Use relative directory paths.
    - Folders first before files
    - Components first
  - &lt;blank line&gt;
  - assets imported using `require`
  - &lt;blank line&gt;
  - styles of the current component (always use the variable `styles`)

### Component Methods and Properties

- Methods should be grouped in this order:
  - static methods and properties
  - lifecycle methods
  - `handle*` methods
  - `render*` methods
  - `render` method

### Actions

All axios calls should be defined as an action, regardless if there will be a root state manipulation or not.

#### Action Types

- Retrieval: `RETRIEVE_*`
- Create: `CREATE_*`
- Update: `UPDATE_*`
- Delete: `DELETE_*`
- Grouped by module with a doc block as header
- Alphabetized by module then by action name
- Always start with a verb

### Component Local State

Having a defaultState is a good practice especially when you need to reset the component state after performing a certain action.

Instead of declaring your state fields in `this.state = {}`, declare it in `this.defaultState = {}` then write `this.state = { ...this.defaultState }` after.

### Destructuring Props and State

`this.props` and `this.state` should always be destructured at the start of the function and in that order.

### Code Snippets

Install the following VSCode extensions: `xabikos.reactsnippets` and `burkeholland.simple-react-snippets`. This will help you avoid copy-pasting from old components when creating new ones and in complying with the [react/prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md) and [react/require-default-props](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md) ESLint rules.

Here are some noteworthy snippets from both:
| Snippet | Renders |
| ------- | ---------------------------------------------------------------- |
| `impt` | import PropTypes |
| `rcc` | class component skeleton |
| `rrc` | class component skeleton with react-redux connect |
| `rrdc` | class component skeleton with react-redux connect and dispatch |
| `rccp` | class component skeleton with prop types after the class |
| `rcjc` | class component skeleton without import and default export lines |
| `rcfc` | class component skeleton that contains all the lifecycle methods |
| `rwwd` | class component without import statements |
| `rpc` | class pure component skeleton with prop types after the class |
| `rsc` | stateless component skeleton |
| `rscp` | stateless component with prop types skeleton |
| `rsf` | stateless named function skeleton |
| `rsfp` | stateless named function with prop types skeleton |
| `rsi` | stateless component with prop types and implicit return |
| `fcc` | class component with flow types skeleton |
| `fsf` | stateless named function skeleton with flow types skeleton |
| `fsc` | stateless component with flow types skeleton |
| `rpt` | empty propTypes declaration |
| `rdp` | empty defaultProps declaration |
| `cdm` | componentDidMount |
| `cwm` | componentWillMount |
| `cwrp` | componentWillReceiveProps |
| `gds` | getDerivedStateFromProps |
| `ss` | setState |

#### Documentation

- [xabikos.reactsnippets](https://github.com/xabikos/vscode-react/blob/master/README.md#snippets)
- [burkeholland.simple-react-snippets](https://github.com/burkeholland/simple-react-snippets/blob/master/README.md#snippets)

# MessagePlex

MessagePlex is a multi-service messaging application allowing you to bring in any web applications into a single application interface. Notification settings can be customized and enabled or disabled for any services.

## Installation

Clone or download the git repository.

    $ cd messageplex
    $ npm install
    $ npm build

## Configuration

Modify the `dist/messageplex-{distro}-{arch}/resources/services.json` file to add/remove/modify services.

    [
	   {
            "name": "GMail",
            "url": "https://mail.google.com",
            "icon": "https://mail.google.com/favicon.ico",
			"notification": "\\(\\d\\)"
        },
        {
            "name": "Slack",
            "url": "https://slack.com",
            "icon": "https://slack.com/favicon.ico",
			"notification": "new item"
        },
        {
            "name": "LinkedIn",
            "url": "https://linkedin.com",
            "icon": "https://static-exp1.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca",
            "notification": "\\(\\d\\)"
        }
    ]

## Running

Run MessagePlex from the dist directory `dist/messageplex-{distro}-{arch}/`.

    $ ./messageplex

Running in direct source mode.

    $ npm run app

## Options

### Services Configuration File

Each entry in the services file determines a service to be used with MessagePlex.  The following describes the configuration options available.

#### `name`

**Required** Unique string identifying the service.

    {
        "name": "GMail",
        ...
    }

#### `url`

**Required** The service url to use.  Essentially, any web application url.

    {
        ...
        "url": "https://mail.google.com",
        ...
    }

#### `icon`

**Required** The icon to use for the service.  This icon is displayed in the left navigation.

    {
        ...
        "icon": "https://mail.google.com/favicon.ico",
    }

#### `notification`

**Optional** The notification regular expression to use.  If this regular expression matches the service document title, then a notification icon is displayed.

    {
        ...
        "notification": "\\(\\d\\)"
    }

The above for example would match when the currently selected GMail folder has any new items.


### Available Scripts

In the project directory, you can run:

#### `npm dev`

Runs the app in the development mode.\
This target starts a react development server located at [http://localhost:5000](http://localhost:5000), launches the electron application and opens the developer tools.

The application will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production or use `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### `npm run app`

Runs the MessagePlex application directly from the `src` folder.

#### `npm run package`

Runs the package for distribution build target.  Currently, only Debian is supported.

#### `npm run arch`

Runs the debtap converter for building an arch based installer from the Debian image.  _Note: This requires `debtap` to be available on your system._

## Features/Issues

Feel free add feature requests or report issues: [Features/Issues](https://github.com/godlikemouse/messageplex/issues).

## Community

Follow [@Collaboradev on Twitter](https://twitter.com/collaboradev).\
Follow the [Collaboradev Blog](https://collaboradev.com).

## License

MessagePlex is released under the GNU v3.0 plus license.

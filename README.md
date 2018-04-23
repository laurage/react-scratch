Creating a React app from scratch.

https://www.valentinog.com/blog/webpack-4-tutorial/

To check if needed: devtools, babelpolyfill
add sass-loader with node-sass
why is react-hot-loader used in production? I guess not needed if dev-server

add jest
compare with packages used in elementary

Following this tutorial: https://medium.com/@evheniybystrov/react-app-from-scratch-d694300d1631
Read this: https://developers.google.com/web/tools/setup/setup-buildtools#dont_trip_up_with_vendor_prefixes 

# Table of Contents

- [Adding .editorconfig file to the root folder](#adding-editorconfig)

# Initialise our app

Create a new directory for our app:

```
mkdir react-app-from-scratch
cd react-app-from-scratch
```

# Create the package.json file

```npm init -f```

# Adding .editorconfig file to the root folder

Add .editorconfig file to maintain consistent coding styles between different editors and IDEs.

http://editorconfig.org/

```
# EditorConfig is awesome: http://EditorConfig.org

root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2

[*.{md,markdown}]
indent_size = 4
trim_trailing_whitespace = false

[{package.json}]
indent_style = space
indent_size = 2
```

Make sure that your editor reads the .editorconfig file instead of its own settings.
For instance, VisualStudioCode requires a plugin installation: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig

# Adding Eslint

Add Eslint to provide a pluggable linting utility for JavaScript.

```npm i -D eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react```

Then create .eslint and write:

```
module.exports = {
  root: true,
  env: {
    'browser': true,
    'jest': true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  extends: 'airbnb',
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'configs/webpack.config.js'
      }
    }
  },
  rules: {
    'semi': [2, 'never'],
    'max-len': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'linebreak-style': 0,
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ]
  }
}
```

And add lint command to package.json scripts section:

```
"scripts": {
  "test": "eslint ."
},
```

To run it use npm run command:

```npm test```

## eslintignore

No need to check webpack files and js files in build by eslint, so creation of an .eslintignore file with:

```
webpack.config.js
build/*.js
``` 

# Adding StyleLint

Add StyleLint to lint CSS/SCSS/Less/Sass.

Follow the steps here (for visual studio code): https://github.com/shinnn/vscode-stylelint

# Browserlist

Several tools (such as Autoprefixer or StyleLint and babel-preset-env) require a list of supported browsers. Rather than writing this list for every different tools, use Browserlist to create a unique list of supported browser, to which each of the tools that need it will refer to. (see https://css-tricks.com/browserlist-good-idea/ for detailed explanation)

Create a .browserslistrc

```
# Browsers that we support

> 1%
Last 2 versions
IE 10 # sorry
```

Use http://browserl.ist/ to test which browsers are supported for each string.

# Babel

Babel is compiler for writing next generation JavaScript. It transforms react jsx and es6 code into old es5 code, readable by old browsers.

We must install babel plugins and add it to the .babelrc file.

To install Babel for nodeJS, we need:
- babel-core: babel compiler
- babel-preset-env: compiles ES2015+ down to ES5 by automatically determining the Babel plugins and polyfills needed based on my targeted browser or runtime environments.
- babel-preset-react: transform jsx into JS


- babel-plugin-transform-class-properties: install to use the new static object properties feature
- babel-plugin-transform-object-rest-spread: isntall to use the rest spread
- babel-plugin-lodash: cherry-picks Lodash modules
- babel-polyfill: polyfills Promises, Object.assign, etc
// ? needed we have react dev server- react-hot-loader: hot reloading

This is only needed in dev environment:

Core:
```
npm i babel-core babel-loader babel-preset-env babel-preset-react --save-dev
```

Addition:
```
npm i babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread --save-dev
```

Other Addition (not added here):
```
npm i babel-plugin-lodash --save-dev
```

This is also needed in prod:
```
npm i -S babel-polyfill
```

Create a configuration file .babelrc
```
{
    "presets": ["env", "react"],
    "plugins": [
      "transform-class-properties",
      "transform-object-rest-spread",
    ]
}
```

# PostCSS (not added here)

PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.

We want to install:
- postcss
- postcss-cssnext: transforms new CSS specs into compatible CSS that aren't yet supported by all browsers. (it uses autoprefixer)
- cssnano: minifies CSS.

```
npm i -D postcss postcss-cssnext cssnano
```

Config file .postcss.config.js:

```js
module.exports = {
  plugins: {
    'postcss-cssnext': {
      warnForDuplicates: false,
    },
    cssnano: {},
  },
};
```

# Webpack

Bundles resources and assets, and outputs out js code in specified location.
The webpack-dev-server lib will helps running a development server which will give benefits like hmr & live reload .

We will use:
- webpack
- webpack-cli
- [html-webpack-plugin](#) — simplifies creation of HTML files to serve your webpack bundles.
- html-loader
- mini-css-extract-plugin
- [css-loader](#) — interprets @import and url() like import/require() and will resolve them.
- [sass-loader with node-sass](#) — sass loader for webpack. Compiles Sass to CSS.
- [DevServer](#https://webpack.js.org/guides/development/) — development server that provides live reloading.

In addition(not used here:)
- [copy-webpack-plugin](#https://www.npmjs.com/package/copy-webpack-plugin) — copies individual files or entire directories to the build directory.
- [babel-loader](#https://github.com/babel/babel-loader) — allows transpiling JavaScript files using Babel and webpack.
- [postcss-loader](#https://github.com/postcss/postcss-loader) — PostCSS loader for webpack.
- [style-loader](#https://github.com/webpack-contrib/style-loader) — adds CSS to the DOM by injecting a <style> tag.
- [file-loader](#) — instructs webpack to emit the required object as file and to return its public URL.
- [extract-text-webpack-plugin](#) — replaces extract-text-webpack-plugin in v3
- [clean-webpack-plugin](#) — a webpack plugin to remove your build folder(s) before building.
- [webpack-bundle-analyzer](#) — webpack plugin and CLI utility that represents bundle content as convenient
- [interactive zoomable treemap](#)
- [lodash-webpack-plugin](#) — create smaller Lodash builds by replacing feature sets of modules with noop, identity, or simpler alternatives.

Needed:
```
npm i webpack webpack-cli html-webpack-plugin html-loader mini-css-extract-plugin css-loader sass-loader node-sass webpack-dev-server --save-dev
```

Additional: (not addded here)
```
npm i copy-webpack-plugin babel-loader postcss-loader style-loader sass-loader node-sass file-loader clean-webpack-plugin webpack-bundle-analyzer lodash-webpack-plugin --save-dev
```

## edit package.json

webpack --mode development : creates a bundle file that isn't minified
webpack --mode production : creates a bundle file that is minified

entry point: ./src/index.jsx
output: --output ./build/main.js

```
"scripts": {
    "dev": "webpack --mode development ./src/index.jsx --output ./build/main.js",
    "build": "webpack --mode production ./src/index.jsx --output ./build/main.js",
    "test": "eslint ."
  },
```

# React

Install the following packages:

- React
- React-DOM — This package serves as the entry point of the DOM-related rendering paths.

Needed: react react-dom

```
npm i -S react react-dom
```

Optional, but useful for most projects:
- Redux — a predictable state container for JavaScript apps.
- react-redux — official React bindings for Redux.
- react-router — declarative routing for react.
- react-router-redux — ruthlessly simple bindings to keep react-router and redux in sync.

```
npm i -S redux react-redux react-router react-router-redux
```

Optional (not installed here):
- RxJS — a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.
- redux-observable — RxJS middleware for action side effects in Redux using “Epics”.
- react-virtualized — React components for efficiently rendering large lists and tabular data.
- react-toolbox — a set of React components implementing Google’s Material Design specification with the power of CSS Modules http://www.react-toolbox.io.
- Lodash — a JavaScript utility library delivering consistency, modularity, performance, & extras.
- moment — parse, validate, manipulate, and display dates and times in JavaScript.
- localForage — offline storage, improved. Wraps IndexedDB, WebSQL, or localStorage using a simple but powerful API.
- react-loadable — a higher order component for loading components with promises.

```
npm i -S rxjs redux-observable react-virtualized react-toolbox lodash moment localforage react-loadable
```

# Source folder

create a ```src``` folder in root.

## src/index.html

## src/index.jsx

Entry point.

# Workbox

// Not installed here //

Workbox is a collection of libraries and build tools that make it easy to store one's website’s files locally, on users’ devices. Consider Workbox if you want to:

Make your site work offline.
Improve load performance on repeat-visits. Even if you don’t want to go fully-offline, you can use Workbox to store and serve common files locally, rather than from the network.
 

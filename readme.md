# Gatsby Reload

Restart Gatsby's process when `gatsby-*` files changes (`gatsby-node`, `gatsby-config`, `gatsby-browser`, and `gatsby-ssr`).

## Install

```bash
yarn add gatsby-plugin-node-reload
```

```js
// gatsby-config.js

module.exports = {
  plugins: [
    'gatsby-plugin-node-reload',
  ]
}
```

## Important: End the newly spawned process

This plugin works by ending the current process when a watched file changes & replace it with a new one. This newly spawned child process will then write output to the same terminal window. However, `cmd + C` will not end the new process. You'd have to end it manually.

At the beginning of the new process, this plugin will output the new process' PID so you can end it manually:

```bash
info PID: 5894
```

Then, on MacOS, you can end the new process by doing the following:

```
kill -15 5894
```

## Options

Add additional files to watch:
```js
// gatsby-config.js

module.exports = {
  plugins: [
    resolve: 'gatsby-plugin-node-reload',
    options: {
      watch: ['./directory-to-watch', './file-to-watch.js']
    }
  ]
}
```

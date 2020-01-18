const { spawn } = require('child_process')
const chokidar = require('chokidar')

const PLUGIN_NAME = 'gatsby-plugin-node-reload'

const restartProcess = ({ reporter }) => {
  try {
    const [_, command, ...args] = process.argv
    spawn(command, args, {
      detached: true,
      stdio: 'inherit',
    }).unref()
  } catch(err) {
    reporter.panic(err)
  } finally {
    process.exit()
  }
}

let watcher

exports.onPreInit = ({ reporter }, { watch = [] }) => {
  if (process.env.NODE_ENV !== 'development') return

  reporter.info(`[${PLUGIN_NAME}] cmd+C will not work! Use 'kill -15 ${process.pid}' to kill this process.`)
  reporter.info(`PID: ${process.pid}`)
  reporter.info(`PID: ${process.pid}`)
  reporter.info(`PID: ${process.pid}`)

  watcher = chokidar.watch(['./gatsby-*', ...watch])
  watcher.on('add', (path) => {
    reporter.info(`[${PLUGIN_NAME}] add ${path}`)
  })
}


exports.onPostBootstrap = ({ reporter }) => {
  if (process.env.NODE_ENV !== 'development') return

  watcher.on('change', path => {
    restartProcess({ reporter })
  })
}
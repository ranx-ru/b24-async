/**
 * b24-async library
 * 
 * @copyright RANX 2021
 */

async function init () {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    BX24.init(() => {
      resolve()
    })
  })
}

async function install () {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    BX24.install(() => {
      resolve()
    })
  })
}

function installFinish () {
  // eslint-disable-next-line no-undef
  BX24.installFinish()
}

async function getAuth () {
  await init()
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    resolve(BX24.getAuth())
  })
}

async function getCurrent () {
  await init()
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    BX24.callMethod('profile', {}, (res) => {
      resolve(res.data())
    })
  })
}

async function callBind (event, handler, authType = 0) {
  await init()
  return new Promise((resolve) => {
    BX24.callBind(event, handler, authType, res => {
      resolve(res)
    })
  })
}

async function callUnbind (event, handler, authType = 0) {
  await init()
  return new Promise((resolve) => {
    BX24.callUnbind(event, handler, authType, res => {
      resolve(res)
    })
  })
}

async function appOptionGet (name) {
  await init()
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    let opt = BX24.appOption.get(name)
    if (typeof opt === 'string' && (opt.indexOf('{') === 0 || opt.indexOf('[') === 0)) {
      opt = JSON.parse(opt)
    }
    resolve(opt)
  })
}

async function appOptionSet (name, val) {
  await init()
  return new Promise((resolve, reject) => {
    if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
      val = JSON.stringify(val)
    }
    // eslint-disable-next-line no-undef
    BX24.appOption.set(name, val)
    resolve()
  })
}

async function userOptionGet (name) {
  await init()
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const opt = BX24.userOption.get(name)
    resolve(opt)
  })
}

async function userOptionSet (name, val) {
  await init()
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    BX24.userOption.set(name, val)
    resolve()
  })
}

const fuckingKeys = {
  'tasks.task.list': 'tasks',
  'catalog.catalog.list': 'catalogs',
  'catalog.product.list': 'products'
}

async function call (method, params, once = false) {
  await init()
  let res = []
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    BX24.callMethod(method, params, result => {
      if (result.error()) {
        reject(result.error().ex)
      } else {
        let resData = result.data()
        if (fuckingKeys[method]) {
          resData = resData[fuckingKeys[method]]
        }
        if (Number.isInteger(resData)) {
          resolve(resData)
        }
        if (typeof resData === 'object' && resData !== null) {
          resData = Object.values(resData)
        }
        res = res.concat(resData)
        if (result.more() && !once) {
          result.next()
        } else {
          resolve(res)
        }
      }
    })
  })
}

async function batch (cmd, halt = false) {
  await init()
  const res = []
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    BX24.callBatch(cmd, result => {
      for (const i in result) {
        let resData = result[i].data()

        if (typeof resData === 'object' && resData !== null) {
          resData = Object.values(resData)
        }

        res[i] = resData
      }
      resolve(res)
    }, halt)
  })
}

async function selectUser () {
  await init()
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    BX24.selectUser(result => {
      resolve(result)
    })
  })
}

// makes iframe's height as big as possible
async function rxFixScroll () {
  await init()
  return new Promise((resolve, reject) => {
    if (parent !== undefined && parent.postMessage !== undefined) {
      const q = window.name.split('|')
      const domain = q[0].replace(/:(80|443)$/, '')
      const protocol = parseInt(q[1]) || 0
      const appSid = q[2] || ''

      const cmd = 'resizeWindow:' + JSON.stringify({ width: '100%', height: window.innerHeight - 3 }) + '::' + appSid

      if (domain) {
        parent.postMessage(cmd, 'http' + (protocol ? 's' : '') + '://' + domain)
      }
    }

    resolve()
  })
}

export default {
  init,
  install,
  installFinish,
  getAuth,
  getCurrent,
  callBind,
  callUnbind,
  appOptionGet,
  appOptionSet,
  userOptionGet,
  userOptionSet,
  call,
  batch,
  selectUser,
  rxFixScroll
}

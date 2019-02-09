const e = process.env

function n(env, defaultValue) {
  return parseInt(env, 10) || defaultValue
}

export const PORT = n(e.PORT, 8080)

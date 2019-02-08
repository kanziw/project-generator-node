const e = process.env

export const PORT = n(e.PORT, 8080)

function n (env, defaultValue) {
  return parseInt(env, 10) || defaultValue
}

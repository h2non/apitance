export const global = new Map()
export const Store = Map

export function get(store) {
  let buf = {}
  ;[ global, store ].forEach(map => {
    map.forEach((value, key) => {
      buf[key] = value
    })
  })
  return buf
}

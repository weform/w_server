/**
 *
 * @param {Array} belongto
 * @param {String} filed
 * @return {Objec}
 *
 *   Based on the relation of the object and fragment to:
 *   @method parse  parse out a fragment
 *   @method comb   combine to a whole object
 *
 */
export const objRelation = (belongto, filed) => {
  return {
    parse: data => {
      const obj = belongto.reduce((p, c) => p[c], data)

      if (typeof obj === 'undefined') return undefined
      return obj[filed]
    },
    comb: fragment => {
      const obj = {}
      const result = belongto.reduce((p, c) => { p[c] = {}; return p[c] }, obj)
      result[filed] = fragment

      return obj
    }
  }
}

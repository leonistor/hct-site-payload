/**
 * cd import_data
 * node generate_prods_leo.js > prods_leo.json
 */

import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'

const prod_dirs = readdirSync('out')
const result = []

prod_dirs.map((prod_dir) => {
  let output = {}
  const delim = prod_dir.indexOf('-')
  const partner = prod_dir.substring(0, delim),
    prod = prod_dir.substring(delim + 1)

  output = Object.assign(output, { partner, name: prod })

  const str = readFileSync(`out/${prod_dir}/${prod_dir}.md`, 'utf8')
  const { data } = matter(str)
  output = Object.assign(output, { url: data.url })

  const content_en = readFileSync(`out/${prod_dir}/${prod}__en.txt`, 'utf8')
  const content_ro = readFileSync(`out/${prod_dir}/${prod}__ro.txt`, 'utf8')
  output = Object.assign(output, { content_en, content_ro })

  const nl_ro = content_ro.indexOf('\n')
  const name_ro = content_ro.substring(0, nl_ro).replaceAll('*', '')
  const nl_en = content_en.indexOf('\n')
  const name_en = content_en.substring(0, nl_en).replaceAll('*', '')
  output = Object.assign(output, { name_en, name_ro })

  const base = `out/${prod_dir}/imgs`
  const imgs = readdirSync(base).map((img) => `${base}/${img}`)
  output = Object.assign(output, { imgs })

  result.push(output)
})

console.log(JSON.stringify(result))

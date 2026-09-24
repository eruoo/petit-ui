import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { parse } from 'postcss'

export interface TokenRow {
  name: string
  value: string
  usage: string
  color: boolean
}
export declare const data: TokenRow[]
const require = createRequire(import.meta.url)
const cssPath = require.resolve('petit-ui/tokens.css')
const specPath = fileURLToPath(new URL('../../docs/specs/tokens-v1.md', import.meta.url))

export default {
  watch: [cssPath, specPath],
  load(): TokenRow[] {
    const css = parse(readFileSync(cssPath, 'utf8'))
    const rows = new Map<string, TokenRow>()
    const spec = readFileSync(specPath, 'utf8')
    const usages = new Map<string, string>()
    let definitionSection = false
    for (const line of spec.split(/\r?\n/)) {
      if (line.startsWith('## ')) {
        definitionSection = ['## 颜色', '## 圆角', '## 共用边框与排版数值'].includes(line)
      }
      // Contrast and recipe tables reuse token names but do not define their meaning.
      if (!definitionSection) continue
      const cells = line.split('|').map((cell) => cell.trim())
      const key = cells[1]?.match(/^`([^`]+)`$/)?.[1]
      if (!key || !cells[2]?.startsWith('`')) continue
      const name = key.startsWith('--petit-') ? key : `--petit-color-${key}`
      usages.set(name, cells.at(-2) ?? '')
    }
    css.walkDecls(/^--petit-/, ({ prop: name, value }) => {
      const usage = usages.get(name)
      if (!usage) throw new Error(`Missing authoritative token description: ${name}`)
      rows.set(name, {
        name,
        value,
        usage,
        color: name.startsWith('--petit-color-'),
      })
    })
    return [...rows.values()]
  },
}

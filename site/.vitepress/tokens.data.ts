import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { parse } from 'postcss'

export interface TokenRow {
  name: string
  light: string
  dark: string
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
    for (const line of spec.split('\n')) {
      const cells = line.split('|').map((cell) => cell.trim())
      const key = cells[1]?.match(/^`([^`]+)`$/)?.[1]
      if (!key || !cells[2]?.startsWith('`')) continue
      const name = key.startsWith('--petit-') ? key : `--petit-color-${key}`
      usages.set(name, cells.at(-2) ?? '')
    }
    css.walkRules((rule) => {
      const dark = rule.selector.includes("[data-theme='dark']")
      rule.walkDecls(/^--petit-/, (declaration) => {
        const { prop: name, value } = declaration
        const usage = usages.get(name)
        if (!usage) throw new Error(`Missing authoritative token description: ${name}`)
        const row = rows.get(name) ?? {
          name,
          light: value,
          dark: value,
          usage,
          color: name.startsWith('--petit-color-'),
        }
        if (dark) row.dark = value
        rows.set(name, row)
      })
    })
    return [...rows.values()]
  },
}

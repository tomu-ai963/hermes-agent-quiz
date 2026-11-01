import { readFileSync } from 'node:fs'
const source = readFileSync(new URL('./data/questions.ts', import.meta.url), 'utf8')
const categories = ['基礎','CLI','設定','ツールセット','Skills','Memory','Profiles','Cron','Gateway','MCP','安全性','Windows']
const counts = Object.fromEntries(categories.map(c => [c, (source.match(new RegExp(`category: '${c}'`, 'g')) || []).length]))
console.log(JSON.stringify({ counts, total: Object.values(counts).reduce((a,b) => a+b, 0) }, null, 2))
if (Object.values(counts).some(n => n < 10)) process.exit(1)

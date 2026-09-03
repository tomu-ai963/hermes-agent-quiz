import { useMemo, useState } from 'react'
import './App.css'

type Category = 'すべて' | '基礎' | '設定' | 'ツール・スキル' | '自動化' | '安全性'
type Question = { id: number; category: Exclude<Category, 'すべて'>; level: string; question: string; choices: string[]; answer: number; explanation: string; tip: string }

const questions: Question[] = [
  { id: 1, category: '基礎', level: '初級', question: 'Hermes Agentを引数なしで起動したときの既定の動作は？', choices: ['設定ウィザードを起動する', '対話型チャットを開始する', 'GitHub Pagesへデプロイする', '最新バージョンへ更新する'], answer: 1, explanation: 'Hermesのサブコマンドを省略すると、既定で対話型のchatとして起動します。単発の質問には hermes chat -q を使えます。', tip: 'まずは「hermes --help」と「hermes doctor」を習慣にしましょう。' },
  { id: 2, category: '設定', level: '初級', question: 'Hermes Agentのメイン設定ファイルとして正しいものは？', choices: ['~/.hermes/config.yaml', '~/.hermes/settings.json', '/etc/hermes.ini', '~/hermes.config'], answer: 0, explanation: '基本設定は ~/.hermes/config.yaml に保存されます。APIキーなどの秘密情報は ~/.hermes/.env に分けて管理します。', tip: '設定変更後に反映されない場合は、CLIを再起動してください。' },
  { id: 3, category: 'ツール・スキル', level: '中級', question: 'スキルを追加した後、現在の会話に反映させる方法は？', choices: ['ブラウザを更新するだけ', '/reset または新しいセッションを開始する', '必ずPCを再起動する', 'GitHubへpushする'], answer: 1, explanation: 'ツールやスキルの構成はセッション開始時に読み込まれます。/resetで新しいセッションを開始すると変更が反映されます。', tip: 'スキルの詳細は hermes skills list、読み込みは /skill name で確認できます。' },
  { id: 4, category: 'ツール・スキル', level: '中級', question: '再利用可能な手順をHermesに覚えさせる仕組みは？', choices: ['Skills（スキル）', 'Cronだけ', 'Profilesだけ', 'Gatewayログ'], answer: 0, explanation: 'Skillsは、複雑な作業で得た手順や知識をSKILL.mdとして保存し、将来のセッションで再利用するための仕組みです。', tip: '一度きりのメモではなく、条件・手順・検証方法まで書くと強いスキルになります。' },
  { id: 5, category: '自動化', level: '中級', question: '定期実行タスクを登録する機能は？', choices: ['Profiles', 'Cron jobs', 'MCP', 'Checkpoints'], answer: 1, explanation: 'Cron jobsは「30m」「every 2h」「0 9 * * *」などのスケジュールでエージェントタスクを定期実行します。', tip: 'cronの実行結果をどこへ届けるか（delivery）も設計しましょう。' },
  { id: 6, category: '安全性', level: '中級', question: 'APIキーらしい文字列をツール出力から隠す設定は？', choices: ['approvals.mode', 'privacy.redact_pii', 'security.redact_secrets', 'display.show_cost'], answer: 2, explanation: 'security.redact_secrets はAPIキー・トークンなどの秘密らしい文字列をツール出力やログから redact する設定です。通常は有効のままにします。', tip: '秘密情報の秘匿と、ユーザーIDなどのPII秘匿は別設定です。' },
  { id: 7, category: '設定', level: '上級', question: '複数の独立したHermes環境を運用したいときに使う機能は？', choices: ['Profiles', 'Skills', 'Sessions export', 'Voice mode'], answer: 0, explanation: 'Profilesは設定・セッション・スキル・メモリを分離した複数のHermes環境を作る機能です。用途ごとの安全な分離に役立ちます。', tip: 'hermes profile create NAME と profile use NAME で管理できます。' },
  { id: 8, category: '安全性', level: '上級', question: 'コマンド実行の承認を安全寄りに自動化するモードは？', choices: ['manual', 'smart', 'off', 'yolo'], answer: 1, explanation: 'approvals.mode: smart は低リスクのコマンドを補助モデルで承認し、高リスク操作ではユーザーに確認します。offは全承認を省略するため注意が必要です。', tip: 'YOLOは便利ですが、通常の開発ではmanualまたはsmartが推奨です。' },
]

const categories: Category[] = ['すべて', '基礎', '設定', 'ツール・スキル', '自動化', '安全性']

function App() {
  const [category, setCategory] = useState<Category>('すべて')
  const [mode, setMode] = useState<'dashboard' | 'quiz' | 'review'>('dashboard')
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<Record<number, number>>(() => JSON.parse(localStorage.getItem('hermes-quiz-answers') ?? '{}'))
  const pool = useMemo(() => questions.filter(q => category === 'すべて' || q.category === category), [category])
  const reviewPool = questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.answer)
  const activePool = mode === 'review' ? reviewPool : pool
  const current = activePool[index]
  const solvedCount = Object.keys(answers).length
  const correctCount = Object.entries(answers).filter(([id, value]) => questions.find(q => q.id === Number(id))?.answer === value).length
  const score = solvedCount ? Math.round((correctCount / solvedCount) * 100) : 0

  const start = (nextMode: 'quiz' | 'review', nextCategory = category) => { setCategory(nextCategory as Category); setMode(nextMode); setIndex(0); setSelected(null) }
  const choose = (choice: number) => { if (selected !== null || !current) return; const next = { ...answers, [current.id]: choice }; setAnswers(next); localStorage.setItem('hermes-quiz-answers', JSON.stringify(next)); setSelected(choice) }
  const next = () => { if (index < activePool.length - 1) { setIndex(index + 1); setSelected(null) } else setMode('dashboard') }

  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={() => setMode('dashboard')}><span className="brand-mark">✦</span><span>Hermes<span className="brand-dim">/</span>Quiz</span></button><nav><button className={mode === 'dashboard' ? 'active' : ''} onClick={() => setMode('dashboard')}>ダッシュボード</button><button onClick={() => start('quiz')}>問題を解く</button><button onClick={() => start('review')}>復習 <span className="nav-badge">{reviewPool.length}</span></button></nav><a className="docs-link" href="https://hermes-agent.nousresearch.com/docs/" target="_blank" rel="noreferrer">公式ドキュメント ↗</a></header>
    <main>
      {mode === 'dashboard' ? <>
        <section className="hero"><div><p className="eyebrow">HERMES AGENT MASTERY</p><h1>使いこなすための、<br /><em>理解度チェック。</em></h1><p className="hero-copy">Hermes Agentの仕組みをクイズで学び、解説で理解を深める。<br />あなたのペースで、確実にスキルを積み上げよう。</p><button className="primary large" onClick={() => start('quiz')}>クイズを始める <span>→</span></button></div><div className="hero-orbit"><div className="orbit orbit-1" /><div className="orbit orbit-2" /><div className="core">✦</div><span className="orbit-label label-top">TOOLS</span><span className="orbit-label label-right">MEMORY</span><span className="orbit-label label-bottom">AGENCY</span><span className="orbit-label label-left">SKILLS</span></div></section>
        <section className="stats"><div><strong>{questions.length}</strong><span>全問題</span></div><div><strong>{solvedCount}</strong><span>回答済み</span></div><div><strong>{score}<small>%</small></strong><span>正答率</span></div><div><strong>{reviewPool.length}</strong><span>要復習</span></div></section>
        <section className="section-head"><div><p className="eyebrow">LEARNING PATH</p><h2>カテゴリから学ぶ</h2></div><span className="section-note">全{questions.length}問を収録</span></section>
        <section className="category-grid">{categories.slice(1).map((item, i) => { const count = questions.filter(q => q.category === item).length; return <button className="category-card" key={item} onClick={() => start('quiz', item)}><span className={`category-icon icon-${i}`}>{['◈', '⌘', '⚙', '◌', '◉'][i]}</span><span className="category-name">{item}</span><span className="category-count">{count}問 <b>→</b></span></button> })}</section>
      </> : <section className="quiz-view"><div className="quiz-top"><button className="back" onClick={() => setMode('dashboard')}>← ダッシュボードへ</button><span>{mode === 'review' ? '間違えた問題を復習' : category === 'すべて' ? 'すべての問題' : category}</span></div>{current ? <><div className="progress-row"><span>QUESTION {String(index + 1).padStart(2, '0')} / {String(activePool.length).padStart(2, '0')}</span><div className="progress"><i style={{ width: `${((index + (selected !== null ? 1 : 0)) / activePool.length) * 100}%` }} /></div></div><div className="question-card"><div className="question-meta"><span className="pill">{current.category}</span><span className="level">{current.level}</span></div><h2>{current.question}</h2><div className="choices">{current.choices.map((choice, i) => <button key={choice} disabled={selected !== null} className={`choice ${selected !== null ? i === current.answer ? 'correct' : i === selected ? 'wrong' : '' : ''}`} onClick={() => choose(i)}><span className="choice-key">{String.fromCharCode(65 + i)}</span>{choice}{selected !== null && i === current.answer && <span className="result">✓</span>}{selected !== null && i === selected && i !== current.answer && <span className="result">×</span>}</button>)}</div>{selected !== null && <div className={`explanation ${selected === current.answer ? 'success' : 'warning'}`}><div className="explanation-title">{selected === current.answer ? '✓ 正解です' : '✦ 惜しい！正解は「' + current.choices[current.answer] + '」'}</div><p>{current.explanation}</p><div className="tip">TIP　{current.tip}</div></div>}</div>{selected !== null && <button className="primary next" onClick={next}>{index === activePool.length - 1 ? '結果を見る' : '次の問題へ'} →</button>}</> : <div className="empty"><span>✦</span><h2>復習する問題はありません</h2><p>すべての問題に挑戦すると、間違えた問題がここに表示されます。</p><button className="primary" onClick={() => start('quiz')}>問題を解く</button></div>}</section>}
    </main><footer><span>Hermes/Quiz</span><span>Learn. Practice. Master.</span></footer>
  </div>
}

export default App

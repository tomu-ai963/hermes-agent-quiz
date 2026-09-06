export type Category = 'すべて' | '基礎' | 'CLI' | '設定' | 'ツールセット' | 'Skills' | 'Memory' | 'Profiles' | 'Cron' | 'Gateway' | 'MCP' | '安全性' | 'Windows'

export type Question = {
  id: number
  category: Exclude<Category, 'すべて'>
  level: string
  question: string
  choices: string[]
  answer: number
  explanation: string
  tip: string
  docsUrl: string
  docsLabel: string
}

export const categories: Category[] = ['すべて', '基礎', 'CLI', '設定', 'ツールセット', 'Skills', 'Memory', 'Profiles', 'Cron', 'Gateway', 'MCP', '安全性', 'Windows']

const docsByCategory: Record<Exclude<Category, 'すべて'>, { url: string; label: string }> = {
  '基礎': { url: 'https://hermes-agent.nousresearch.com/docs/', label: 'Hermes Agent ドキュメント' },
  'CLI': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/cli', label: 'CLI Interface' },
  '設定': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/configuration', label: 'Configuration' },
  'ツールセット': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/tools', label: 'Tools & Toolsets' },
  'Skills': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/skills', label: 'Skills System' },
  'Memory': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/memory', label: 'Persistent Memory' },
  'Profiles': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/profiles', label: 'Profiles' },
  'Cron': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/cron', label: 'Scheduled Tasks (Cron)' },
  'Gateway': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/messaging', label: 'Messaging Gateway' },
  'MCP': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp', label: 'MCP' },
  '安全性': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/security', label: 'Security' },
  'Windows': { url: 'https://hermes-agent.nousresearch.com/docs/user-guide/windows-native', label: 'Windows Native Guide' },
}

const questionItems: Omit<Question, 'docsUrl' | 'docsLabel'>[] = [
  { id: 1, category: '基礎', level: '初級', question: 'Hermes Agentを引数なしで起動したときの既定の動作は？', choices: ['設定ウィザードを起動する', '対話型チャットを開始する', 'GitHub Pagesへデプロイする', '最新バージョンへ更新する'], answer: 1, explanation: 'サブコマンドを省略すると対話型chatとして起動します。単発の質問には hermes chat -q を使います。', tip: 'まず hermes --help と hermes doctor を確認しましょう。' },
  { id: 2, category: '基礎', level: '初級', question: 'Hermesの公式ドキュメントを読む主な目的は？', choices: ['最新仕様と正しい設定方法を確認する', 'APIキーを自動発行する', 'PCを再起動する', 'Gitの履歴を削除する'], answer: 0, explanation: 'Hermesは更新が続くため、コマンドや設定は公式ドキュメントで確認するのが安全です。', tip: '機能を覚えるときは、使い方だけでなく注意点も読みましょう。' },
  { id: 3, category: '基礎', level: '初級', question: 'Hermesの主な特徴として適切なものは？', choices: ['ツールを使って作業するAIエージェントである', '画像編集専用アプリである', '静的HTML専用サーバーである', 'パスワード管理専用ソフトである'], answer: 0, explanation: 'Hermesはモデル、ツール、メモリ、スキルなどを組み合わせて作業するエージェントです。', tip: 'チャットだけでなく、ツール実行まで含めて理解しましょう。' },
  { id: 4, category: '基礎', level: '中級', question: 'Hermesの状態・設定をまとめて保存するディレクトリは？', choices: ['~/.hermes/', '~/Documents/hermes/', '/etc/hermes/', './hermes-data/'], answer: 0, explanation: '設定、認証、メモリ、スキル、セッション、ログなどは基本的に ~/.hermes/ 配下です。', tip: 'HERMES_HOMEを使う構成では保存先が変わります。' },
  { id: 5, category: '基礎', level: '中級', question: 'Hermesを安全に学習するときの基本姿勢は？', choices: ['小さく試し、結果を確認してから範囲を広げる', '最初から承認をすべて無効にする', '秘密情報をチャットに貼る', '設定変更を検証しない'], answer: 0, explanation: 'エージェントは外部操作を行えるため、小さな作業と検証を繰り返すのが安全です。', tip: '重要な作業ではチェックポイントやGitも活用しましょう。' },
  { id: 6, category: 'CLI', level: '初級', question: '対話せずに1回だけ質問を実行するCLI形式は？', choices: ['hermes chat -q "質問"', 'hermes setup -q "質問"', 'hermes tools -q "質問"', 'hermes gateway -q "質問"'], answer: 0, explanation: 'hermes chat -q は単発クエリを非対話で実行するモードです。', tip: '自動化やスクリプトから使うときに便利です。' },
  { id: 7, category: 'CLI', level: '初級', question: '直前のセッションを再開する代表的なオプションは？', choices: ['--continue', '--reinstall', '--clean', '--publish'], answer: 0, explanation: '--continue（-c）は直近のセッションを再開します。特定セッションには--resumeを使います。', tip: '作業の文脈を維持したいときに使います。' },
  { id: 8, category: 'CLI', level: '中級', question: '特定のモデルを指定してチャットするオプションは？', choices: ['--model', '--theme', '--branch', '--profile-only'], answer: 0, explanation: 'hermes chat --model MODELでモデルを指定できます。', tip: 'プロバイダーを固定したい場合は--providerも確認します。' },
  { id: 9, category: 'CLI', level: '中級', question: '利用するツールセットを限定するオプションは？', choices: ['--toolsets', '--sessions', '--quiet-only', '--no-config'], answer: 0, explanation: 'hermes chat --toolsets "web,terminal"のようにツールセットを指定できます。', tip: '必要な権限だけを与える設計に役立ちます。' },
  { id: 10, category: 'CLI', level: '上級', question: '複数エージェントで安全に並行作業するCLI機能は？', choices: ['--worktree', '--verbose-only', '--reset-config', '--single-user'], answer: 0, explanation: '--worktreeは分離されたGit worktreeで作業するための機能です。', tip: '並行作業後は変更とブランチを確認して整理します。' },
  { id: 11, category: '設定', level: '初級', question: 'Hermesのメイン設定ファイルは？', choices: ['~/.hermes/config.yaml', '~/.hermes/settings.json', '/etc/hermes.ini', '~/hermes.config'], answer: 0, explanation: '基本設定はconfig.yamlに保存し、APIキーなどの秘密情報は.envに分けます。', tip: '設定変更後は必要に応じてCLIやGatewayを再起動します。' },
  { id: 12, category: '設定', level: '初級', question: 'APIキーや秘密情報を置くファイルは？', choices: ['config.yaml', '.env', 'SOUL.md', 'jobs.json'], answer: 1, explanation: '秘密情報は~/.hermes/.envに保存します。', tip: '秘密情報をGitへコミットしないようにします。' },
  { id: 13, category: '設定', level: '中級', question: 'モデルとプロバイダーを設定する主な機能は？', choices: ['hermes model', 'hermes pages', 'hermes commit', 'hermes css'], answer: 0, explanation: 'hermes modelは利用するモデルやプロバイダーの選択に使います。', tip: '設定確認にはhermes doctorも役立ちます。' },
  { id: 14, category: '設定', level: '中級', question: 'HERMES_HOMEの役割は？', choices: ['Hermesの状態ディレクトリ境界を変更する', 'Webページの色を変える', 'GitHubのユーザー名を変更する', 'モデルを再学習する'], answer: 0, explanation: 'HERMES_HOMEは設定、メモリ、セッション、スキルなどの保存先を決めます。', tip: 'Profileの分離を理解するうえで重要です。' },
  { id: 15, category: '設定', level: '上級', question: '設定変更が反映されないときの基本的な確認は？', choices: ['新しいセッションまたはプロセスを開始する', '必ず設定ファイルを削除する', '全ログを削除する', 'APIキーを公開する'], answer: 0, explanation: 'ツールやシステムプロンプトに関係する変更は新しいセッションで反映を確認します。', tip: 'Gateway設定はGatewayの再起動も確認します。' },
  { id: 16, category: 'ツールセット', level: '初級', question: 'ツールを論理的にまとめた単位は？', choices: ['Toolset', 'Profile', 'Session', 'Provider'], answer: 0, explanation: 'web、terminal、file、browserなどのツールはToolsetに整理されています。', tip: '必要なToolsetだけを有効にすると範囲を絞れます。' },
  { id: 17, category: 'ツールセット', level: '中級', question: 'Web検索やページ抽出を提供するToolsetは？', choices: ['web', 'memory', 'cronjob', 'safe-only'], answer: 0, explanation: 'web系ツールにはWeb検索やコンテンツ抽出があります。', tip: '検索とブラウザ操作は別の機能として考えます。' },
  { id: 18, category: 'ツールセット', level: '中級', question: 'ファイル編集や検索に関係するToolsetは？', choices: ['file', 'voice', 'spotify', 'gateway-only'], answer: 0, explanation: 'file系のツールはファイル読み書き、検索、パッチなどを扱います。', tip: '変更後は必ず差分やビルドを確認します。' },
  { id: 19, category: 'ツールセット', level: '中級', question: 'コード実行やタスク分解に使う機能の組み合わせは？', choices: ['execute_codeとtodo', 'pagesとcss', 'authとfavicon', 'themeとlogo'], answer: 0, explanation: 'コード実行は検証に、todoは複数段階の作業管理に使えます。', tip: '実行結果を確認してから次の段階へ進みます。' },
  { id: 20, category: 'ツールセット', level: '上級', question: 'ツールを限定する主なメリットは？', choices: ['不要な操作範囲とプロンプトの複雑さを減らす', '必ずモデル精度を倍にする', 'API料金を常にゼロにする', '全機能を自動インストールする'], answer: 0, explanation: '必要なツールだけを公開すると、意図しない操作を減らし管理しやすくなります。', tip: '権限を最小限にする考え方です。' },
  { id: 21, category: 'Skills', level: '初級', question: 'インストール済みSkillを呼び出す方法は？', choices: ['/skill-nameのようなスラッシュコマンド', 'config.yamlの削除', 'Pagesの再デプロイ', '毎回再実装'], answer: 0, explanation: 'Skillはスラッシュコマンドとして利用できます。', tip: 'Skill名を正確に確認するにはhermes skills listを使います。' },
  { id: 22, category: 'Skills', level: '初級', question: 'Skillの標準的な保存場所は？', choices: ['~/.hermes/skills/', '~/.hermes/passwords/', '/etc/cron-only/', './node_modules/hermes/'], answer: 0, explanation: 'SkillsはアクティブなHermes homeのskills配下で管理されます。', tip: 'Profile利用時はHERMES_HOMEに注意します。' },
  { id: 23, category: 'Skills', level: '中級', question: 'Progressive disclosureとは？', choices: ['必要なときにSkillの知識をロードする設計', '全Skillを常時読み込む設計', '設定を毎秒削除する機能', 'モデルを分割する機能'], answer: 0, explanation: '必要な知識だけをオンデマンドで読み込み、トークン使用量を抑えます。', tip: 'Skillの説明は短く、詳細は必要なときに開示します。' },
  { id: 24, category: 'Skills', level: '中級', question: '複数のSkillを組み合わせる方法は？', choices: ['先頭に複数のスラッシュコマンドを並べる', 'Skillを同じ名前にする', '全てのSkillを削除する', 'モデルを再インストールする'], answer: 0, explanation: '先頭に複数のSkillコマンドを並べて同じ依頼に適用できます。', tip: '繰り返し使う組み合わせはSkill bundleも検討します。' },
  { id: 25, category: 'Skills', level: '上級', question: 'Skill Hubからインストールするときに重要な確認は？', choices: ['信頼性とセキュリティスキャンを確認する', '必ず全Skillを有効にする', '秘密情報をSkillへ書く', '検証を省略する'], answer: 0, explanation: '外部Skillは内容や権限を確認し、信頼できるものだけを導入します。', tip: '便利さよりも実行内容の確認を優先します。' },
  { id: 26, category: 'Memory', level: '初級', question: 'ユーザーの好みやプロフィールを保存するファイルは？', choices: ['USER.md', 'config.yaml', 'jobs.json', 'package.json'], answer: 0, explanation: 'USER.mdはユーザープロフィール、好み、コミュニケーションスタイルなどを保存します。', tip: '個人情報は必要最小限にします。' },
  { id: 27, category: 'Memory', level: '初級', question: 'エージェント自身のメモを保存するファイルは？', choices: ['MEMORY.md', 'README.md', 'vite.config.ts', 'index.html'], answer: 0, explanation: 'MEMORY.mdは環境やプロジェクト、学習内容などの個人メモです。', tip: '一時的な作業状態と長期的な知識を分けます。' },
  { id: 28, category: 'Memory', level: '中級', question: 'Memoryが通常システムプロンプトへ読み込まれるタイミングは？', choices: ['セッション開始時', 'キーボード入力のたび', '毎秒自動更新', 'Git push直後'], answer: 0, explanation: 'メモリはセッション開始時にスナップショットとして読み込まれます。', tip: '更新後は新しいセッションで確認します。' },
  { id: 29, category: 'Memory', level: '中級', question: 'メモリがいっぱいになったときの基本方針は？', choices: ['整理・統合・不要項目の削除を行う', '無制限に追加し続ける', '秘密情報を追加する', '全設定を削除する'], answer: 0, explanation: '限られた容量を重要情報に使うため、古い情報を整理します。', tip: '短く、将来も役立つ事実を残します。' },
  { id: 30, category: 'Memory', level: '上級', question: '別々のエージェントでメモリを共有したい場合の安全な考え方は？', choices: ['同じHermes homeを共有せず外部メモリなどを使う', '同じhomeを同時に書き込ませる', '全てをUSER.mdへ書く', 'ログをコピーする'], answer: 0, explanation: '同じhomeを複数プロセスで共有すると書き込みが混ざるため、Profileや外部メモリを使います。', tip: '状態の境界を明確にします。' },
  { id: 31, category: 'Profiles', level: '初級', question: 'Profileが分離するものは？', choices: ['設定・メモリ・スキル・セッションなど', 'モニターの解像度だけ', 'GitHubの公開範囲だけ', 'ブラウザのフォントだけ'], answer: 0, explanation: 'ProfileはHermes homeを分け、複数の独立したエージェント環境を作ります。', tip: '用途ごとにProfileを作ると状態が混ざりません。' },
  { id: 32, category: 'Profiles', level: '初級', question: 'Profileを作成する代表的なコマンドは？', choices: ['hermes profile create NAME', 'hermes profile delete-all', 'hermes pages create', 'hermes profile css'], answer: 0, explanation: 'hermes profile create NAMEで名前付きProfileを作成できます。', tip: 'Profile名は用途が分かる名前にします。' },
  { id: 33, category: 'Profiles', level: '中級', question: 'Profileを切り替えるコマンドは？', choices: ['hermes profile use NAME', 'hermes profile color NAME', 'hermes use-git NAME', 'hermes switch-page NAME'], answer: 0, explanation: 'hermes profile use NAMEで既定のProfileを切り替えます。', tip: '現在のProfileを確認してから作業します。' },
  { id: 34, category: 'Profiles', level: '中級', question: 'Profileとterminal.cwdの違いは？', choices: ['Profileは状態ディレクトリ、cwdはツール実行場所', 'どちらも必ず同じ意味', 'Profileはモデル名、cwdはAPIキー', 'Profileはテーマ、cwdはメモリ'], answer: 0, explanation: 'ProfileはHermes状態を分離し、cwdはターミナル作業の開始ディレクトリです。', tip: '状態の分離と作業場所を混同しないようにします。' },
  { id: 35, category: 'Profiles', level: '上級', question: '複数エージェントを同じHermes homeで同時に動かさない理由は？', choices: ['メモリや状態の書き込みが混ざるため', '必ず画面が暗くなるため', 'GitHub Pagesが消えるため', 'モデルが利用できないため'], answer: 0, explanation: '同じhomeの複数書き込みは状態の競合や意図しない混合を起こします。', tip: '各エージェントに専用Profileを割り当てます。' },
  { id: 36, category: 'Cron', level: '初級', question: 'Cronで使えるスケジュール表現は？', choices: ['30mやevery 2h、cron式など', 'CSSだけ', 'JSONの色名だけ', '必ず手動クリックだけ'], answer: 0, explanation: 'Cronは期間表現、自然言語風表現、5フィールドcron式などに対応します。', tip: '短い間隔で試してから本番スケジュールにします。' },
  { id: 37, category: 'Cron', level: '初級', question: 'Cronジョブを一時停止する操作は？', choices: ['pause', 'compile', 'theme', 'fork-only'], answer: 0, explanation: 'Cronジョブはpause/resumeで停止と再開を管理できます。', tip: '削除ではなく一時停止を使い分けます。' },
  { id: 38, category: 'Cron', level: '中級', question: 'Cronジョブに紐づけられるものは？', choices: ['1つ以上のSkill', '必ず別のGitリポジトリ', '画面テーマだけ', 'キーボード配列だけ'], answer: 0, explanation: '定期タスクにSkillを添付し、毎回同じ専門手順を適用できます。', tip: '定期レポートなどに向いています。' },
  { id: 39, category: 'Cron', level: '中級', question: 'No-agent modeの特徴は？', choices: ['LLMを使わずスクリプトを定期実行する', '常にモデルを再学習する', '全操作を人間が入力する', 'Gatewayだけを再起動する'], answer: 0, explanation: 'No-agent modeはスクリプトの標準出力を配信する、LLMを介さないジョブです。', tip: '決まった処理を低コストで実行できます。' },
  { id: 40, category: 'Cron', level: '上級', question: '無人Cronで危険なコマンドが承認待ちになった場合の注意点は？', choices: ['cron_modeなど無人実行の承認方針を確認する', '必ず承認を無効化する', 'ログを削除する', '別PCを買う'], answer: 0, explanation: '無人実行では人が承認できないため、Cron用の安全な承認ポリシーを設計します。', tip: '危険な操作を避ける設計も重要です。' },
  { id: 41, category: 'Gateway', level: '初級', question: 'Gatewayの主な役割は？', choices: ['複数のメッセージング平台を接続する', 'CSSをビルドする', 'モデルを学習する', 'Gitを初期化する'], answer: 0, explanation: 'GatewayはTelegramやDiscordなどとHermesを接続します。', tip: 'プラットフォームごとの設定を確認します。' },
  { id: 42, category: 'Gateway', level: '初級', question: 'Gatewayが扱うものは？', choices: ['プラットフォーム別セッションとメッセージ配送', 'npmの依存関係だけ', '画像の色だけ', 'Gitのタグだけ'], answer: 0, explanation: 'Gatewayはチャットごとのセッションをルーティングし、応答やCron結果を配送します。', tip: 'セッション分離の考え方を理解します。' },
  { id: 43, category: 'Gateway', level: '中級', question: 'Gatewayを前景で起動するコマンドは？', choices: ['hermes gateway run', 'hermes gateway css', 'hermes pages run', 'hermes chat gateway-only'], answer: 0, explanation: 'hermes gateway runはGatewayを前景で起動します。', tip: 'サービス運用ではstatusやrestartも使います。' },
  { id: 44, category: 'Gateway', level: '中級', question: 'Gatewayが連携できるプラットフォームの例は？', choices: ['TelegramやDiscord、Slack', 'Gitだけ', 'Viteだけ', 'TypeScriptだけ'], answer: 0, explanation: 'Hermes Gatewayは複数のメッセージングプラットフォームに対応します。', tip: '各プラットフォームの認証と権限を確認します。' },
  { id: 45, category: 'Gateway', level: '上級', question: 'Gateway運用でセッション分離が重要な理由は？', choices: ['チャットごとの会話と状態を混ぜないため', 'テーマを固定するため', 'CSSを圧縮するため', 'Gitを高速化するため'], answer: 0, explanation: 'プラットフォームやチャットごとにセッションを分けることで文脈の混線を防ぎます。', tip: '複数利用者がいる場合は認証も合わせて設計します。' },
  { id: 46, category: 'MCP', level: '初級', question: 'MCPの主な役割は？', choices: ['外部ツールサーバーをHermesに接続する', 'HermesのCSSを変更する', 'Gitのコミットを削除する', '必ずモデルを学習する'], answer: 0, explanation: 'MCPは外部のツールエコシステムをHermesから利用するためのプロトコルです。', tip: '接続先の信頼性を確認します。' },
  { id: 47, category: 'MCP', level: '初級', question: 'MCPサーバーの接続方式の例は？', choices: ['stdioとHTTP', 'CSSとSVGだけ', 'PNGとJPGだけ', 'GitとFTPだけ'], answer: 0, explanation: 'HermesはローカルstdioサーバーとリモートHTTPサーバーを扱えます。', tip: '接続方式に応じて認証と実行環境を確認します。' },
  { id: 48, category: 'MCP', level: '中級', question: 'MCPのツールフィルタリングの目的は？', choices: ['サーバーの全ツールではなく必要なものだけ公開する', 'ツールを必ず削除する', 'モデルを変更する', '画面を暗くする'], answer: 0, explanation: '必要なツールだけを公開することで権限とプロンプトの複雑さを抑えられます。', tip: '削除系や変更系ツールは特に慎重に選びます。' },
  { id: 49, category: 'MCP', level: '中級', question: 'MCPサーバーを追加した後に基本的に行うことは？', choices: ['Hermesを起動してツールの自動検出を確認する', 'モデルを再学習する', 'Cookieを全削除する', 'GitHub Pagesへ公開する'], answer: 0, explanation: '起動時にMCPツールが発見・登録され、通常のツールとして使えるようになります。', tip: '接続状態やツール一覧を確認します。' },
  { id: 50, category: 'MCP', level: '上級', question: 'MCPの認証情報を扱うときの原則は？', choices: ['秘密情報は.envなどの安全な場所で管理する', '問題文へAPIキーを書く', 'Gitへ平文コミットする', '全員に共有する'], answer: 0, explanation: 'MCPのAPIキーや認証情報も通常の秘密情報と同じように扱います。', tip: 'ログやツール出力への漏えいにも注意します。' },
  { id: 51, category: '安全性', level: '初級', question: '秘密らしい文字列を出力から隠す設定は？', choices: ['security.redact_secrets', 'display.show_cost', 'model.default', 'cron.model'], answer: 0, explanation: 'security.redact_secretsはAPIキーやトークンらしい文字列をredactします。', tip: '通常は有効のままにします。' },
  { id: 52, category: '安全性', level: '初級', question: '危険なコマンドの承認モードsmartの特徴は？', choices: ['低リスクは自動判断し高リスクは確認する', '全てを無条件に実行する', '全てを削除する', 'ログだけを表示する'], answer: 0, explanation: 'smartは利便性と安全性のバランスを取る承認モードです。', tip: '重要な環境ではmanualも検討します。' },
  { id: 53, category: '安全性', level: '中級', question: 'PIIの秘匿と秘密情報のredactは？', choices: ['別の関心事・設定である', '常に同じ設定である', 'どちらも不要である', 'GitHub Pagesの機能である'], answer: 0, explanation: '秘密情報と個人識別情報は異なるため、それぞれの設定を理解します。', tip: 'データの種類ごとに扱いを決めます。' },
  { id: 54, category: '安全性', level: '中級', question: 'ファイル書き込み安全策の目的は？', choices: ['意図しない重要ファイルの変更を減らす', '必ず全ファイルを削除する', 'モデルを再学習する', '通信速度を上げる'], answer: 0, explanation: '書き込みガードや安全ルートは事故による状態破壊を減らします。', tip: '安全策はハードな攻撃境界ではない点も理解します。' },
  { id: 55, category: '安全性', level: '上級', question: '本番運用でネットワーク分離を強める選択肢は？', choices: ['SSHやコンテナなどの別ターミナルバックエンドを使う', '承認を全て無効にする', 'APIキーを公開する', 'ログを消す'], answer: 0, explanation: 'SSHやコンテナバックエンドを使い、実行環境を分離できます。', tip: '権限、ネットワーク、認証をまとめて設計します。' },
  { id: 56, category: 'Windows', level: '初級', question: 'Windowsネイティブ環境での公式インストール方法は？', choices: ['PowerShellで公式install.ps1を実行する', '必ずWSL2だけを使う', 'ブラウザ拡張を入れる', 'Pagesからexeを作る'], answer: 0, explanation: 'Windows 10/11では公式PowerShellインストーラーでネイティブ導入できます。', tip: 'インストール後は新しいターミナルを開きます。' },
  { id: 57, category: 'Windows', level: '初級', question: 'WindowsのHermesデータの既定保存先として案内されている場所は？', choices: ['%LOCALAPPDATA%\\hermes', '%PROGRAMFILES%\\GitHub', 'C:\\Windows\\Temp\\hermes', 'デスクトップ直下'], answer: 0, explanation: 'Windowsネイティブ版では%LOCALAPPDATA%\\hermesがデータディレクトリの既定です。', tip: 'HERMES_HOMEやインストールオプションで変更できます。' },
  { id: 58, category: 'Windows', level: '中級', question: 'Windowsインストール後にPATHを反映する方法は？', choices: ['新しいターミナルを開く', '必ずBIOSを更新する', 'GitHubへpushする', 'CSSを再ビルドする'], answer: 0, explanation: 'User PATHへの変更は、新しく開いたターミナルで反映されます。', tip: 'hermes --versionで確認します。' },
  { id: 59, category: 'Windows', level: '中級', question: 'WindowsでGit Bashが使われる理由は？', choices: ['Hermesのターミナル実行にbash環境を提供するため', '画像を生成するため', 'APIキーを作るため', 'Pagesを公開するため'], answer: 0, explanation: 'PortableGitはbash.exeとgitを提供し、ターミナルツールやGit操作に使われます。', tip: 'PowerShellとGit Bashの違いを意識します。' },
  { id: 60, category: 'Windows', level: '上級', question: 'Windowsで設定のUTF-8 BOMが問題になることがある対象は？', choices: ['config.yaml', '画像ファイル', 'GitHubのREADME表示', 'ブラウザの履歴'], answer: 0, explanation: '設定ファイルにUTF-8 BOMが入ると、初回設定で解析エラーになる場合があります。', tip: '設定ファイルはUTF-8 BOMなしで保存します。' },
]

export const questionBank: Question[] = questionItems.map(q => ({ ...q, docsUrl: docsByCategory[q.category].url, docsLabel: docsByCategory[q.category].label }))

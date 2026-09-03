# Hermes/Quiz

Hermes Agentをクイズで学び、解説で理解を深める日本語Webアプリです。

## 機能

- Hermes Agentの基礎・設定・ツール/スキル・自動化・安全性の問題
- 正誤判定と、回答直後の解説・TIP
- 回答履歴、正答率、要復習数をブラウザのlocalStorageに保存
- 間違えた問題だけを再挑戦する復習モード
- Hermes Agent公式ドキュメントへのリンク

## ローカルで起動

```bash
npm install
npm run dev
```

本番ビルドの確認:

```bash
npm run build
npm run preview
```

## GitHub Pages

`vite.config.ts` はリポジトリ名 `hermes-agent-quiz` をベースパスとして設定しています。
GitHubへpush後、GitHub Actionsで `dist` をビルドし、Pagesへ公開できます。

GitHub側で **Settings → Pages → Source: GitHub Actions** を選択してください。

## デプロイ先について

このアプリは静的サイトなので、GitHub Pagesで十分です。より簡単なプレビューURLや独自ドメイン、プルリクエストごとのPreview環境が必要になったら、VercelまたはNetlifyが便利です。

- GitHub Pages: 無料、GitHubとの相性がよい、今回の用途に最適
- Vercel: GitHub連携とPreviewデプロイが強い
- Netlify: 静的サイトの公開とフォーム等の追加が簡単

## 技術

Vite / React / TypeScript / CSS

問題の正確性は、Hermes Agent公式ドキュメントの更新に合わせて定期的に見直してください。
公式: https://hermes-agent.nousresearch.com/docs/

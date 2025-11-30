# フロントエンドセットアップガイド

## 📋 前提条件の確認

### 1. Node.js と npm のバージョン確認

node --version # >= 22 であることを確認
npm --version # >= 10 であることを確認### 2. バックエンドのセットアップと起動

まず、バックエンドが正常に動作することを確認します：

# プロジェクトルートで実行

# 依存関係のインストール

npm install

# データベースマイグレーションの実行

npm run migration:run

# バックエンドの起動（開発モード）

npm run start:devバックエンドが起動したら、以下にアクセスしてAPI仕様を確認：

- Swagger UI: http://localhost:3000/api
- API エンドポイント: http://localhost:3000/content

## 🎨 フロントエンドのセットアップ

### ステップ1: 依存関係のインストール

ash

# frontendディレクトリに移動

cd frontend

# 依存関係のインストール

npm install### ステップ2: 環境変数の設定（オプション）

`.env` ファイルを作成（デフォルトでは `http://localhost:3000` を使用）：

VITE_API_BASE_URL=http://localhost:3000### ステップ3: 開発サーバーの起動

# frontendディレクトリで実行

npm run devフロントエンドは `http://localhost:5173` で起動します。

## 🏗️ 実装済みの技術スタック

### フレームワーク・ライブラリ

- **React 18.3.1** - UIライブラリ
- **TypeScript 5.6.2** - 型安全性
- **Vite 5.4.10** - ビルドツール
- **styled-components 6.1.19** - CSS-in-JS
- **React Router DOM 7.9.6** - ルーティング（実装済みだが現在は未使用）

### テスト

- **Vitest 1.0.4** - テストフレームワーク
- **React Testing Library 14.1.2** - コンポーネントテスト
- **@testing-library/user-event 14.5.1** - ユーザーインタラクションテスト
- **jsdom 23.0.1** - DOM環境のエミュレーション

## 📁 プロジェクト構造

frontend/
├── src/
│ ├── components/ # 再利用可能なコンポーネント
│ │ ├── Button/ # ボタンコンポーネント
│ │ ├── Footer/ # フッターコンポーネント
│ │ ├── Icon/ # アイコンコンポーネント
│ │ ├── PageEditor/ # ページエディターコンポーネント
│ │ └── Sidebar/ # サイドバーコンポーネント
│ ├── pages/ # ページコンポーネント
│ │ └── Home.tsx # ホームページ
│ ├── hooks/ # カスタムフック
│ │ └── useContent.ts # コンテンツ管理フック
│ ├── services/ # API呼び出し
│ │ └── contentService.ts # コンテンツAPIサービス
│ ├── types/ # TypeScript型定義
│ │ └── content.ts # コンテンツ型定義
│ ├── utils/ # ユーティリティ関数
│ │ └── validation.ts # バリデーション関数
│ ├── test/ # テストファイル
│ │ ├── setup.ts # テストセットアップ
│ │ ├── validation.test.ts
│ │ ├── contentService.test.ts
│ │ └── PageEditor.test.tsx
│ ├── App.tsx # ルートコンポーネント
│ └── main.tsx # エントリーポイント
├── public/ # 静的ファイル
│ └── img/icon/ # アイコン画像
├── package.json
├── vite.config.ts # Vite設定（Vitest設定含む）
└── tsconfig.json # TypeScript設定

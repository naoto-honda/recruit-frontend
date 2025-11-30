# NCDC フロント課題[Markdown Editor]の実装

![](./Design/画面/20220615/03_title_edit.png)

## 概要

このプロジェクトは、NCDCのフロントエンド課題として実装したMarkdown Editorアプリケーションです。  
ページの作成・編集・削除機能を備えたシンプルなエディターです。

## 実行環境構築

### 必要な環境

- Node.js >= 22
- npm >= 10

### セットアップ手順

### 1. リポジトリのクローン

git clone https://github.com/naoto-honda/recruit-frontend.git

### 2. バックエンドのセットアップ

cd recruit-frontend

#### 依存関係のインストール

npm install

#### データベースのマイグレーション

npm run migration:run

#### バックエンドサーバーの起動（別ターミナル）

npm run start:devバックエンドは `http://localhost:3000` で起動します。

### 3. フロントエンドのセットアップ

#### frontendディレクトリに移動

cd frontend

#### 依存関係のインストール

npm install

#### 開発サーバーの起動

npm run devフロントエンドは `http://localhost:5173` で起動します。

### 4. 動作確認

ブラウザで `http://localhost:5173` にアクセスして、アプリケーションが正常に動作することを確認してください。

### テストの実行

#### frontendディレクトリで実行

cd frontend

#### テストの実行（ウォッチモード）

npm run test

#### テストの実行（一度だけ）

npm run test -- --run

#### テストUIの起動

npm run test:ui

#### テストカバレッジの確認

npm run test:coverage

## 技術スタック

### フロントエンド

- **React 18.3.1** - UIライブラリ
- **TypeScript 5.6.2** - 型安全性
- **Vite 5.4.10** - ビルドツール（高速な開発体験）
- **styled-components 6.1.19** - CSS-in-JS（コンポーネント単位でのスタイリング）

### テスト

- **Vitest 1.0.4** - テストフレームワーク（Viteとの統合が容易）
- **React Testing Library 14.1.2** - コンポーネントテスト
- **@testing-library/user-event 14.5.1** - ユーザーインタラクションテスト

### バックエンド

- **NestJS** - Node.jsフレームワーク
- **TypeORM** - ORM
- **SQLite** - データベース

### 技術選択の理由

- **React + TypeScript**: 型安全性とコンポーネントベースの開発が可能
- **Vite**: 高速な開発サーバーとビルド（Webpackより高速）
- **styled-components**: コンポーネントとスタイルを一体化し、保守性を向上
- **Vitest**: Viteプロジェクトとの統合が容易で、高速なテスト実行が可能

## 実装した機能

### 基本機能（要件）

- ✅ **ページの取得** - サイドバーに全ページを表示
- ✅ **ページの作成** - 「+」ボタンで新規ページ作成
- ✅ **ページの削除** - 「-」ボタンでページ削除
- ✅ **タイトルの編集** - タイトルの編集・保存機能
- ✅ **本文の編集** - 本文の編集・保存機能
- ✅ **バリデーション** - タイトル: 1-50文字、本文: 10-2000文字

### 追加実装した機能

- ✅ **レスポンシブ対応** - モバイル・タブレット・デスクトップに対応
  - モバイル（768px以下）: サイドバーをオーバーレイ表示
  - タブレット・デスクトップ: 横並びレイアウト
- ✅ **インライン編集** - 編集ボタンで編集モードに切り替え
- ✅ **バリデーション** - 入力確定時にエラーメッセージを表示
- ✅ **文字数カウント** - リアルタイムで文字数を表示
- ✅ **エラーハンドリング** - APIエラーを適切に処理
- ✅ **ローディング状態** - 保存中の状態を表示

## 設計・実装について

### 設計思想

- **コンポーネント化**: 再利用可能なコンポーネント（Button, Icon, Footer等）を作成し、保守性を向上
- **カスタムフック**: データ取得・更新ロジックを`useContent`と`useContentList`に分離し、ロジックとUIを分離
- **型安全性**: TypeScriptを活用して型安全性を確保し、実行時エラーを削減
- **レスポンシブデザイン**: モバイルファーストで実装し、タブレット・デスクトップにも対応

### プロジェクト構造

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
│ └── test/ # テストファイル
│ ├── setup.ts # テストセットアップ
│ ├── validation.test.ts
│ ├── contentService.test.ts
│ ├── useContent.test.ts
│ └── PageEditor.test.tsx
├── public/ # 静的ファイル
│ └── img/icon/ # アイコン画像
└── package.json

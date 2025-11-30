## Description

NCDC フロント課題[Markdown Editor]の実装
![](./Design/画面/20220615/03_title_edit.png)

## 実行環境構築

### 必要な環境

- Node.js >= 22
- npm >= 10

### セットアップ手順

#### 1. リポジトリのクローン

h
git clone <リポジトリURL>
cd recruit-frontend#### 2. バックエンドのセットアップ

# 依存関係のインストール

npm install

# データベースのマイグレーション

npm run migration:run

# バックエンドサーバーの起動（別ターミナル）

npm run start:devバックエンドは `http://localhost:3000` で起動します。

#### 3. フロントエンドのセットアップ

ash

# frontendディレクトリに移動

cd frontend

# 依存関係のインストール

npm install

# 開発サーバーの起動

npm run devフロントエンドは `http://localhost:5173` で起動します。

#### 4. 動作確認

ブラウザで `http://localhost:5173` にアクセスして、アプリケーションが正常に動作することを確認してください。

### テストの実行

ash

# frontendディレクトリで実行

cd frontend

# テストの実行（ウォッチモード）

npm run test

# テストの実行（一度だけ）

npm run test -- --run## 実装した機能

- ✅ ページの取得
- ✅ ページの作成
- ✅ ページの削除
- ✅ ページのタイトルの編集
- ✅ ページのコンテンツの編集
- ✅ サイドバーでのページ一覧表示
- ✅ レスポンシブ対応（モバイル・タブレット・デスクトップ）
- ✅ バリデーション（タイトル: 1-50文字、本文: 10-2000文字）

## 設計・実装について

### 技術スタック

- **フロントエンド**: React 18 + TypeScript + Vite
- **スタイリング**: styled-components
- **テスト**: Vitest + React Testing Library
- **バックエンド**: NestJS + TypeORM + SQLite

### 設計思想

- **コンポーネント化**: 再利用可能なコンポーネント（Button, Icon, Footer等）を作成
- **カスタムフック**: データ取得・更新ロジックを`useContent`と`useContentList`に分離
- **型安全性**: TypeScriptを活用して型安全性を確保
- **レスポンシブデザイン**: モバイルファーストで実装し、タブレット・デスクトップにも対応

### テスト

以下のテストを実装しています：

- `validation.test.ts`: バリデーション関数のテスト（18テストケース）
- `contentService.test.ts`: APIサービスのテスト
- `PageEditor.test.tsx`: コンポーネントのテスト

## API

API の Document は、  
アプリを起動後、`http://localhost:3000/api` にて Swagger で確認できる。  
![](./doc/images/swagger.png)

## DB を初期状態に戻す

$ cp ./data/bk-dev.sqlite ./data/dev.sqlite

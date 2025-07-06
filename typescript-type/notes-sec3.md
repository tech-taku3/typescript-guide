# Section3: コンパイラを使う方法

## watchモードを使って、保存時に自動的にTSからJSにコンパイルする方法

```bash
tsc index.js --watch // もしくは-w

control + cで止まる
※エラーが起きていてもコンパイルはされる
```

## tsc —init でtsconfig.jsonを作り、全てのファイルを一気にコンパイルする方法

```bash
touch compiler.ts
# 半角スペースで列挙可能。数が多くなると大変
tsc index.ts compiler.ts

tsc --init　# tsconfig.jsonが作成される
tsc　# 全てのtsファイルがコンパイルされる (tsconfig.jsonのデフォルト設定)
tsc -w　# watchモードも可能
tsc index.ts # tsconfig.jsonの内容は適用されず、単体でコンパイルされる。
```
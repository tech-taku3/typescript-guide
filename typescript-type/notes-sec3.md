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

## includeとexcludeとfilesを使ってコンパイルするファイルを選ぶ方法

```json
// tsconfig.json
...
  "include": [
    "index.ts"
  ],
  "exclude": [
    // "index.ts", // 両方設定した場合、include - excludeで、index.tsはコンパイルされない。
    "**/compiler.ts",
    "#.spec.ts",
    "nodemodules" // デフォルトでexcludeしているが、"exclude"を明示的に指定する場合、上書きされてしまうため、忘れずに書くこと
  ],
  "files": [ // ただのファイルを指定することができる。excludeしていても、filesが勝つ。ワイルドカード指定できない。ディレクトリ指定もできない。
    "tmp/compiler.ts"
  ]

// include　, filesがないときは全てがコンパイル対象。includeなくてもfilesがあればfilesのみ対象
```

## compilerOptions: targetを指定して、特定のバージョンのJavaScriptに変換する方法

```json
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // → 指定しない場合デフォルトではES3(講義ではES5と)。es6(es2015), es2017,など
```
ref.[TypeScript_target](https://www.typescriptlang.org/ja/tsconfig/#target)

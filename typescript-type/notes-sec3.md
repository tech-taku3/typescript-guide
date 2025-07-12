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


## compilerOptions: libを指定して、TypeScriptが用意している型の定義を追加する

```tsx
let hello = 'hello';
console.log(hello.toUpperCase());
```
そもそもTSはどうやってtoUpperCase()を認識している？

`npm install -g typescript`を実行した際に型の定義ファイルをインストールしている。

`    // "lib": [],`デフォルトのこの行のコメントアウトを外すと、型の定義ファイルが空になく各所エラーになる。

例：`toUpperCase`は"es6", `cosole`は"DOM"を指定するとエラーが外れる
```json
    "lib": [
      "es6",
      "DOM"
    ],  
```

libをコメントアウトすると、targetで指定したバージョンによりlibの内容が変わる。

perplexity参照↓
> "target": "es2016" → デフォルトのlibは ["dom", "es2016", "dom.iterable", "scripthost"]

## allowJs, checkJs, jsx, declaration, declarationMapの設定

```json
"allowJs": true,            // jsファイルをコンパイルの対象にする
"checkJs": true,            // jsファイルもtsファイルと同様にエラーをレポートする。allowJsと一緒に使う
"jsx": true,                // React.jsのために使う
"declaration": true,        // 型定義ファイル(.d.ts)を作る。 例:自作ライブラリを配布したい。→コンパイルしたjsを公開。型情報が抜けてしまう。　.d.tsで型情報を渡すことで、補完やドキュメントとして使うことができる
"declarationMap": true,     // 型定義ファイルのためのソースマップを作る。
 ```

## SourceMapを使用して、ブラウザでTypeScriptを操作する方法
```json
"sourceMap": true,          // jsとtsの架け橋になるMapfileを作成。ブラウザがtsファイルを理解できるようにするもの
```
tscを実行すると、compiler.js → compiler.js.mapが作成される
jsファイル → tsファイルを作り出すためのファイル。

↓Dev tool: compiler.js
```jsx
"use strict";
let hello = 'hello';
console.log(hello.toUpperCase());
//# sourceMappingURL=compiler.js.map
```
↓Dev tool: compiler.ts
```tsx
let hello = 'hello';
console.log(hello.toUpperCase());
```

## outDirとrootDir, removeComments, noEmit, downlevelIterationの使い方

outFile: 出力するファイルを一つにまとめる（今では使われない古い設定）
outDir: 

```json
"outFile": "./",            //　出力するファイルを一つにまとめる（今では使われない古い設定）
"outDir": "./",             // コンパイルしたjsファイルの出力先。全部のtsファイルが最も効率的に入るようdistの中身が設定される。tsの階層構造が一まとまりになっている場合、ディレクトリ構造が出力されない。
"rootDir": "./",            // 上記に対し、構造を維持した状態でコンパイルしたjsファイルを出力できるようになる。　すべてのjsファイルが含まれないとエラーになる。
"removeComments": true,     // コンパイルしたファイルにコメントアウトが含まれない
"noEmit": true,             // 何も出力しない。エラーだけチェックする
"downlevelIteration": true, // targetがES5, ES3のときのみ使用可能。　for-ofなどをコンパイルするときエラーが出たら、このオプションを検討する。
```

## noEmitOnErrorオプションを使って、エラーが出たときにコンパイルしない方法

```
"noEmitOnError": true,
```

## noImplicitAnyやstrictNullChecksなどのstrictの設定

```json
    /* Type Checking */ 
    "strict": true,                             // これをtrueにすると、下記すべてが自動的にtrueに設定される
    // "noImplicitAny": true,                   // 暗黙的なanyは避ける。明示的にanyを宣言した場合はOK
    // "strictNullChecks": true,                // null, undefinedを除外して型チェックする
    // "strictFunctionTypes": true,             // クラスの継承時に起こり得るバグの可能性を防ぐ
    // "strictBindCallApply": true,             // bind,call,applyメソッド使用時の第２引数以降の型チェック
    // "strictPropertyInitialization": true,    // クラスを使用するときに使う。
    // "strictBuiltinIteratorReturn": true,     // 
    // "noImplicitThis": true,                  // thisが何を示しているかわからないときにエラー
    // "useUnknownInCatchVariables": true,      // try-catchのcatchで受け取る値をunknownにする(falseの場合any)
    // "alwaysStrict": true,                    // コンパイル後、jsファイルの先頭に "use strict"がつく
```

## 綺麗なコードを書くための設定

```json
"noUnusedLocals": true,             // 使用されていないローカル変数はエラー
"noUnusedParameters": true,         // 使用されていない引数はエラー
"noImplicitReturns": true,          // 暗黙的なreturnをエラー
"noFallthroughCasesInSwitch": true, // switch文で使う
```
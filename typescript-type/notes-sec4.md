# Section4: TypeScriptではクラスをこう使う！

## Class

- Class
  - オブジェクトの設計図
  - classから作られたオブジェクトはインスタンスと呼ばれる
  - 似たようなオブジェクトを複数作成する際に便利

- オブジェクト指向プログラミング(OOP)
  - OOPとは現実世界の物に見立ててプログラミングする方法
  - どのようにアプリケーションを作るかという方法の1つ
  - 人間にとってわかりやすくロジックを分割する方法の1つ


## classを定義してオブジェクトを作成する方法

```tsx
class Person {
    name: string;
    constructor(initName: string) {
        this.name = initName;
    }
}

const quill = new Person("Quill");
console.log(quill);
```

```bash
tsc
node dist/src/class.js
>> Person { name: 'Quill' }
```


## jsにコンパイルされたファイル

ES6:  フィールドの概念がない。　※es2022からjsのクラスにフィールド構文が追加された
```jsx

"use strict";
class Person {
    constructor(initName) {
        this.name = initName;
    }
}
const quill = new Person("Quill");
console.log(quill);
```

ES5: classはなかった。コンストラクタ関数。
```jsx
"use strict";
var Person = /** @class */ (function () {
    function Person(initName) {
        this.name = initName;
    }
    return Person;
}());
var quill = new Person("Quill");
console.log(quill);
```

## クラスにメソッドを追加する方法

```tsx
class Person {
    name: string;
    constructor(initName: string) {
        this.name = initName;
    }

    greeting() {
        console.log(`Hello! My name is ${this.name}`);
    }
}

const quill = new Person("Quill");
quill.greeting();
```

```bash
tsc
node dist/src/class.js
# Hello! My name is Quill
```


thisは、その処理が書かれた関数がどう呼び出されたかによってthisの中身が変わる。
- constructorのなか → this=インスタンス
- quill.greeting()で呼び出された → this= 関数が呼び出された左側の`quill`オブジェクト


↓この場合のthisはanotherQuillを指す。nameプロパティがないため、undefinedを返す。
```tsx
...
const anotherQuill = {
    anotherGreeting: quill.greeting
}
anotherQuill.anotherGreeting() 
```
```bash
Hello! My name is Quill
Hello! My name is undefined
```

thisの型を推論するのは難しい。
TypeScriptでは、thisがどういう型であるべきか指定することができる。
```tsx
    // greeting() {
    greeting(this: { name: string }) {
        console.log(`Hello! My name is ${this.name}`);
    }
}

const quill = new Person("Quill");
quill.greeting();

const anotherQuill = {
    anotherGreeting: quill.greeting
}
anotherQuill.anotherGreeting() // ←ここで下記エラーがでる。nameプロパティを作ることで解消。
```
```
型 '{ anotherGreeting: (this: { name: string; }) => void; }' の 'this' コンテキストを型 '{ name: string; }' のメソッドの 'this' に割り当てることはできません。
  プロパティ 'name' は型 '{ anotherGreeting: (this: { name: string; }) => void; }' にありませんが、型 '{ name: string; }' では必須です。ts(2684)
class.ts(8, 22): 'name' はここで宣言されています。
```

> arrow関数ではthisに影響を与えないため、thisの型指定は使えない（使う必要もない）
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
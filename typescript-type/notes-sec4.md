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

## クラスを型として使う

```tsx
class Person {
    name: string;
    constructor(initName: string) {
        this.name = initName;
    }

    greeting(this: Person) {  //　クラス型を指定
        console.log(`Hello! My name is ${this.name}`);
    }
}
```

TypeScriptは`class Person`のときに、値を作ると同時に、
そのクラスが生成するインスタンスの型も同名で作成する


## public修飾子とprivate修飾子を使用して、アクセスを制限する方法

```tsx
class Person {
    name: string; // デフォルトでpublic
    private age: number; // privateをつけると、クラスの外側からアクセスできなくなる。
    constructor(initName: string, initAge: number) {
        this.name = initName;
        this.age = initAge;
    }

    incrementAge() {
        this.age += 1;
    }

    greeting(this: Person) {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    }
}

const quill = new Person("Quill", 38);
quill.incrementAge();
// quill.age = 42; // 直接自由に値を書き換えられるのよくない。 private　age: とすることでクラスの外側からアクセスできない。
// console.log(quill.age); // 読み込むこともできない
quill.greeting();
```

> コンパイルしたjsではprivateがない。※ES2022でprivateフィールド構文がjsに追加された(書き方は変わる)

## 初期化の処理を省略する方法

constructorに、public/plivate　と変数名を書くことで、初期化の処理を省略することができる

```tsx
class Person {
    name: string; // デフォルトでpublic
    private age: number; // privateをつけると、クラスの外側からアクセスできなくなる。
    constructor(initName: string, initAge: number) {
        this.name = initName;
        this.age = initAge;
    }

    incrementAge() {
        this.age += 1;
    }

    greeting(this: Person) {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    }
}

// 省略後↓
class Person {
    constructor(public name: string, private age: number) {
    }

    incrementAge() {
        this.age += 1;
    }

    greeting(this: Person) {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    }
}
```

## readonly修飾子を使って、書き換えできないようにする方法

readonly: 読むだけ。クラスの内側でも外側でも、書き換えできないようにする。
constructor内でのみ書き換えができる。インスタンス作成以降書き換えミスを防ぐ。


```tsx
    readonly id: number = 32;
    constructor(public readonly name: string, private age: number) {
        this.id = 31; // constructor内であれば書き換え可能
        this.name = 'hoo';
        this.id = 30;
    }

```

## extendsを使用して、他のクラスの機能を継承する方法

```tsx
class Teacher extends Person {
    constructor(name: string, age: number, public subject: string) {    //
        super(name, age)                       // 継承した子クラスでconstructorを定義する際は、superを含めなければならない。
    }
    greeting() { // オーバーライド。サブクラスにて同じメソッド名で処理を上書き可能
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`);
    }
}

const teacher = new Teacher('Quill', 38, 'Math');
teacher.greeting();
```

ただ、この状態のままでは、

`I am ${this.age} years old.`の箇所で
`プロパティ 'age' はプライベートで、クラス 'Person' 内でのみアクセスできます。ts(2341)`
というエラーが発生している。
これの対処法は次で。
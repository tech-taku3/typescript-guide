# Section5: これがInterfaceだ

## interfaceはこう使う

interfaceとは...オブジェクトのみのタイプエイリアス
違い
typeエイリアスは...全部いける

interfaceのメリット
オブジェクトののみのため、オブジェクトのことを指し示していることがわかりやすい。

```tsx
/** typeエイリアスの使い方　おさらい
type Human = {
    name: string;
    age: number;
}

const human: Human = {
    name: 'Quill',
    age: 38
}

let developer: Human;

 */

// interface
interface Human {
    name: string;
    age: number;
}

const human: Human = {
    name: 'Quill',
    age: 38
}
let developer: Human;
```

## メソッドをオブジェクトの型に指定する方法

```tsx
interface Human {
    name: string;
    age: number;
    // greeting: (message: string)=> void;  // 関数の型注釈おさらい
    greeting(message: string) :void;        // あくまでオブジェクトの中の関数、メソッドに対してはこう指定できる。
}

const human: Human = {
    name: 'Quill',
    age: 38,
    greeting(message: string): void {
        console.log(message);
    }
}

```

## implementsを使用して、クラスに対してinterfaceの条件を適用させる方法

classとinterfaceを同時に適用させる

```tsx
interface Human {
    name: string;
    age: number;
    greeting(message: string) :void;
}

class Developer implements Human{
    constructor(public name: string, public age: number) {} // private, protectedは使えない。readonly,publicは使える。　新しいプロパティを追加はOK
    greeting(message: string) {
        console.log('hello')
    }
}
```

- classをextendsで継承させる際に複数指定できない
- implementsは複数同時に指定することができる。カンマ区切り
- implementsはコンパイルしたら消える。そのクラスで実装されている内容がinterfaceで指定されている型とマッチするかをチェックするための機能
- implementsには、interfaceだけでなく、typeエイリアスも使用できる
- implementsでstaticプロパティ、staticメソッドに影響を与えることはできない。あくまでimplementsは、クラスが生成するインスタンスが持っているオブジェクトの形を表している。

## 構造的部分型 (structural subtyping)
- 構造的(structural)
    - 同じ構造をした型であれば区別はしない
- 部分型(subtyping)
    - 取れる値の範囲がより広い型への代入は可能

TSにおけるオブジェクトの型とは、そのプロパティだけを持っていることを表すのではなく、最低限そのプロパティは持っているということを保証しているものというイメージ

## readonly修飾子をinterfaceに使った読むだけのプロパティを作る方法

```tsx
interface Human {
    readonly name: string;
    age: number;
    greeting(message: string): void;
}
...
const user: Human = tmpDeveloper;

// user.name = 'faa'; // 読み取り専用プロパティであるため、'name' に代入することはできません。ts(2540)
let developer = new Developer('Quill', 38, 3);
developer.name = 'hello' // Developer implements Human　の中では、nameをpublicにしており、interfaceに影響の受けない
```

## extendsを使ってinterfaceを継承する方法

```tsx
interface Nameable {
    name: string;
}
/**
 * 継承する型がtypeエイリアスでも、同じように継承できる
type Nameable = {
    name: string;
}

typeエイリアス自体でextendsを使うことはできない。
ただ、intersection型という仕組みを使うことで、A　かつ　Bと意味になり、　interfaceでextendsするのと同じような動きになる
type A = {
    age: number;
} & Nameable
*/

// interfaceを継承する方法。
// interfaceはextendsに複数指定できる
interface Human_2 extends Nameable {
    age: number;
    greeting(message: string): void;
}

class Developer_2 implements Human_2 {
    // Nameableの型のルールがHuman_2型に適用され、nameがないとエラーがでる
    constructor(public name: string, public age: number, public experience: number) {}
    greeting(message: string): void {
        console.log(message);
    }
}
```


同じ名前のプロパティを継承することはできるの？Classの場合はextendsを使って継承した場合子が上書きしていたが<br>
→ interfaceは条件によっては上書きされる。<br>
子の型が親の型に代入できる場合上書きすることができる。(例. 親: string, 子: any)

## interfaceで関数の型を表現する方法 - コールシグネチャ、コンストラクタシグネチャ

interfaceはオブジェクトの型を表現するものという話だったが

interfaceは関数の型も定義できる

```tsx
// typeでの書き方。基本はこちらで良い。
// type addFunc = (num1: number, num2: number) => number;
// interfaceで関数の型を定義する方法。{}でオブジェクトと混同しやすい。他の人のコード理解のため知っておくと良い
interface addFunc {
    // メソッド名を書かない。　この書き方は「コールシグネチャ」という
    (num1: number, num2: number): number;
    // 「コンストラクタシグネチャ」
    // new (num1: number, num2: number): number;
}
let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
    return n1 + n2;
}

// コンストラクタシグネチャの使い方
function tmp(func: addFunc) {
    let data = new func(1, 2)
}
```

補足：なぜこのようにinterfaceの型を定義することができるのか

→ TSでは関数自体もオブジェクトだから。



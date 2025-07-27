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

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
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
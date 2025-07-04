// let hasValue: boolean = true;
// // numberは浮動小数点も整数も負数も扱える
// let count: number = 10;
// let float: number = 3.14;
// let negative: number = -0.12;

// let single: string = 'hello';
// let double: string = "hello";
// let back: string = `hello`;

// 冗長なので、基本は「型推論」で書く
let hasValue  = true;
let count = 10;
let float = 3.14;
let negative = -0.12;
let single = 'hello';
let double = "hello";
let back = `hello`;

// 型推論できない場合に型注釈を用いる
// let hello2; ← any型でなんでもありになってしまう
let hello2: string;
// hello2 = 2; // ← string指定するとエラーになる
hello2 = 'hello';
// hello2 = true; // ← string指定するとエラーになる

// objectに型をつける
// TypeScriptの型推論に任せる方法
let person = {
    name: 'Jack',
    age: 21
}

// 型を明示する方法
const person2: {
    name: string;
    age: number;
} = {
    name: 'Jack',
    age: 21
}

// オブジェクトの型として、object型は使わない。　｛｝も同様。
const person3: object = {
    name: 'Jack',
    age: 21
}
// console.log(person3.name) // ←エラー：　プロパティ 'name' は型 'object' に存在しません。

// ネストするオブジェクトの型
const person4: {
    name: {
        first: string;
        last: string;
    },
    age: number;
} = {
    name: {
        first: 'Jack',
        last: 'Smith'
    },
    age: 21
}

// 配列の型
const fruits: string[] = ['apple', 'banana', 'cherry'];
// numberを入れるには、any[]型にするか、型推論に任せるか、|で区切る
const anys: (string | number | boolean)[] = ['apple', 10, true, false];

// Tuple型を使用して、決まった内容の配列を作る方法
const book: [string, number, boolean] = ['business', 1500, false];
// book.push(21) //←コンパイルの時はエラー起きない。TypeScriptは初期値の型チェックは厳しいが、その後はゆるい
// console.log(book[3]) // ←　ただ、参照するときには、この型に[3]はないとエラーを出してくれる

// 列挙型を作成。CoffeeSizeという型を作成。本物のオブジェクトも作成
enum CoffeeSize {
    SHORT = 'SHORT',
    TALL = 'TALL',
    GRANDE = 'GRANDE',
    VENTI = 'VENTI'
}

const coffee = {
    hot: true,
    size: CoffeeSize.TALL
}

// どんな型にもなるany型
let anything: any = true;
anything = 'hello';
anything = ['hello', 33, true];
anything = {};
anything.hoge = 'hoge';
let banana = 'banana';
banana = anything; // string型にanyも入れることができてしまう。
// TypeScriptの型のメリットが活かせないため、なるべくanyは使わない

// Union型を使って複数の型を使う方法
let unionType: number | string = 100;
unionType.toUpperCase(); // エラーになる。文脈を見て賢くエラーを出し分けてくれる。
unionType = 'hello';
unionType.toUpperCase();
// Union型：　配列での使い方
let unionTypes: (number | string)[] = [21, 'hello'];

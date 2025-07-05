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
// unionType.toUpperCase(); // エラーになる。文脈を見て賢くエラーを出し分けてくれる。
unionType = 'hello';
unionType.toUpperCase();
// Union型：　配列での使い方
let unionTypes: (number | string)[] = [21, 'hello'];

// Literal型を使って特定の値のみを取り扱う方法
const apple: 'apple' = 'apple' // 'apple'しか受けれない　　"" `` はどちらも同じLiteralとして扱われる
// const apple = 'apple' // constにした理由：constにすると、型推論でLiteral型として扱われる
// let apple = 'apple' // letの場合はstring型になる

// typeエイリアス
type ClothSize = 'small' | 'medium' | 'large'

// Union型と組み合わせて、enumと似たような使い方ができる。Union型よりシンプルで、こちらの使い方推奨。
let clothSize : ClothSize = 'large'

const cloth: {
    color: string;
    size: ClothSize
} = {
    color: 'white',
    size: 'medium'
}

// 関数に型を適用させる方法 パラメータと戻り値。戻り値には型推論が有効。パラメータは指定しないとany型に。
function add (num1: number, num2: number): number {
    return num1 + num2
}

// 関数の戻り値にvoid型を使う方法
function sayHello(): void {
    console.log("Hello!");
}

console.log(sayHello()); 
// 厳密には、undefinedを返す。　
// Hello!
// undefined

// undefined型とnull型 それぞれそれしか入れることができない型。
let tempUndefined: undefined = undefined;
let tempNull: null = null;

//関数型を使って、特定の関数のみを代入することができる変数を作る
const anotherAdd: (n1: number, n2: number) => number = add;
// 無名関数でも書くことができる。前と後ろどちらかの型注釈があれば、型推論してくれる。
const anotherAdd2: (n1: number, n2: number) => number = function (num1: number, num2: number): number {
    return num1 + num2
};
// アロー関数
const doubleNumber: (num: number) => number = num => num * 2;

// callback関数の型
function doubleAndHandle(num: number, cb: (num: number) => number): void {
    const doubleNum = cb(num * 2)
    console.log(doubleNum);
}

doubleAndHandle(21, doubleNum => {
    return doubleNum
});

let unknownInput: unknown;
let anyInput: any;
let text: string;

anyInput = 'hello';
anyInput = 21;
anyInput = true;
unknownInput = 'hello';
unknownInput = 21;
unknownInput = true;

text = anyInput;
// text = unknownInput; // エラーになる。anyとの違い。なんでも入れれるが使うときは注意してね。少し厳しくなる。
// ナローイング、タイプガードで活躍
if (typeof unknownInput === 'string') {
    text = unknownInput;
}

// satisfies演算子
28 satisfies number
const age = 28 satisfies number // ただの演算子。型推論には一切影響を与えない。ageについては、satisfies numberがないのと同じ扱い。型推論を機能させつつ、型注釈と同じ型チェックができる

// never型を使って、起こり得ない値の型を使用する
function error(message: string): never {
    throw new Error(message);
    // 無限ループなどもなにも返さないのでneverが使える
    // while(true) {
    //     console.log('hoge')
    // }
}

// 関数宣言の場合、型推論はvoidになる
function error1(message: string) {
    throw new Error(message);
}

// 関数式で書いた場合、error2の戻り値の型推論はnever型になる
const error2 = function (message: string) {
    throw new Error(message);
}
// →　後方互換性のため。neverはTypeScriptのver2から登場。　関数式、アロー関数の場合、そのような挙動をしないためnever型推論される。

function gitSizeName(size: 's' | 'm' | 'l') {
    switch(size) {
        case 's': return 'small'
        case 'm': return 'medium'
        case 'l': return 'large'
        default: return size  satisfies never // 網羅性のチェックに便利。Union型に'xl'を入れた場合、ここがエラーになり気づきやすい
    }
}

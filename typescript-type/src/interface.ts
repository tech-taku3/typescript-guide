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
    readonly name: string;
    age: number;
    // greeting: (message: string)=> void;  // 関数の型注釈おさらい
    greeting(message: string) :void;        // あくまでオブジェクトの中の関数、メソッドに対してはこう指定できる。
}

class Developer implements Human{
    constructor(public name: string, public age: number, public experience: number) {}
    greeting(message: string) {
        console.log(message)
    }
}

const human: Human = {
    name: 'Quill',
    age: 38,
    greeting(message: string) {
        console.log(message);
    }
}

const tmpDeveloper = {
    name: 'Quill',
    age: 38,
    experience: 3,
    greeting(message: string) {
        console.log(message)
    }
}
// const user: Human = new Developer('Quill', 38, 3) // 抽象←具体　という代入なのでエラーがでない。
const user: Human = tmpDeveloper; // オブジェクトを代入でもOK
/** 
// ↓の場合、experienceは明らかに不要なプロパティのためエラーがでる。余分なプロパティをexcess propertyという
const user2: Human = {
    name: 'Quill',
    age: 38,
    experience: 3,
    greeting(message: string) {
        console.log(message)
    }
}

*/

// user.name = 'faa'; // 読み取り専用プロパティであるため、'name' に代入することはできません。ts(2540)
let developer = new Developer('Quill', 38, 3);
developer.name = 'hello' // Developer implements Human　の中では、nameをpublicにしており、interfaceに影響の受けない

interface Nameable {
    name: string;
    nickName?: string;
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

// typeでの書き方。基本はこちらで良い。
// type addFunc = (num1: number, num2: number) => number;
// interfaceで関数の型を定義する方法。{}でオブジェクトと混同しやすい。他の人のコード理解のため知っておくと良い
interface addFunc {
    // メソッド名を書かない
    (num1: number, num2: number): number;
}
let addFunc: addFunc;
addFunc = (n1: number, n2: number) => {
    return n1 + n2;
}

// ?がつくと、nickNameはあってもなくてもエラーにならない
const nameable: Nameable = {
    name:'Quill',
    nickName: 'Quilla'
}

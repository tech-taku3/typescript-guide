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
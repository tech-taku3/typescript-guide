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
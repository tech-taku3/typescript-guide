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
    constructor(public name: string, public age: number) {}
    greeting(message: string) {
        console.log('hello')
    }
}

const human: Human = {
    name: 'Quill',
    age: 38,
    greeting(message: string) {
        console.log(message);
    }
}

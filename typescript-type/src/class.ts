class Person {

    constructor(public readonly name: string, protected age: number) {
    }

    incrementAge() {
        this.age += 1;
    }

    greeting(this: Person) {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    }
}

class Teacher extends Person {
    constructor(name: string, age: number, public subject: string) {    //
        super(name, age)                       // 継承した子クラスでconstructorを定義する際は、superを含めなければならない。
    }
    greeting() { // オーバーライド。サブクラスにて同じメソッド名で処理を上書き可能
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`);
    }
}

const teacher = new Teacher('Quill', 38, 'Math');
teacher.greeting();

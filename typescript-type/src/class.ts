class Person {
    static species = 'Homo sapiens';
    static isAdult(age: number) {
        if (age > 17) return true;
        return false;
    }
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
    get subject() {
        if (!this._subject) {
            throw new Error('There is no subject.');
        }
        return this._subject;
    }
    set subject (value) {
        if (!this._subject) {
            throw new Error('There is no subject.');
        }
        this._subject = value;
    }
    constructor(name: string, age: number, public _subject: string) {    //
        super(name, age)                       // 継承した子クラスでconstructorを定義する際は、superを含めなければならない。
    }
    greeting() { // オーバーライド。サブクラスにて同じメソッド名で処理を上書き可能
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old. I teach ${this.subject}`);
    }
}

console.log(Person.species);
console.log(Person.isAdult(38));
console.log(Teacher.species);
console.log(Teacher.isAdult(38));

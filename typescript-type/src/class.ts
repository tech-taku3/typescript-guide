abstract class Person {  // ※　abstractクラスはインスタンスを生成しない。継承のためだけに使われるクラスである。
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
        this.explainJob();
    }

    abstract explainJob(): void;
}

class Teacher extends Person {
    private static instance: Teacher;
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
    private constructor(name: string, age: number, public _subject: string) {    // constructorにprivateを指定することで、外部からのnewを封じる。
        super(name, age)                       // 継承した子クラスでconstructorを定義する際は、superを含めなければならない。
    }

    static getInstance() {
        if (Teacher.instance) return Teacher.instance;          // この処理を挟むことで、一度しかインスタンスを作成されないシングルトンパターンが実現できる。
        Teacher.instance = new Teacher('Quill', 38, 'Math');    // クラス宣言内でならnewは使える
        return Teacher.instance;
    }

    explainJob() {
        console.log(`I am a teacher and I teach ${this.subject}.`)
    }
}

const teacher = Teacher.getInstance();
const teacher2 = Teacher.getInstance();
console.log(teacher, teacher2);
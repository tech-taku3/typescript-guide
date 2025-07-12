class Person {
    name: string; // デフォルトでpublic
    private age: number; // privateをつけると、クラスの外側からアクセスできなくなる。
    constructor(initName: string, initAge: number) {
        this.name = initName;
        this.age = initAge;
    }

    incrementAge() {
        this.age += 1;
    }

    greeting(this: Person) {
        console.log(`Hello! My name is ${this.name}. I am ${this.age} years old.`);
    }
}

const quill = new Person("Quill", 38);
quill.incrementAge();
// quill.age = 42; // 直接自由に値を書き換えられるのよくない。 private　age: とすることでクラスの外側からアクセスできない。
// console.log(quill.age); // 読み込むこともできない
quill.greeting();

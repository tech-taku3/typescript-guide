class Person {
    name: string;
    constructor(initName: string) {
        this.name = initName;
    }

    // greeting() {
    // greeting(this: { name: string }) {
    greeting(this: Person) {
        console.log(`Hello! My name is ${this.name}`);
    }
}

const quill = new Person("Quill");
quill.greeting();

const anotherQuill = {
    name: 'anotherQuill',
    greeting: quill.greeting
}
anotherQuill.greeting() // この場合のthisはanotherQuillを指す。nameを設定していないため、undefinedを返す。

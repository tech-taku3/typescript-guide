class Person {
    name: string;
    constructor(initName: string) {
        this.name = initName;
    }

    // greeting() {
    greeting(this: { name: string }) {
        console.log(`Hello! My name is ${this.name}`);
    }
}

const quill = new Person("Quill");
quill.greeting();

const anotherQuill = {
    name: 'anotherQuill',
    anotherGreeting: quill.greeting
}
anotherQuill.anotherGreeting() // この場合のthisはanotherQuillを指す。nameを設定していないため、undefinedを返す。

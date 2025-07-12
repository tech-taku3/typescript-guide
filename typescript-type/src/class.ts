class Person {
    name: string;
    constructor(initName: string) {
        this.name = initName;
    }
}

const quill = new Person("Quill");
console.log(quill);
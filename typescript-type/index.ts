// let hasValue: boolean = true;
// // numberは浮動小数点も整数も負数も扱える
// let count: number = 10;
// let float: number = 3.14;
// let negative: number = -0.12;

// let single: string = 'hello';
// let double: string = "hello";
// let back: string = `hello`;

// 冗長なので、基本は「型推論」で書く
let hasValue  = true;
let count = 10;
let float = 3.14;
let negative = -0.12;
let single = 'hello';
let double = "hello";
let back = `hello`;

// 型推論できない場合に型注釈を用いる
// let hello2; ← any型でなんでもありになってしまう
let hello2: string;
// hello2 = 2; // ← string指定するとエラーになる
hello2 = 'hello';
// hello2 = true; // ← string指定するとエラーになる

class Person {
    sayHello() {
        console.log(this.name);
    }
}
const p = new Person();
p.name = "Abhishek";
p.sayHello()
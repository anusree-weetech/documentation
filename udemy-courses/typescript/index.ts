function logger<T extends new (...args: any[]) => any>(
  target: T,
  cxt: ClassDecoratorContext
) {
  console.log(target);
  console.log(cxt);
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log(this.name);
    }
  };
}

function autobind(
  target: (...args: any[]) => any,
  cxt: ClassMethodDecoratorContext
) {
  console.log(target);
  console.log(cxt);
  cxt.addInitializer(function (this: any) {
    this[cxt.name] = this[cxt.name].bind(this);
  });

  return function (this: any) {
    console.log("called greet fn");
    target.apply(this);
  };
}

@logger
class Person {
  name = "Max";

  @autobind
  greet() {
    console.log(`Hi, I am ${this.name}`);
  }
}

const person = new Person();
person.greet()
console.log(person);

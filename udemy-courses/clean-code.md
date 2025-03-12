## clean code

- issues:
    - names: variables, functions, classes
    - structuer: code formattng, comments
    - funtion length
    - error handling
    - deep nesting
    - classe: bloated clases, missing distriction
- souiton:
    - pateerns n principles, tdd, rules

<br>

- clean code: code (our focus)
- clean arhcitecture: whole project organisation


<br>

- avoid quick code, keep refactoring

<br>

### Naming 

- naming: variables- adj+noune(userData), funcitons- acitons+adj(getData), classses- noun+adj (RequestBody)
- casing:camelCase, snake_case, PascalCase, kebab-case

<br>

- in general try to keep nameig short and specific
- exceptions include built in function/methods

<br>

- redundant, no slang, distinct/specific, be consitent

<br>

### Comments

- bad comments: has redundant info, just comments to declare stuff (classes, functions), misleading comments, commetned out code
- good comments: any legal info, exolaing some code like regex, to provde warings (another way is to make try catch block), to create todo notes for what to code next
- better to have docs with links as comments 

<br>

- code formatting: 
    - vertical: gruoping code,  spacing bw lines
        - one class per file, keep realted concepts togetehr
    - horizonatl: indentation, spcaing bw code charatcers
        - use indentation, use short names, break long lines

        <br>

### Functions
- good: less params- max 3 params
    - in case many params-put it under a single object
    - sometime sokay to havemany params-eg:sum func

- levels of abstraction: high (better naming), low(direct functio writetn withou customisg name)
- fucntion with sideeffects must be named so. eg: saveSomethign, createSomethig etc.
- funtions that can be unit tested well are good fucntions

<br>

### Control Structures n errors
- better code: less deep nested, more factory fucntions nd polymorphism, use more positive checks(eg:isValid), utilise errors

<br>
 
 - guards and fail fast: basically nagative check using early return
 - when it comes to usig strings, try to create contstants before hab=nd then using htose variables to refer to any string (like action creators)
    

    <br>

### Classes n objects
- clean coding as part of
    - claas, objects, DS
    - polymorphism
    - OOPS
- classes must be short, easy to read
must have single respsibility (SRP: single responsitbility principle)
- cohesion: how much each  the methods use, how much of teh properties of the class
    - none of the methods use nay class orperty: no cohesion
    - all methods use all class properties: max cohesive
    - moderate number if methods use moderate number of props": highly cohesive
    - get such ind of clas, kee class seizes small
- Law of demeter:  
- out of solid principles, S and O has clear impact on clean code

### **Law of Demeter (LoD) Simplified** 🚀  

The **Law of Demeter** (also called the **"Principle of Least Knowledge"**) says:  

👉 **"Talk only to your close friends, not strangers!"**  

In coding, it means:  
✅ A class should only interact with its **direct dependencies** (not deeply nested objects).  
✅ Don't chain too many method calls like obj.getA().getB().getC().doSomething().  

---

### **Example of Breaking LoD (Bad Code)**  
python
class Engine:
    def start(self):
        print("Engine started!")

class Car:
    def __init__(self):
        self.engine = Engine()  # Car has an Engine

class Driver:
    def __init__(self, car):
        self.car = car

    def start_car(self):
        self.car.engine.start()  # ❌ BAD! Directly accessing Engine inside Car

💡 **Problem**: The Driver class is reaching **too deep** into Car to access Engine.  

---

### **Fixed Using LoD (Good Code)**  
python
class Car:
    def __init__(self):
        self.engine = Engine()

    def start(self):
        self.engine.start()  # Car handles its own engine!

class Driver:
    def __init__(self, car):
        self.car = car

    def start_car(self):
        self.car.start()  # ✅ GOOD! Driver only talks to Car, not Engine

💡 **Fix**: The Driver only interacts with Car, and Car manages its own Engine.  

---

### **Why Follow the Law of Demeter?**  
✅ **Less dependency = Easier maintenance**  
✅ **More modular & reusable code**  
✅ **Fewer unexpected bugs**  

Would you like an even shorter version? 😊



Here's the **SOLID Principles** explanation with **JavaScript examples** 🚀  

---

## **1️⃣ S - Single Responsibility Principle (SRP)**  
👉 **"One class = One job."**  

✅ **Each class/module should have only one reason to change.**  

❌ **Bad Example:** (Handles both report generation and saving)  
```javascript
class Report {
  generate() {
    console.log("Generating report...");
  }

  saveToFile() {
    console.log("Saving report to file..."); // ❌ Mixing responsibilities
  }
}
```
💡 **Problem:** The class is responsible for **two things**: generating and saving reports.  

✅ **Good Example (SRP Applied):**  
```javascript
class Report {
  generate() {
    console.log("Generating report...");
  }
}

class ReportSaver {
  save(report) {
    console.log("Saving report to file...");
  }
}
```
💡 **Fix:** We split the responsibilities into **two separate classes.**  

---

## **2️⃣ O - Open/Closed Principle (OCP)**  
👉 **"Open for extension, closed for modification."**  

✅ **You should be able to add new features without modifying existing code.**  

❌ **Bad Example:** (Using if-else for payment methods)  
```javascript
class PaymentProcessor {
  process(method) {
    if (method === "creditCard") {
      console.log("Processing credit card payment");
    } else if (method === "paypal") {
      console.log("Processing PayPal payment");
    } // ❌ Adding a new method means modifying this class
  }
}
```
💡 **Problem:** We must edit the `process` method to add more payment types.  

✅ **Good Example (OCP Applied):**  
```javascript
class Payment {
  pay() {
    throw new Error("Method not implemented");
  }
}

class CreditCardPayment extends Payment {
  pay() {
    console.log("Processing credit card payment");
  }
}

class PayPalPayment extends Payment {
  pay() {
    console.log("Processing PayPal payment");
  }
}

function processPayment(payment) {
  payment.pay();
}

processPayment(new CreditCardPayment()); // ✅ Easily extendable!
processPayment(new PayPalPayment());
```
💡 **Fix:** We use **inheritance** instead of `if-else`, making it easy to add new payment types.  

---

## **3️⃣ L - Liskov Substitution Principle (LSP)**  
👉 **"Subclasses should be replaceable for their parent class."**  

✅ **A child class should work anywhere the parent class is used.**  

❌ **Bad Example:** (Penguin inherits `fly()` but can’t fly!)  
```javascript
class Bird {
  fly() {
    console.log("Flying...");
  }
}

class Penguin extends Bird {}

const penguin = new Penguin();
penguin.fly(); // ❌ Penguins can't fly!
```
💡 **Problem:** `Penguin` inherits a method it **shouldn’t have**.  

✅ **Good Example (LSP Applied):**  
```javascript
class Bird {}

class FlyingBird extends Bird {
  fly() {
    console.log("Flying...");
  }
}

class Sparrow extends FlyingBird {}

class Penguin extends Bird {} // ✅ No fly() method

const sparrow = new Sparrow();
sparrow.fly(); // ✅ Works correctly

const penguin = new Penguin();
// penguin.fly(); ❌ Won't even exist, so no issue
```
💡 **Fix:** We separate birds into **FlyingBird** and **Non-FlyingBird**.  

---

## **4️⃣ I - Interface Segregation Principle (ISP)**  
👉 **"Don’t force classes to implement methods they don’t need."**  

✅ **Interfaces (or abstract classes) should be small and specific.**  

❌ **Bad Example:** (Robot has an `eat()` method it doesn’t need)  
```javascript
class Worker {
  work() {
    console.log("Working...");
  }

  eat() {
    console.log("Eating...");
  }
}

class Robot extends Worker {
  eat() {
    throw new Error("Robots don't eat!"); // ❌ Not needed
  }
}
```
💡 **Problem:** `Robot` is forced to have an `eat()` method it **shouldn’t have**.  

✅ **Good Example (ISP Applied):**  
```javascript
class Workable {
  work() {
    throw new Error("Method not implemented");
  }
}

class Eatable {
  eat() {
    throw new Error("Method not implemented");
  }
}

class Human extends Workable {
  work() {
    console.log("Working...");
  }

  eat() {
    console.log("Eating...");
  }
}

class Robot extends Workable {
  work() {
    console.log("Working...");
  }
}

const human = new Human();
human.work();
human.eat();

const robot = new Robot();
robot.work();
// robot.eat(); ❌ Doesn't exist, so no issue
```
💡 **Fix:** We separate `Workable` and `Eatable` into **two separate interfaces**.  

---

## **5️⃣ D - Dependency Inversion Principle (DIP)**  
👉 **"Depend on abstractions, not concrete classes."**  

✅ **High-level modules should not depend on low-level modules directly.**  

❌ **Bad Example:** (Hardcoded dependency)  
```javascript
class Keyboard {}

class Computer {
  constructor() {
    this.keyboard = new Keyboard(); // ❌ Hardcoded dependency
  }
}
```
💡 **Problem:** If we want to change the keyboard type, we must **modify** the `Computer` class.  

✅ **Good Example (DIP Applied):**  
```javascript
class Keyboard {}

class Computer {
  constructor(keyboard) {
    this.keyboard = keyboard; // ✅ Injecting dependency
  }
}

const keyboard = new Keyboard();
const computer = new Computer(keyboard);
```
💡 **Fix:** Now `Computer` can use **any keyboard** without modification!  

---

## **🚀 TL;DR - Quick Summary**  
| Principle | Meaning | Example Fix |
|-----------|---------|-------------|
| **S** | **Single Responsibility** (One class = One job) | ✅ Separate "Report" and "ReportSaver" |
| **O** | **Open/Closed** (Extend, don’t modify existing code) | ✅ Use **inheritance** instead of `if-else` |
| **L** | **Liskov Substitution** (Subclasses must be usable as their parent) | ✅ Penguins **should not** inherit `fly()` |
| **I** | **Interface Segregation** (No unnecessary methods in interfaces) | ✅ Separate `Workable` and `Eatable` |
| **D** | **Dependency Inversion** (Depend on abstractions, not concrete classes) | ✅ Pass `Keyboard` to `Computer` via constructor |

---

💡 **Following SOLID makes your code:**  
✅ **Easier to maintain**  
✅ **More flexible**  
✅ **Less error-prone**  

Would you like an even **simpler** version? 😃

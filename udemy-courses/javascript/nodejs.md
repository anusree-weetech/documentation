JavaScript is a hosted language, meaning it can run in different environments as long as there is a JavaScript engine to parse and execute it. The most common environment is the browser, which includes engines like Chrome's V8. In the browser, JavaScript works alongside browser APIs (e.g., DOM, fetch API, browser storage) to build interactive web applications.

However, JavaScript is not limited to the browser. By extracting the JavaScript engine and running it in a different environment, new APIs can be introduced. This is what Node.js does—it takes the V8 engine from Chrome and enriches it with additional APIs, such as those for working with the file system, which are not available in the browser for security reasons. 

While JavaScript remains the same, browser-specific features like the DOM are not relevant in Node.js. Now, let's explore Node.js further.

---


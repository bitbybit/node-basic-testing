# Basic testing

---

### Test scripts

```bash
# run unit tests
$ npm run test

# with logging
$ npm run test:verbose
```

---

## General task description
Unit tests for code, provided in file `index.ts`. 

---

### **Simple tests**

Unit tests for the `simpleCalculator` function, which performs basic mathematical operations - addition, subtraction, division, multiplication, and exponentiation. Verify that the operations are executed correctly and that the function returns `null` for invalid input.

`src/01-simple-tests/index.test.ts`.

---

### **Table tests**

The tests written in the previous task using the table-driven testing approach, utilizing the appropriate Jest API.

`src/02-table-tests/index.test.ts`.

---


### **Error handling & async**

Test functions that work asynchronously/throw/reject exceptions.

`src/03-error-handling-async/index.test.ts`.

---

### **Testing class**

Test a class representing a bank account that implements corresponding operations. Some methods of the class invoke others, some operations result in errors, and the implementation is asynchronous and involves the native JS API.

`src/04-test-class/index.test.ts`.

---

### **Partial mocking**

Utilize the Jest API to partially mock the contents of a module.

`src/05-partial-mocking/index.test.ts`.

---

### **Mocking Node.js API**

Test the proper usage of the Node.js API based on commonly used APIs such as the `fs` module, as well as `setTimeout` and `setInterval`.

`src/06-mocking-node-api/index.test.ts`.

---

### **Mocking library API**

Test that function that utilize library APIs is working correctly (with commonly used libraries such as `axios` and `lodash` as examples).

`src/07-mocking-lib-api/index.test.ts`.

---

### **Snapshot testing**

Use snapshot testing with Jest and compare it to regular comparison testing.

`src/08-snapshot-testing/index.test.ts`.

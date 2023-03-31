// OPERATION VARS
const varObj = {
  a : 0,
  op : "",
  b : 0,
};

// Operator Functions:
// FUNC: add a and b, return the result
function plus(a, b) {
  // Update properties in varObj
  varObj.a = a;
  varObj.b = b;

  // Return the sum.
  return a + b;
}

// FUNC: minus b from a, return the result
function minus(a, b) {
  // Update properties in varObj
  varObj.a = a;
  varObj.b = b;

  // Return the result.
  return a - b;
}

// FUNC: multiply a and b, return the result
function multipliedBy(a, b) {
  // Update properties in varObj
  varObj.a = a;
  varObj.b = b;

  // Return the result.
  return a * b;
}

// FUNC: divide a by b, return the result
function dividedBy(a, b) {
  // Update properties in varObj
  varObj.a = a;
  varObj.b = b;

  // Return the result.
  return a / b;
}

function operate(a, op, b) {
  //  Type-check arguments
  if (
    typeof a === "number" &&
    typeof op === "string" &&
    typeof b === "number"
  ) {
    //  Depending on the operator (op) passed in, call the appropriate operation function on a and b.
    switch (op) {
      case "+":
        return plus(a, b);
      case "-":
        return minus(a, b);
      case "*":
        return multipliedBy(a, b);
      case "/":
        return dividedBy(a, b);
      default:
        console.error(`${op} is not a valid operator`);
    }
  } else {  // If type-check fails, log an error to the console.
    console.error(`Invalid input: Wrong data type`);
  }
}

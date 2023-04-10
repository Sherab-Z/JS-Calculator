# Overview

A simple calculator app which runs in the browser. It displays one number at a time and can perform calculations on a series of inputs. Pressing 'AC' will clear the system and start fresh.

## DEV ROADMAP:

1. [x] Create Operator functions

- [x] Add
- [x] Subtract
- [x] Multiply
- [x] Divide

2. [] A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation.

- [x] Create variables: - [x] for the first number, - [x] the operator, - [x] and the second number.
      You’ll use these variables to update your display later.

3. [x] Create a new function 'operate' that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

4. [x] Create a basic HTML calculator with:

   - [x] buttons for each digit,
   - [x] each of the above functions,
   - [x] an “Equals” key,
   - [x] A display for the calculator. Fill it with some dummy numbers so it looks correct, and
   - [x] Add a “clear” button.
         Do not worry about wiring up the JS just yet

5. [x] Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.

6. > > [] Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.

   - You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
   - This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

   ### Logic: Notes:

   - The modifier buttons ('%' and '+/-') are actually types of op buttons, which differ from other op buttons in the following ways:
     - if a mod btn is pressed when marker = 1: it modifies numA, and the process stops there and marker still = 1... 
       - Whereas, if a normal op button is pressed when marker = 1, it will update the inObj.op and set marker = 2.
     - if a mod btn is pressed when marker = 2: the operation is performed as if any other op button were pressed - the operation is performed using numB = numA, then numA = result
       - E.g. This sequence of btn presses ('5', '*', '%' '=') will output '0.25' to the display. So it's the same as '5 * 5% ='
     - if a mod btn is pressed when marker = 3: as in marker=1, numB is modified and displayed, and the process stops there until the next button is pressed. Whereas, if an op button were pressed at marker = 3, then the calculation is performed, etc

## Logic Psuedocode:
   Button types:
   - Digits and a dot
   - Operators (*, /, +, -)
   - Modifiers (%, +/-)
   - Equals
   - AC (all clear)
  

   1. ### Identify the inputs and outputs: 
      The inputs for the calculator app are the button presses, and the output is the result of the calculation.

   2. ### Design the data model - State Machine: 
   
      1. Current Input Value (inObj.input): This field stores the current input value, which is being constructed by the user pressing digits and dot buttons. This value is used to store the first or second operand of the operation being performed.

      2. Current Operator (inObj.operator): This field stores the current operator (either *, /, +, or -), which is set when an operator button is pressed. If no operator has been set, the field should be null.

      3. First Operand (inObj.a): This field stores the first operand of the operation being performed. It is set when an operator button is pressed, and is used to calculate the result when the equals button is pressed.

      4. Second Operand (inObj.b): This field stores the second operand of the operation being performed. It is set when the equals button is pressed, and is used to calculate the result.

      5.  Modifier (inObj.modifier): This field stores the current modifier (either % or +/-), which is set when a modifier button is pressed. If no modifier has been set, the field should be null.

      6. Result (outObj.result): This field stores the result of the operation. It is updated whenever the equals button is pressed.

      7. State (outObj.state): This field stores the current state of the calculator. It can have one of the following values:

         - "input mode": The calculator is currently accepting input from the user.
         - "operator mode": The calculator has received an operator and is waiting for the second operand.
         - "modifier mode": The calculator has received a modifier and is waiting for the user to input a  value to modify.
         - "result mode": The calculator has finished a calculation and is displaying the result.

   This data model allows the app to keep track of the current state of the calculator and perform calculations based on user input. 

   3. ### Identify the algorithms and processing logic: 
   Simultaneously, you need to identify the algorithms and processing logic that will be used to transform the input data into the output data. This involves understanding the requirements of the application and selecting the appropriate algorithms and data structures to accomplish the desired processing.

   4. ### Design the processing flow: 
   Also simultaneously: defining the sequence of steps that the input data will go through to produce the output data:

      1. Initialize the calculator with an empty input value and an empty output object.

      2. While the calculator is running:
         a. Wait for user input.
         b. If the user enters a digit or decimal point:
            i. Append the input to the current input value in the input queue.
            ii. Set the output object to the new input value.
         c. If the user enters an operator:
            i. If an operator has already been set, calculate the result and set the output object to the result.
            ii. If an operator has not been set, set the current operator to the input operator and set the calculator state to "operator mode".
         d. If the user enters a modifier:
            i. If the modifier is "%" or "+/-", modify the current input value in the input queue accordingly.
            ii. If the modifier is "AC", clear the input queue and reset the calculator to its initial state.
         e. If the user enters the equals button:
            i. If a second operand has already been set, calculate the result and set the output object to the result.
            ii. If a second operand has not been set, set the second operand to the current input value and calculate the result.
         f. Update the state of the calculator based on the current input and output values.
         g. Display the current output object to the user.

   5. ### Implement and test the logic: 
      1. Initialize the input queue, operand stack, current operator, current modifier, result, and state variables.

      2. When a digit or dot button is pressed, add the corresponding value to the input queue.

      3. When an operator button is pressed, clear the input queue and store the current value as the first operand on the operand stack. Set the current operator variable to the corresponding operator.

      4. When a modifier button is pressed, apply the corresponding modification to the current value in the input queue. Set the current modifier variable to the corresponding modifier.

      5. When the equals button is pressed, pop the top two values from the operand stack, perform the operation specified by the current operator variable, and push the result back onto the stack. Set the result variable to the new result value.

      6. Update the state variable based on the current state of the calculator (input mode, operator mode, modifier mode, or result mode).

      7. Add any necessary input validation and error handling to prevent invalid input and unexpected behavior.

      8. Implement any additional features, such as undo/redo functionality, memory storage, or scientific calculator functions.

      9. Test and debug the pseudocode to ensure it works as expected.

   6. ### Refine and optimize the logic: 
      Finally, the logic may need to be refined and optimized to improve its performance or to address issues that arise during testing. This may involve reworking the algorithms, adjusting the data model, or making other changes to the processing flow.

1. [] GOTCHA'S: watch out for and fix these bugs if they show up in your code:\*\*

   - [] Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 \* 3 = should yield 42. An example of the behavior we’re looking for would be this student solution (https://mrbuddh4.github.io/calculator/).
   - [] Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
   - [] You should round answers with long decimals so that they don’t overflow the screen.
   - [] Pressing = before entering all of the numbers or an operator could cause problems!
   - [] Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
   - [] Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

2. [] EXTRA CREDIT!

- [] Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
- [] Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.
- [] Add a “backspace” button, so the user can undo if they click the wrong number.
- [] Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the MDN documentation for event.preventDefault to help solve this problem.

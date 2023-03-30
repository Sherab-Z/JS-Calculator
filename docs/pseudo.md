# Overview
A simple calculator app which runs in the browser. It displays one number at a time and can perform calculations on a series of inputs. Pressing 'AC' will clear the system and start fresh.

## DEV STAGES:
1. [x] Create Operator functions
  - [x] Add
  - [x] Subtract
  - [x] Multiply
  - [x] Divide

2. [] A calculator operation will consist of a number, an operator, and another number. For example, 3 + 5. Create three variables for each of the parts of a calculator operation. 
  - [x] Create variables:
    - [x] for the first number, 
    - [x] the operator, 
    - [x] and the second number. 
You’ll use these variables to update your display later.

3. [x] Create a new function 'operate' that takes an operator and 2 numbers and then calls one of the above functions on the numbers.

4. [] Create a basic HTML calculator with:
   - [] buttons for each digit, 
   - [] each of the above functions,
   - [] an “Equals” key,
   - [] A display for the calculator. Fill it with some dummy numbers so it looks correct, and
   - [] Add a “clear” button.
Do not worry about wiring up the JS just yet

5. [] Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.

6. [] Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.
   - You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
   - This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.

7. [] GOTCHA'S: watch out for and fix these bugs if they show up in your code:
   - [] Users should be able to string together several operations and get the right answer, with each pair of numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior we’re looking for would be this student solution (https://mrbuddh4.github.io/calculator/).
   - [] Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a number button (12), followed by an operator button (+), a second number button (7), and finally a second operator button (-). Your calculator should then do the following: first, evaluate the first pair of numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19) as the first number in your new calculation, along with the next operator (-).
   - [] You should round answers with long decimals so that they don’t overflow the screen.
   - [] Pressing = before entering all of the numbers or an operator could cause problems!
   - [] Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after pressing “clear”
   - [] Display a snarky error message if the user tries to divide by 0… and don’t let it crash your calculator!

8. [] EXTRA CREDIT!
- [] Users can get floating point numbers if they do the math required to get one, but they can’t type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s already one in the display)
- [] Make it look nice! This is a great project to practice your CSS skills. At least make the operations a different color from the keypad buttons.
- [] Add a “backspace” button, so the user can undo if they click the wrong number.
- [] Add keyboard support! You might run into an issue where keys such as (/) might cause you some trouble. Read the MDN documentation for event.preventDefault to help solve this problem.










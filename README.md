# Calculator

### Tools:

-   React
-   Webpack
-   MathJax (for latex compilation)
-   TypeScript

### Run

-   Clone the github repositoruy.
-   Open terminal at the root directory of this project.

```
    npm run start
```

### Features:

-   Supports basic arithematic operations like addition, subtraction, division, multiplication and exponentiation.
-   Supports variable assignment (Max limit: 52)
-   Supports the use of parenthesis.
-   Shows error state on the input dialog if the math expression is invalid.
-   Displays the same math expression in latex.
-   Understands implicit multiplication on concatenating operands without operator (Example: 4a + b ==> 4 \* a + b)
-   Real time results

<br>

![success](public/success_state.png)

![error](public/error_state.png)

Design:

-   The main component (App) will hold the state for error, formula and variables since these states would need to be shared among all the child components.
-   There are mainly 4 child components - Formula, Latex, Variables and Result.
-   The math expression evaluation is done in the Result component.

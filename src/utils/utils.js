export const extractVariables = (formula: string): string[] => {
    const matches = formula.match(/[a-zA-Z]/g);
    return matches ? Array.from(new Set(matches)) : [];
};

export function convertToLatex(mathExpression: string): string {
    return mathExpression
        .replace(/\*/g, "\\cdot") // Replace multiplication (*) with \cdot
        .replace(/\//g, "\\frac") // Prepare for fractions
        .replace(/(\d+|\w+)\^(\d+)/g, "{$1}^{$2}") // Replace exponents (x^2 -> {x}^{2})
        .replace(/sqrt\((.*?)\)/g, "\\sqrt{$1}") // Replace square roots (sqrt(x) -> \sqrt{x})
        .replace(/\(/g, "\\left(") // Replace ( with \left(
        .replace(/\)/g, "\\right)"); // Replace ) with \right)
}

export function evaluateFormula(formula: string, variables: Record<string, number>): string {
    // Define operator precedence and associativity
    const replacedFormula = formula.replace(/[a-zA-Z]/g, (match) => {
        if (variables[match] === undefined) throw new Error(`Variable ${match} is undefined`);
        return variables[match].toString();
    });

    const operators = {
        "+": { precedence: 1, associativity: "L" },
        "-": { precedence: 1, associativity: "L" },
        "*": { precedence: 2, associativity: "L" },
        "/": { precedence: 2, associativity: "L" },
        "^": { precedence: 3, associativity: "R" },
    };

    // Function to check if a character is an operator
    const isOperator = (ch) => Object.keys(operators).includes(ch);

    // Function to check if a character is a digit
    const isDigit = (ch) => /\d/.test(ch);

    // Convert infix expression to Reverse Polish Notation (RPN)
    const toRPN = (expr) => {
        const outputQueue = [];
        const operatorStack = [];
        let i = 0;

        while (i < expr.length) {
            const ch = expr[i];

            if (isDigit(ch)) {
                // Parse multi-digit numbers
                let number = "";
                while (i < expr.length && (isDigit(expr[i]) || expr[i] === ".")) {
                    number += expr[i];
                    i++;
                }
                outputQueue.push(parseFloat(number));
                continue;
            }

            if (isOperator(ch)) {
                while (
                    operatorStack.length > 0 &&
                    isOperator(operatorStack[operatorStack.length - 1]) &&
                    ((operators[ch].associativity === "L" &&
                        operators[ch].precedence <=
                            operators[operatorStack[operatorStack.length - 1]].precedence) ||
                        (operators[ch].associativity === "R" &&
                            operators[ch].precedence <
                                operators[operatorStack[operatorStack.length - 1]].precedence))
                ) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.push(ch);
            } else if (ch === "(") {
                operatorStack.push(ch);
            } else if (ch === ")") {
                while (
                    operatorStack.length > 0 &&
                    operatorStack[operatorStack.length - 1] !== "("
                ) {
                    outputQueue.push(operatorStack.pop());
                }
                operatorStack.pop(); // Remove '('
            }
            i++;
        }

        // Pop remaining operators
        while (operatorStack.length > 0) {
            outputQueue.push(operatorStack.pop());
        }

        return outputQueue;
    };

    // Evaluate RPN expression
    const evaluateRPN = (rpn) => {
        const stack = [];
        for (const token of rpn) {
            if (typeof token === "number") {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();
                switch (token) {
                    case "+":
                        stack.push(a + b);
                        break;
                    case "-":
                        stack.push(a - b);
                        break;
                    case "*":
                        stack.push(a * b);
                        break;
                    case "/":
                        stack.push(a / b);
                        break;
                    case "^":
                        stack.push(Math.pow(a, b));
                        break;
                }
            }
        }
        return stack[0];
    };

    // Preprocess and evaluate
    const rpn = toRPN(replacedFormula.replace(/\s+/g, "")); // Remove spaces
    return evaluateRPN(rpn);
}

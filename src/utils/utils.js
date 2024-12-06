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

export function evaluateFormula(formula, variables = {}) {
    // Define operator precedence and associativity
    let isError = false;

    const operators = {
        "+": { precedence: 1, associativity: "L" },
        "-": { precedence: 1, associativity: "L" },
        "*": { precedence: 2, associativity: "L" },
        "/": { precedence: 2, associativity: "L" },
        "^": { precedence: 3, associativity: "R" },
    };

    const isOperator = (ch) => Object.keys(operators).includes(ch);
    const isDigit = (ch) => /\d/.test(ch);
    const isVariable = (ch) => /^[a-zA-Z]+$/.test(ch);
    const isOperand = (ch) => isDigit(ch) || isVariable(ch);

    const validateExpression = (expr) => {
        const validCharacters = /^[\d+\-*/^().\sA-Za-z]+$/;
        if (!validCharacters.test(expr)) {
            isError = true;
            return;
        }

        let openParens = 0;
        for (const ch of expr) {
            if (ch === "(") openParens++;
            if (ch === ")") openParens--;
            if (openParens < 0) {
                isError = true;
                return;
            }
        }
        if (openParens !== 0) {
            isError = true;
            return;
        }

        return true;
    };

    const preprocessExpression = (expr) => {
        let result = "";
        for (let i = 0; i < expr.length; i++) {
            const ch = expr[i];
            result += ch;

            // Insert '*' between adjacent operands
            if (i < expr.length - 1 && isOperand(expr[i]) && isOperand(expr[i + 1])) {
                result += "*";
            }
        }
        return result;
    };

    const toRPN = (expr) => {
        const outputQueue = [];
        const operatorStack = [];
        let i = 0;

        while (i < expr.length) {
            const ch = expr[i];

            if (isDigit(ch)) {
                let number = "";
                while (i < expr.length && (isDigit(expr[i]) || expr[i] === ".")) {
                    number += expr[i];
                    i++;
                }
                outputQueue.push(parseFloat(number));
                continue;
            }

            if (isVariable(ch)) {
                outputQueue.push(parseFloat(variables[ch]));
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
                operatorStack.pop();
            }
            i++;
        }

        while (operatorStack.length > 0) {
            const top = operatorStack.pop();
            if (top === "(" || top === ")") {
                isError = true;
                return;
            }
            outputQueue.push(top);
        }

        return outputQueue;
    };

    const evaluateRPN = (rpn) => {
        const stack = [];
        for (const token of rpn) {
            if (typeof token === "number") {
                stack.push(token);
            } else if (isOperator(token)) {
                const b = stack.pop();
                const a = stack.pop();
                // if (a === undefined || b === undefined) {
                //     throw new Error("Invalid input: Malformed expression.");
                // }
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
                        if (b === 0) {
                            isError = true;
                            return;
                        }
                        stack.push(a / b);
                        break;
                    case "^":
                        stack.push(Math.pow(a, b));
                        break;
                }
            }
        }
        if (stack.length !== 1) {
            isError = true;
            return;
        }
        return stack[0];
    };

    if (formula === "") {
        return "";
    }

    validateExpression(formula); // Validate input
    if (isError) {
        return NaN;
    }
    const preprocessedExpr = preprocessExpression(formula.replace(/\s+/g, "")); // Preprocess input
    const rpn = toRPN(preprocessedExpr); // Convert to RPN
    if (isError) {
        return NaN;
    }
    const result = evaluateRPN(rpn); // Evaluate the RPN
    if (isError) {
        return NaN;
    } else {
        return result;
    }
}
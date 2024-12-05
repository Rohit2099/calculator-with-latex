import React, { useState, useEffect } from "react";
import Latex from "./Latex";

// Utility function to detect variables in a formula
const extractVariables = (formula: string): string[] => {
    const matches = formula.match(/[a-zA-Z]/g);
    return matches ? Array.from(new Set(matches)) : [];
};

// Utility function to safely evaluate the formula
const evaluateFormula = (formula: string, variables: Record<string, number>): number | string => {
    try {
        // Replace variables in the formula with their values
        const replacedFormula = formula.replace(/[a-zA-Z]/g, (match) => {
            if (variables[match] === undefined) throw new Error(`Variable ${match} is undefined`);
            return variables[match].toString();
        });

        // Parse and evaluate the formula without using eval
        // Support basic operators and exponentiation
        const evaluate = new Function(`return ${replacedFormula}`);
        return evaluate();
    } catch (error) {
        return "Invalid formula or variables";
    }
};

const FormulaCalculator: React.FC = () => {
    const [formula, setFormula] = useState<string>(""); // User-entered formula
    const [variables, setVariables] = useState<Record<string, number>>({}); // Variable values
    const [result, setResult] = useState<number | string>(""); // Evaluation result
    const [detectedVariables, setDetectedVariables] = useState<string[]>([]); // List of variables

    // Handle formula input change
    const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormula = e.target.value;
        setFormula(newFormula);

        // Detect variables and update state
        const vars = extractVariables(newFormula);
        setDetectedVariables(vars);

        // Initialize variables if new ones are detected
        const newVariables = { ...variables };
        vars.forEach((v) => {
            if (!(v in newVariables)) {
                newVariables[v] = 0; // Default value
            }
        });
        setVariables(newVariables);
    };

    // Handle variable value change
    const handleVariableChange = (variable: string, value: number) => {
        setVariables((prev) => ({ ...prev, [variable]: value }));
    };

    // Recalculate result whenever formula or variables change
    useEffect(() => {
        if (formula) {
            setResult(evaluateFormula(formula, variables));
        }
    }, [formula, variables]);

    const latexBlock = "\\int_{0}^{\\infty} x^2 dx";

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "600px",
                margin: "auto",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1>Formula Calculator</h1>
            {/* Formula Input */}
            <div>
                <label>Enter Formula:</label>
                <input
                    type="text"
                    value={formula}
                    onChange={handleFormulaChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "10px 0",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                    placeholder="e.g., a+b^2"
                />
            </div>
            {/* LaTeX Display */}
            <div style={{ marginBottom: "20px", fontSize: "18px" }}>
                <strong>LaTeX Representation:</strong> {formula.replace(/\^/g, "^{")}
            </div>
            {/* Dynamic Variable Inputs */}
            <div>
                <h3>Variables:</h3>
                {detectedVariables.length === 0 && <p>No variables detected.</p>}
                {detectedVariables.map((variable) => (
                    <div key={variable} style={{ marginBottom: "10px" }}>
                        <label>
                            {variable}:{" "}
                            <input
                                type="number"
                                value={variables[variable]}
                                onChange={(e) =>
                                    handleVariableChange(variable, parseFloat(e.target.value))
                                }
                                style={{
                                    padding: "5px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    width: "100px",
                                }}
                            />
                        </label>
                    </div>
                ))}
            </div>
            {/* Result */}
            <div>
                <h3>Result:</h3>
                <div
                    style={{
                        padding: "10px",
                        backgroundColor: "#f9f9f9",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                    }}
                >
                    {result}
                </div>
            </div>
            <Latex latex={latexBlock} />
        </div>
    );
};

export default FormulaCalculator;

import React, { useEffect } from "react";
import { extractVariables } from "../utils/utils";

interface VariablesListProps {
    formula: string;
    onChange(s: Record<string, number>): void;
    content: Record<string, number>;
}

const VariablesList: React.FC<VariablesListProps> = ({
    formula,
    onChange,
    content,
}: VariablesListProps) => {
    const handleVariableChange = (variable: string, value: number) => {
        onChange({ ...content, [variable]: value });
    };

    useEffect(() => {
        const vars: string[] = extractVariables(formula);
        const newVariables = vars.reduce((acc: Record<string, number>, variable: string) => {
            const newVal = variable in content ? content[variable] : 0;
            acc[variable] = newVal;
            return acc;
        }, {});

        onChange(newVariables);
    }, [formula, onChange]);

    if (Object.keys(content).length === 0) {
        return <></>;
    }

    return (
        <div>
            <h3>Variables:</h3>
            {Object.keys(content).map((variable: string) => (
                <div key={variable} style={{ marginBottom: "10px" }}>
                    <label>
                        {variable}:{" "}
                        <input
                            type="number"
                            value={content[variable]}
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
    );
};

export default VariablesList;

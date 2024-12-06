import React from "react";

interface VaraibleProp {
    variable: string;
    value: number;
    handleVariableChange(a: string, b: number): void;
}

const Variable: React.FC<VaraibleProp> = ({
    variable,
    value,
    handleVariableChange,
}: VaraibleProp) => {
    return (
        <div key={variable} className="list">
            <div className="label-variable">{variable}: </div>
            <input
                type="number"
                value={value}
                onChange={(e) => handleVariableChange(variable, parseFloat(e.target.value))}
                className="variable"
            />
        </div>
    );
};

export default Variable;

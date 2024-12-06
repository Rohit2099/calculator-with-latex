import React, { FC } from "react";

interface FormulaProps {
    text: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Formula: FC<FormulaProps> = ({ text, onChange }: FormulaProps) => {
    return (
        <div>
            <label htmlFor="formula">
                <strong>Enter Formula:</strong>
            </label>

            <input
                type="text"
                id="formula"
                value={text}
                onChange={onChange}
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
    );
};

export default Formula;

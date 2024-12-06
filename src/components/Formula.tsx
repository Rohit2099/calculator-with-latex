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
                placeholder="e.g., a+b^2"
            />
        </div>
    );
};

export default Formula;

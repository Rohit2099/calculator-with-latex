import React, { FC } from "react";

interface FormulaProps {
    text: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Formula: FC<FormulaProps> = ({ text, onChange }: FormulaProps) => {
    return (
        <div>
            <label htmlFor="formula">
                <text>Enter Formula:</text>
            </label>

            <input
                type="text"
                id="formula"
                value={text}
                onChange={onChange}
                placeholder="a + b - 2"
                autoFocus
            />
        </div>
    );
};

export default Formula;

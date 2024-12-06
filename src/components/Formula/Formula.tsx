import React, { FC } from "react";
import "./Formula.css";

interface FormulaProps {
    text: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    isError: boolean;
}

const Formula: FC<FormulaProps> = ({ text, onChange, isError }: FormulaProps) => {
    return (
        <div>
            <input
                type="text"
                className={isError ? "formula error" : "formula normal"}
                value={text}
                onChange={onChange}
                placeholder="a + b - 2"
                autoFocus
            />
        </div>
    );
};

export default Formula;

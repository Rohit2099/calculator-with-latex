import React, { FC } from "react";
import "../css/Formula.css";

interface FormulaProps {
    text: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const Formula: FC<FormulaProps> = ({ text, onChange }: FormulaProps) => {
    return (
        <div>
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

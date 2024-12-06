import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import { evaluateFormula } from "../../utils/utils";
import "./Result.css";

interface ResultProps {
    formula: string;
    variables: Record<string, number>;
    setError: Dispatch<SetStateAction<boolean>>;
}

const Result: React.FC<ResultProps> = ({ formula, variables, setError }: ResultProps) => {
    const [result, setResult] = useState("");

    useEffect(() => {
        const newResult = evaluateFormula(formula, variables);

        setError(Number.isNaN(newResult) ? true : false);
        setResult(newResult);
    }, [formula, variables]);

    return (
        <div className="output">
            <div>{result}</div>
        </div>
    );
};

export default Result;

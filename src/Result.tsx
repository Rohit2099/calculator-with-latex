import React, { useEffect, useState } from "react";
import { evaluateFormula } from "./utils/utils";

interface ResultProps {
    formula: string;
    variables: Record<string, number>;
}

const Result: React.FC<ResultProps> = ({ formula, variables }: ResultProps) => {
    const [result, setResult] = useState("");

    useEffect(() => {
        if (formula) {
            setResult(evaluateFormula(formula, variables));
        }
    }, [formula, variables]);

    return (
        <div>
            <h3>Result:</h3>
            <div>{result}</div>
        </div>
    );
};

export default Result;

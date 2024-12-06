import React, { useEffect, useState } from "react";
import { evaluateFormula } from "../utils/utils";
import "../css/Result.css";

interface ResultProps {
    formula: string;
    variables: Record<string, number>;
}

const Result: React.FC<ResultProps> = ({ formula, variables }: ResultProps) => {
    const [result, setResult] = useState("");

    useEffect(() => {
        setResult(evaluateFormula(formula, variables));
    }, [formula, variables]);

    return (
        <div className="output">
            <div>{result}</div>
        </div>
    );
};

export default Result;

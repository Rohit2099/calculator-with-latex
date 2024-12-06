import React, { useState, useCallback } from "react";
import Latex from "./Latex";
import "./App.css";
import Header from "./Header";
import Formula from "./Formula";
import VariablesList from "./VariablesList";
import Result from "./Result";

const FormulaCalculator: React.FC = () => {
    const [formula, setFormula] = useState<string>("");
    const [variables, setVariables] = useState<Record<string, number>>({});

    const onFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormula = e.target.value;
        setFormula(newFormula);
    };

    const onVariablesChange = useCallback((newVariablesList: Record<string, number>) => {
        setVariables(newVariablesList);
    }, []);

    return (
        <div id="container">
            <Header />
            <Formula text={formula} onChange={onFormulaChange} />
            <VariablesList formula={formula} onChange={onVariablesChange} content={variables} />
            <Latex formula={formula} />
            <Result formula={formula} variables={variables} />
        </div>
    );
};

export default FormulaCalculator;

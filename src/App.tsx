import React, { useState, useCallback } from "react";
import Latex from "./components/Latex/Latex";
import "./App.css";
import Header from "./components/Header/Header";
import Formula from "./components/Formula/Formula";
import VariablesList from "./components/Variables/VariablesList";
import Result from "./components/Result/Result";

const App: React.FC = () => {
    const [formula, setFormula] = useState<string>("");
    const [variables, setVariables] = useState<Record<string, number>>({});
    const [error, setError] = useState<boolean>(false);

    const onFormulaChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newFormula = e.target.value;
        setFormula(newFormula);
    }, []);

    const onVariablesChange = useCallback((newVariablesList: Record<string, number>) => {
        setVariables(newVariablesList);
    }, []);

    return (
        <div id="app">
            <Header />
            <div id="container">
                <div id="input">
                    <Formula text={formula} onChange={onFormulaChange} isError={error} />

                    <VariablesList
                        formula={formula}
                        onChange={onVariablesChange}
                        content={variables}
                    />
                </div>
                <div id="output">
                    <Latex formula={formula} />
                    {formula !== "" && <div className="output">=</div>}
                    <Result formula={formula} variables={variables} setError={setError} />
                </div>
            </div>
        </div>
    );
};

export default App;

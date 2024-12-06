import React, { useEffect, useRef } from "react";
import "./Latex.css";
import { convertToLatex } from "../../utils/utils";

interface LatexProps {
    formula: string;
}

const Latex: React.FC<LatexProps> = ({ formula }: LatexProps) => {
    const mathJaxRef = useRef(null);

    useEffect(() => {
        if (window.MathJax && mathJaxRef.current) {
            try {
                window.MathJax.typesetPromise([mathJaxRef.current]).catch((err: any) => {
                    console.error("MathJax typeset failed:", err);
                });
            } catch (e) {
                console.log("custom error");
            }
        }
    }, [formula]);

    return (
        <div className="output" id="latex">
            <div ref={mathJaxRef}>{`\\( ${convertToLatex(formula)} \\)`}</div>
        </div>
    );
};

export default Latex;

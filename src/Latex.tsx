import React, { useEffect, useRef } from "react";

interface LatexProps {
    formula: string;
}

const Latex: React.FC<LatexProps> = ({ formula }: LatexProps) => {
    const mathJaxRef = useRef(null);

    useEffect(() => {
        if (window.MathJax && mathJaxRef.current) {
            // Queue the typesetting for the LaTeX content
            window.MathJax.typesetPromise([mathJaxRef.current]).catch((err: any) =>
                console.error("MathJax typeset failed:", err)
            );
        }
    }, [formula]);

    return (
        <div>
            <strong>LaTeX Representation:</strong>
            <div ref={mathJaxRef}>{`\\( ${formula} \\)`}</div>
        </div>
    );
};

export default Latex;

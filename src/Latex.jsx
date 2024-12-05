import React, { useEffect, useRef } from "react";

const Latex = ({ latex }) => {
    const mathJaxRef = useRef(null);

    useEffect(() => {
        // Check if MathJax is loaded
        if (window.MathJax && mathJaxRef.current) {
            // Queue the typesetting for the LaTeX content
            window.MathJax.typesetPromise([mathJaxRef.current]).catch((err) =>
                console.error("MathJax typeset failed:", err)
            );
        }
    }, [latex]);

    return <div ref={mathJaxRef}>{`\\( ${latex} \\)`}</div>;
};

export default Latex;

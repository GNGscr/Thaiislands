import React, { useState, useEffect } from "react";

export default function Framework({ frameworkOn=false }) {

    const [ isFramework, setIsFramework ] = useState(false);
    const frameworkArray = [
        { "key": 0, "label": "0" },
        { "key": 1, "label": "1" },
        { "key": 2, "label": "2" }
    ];

    useEffect(() => setIsFramework(!!frameworkOn ? true : false), [isFramework, frameworkOn]);

    return (
        <div className="framework">
            {
                frameworkArray.map((f, index) => {
                    return <div key={f.key} className={`f-index ${index === f.key ? f.label : ''}`}>
                        {f.label}
                    </div>
                })
            }
        </div>
    )
}
import React from 'react';
import Noise from './Noise';

// [#c8bdb0]
export default function StickyFooter({ data, lang }) {
    return (
        <div 
            className="footer fixed bottom-0 z-[-1] w-screen gap-4" 
            style={{ opacity: 0.85  }}
        >
            <div className="relative h-[300px]">
                <Noise data={data} lang={lang} />
            </div>
        </div>
    )
}
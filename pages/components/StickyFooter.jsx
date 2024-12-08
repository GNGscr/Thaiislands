import React from 'react';
import Noise from './Noise';
import { motion } from 'framer-motion';

// [#c8bdb0]
export default function StickyFooter({ data, lang }) {
    return (
        <motion.div 
            className="footer fixed bottom-0 z-[-1] w-screen gap-4" 
            style={{ opacity: 0  }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.85 }}
            transition={{ duration: 0.1 }}
        >
            <div className="relative h-[300px]">
                <Noise data={data} lang={lang} />
            </div>
        </motion.div>
    )
}
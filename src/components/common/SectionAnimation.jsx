import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Main.module.css';

const SectionAnimation = ({ menuIsActive, title }) => {
    return (
        <motion.div
            className={styles.slideIn}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: menuIsActive ? 1 : 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <h1 className={`${styles.slideInHeader} text-9xl font-bold`}>{title}</h1>
        </motion.div>
    );
};

export default SectionAnimation;
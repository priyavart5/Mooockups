import React, { useState } from "react";
import styles from "./styles.module.scss";

interface InputSliderProps {
    min: number;             
    max: number;             
    step?: number;
    initialValue?: number;   
    onValueChange?: (value: number) => void; 
}

const InputSlider: React.FC<InputSliderProps> = ({ min, max, step = 1, initialValue = min, onValueChange, }) => {
    const [value, setValue] = useState(initialValue);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setValue(newValue);
        if (onValueChange) {
        onValueChange(newValue);
        }
    };

    return (
        <div className={styles.inputSliderContainer}>
            <input type="number" value={value} onChange={handleInputChange} min={0} max={100} className={styles.inputField} />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleInputChange}
                className={styles.inputSlider}
                style={{
                background: `linear-gradient(to right, #5C5C5C 0%, #5C5C5C ${(value / max) * 100}%, #262626 ${(value / max) * 100}%, #262626 100%)`,
                }}
            />
        </div>
    );
};

export default InputSlider;

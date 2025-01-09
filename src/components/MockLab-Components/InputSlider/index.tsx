import React from "react";
import styles from "./styles.module.scss";

interface InputSliderProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onValueChange?: (value: number) => void;
}

const InputSlider: React.FC<InputSliderProps> = ({ 
    min, 
    max, 
    step = 1, 
    value, 
    onValueChange,
}) => {
    const handleValueChange = (newValue: number) => {
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
            handleValueChange(newValue);
        }
    };

    return (
        <div className={styles.inputSliderContainer}>
            <input 
                type="number" 
                value={value} 
                onChange={handleInputChange} 
                min={min} 
                max={max} 
                step={step} 
                className={styles.inputField} 
            />
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

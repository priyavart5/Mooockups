import React, { useState, useMemo } from "react";
import styles from "./styles.module.scss";
import { debounce } from "../../lib/debounce"; // Import your debounce utility

interface InputSliderProps {
    min: number;
    max: number;
    step?: number;
    initialValue?: number;
    onValueChange?: (value: number) => void;
    debounceDelay?: number; // Optional debounce delay
}

const InputSlider: React.FC<InputSliderProps> = ({ 
    min, 
    max, 
    step = 1, 
    initialValue = min, 
    onValueChange, 
    debounceDelay = 300, // Default debounce delay
}) => {
    const [value, setValue] = useState(initialValue);

    // Memoize the debounced onValueChange function
    const debouncedValueChange = useMemo(() => {
        if (onValueChange) {
            return debounce(onValueChange, debounceDelay);
        }
        return undefined;
    }, [onValueChange, debounceDelay]);

    const handleValueChange = (newValue: number) => {
        setValue(newValue);
        if (debouncedValueChange) {
            debouncedValueChange(newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        handleValueChange(newValue);
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

import React, { useState, useMemo, useEffect } from "react";
import styles from "./styles.module.scss";
import { debounce } from "@/lib/debounce";

interface InputSliderProps {
    min: number;
    max: number;
    step?: number;
    initialValue: number;
    onValueChange?: (value: number) => void;
}

const InputSlider: React.FC<InputSliderProps> = ({ 
    min, 
    max, 
    step = 1, 
    initialValue, 
    onValueChange,
}) => {

    const [value, setValue] = useState(initialValue);
    
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const debouncedOnValueChange = useMemo(() =>
        debounce((newValue: number) => {
            if (onValueChange) {
                onValueChange(newValue);
            }
        }, 100),
        [onValueChange]
    );
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setValue(newValue);
        debouncedOnValueChange(newValue);
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

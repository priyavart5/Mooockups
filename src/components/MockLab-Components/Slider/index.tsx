import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

interface SliderProps {
    title: string;
    min: number;
    max: number;
    step?: number;
    initialValue?: number;
    onValueChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ 
    title, 
    min, 
    max, 
    step = 1, 
    initialValue = min, 
    onValueChange,
}) => {

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <div className={styles.sliderContainer}>
            <p>{title}</p>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={handleInputChange}
                className={styles.slider}
                style={{
                    background: title === 'x - Axis' || title === 'y - Axis' 
                        ? '' 
                        : `linear-gradient(to right, #5C5C5C 0%, #5C5C5C ${(value / max) * 100}%, #262626 ${(value / max) * 100}%, #262626 100%)`,
                }}
            />
        </div>
    );
};

export default Slider;

import React, { useState, useMemo, useEffect } from "react";
import styles from "./styles.module.scss";
import { debounce } from "../../lib/debounce";

interface SliderProps {
    title: string;
    min: number;
    max: number;
    step?: number;
    initialValue?: number;
    onValueChange?: (value: number) => void;
    debounceDelay?: number;
}

const Slider: React.FC<SliderProps> = ({ 
    title, 
    min, 
    max, 
    step = 1, 
    initialValue = min, 
    onValueChange, 
    debounceDelay = 300,
}) => {


    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const debouncedValueChange = useMemo(() => {
        if (onValueChange) {
            return debounce(onValueChange, debounceDelay);
        }
        return undefined;
    }, [onValueChange, debounceDelay]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setValue(newValue);
        if (debouncedValueChange) {
            debouncedValueChange(newValue);
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
                    background: title === 'x - Axis' || title === 'y - Axis' ? '' :`linear-gradient(to right, #5C5C5C 0%, #5C5C5C ${(value / max) * 100}%, #262626 ${(value / max) * 100}%, #262626 100%)`,
                }}
            />
        </div>
    );
};

export default Slider;

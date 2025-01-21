import React, { useState, useEffect, useMemo } from "react";
import styles from "./styles.module.scss";
import { debounce } from "@/lib/debounce";

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

    const debouncedOnValueChange = useMemo(
        () =>
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
            />
        </div>
    );
};

export default Slider;

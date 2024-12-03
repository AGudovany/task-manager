'use client'

import React from "react";

type DropDownButtonProps = {
    label?: string;
    values: string[] | number[];
    selected: string | number;
    onChangeSelectedHandler: (value : string | number) => void;
}

const DropDownButton = ({label, values, selected, onChangeSelectedHandler}: DropDownButtonProps) => {
    const [value, setValue] = React.useState(selected || values[0])
    const changeValueHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelected = e.target.value;
        onChangeSelectedHandler(newSelected);
        setValue(newSelected);
    }

    return (
        <div>
            <label htmlFor="values">Choose{label && ' a ' + label}:</label>
            <select name="values" id="values" defaultValue={value} onChange={changeValueHandler}>
                {values.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default DropDownButton;
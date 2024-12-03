'use client'

import React from "react";

import "./inputs.css";

type Input = {
    label?: string,
    value?: string,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({label, value, placeholder, onChange}: Input) => {

    return (
        <div className={'input'}>
            {
                label && <div className={'my-input_label-wrapper'}>
                        <label htmlFor={label} className={'my-input_label'}>{label}</label>
                </div>
            }
            <div className={'my-input_input-wrapper'}>
                <input id={label} value={value} placeholder={placeholder} onChange={onChange} className={'my-input'}></input>
            </div>
        </div>
    )
}
export default Input;
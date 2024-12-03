'use client'
import Button from "./buttons/button";
import Input from "./inputs/input";
import {useState} from "react";

export default function Page() {
    const [inputVal, setInputVal] = useState<string>();

    const bodyCSS = {
        display: 'flex'
    }
    return <div>
                <div style={bodyCSS}>
                    <Button size='large'>Large Button</Button>
                    <Button view='main'>Main Button</Button>
                    <Button view='secondary'>Secondary Button</Button>
                    <Button view='cancel'>Cancel Button</Button>
                    <Input value={inputVal}
                           label={'Some label'}
                           onChange={(event) => setInputVal(event.target.value)}>
                    </Input>
                </div>
            </div>
}
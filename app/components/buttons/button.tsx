'use client'

import styled, {StyledComponent} from '@emotion/styled';
import React from "react";

const template = {
    default: {
        margin: 0,
        padding: '11px 20px',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        'box-sizing': 'border-box',
        transition: 'background-color .3s ease',
        color: '#FFFF',
        background: 'rgba(99, 95, 199, 1)',
    },
    main: {},
    secondary: {
        color: 'rgba(99, 95, 199, 1)',
        background: 'rgba(99, 95, 199, .1)'
    },
    cancel: {
        color: 'white',
        background: 'red'
    },
    large: {
        padding: '14px 24px 15px',
        fontSize: '15px',
        'line-height': '19px',
        'border-radius': '24px',
    },
    fullWidth: {
        width: '100%',
    }
};

type ButtonProps = {
    children?: React.ReactNode,
    view?: 'main'|'secondary'|'cancel',
    size?: 'large',
    onClick?: (e: React.MouseEvent<HTMLElement>) => void,
    fullWidth?: boolean,
};

const DefaultButton = styled.button<ButtonProps>`
    ${props => {
        return {
            ...template.default,
            ...props.view ? template[props.view] : template.main,
            ...props.size ? {...template[props.size]} : {},
            ...props.fullWidth ? {...template.fullWidth} : {},
        }
    }}
`

const Button = (props: ButtonProps) => {

    const buttonStyles = Object.assign({},
        {...template.default},
        props.view ? {...template[props.view]} : {...template.main},
        props.size ? {...template[props.size]} : {})


    return (
        <div>
            <DefaultButton
                type="button"
                theme
                fullWidth={props.fullWidth}
                view={props.view}
                size={props.size}
                onClick={props.onClick}>
                {props.children}
            </DefaultButton>
        </div>
    )

     /*return (
         <button style={buttonStyles}>
             {props.children}
         </button>
     )*/
}
export default Button;
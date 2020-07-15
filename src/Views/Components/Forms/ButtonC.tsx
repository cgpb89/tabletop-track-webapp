

import React from "react";

interface ButtonProps {
    label?: string;
    variant?: "text" | "outlined" | "contained";
    className?: string;
    id?: string;
    color?: "default" | "inherit" | "primary" | "secondary";
    disabled?: boolean;
    onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    iconClass?: string;
    iconPhrase?: boolean;
}

class ButtonC extends React.Component<ButtonProps, any> {


    public render() {
        const {
            className,
            id,
            label,
            color,
            disabled,
            onClick,
            iconClass,
            iconPhrase
        } = this.props;



        console.log();
        return (
            <button
            id={id}
            className={className}
                color={color ? color : "primary"}
                disabled={disabled}
                onClick={onClick}>
                {iconClass ?
                    (iconPhrase ?
                        <span className={`${iconClass}`}>{label}</span> : <span className={`${iconClass}`}></span>)
                    : label}
            </button>
        );
    }
}

export default ButtonC;


import React from "react";
import Button from "@material-ui/core/Button";


interface ButtonProps {
    label: string;
    variant?: "text" | "outlined" | "contained";
    className?: string;
    id: string;
    color?: "default" | "inherit" | "primary" | "secondary";
    disabled?: boolean;
    onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
}

class ButtonC extends React.Component<any, any> {


    public render() {
        const {
            className,
            id,
            label,
            variant,
            color,
            disabled,
            onClick
        } = this.props;
        return (
            <button
            className={className}
                color={color ? color : "primary"}
                disabled={disabled}
                onClick={onClick}>
                {label}
            </button>
        );
    }
}

export default ButtonC;
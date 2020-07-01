import React from "react";
import { TextField } from "@material-ui/core";


interface InputProps {
    inputType: "text" | "number" | "email" | "password";
    label: string;
    variant?: string;
    className: string;
    id: string;
}

class Input extends React.Component<any, any> {


    public render() {
        const {
            className,
            id,
            inputType,
            label,
            variant,
        } = this.props;
        return (
            <TextField
                className={className}
                type={inputType}
                id="outlined-basic"
                label={label}
                variant={variant ? variant : "outlined"} />
        );
    }
}

export default Input;
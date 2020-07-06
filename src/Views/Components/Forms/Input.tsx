import React from "react";
import { TextField } from "@material-ui/core";


interface InputProps {
    inputType: "text" | "number" | "email" | "password";
    label: string;
    variant?: string;
    className: string;
    id: string;
    value: any;
    setValue: (value: any) => void;
}

class Input extends React.Component<any, any> {

    private onHandleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { setValue } = this.props;
        setValue(ev.target.value);
    }


    public render() {
        const {
            className,
            id,
            inputType,
            label,
            variant,
            value
        } = this.props;

        return (
            <TextField
                className={className}
                type={inputType}
                id="outlined-basic"
                label={label}
                variant={variant ? variant : "outlined"}
                value={value}
                onChange={this.onHandleChange}/>
        );
    }
}

export default Input;
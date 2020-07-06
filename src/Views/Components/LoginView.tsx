import React                    from "react";
import { UserStore }            from "../../Store/UserStore";
import { TokenStore }           from "../../Store/TokenStore";
import { observer, inject }     from "mobx-react";
import {
    Divider,
    Drawer }                    from "@material-ui/core";
import Input                    from "./Forms/Input";
import ButtonC                  from "./Forms/ButtonC";

interface LoginViewProps {
    UserStore?: UserStore;
    TokenStore?: TokenStore;
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
    onLogin: (email: string, password: string) => void;
    setPassword: (value: string) => void;
    setEmail: (value: string) => void;
    getPassword: string;
    getEmail: string;
}

@inject(UserStore.NAME_STORE, TokenStore.NAME_STORE)
@observer
class LoginView extends React.Component<LoginViewProps, any> {

    public constructor(props: LoginViewProps) {
        super(props);
    }

    private toggleDrawer = () => {
        const { setShowMenu, showMenu } = this.props;
        setShowMenu(!showMenu);
    }

    public content = () => {
        const { getEmail, getPassword,
                setEmail, setPassword,
                setShowMenu,
                onLogin } = this.props;

        return (
            <div
                className={`content`}
                role="presentation">
                    <div><span className={`titles-primary medium`}>Login</span></div>
                    <Input
                        inputType={"text"}
                        label={"Email"}
                        className={"login-input input-component"}
                        id={"login-email"}
                        value={getEmail}
                        setValue={setEmail}
                    />
                    <Input
                        inputType={"password"}
                        label={"Password"}
                        className={"login-input input-component"}
                        id={"login-password"}
                        value={getPassword}
                        setValue={setPassword}
                    />
                <Divider />
                <ButtonC label={"Login"} className={"btn btn-blue label-primary mr-4 mt-4"} onClick={() => {
                    onLogin(getEmail, getPassword);
                }}/>
                <ButtonC label={"Cancel"} className={"btn btn-red label-primary mt-4"} onClick={() => {
                            setShowMenu(false);
                }}/>
            </div>
        );
    }

    public render(): React.ReactNode  {
        const { showMenu } = this.props;

        return (
            <div>
                    <React.Fragment key={"right"}>
                    <Drawer anchor={"right"}
                            open={showMenu}
                            onClose={this.toggleDrawer}
                            className={"login"}>
                            {this.content()}
                        </Drawer>
                    </React.Fragment>
            </div>
        );

    }
}

export default LoginView;
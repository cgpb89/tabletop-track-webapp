import React                    from "react";
import { UserStore }            from "../../Store/UserStore";
import { TokenStore }           from "../../Store/TokenStore";
import { observer, inject }     from "mobx-react";
import {
    Divider,
    Drawer }                   from "@material-ui/core";
import Input                    from "./Forms/Input";


interface LoginViewProps {
    UserStore?: UserStore;
    TokenStore?: TokenStore;
    showMenu: boolean;
    setShowMenu: (value: boolean) => void;
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
        return (
            <div
                className={`content`}
                role="presentation">
                    <div><span className={`titles-primary medium`}>Login</span></div>
                    <Input
                        inputType={"text"}
                        label={"Email"}
                        className={"login-input"}
                        id={"login-email"}
                    />
                    <Input
                        inputType={"password"}
                        label={"Password"}
                        className={"login-input"}
                        id={"login-password"}
                    />
                <Divider />
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
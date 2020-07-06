import React                        from "react";
import { UserStore }                from "../Store/UserStore";
import { TokenStore }               from "../Store/TokenStore";
import Header                       from "../Layout/HeaderView";
import { inject, observer }         from "mobx-react";
import LoginView                    from "../Views/Components/LoginView";
import { observable } from "mobx";

interface HeaderViewModelProps {
    UserStore?: UserStore;
    TokenStore?: TokenStore;
}

@inject(UserStore.NAME_STORE, TokenStore.NAME_STORE)
@observer
class HeaderViewModel extends React.Component<HeaderViewModelProps, any> {

    @observable
    private email: string;
    @observable
    private password: string;

    public getEmail(): string {
        return this.email;
    }

    public setEmail = (email: string) => {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword = (password: string) => {
        this.password = password;
    }

    private isUserLogIn: boolean = false;

    @observable
    private showLoginMenu: boolean;

    public getShowLoginMenu(): boolean {
        return this.showLoginMenu;
    }

    public setShowLoginMenu = (showLoginMenu: boolean) => {
        this.showLoginMenu = showLoginMenu;
    }

    public getIsUserLogIn(): boolean {
        return this.isUserLogIn;
    }

    public setIsUserLogIn(isUserLogIn: boolean): void {
        this.isUserLogIn = isUserLogIn;
    }


    public constructor(props: HeaderViewModelProps) {
        super(props);
        if (this.tokenStore.getAccessToken()) {
            this.setIsUserLogIn(true);
        }
        this.email = "";
        this.password = "";
        this.showLoginMenu = false;
    }

    get userStore(): UserStore {
        return this.props.UserStore as UserStore;
    }

    get tokenStore(): TokenStore {
        return this.props.TokenStore as TokenStore;
    }

    public logIn = async (email: string, password: string) => {
        await this.tokenStore.setToken("cpereira@gmail.com", "Carlos");
    }

    public onShowLogIn = () => {
        this.setShowLoginMenu(!this.getShowLoginMenu());
    }

    public onLogin = async (email: string, password: string) => {
        if (email && password) {
            await this.logIn(email, password);
            if (this.tokenStore.getAccessToken()) {
                this.setIsUserLogIn(true);
                this.setShowLoginMenu(false);
            }
        }
    }

    public render(): React.ReactNode {
        return (
            <>
                <Header
                    isUserLogin={this.getIsUserLogIn()}
                    onLogIn={this.onShowLogIn}
                />
                <LoginView
                    showMenu={this.getShowLoginMenu()}
                    setShowMenu={this.setShowLoginMenu}
                    onLogin={this.onLogin}
                    setPassword={this.setPassword}
                    setEmail={this.setEmail}
                    getPassword={this.getPassword()}
                    getEmail={this.getEmail()}/>
            </>
        );
    }

}

export default HeaderViewModel;
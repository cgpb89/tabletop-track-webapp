import React                        from "react";
import { UserStore }                from "../Store/UserStore";
import { TokenStore }               from "../Store/TokenStore";
import Header                       from "../Layout/HeaderView";
import { inject, observer }         from "mobx-react";
import LoginViewModel               from "./LoginViewModel";
import { observable } from "mobx";

interface HeaderViewModelProps {
    UserStore?: UserStore;
    TokenStore?: TokenStore;
}

@inject(UserStore.NAME_STORE, TokenStore.NAME_STORE)
@observer
class HeaderViewModel extends React.Component<HeaderViewModelProps, any> {


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
        } else {
            this.logIn();
        }

        this.showLoginMenu = false;
    }

    get userStore(): UserStore {
        return this.props.UserStore as UserStore;
    }

    get tokenStore(): TokenStore {
        return this.props.TokenStore as TokenStore;
    }

    public logIn = async () => {
        await this.tokenStore.setToken("cpereira@gmail.com", "Carlos");
    }

    public onLogIn = () => {
        this.setShowLoginMenu(!this.getShowLoginMenu());
    }

    public render(): React.ReactNode {
        return (
            <>
                <Header
                    isUserLogin={this.getIsUserLogIn()}
                    onLogIn={this.onLogIn}
                />
                <LoginViewModel
                    showMenu={this.getShowLoginMenu()}
                    setShowMenu={this.setShowLoginMenu} />
            </>
        );
    }

}

export default HeaderViewModel;
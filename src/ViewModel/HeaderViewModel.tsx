import React                        from "react";
import { UserStore }                from "../Store/UserStore";
import { TokenStore }               from "../Store/TokenStore";
import Header                       from "../Layout/HeaderView";
import { inject, observer }         from "mobx-react";

interface HeaderViewModelProps {
    UserStore?: UserStore;
    TokenStore?: TokenStore;
}

@inject(UserStore.NAME_STORE, TokenStore.NAME_STORE)
@observer
class HeaderViewModel extends React.Component<HeaderViewModelProps, any> {


    private isUserLogIn: boolean = false;

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

    public render = () => {
        return(
            <Header
            isUserLogin={this.getIsUserLogIn()}
            />
        );
    }

}

export default HeaderViewModel;
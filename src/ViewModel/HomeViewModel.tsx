import React                    from "react";
import { Container }            from "@material-ui/core";
import { inject }               from "mobx-react";
import { UserStore }            from "../Store/UserStore";
import { TokenStore }           from "../Store/TokenStore";
import { RouteComponentProps }  from "react-router-dom";

interface HomeViewModelProps extends RouteComponentProps<any> {
    UserStore: UserStore;
    TokenStore: TokenStore;
}


@inject(UserStore.NAME_STORE, TokenStore.NAME_STORE)
class HomeViewModel extends React.Component<any, any> {

    public get userStore(): UserStore {
        return this.props.UserStore;
    }

    public componentDidMount() {
        this.userStore.getUser();
    }

    public render = () => {
        return (
            <Container className={`wrap-container main-content`}>
                <div className={``}>
                    Home
                </div>
            </Container>
        );
    }
}

export default HomeViewModel;
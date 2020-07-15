import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { UserStore } from "../Store/UserStore";
import { inject } from "mobx-react";
import ProfileView from "../Views/Pages/ProfileView";

interface ProfileViewModelProps extends RouteComponentProps<any> {
    UserStore: UserStore;
}

@inject(UserStore.NAME_STORE)
class ProfileViewModel extends React.Component<any, any> {

    public render() {
        return(
            <ProfileView />
        );
    }
}

export default ProfileViewModel;
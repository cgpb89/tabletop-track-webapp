import { inject, observer } from "mobx-react";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GroupStore } from "../Store/GroupStore";
import { MessagesStore } from "../Store/MessagesStore";
import { UserStore } from "../Store/UserStore";
import { Container, Paper } from "@material-ui/core";
import User from "../Models/User/User";
import ButtonC from "../Views/Components/Forms/ButtonC";

interface OneGroupViewModelProps extends RouteComponentProps<any> {
    GroupStore?: GroupStore;
    UserStore?: UserStore;
    MessagesStore?: MessagesStore;
}

@inject(GroupStore.NAME_STORE, UserStore.NAME_STORE, MessagesStore.NAME_STORE)
@observer
class OneGroupViewModel extends React.Component<OneGroupViewModelProps, any> {
    get groupStore(): GroupStore {
        return this.props.GroupStore as GroupStore;
    }

    get userStore(): UserStore {
        return this.props.UserStore as UserStore;
    }

    get messagesStore(): MessagesStore {
        return this.props.MessagesStore as MessagesStore;
    }

    constructor(props: OneGroupViewModelProps) {
        super(props);
        this.getGroup();
    }

    private getGroup = async () => {
        const groupId = this.props.match.params.id;
        const group = await this.groupStore.viewGroup(groupId);
        this.groupStore.setGroup(group);
    }

    private renderGroupMembers = () => {
        const groupPlayers = this.groupStore.getGroup().getPlayers();

        return groupPlayers.map((item: User, index: number) => {
            let isAdmin = false;
            this.groupStore.getGroup().getAdminUsers().forEach((adminUser: User, index: number) => {
                isAdmin = adminUser.get_id() === item.get_id();
                console.log("adminUser.get_id()", adminUser.get_id());
                console.log("item.get_id()", item.get_id());
            });
            console.log(isAdmin);
            return (
                <div className={`player ${isAdmin ? "admin-player" : ""} mb-3`} key={`group-player-${item.get_id()}`}>
                    <Paper elevation={3} className={`paper-element`}>
                        <div className={`row secondary-color-dark `}>
                            <div className={`col-12 ${isAdmin ? "col-sm-5 col-md-4 col-lg-4" : "col-sm-6 col-md-3 col-lg-3"}`}>
                                <strong>{item.getFullName()}</strong>
                            </div>
                            <div className={`col-12 ${isAdmin ? "col-sm-5 col-md-4 col-lg-4" : "col-sm-6 col-md-3 col-lg-3"}`}>
                                {item.getEmail()}
                            </div>
                            {
                                isAdmin ?
                                    <></> :
                                    <div className={`col-6 col-sm-6 col-md-3 col-lg-3`}>
                                        <ButtonC
                                            label={"Set as Admin"}
                                            className={"btn btn-blue label-secondary"}
                                            onClick={() => { }} />
                                    </div>
                            }
                            <div className={`col-6 ${isAdmin ? "col-sm-2" : "col-sm-6"} col-md-2 col-lg-2`}>
                                <ButtonC
                                    className={"btn btn-gray label-secondary"}
                                    iconClass={`icon-bin`}
                                    iconPhrase
                                    label={"Delete"}
                                    onClick={() => { }} />
                            </div>
                        </div>
                    </Paper>
                </div>
            );
        });
    }


    public render() {

        if (!this.groupStore.getGroup().getName()) {
            return (
                <></>
            );
        }
        return (
            <Container className={`wrap-container main-content one-group-page`}>
                <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
                    <h4 className="titles-primary mb-5">
                        <span className={`secondary-color-dark`}>Group: </span>
                        <span className={`primary-color-dark`}>{this.groupStore.getGroup().getName()}</span>
                    </h4>
                </div>

                <div>
                    <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
                        {this.renderGroupMembers()}
                    </div>
                </div>
            </Container>
        );
    }
}

export default withRouter(OneGroupViewModel);
import { inject, observer }                 from "mobx-react";
import React                                from "react";
import { RouteComponentProps, withRouter }  from "react-router-dom";
import { GroupStore }                       from "../Store/GroupStore";
import { MessagesStore }                    from "../Store/MessagesStore";
import { UserStore }                        from "../Store/UserStore";
import User                                 from "../Models/User/User";
import OneGroupView                         from "../Views/Pages/OneGroupView";

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

    public onUpdateGroup = async () => {
        const adminUser = this.userStore.getUser() ? [this.userStore.getUser() as User] : [];

        // this.getGroup().setName(this.getGroupName());
        // this.getGroup().setPlayers(this.getUsersSelected() ? this.getUsersSelected() as User[] : []);
        // this.getGroup().setAdminUsers(adminUser);

        // const response = await this.groupStore.updateGroup(this.getGroup(), this.userStore.getUser()!.get_id());
        // if (response) {
        //     this.messagesStore.setMessage("Group created successfully!!!");
        //     this.messagesStore.setType(false);
        //     this.returnListGroup();
        // } else {
        //     this.messagesStore.setType(true);
        //     this.messagesStore.setMessage("An error occur while creating a group");
        // }
    }

    public setAsAdmin = () => {

    }

    public render() {

        if (!this.groupStore.getGroup().getName()) {
            return (
                <></>
            );
        }
        return (
            <OneGroupView
            group={this.groupStore.getGroup()}
            />
        );
    }
}

export default withRouter(OneGroupViewModel);
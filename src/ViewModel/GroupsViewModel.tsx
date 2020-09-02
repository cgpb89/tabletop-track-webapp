import React            from "react";
import GroupsView       from "../Views/Pages/GroupsView";
import { observable }   from "mobx";
import { observer, inject }     from "mobx-react";
import User             from "../Models/User/User";
import { GroupStore }   from "../Store/GroupStore";
import Group            from "../Models/Group";
import { UserStore }    from "../Store/UserStore";
import { MessagesStore } from "../Store/MessagesStore";
import Notification      from "../Views/Components/Notifications/Notification";

interface GroupsViewModelProps {
    GroupStore?: GroupStore;
    UserStore?: UserStore;
    MessagesStore?: MessagesStore;
}

@inject(GroupStore.NAME_STORE, UserStore.NAME_STORE, MessagesStore.NAME_STORE)
@observer
class GroupsViewModel extends React.Component<GroupsViewModelProps, any> {
    @observable
    private groupName: string = "";

    @observable
    private userSelected: User | undefined = new User;

    @observable
    private usersSelected: User[] = [this.userStore.getUser() as User];

    @observable
    private group: Group = new Group();

    constructor(props: GroupsViewModelProps) {
        super(props);
        this.returnListGroup();
    }

    public getGroup(): Group {
        return this.group;
    }

    public setGroup(group: Group): void {
        this.group = group;
    }

    public getUsersSelected(): User[] {
        return this.usersSelected;
    }

    public addUsersSelected = (usersSelected: User | undefined): void => {
        if (usersSelected) {
            this.usersSelected.push(usersSelected);
        }
    }

    public setUsersSelected = (usersSelected: User[]): void => {
            this.usersSelected = usersSelected;
    }

    public getUserSelected(): User | undefined {
        return this.userSelected;
    }

    public setUserSelected = (userSelected: User | undefined): void  => {
        this.userSelected = userSelected;
    }

    public getGroupName(): string {
        return this.groupName;
    }

    public setGroupName = (groupName: string): void => {
        this.groupName = groupName;
    }

    get groupStore(): GroupStore {
        return this.props.GroupStore as GroupStore;
    }

    get userStore(): UserStore {
        return this.props.UserStore as UserStore;
    }

    get messagesStore(): MessagesStore {
        return this.props.MessagesStore as MessagesStore;
    }

    public addUser = () => {
        this.addUsersSelected(this.getUserSelected());
        this.setUserSelected(undefined);
    }

    public deleteUser = (user: User) => {
        const newUser = this.getUsersSelected().filter((item: User, index: number) => {
            return  item.get_id() !== user.get_id();
        });
        this.setUsersSelected(newUser);
    }

    public onCreateGroup = async () => {
        const adminUser = this.userStore.getUser() ? [this.userStore.getUser() as User] : [];

        this.getGroup().setName(this.getGroupName());
        this.getGroup().setPlayers(this.getUsersSelected() ? this.getUsersSelected() as User[] : []);
        this.getGroup().setAdminUser(adminUser);

        const response = await this.groupStore.createGroup(this.getGroup());
        if (response) {
            this.messagesStore.setMessage("Group created successfully!!!");
            this.messagesStore.setType(false);
        } else {
            this.messagesStore.setType(true);
            this.messagesStore.setMessage("An error occur while creating a group");
        }
        this.groupStore.listGroup(this.userStore.getUser()!.get_id());
    }

    public returnListGroup = () => {
        setTimeout(async () => {
            const response = await this.groupStore.listGroup(this.userStore.getUser()!.get_id());

            this.groupStore.setGroupList(response);
        }, 1000);
    }

    public render(): React.ReactNode {

        this.groupStore.listGroup(this.userStore.getUser()!.get_id());

        return (
            <>
            <GroupsView
                getGroupName={this.getGroupName()}
                setGroupName={this.setGroupName}
                    setUserSelected={this.setUserSelected}
                    addUser={this.addUser}
                    getUsersSelected={this.getUsersSelected()}
                    getUserSelected={this.getUserSelected()}
                    deleteUser={this.deleteUser}
                    onCreateGroup={this.onCreateGroup}
                    groupList={this.groupStore.getGroupList()}
                />
            </>
        );
    }
}

export default GroupsViewModel;
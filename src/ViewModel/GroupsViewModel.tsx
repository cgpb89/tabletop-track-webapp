import React            from "react";
import GroupsView       from "../Views/Pages/GroupsView";
import { observable }   from "mobx";
import { observer, inject }     from "mobx-react";
import User             from "../Models/User/User";
import { GroupStore }   from "../Store/GroupStore";
import Group            from "../Models/Group";
import { UserStore }    from "../Store/UserStore";

interface GroupsViewModelProps {
    GroupStore?: GroupStore;
    UserStore?: UserStore;
}

@inject(GroupStore.NAME_STORE, UserStore.NAME_STORE)
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

    public onCreateGroup = () => {
        const adminUser = this.userStore.getUser() ? [this.userStore.getUser() as User] : [];

        this.getGroup().setName(this.getGroupName());
        this.getGroup().setPlayers(this.getUsersSelected() ? this.getUsersSelected() as User[] : []);
        this.getGroup().setAdminUser(adminUser);

        this.groupStore.createGroup(this.getGroup());
    }

    public render(): React.ReactNode {
        return (
            <GroupsView
                getGroupName={this.getGroupName()}
                setGroupName={this.setGroupName}
                setUserSelected={this.setUserSelected}
                addUser={this.addUser}
                getUsersSelected={this.getUsersSelected()}
                getUserSelected={this.getUserSelected()}
                deleteUser={this.deleteUser}
                onCreateGroup={this.onCreateGroup}
            />
        );
    }
}

export default GroupsViewModel;
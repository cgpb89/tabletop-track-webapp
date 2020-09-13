import React                from "react";
import SearcherViewModel    from "../../ViewModel/SearcherUserViewModel";
import { observer }         from "mobx-react";
import Input                from "../Components/Forms/Input";
import { Container, Chip }  from "@material-ui/core";
import ButtonC              from "../Components/Forms/ButtonC";
import FaceIcon             from "@material-ui/icons/Face";
import User                 from "../../Models/User/User";
import Group                from "../../Models/Group";
import GroupList        from "../Components/Group/GroupList";

interface GroupsViewProps {
    getGroupName: string;
    setGroupName: (value: string) => void;
    setUserSelected: (value: User) => void;
    addUser: () => void;
    getUsersSelected: User[];
    getUserSelected: User | undefined;
    deleteUser: (user: User) => void;
    onCreateGroup: () => void;
    groupList: Group[];
    deleteGroup: (groupId: string) => void;
}

@observer
class GroupsView extends React.Component<GroupsViewProps, any> {

    private showSelectedUsers = (): React.ReactNode => {
        const { getUsersSelected, deleteUser } = this.props;
        return getUsersSelected.map((item, index) => {
            return (
                <Chip
                    className="user-item mr-5 mt-3"
                    key={`members-group-${index}`}
                    variant="outlined"
                    size="medium"
                    icon={<FaceIcon />}
                    label={this.returnFullName(item)}
                    onDelete={() => {
                        deleteUser(item);
                    }}
                    color="primary"
                />
            );
        });

    }

    private returnFullName = (item: User): React.ReactNode => {
        return (
            <span>{`${item.getFullName()}`}</span>
        );
    }

    public render(): React.ReactNode {
        const { getGroupName, setGroupName, setUserSelected, addUser, onCreateGroup, deleteGroup,
            getUserSelected, getUsersSelected, groupList } = this.props;
        return (
            <Container className={`wrap-container main-content group-page`}>
                <div className={`row`}>
                    <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-4`}>
                        <Input
                            inputType={"text"}
                            label={"Group Name"}
                            className={"input-component group-name"}
                            id={"group-name"}
                            value={getGroupName}
                            setValue={setGroupName}
                        />
                        <span className={`label-secondary tertiary-color input-disclaimer d-block`}>*This automatically sets you as an Admin</span>
                    </div>
                </div>
                <div className={`row`}>
                    <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
                        <label className="label-primary medium">Select(s) a member of the group</label>
                    </div>

                    <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
                        < SearcherViewModel
                            setUserSelected={setUserSelected}
                            getUserSelected={getUserSelected}
                            addItem={addUser}
                            getUserArray={getUsersSelected} />
                    </div>
                </div>
                {
                    getUsersSelected.length ?
                        <div className={`row`}>
                            <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
                                <div className={"users-selected"}>
                                    {this.showSelectedUsers()}
                                </div>
                            </div>
                        </div> : <></>
                }
                <div className={`row`}>
                    <div className={`col-12 create-group`}>
                        <ButtonC
                            label={"Create Group"}
                            className={"btn btn-blue"}
                            onClick={onCreateGroup}
                        />
                    </div>
                </div>

                <div className={`row`}>
                    <div className={`col-12`}>
                        <GroupList
                            groupList={groupList}
                            deleteGroup={deleteGroup}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

export default GroupsView;
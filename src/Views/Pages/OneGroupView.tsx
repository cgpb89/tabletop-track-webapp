import { observer } from "mobx-react";
import React from "react";
import Group from "../../Models/Group";
import { Container, Paper } from "@material-ui/core";
import User from "../../Models/User/User";
import ButtonC from "../../Views/Components/Forms/ButtonC";

interface OneGroupViewProps {
    group: Group;
}

@observer
class OneGroupView extends React.Component<OneGroupViewProps, any> {

    private renderGroupMembers = () => {
        const { group } = this.props,
         groupPlayers = group.getPlayers();

        return groupPlayers.map((item: User, index: number) => {
            let isAdmin = false;
            group.getAdminUsers().forEach((adminUser: User, index: number) => {
                isAdmin = adminUser.get_id() === item.get_id();
            });

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
        const { group } = this.props;

        return (
            <Container className={`wrap-container main-content one-group-page`}>
                <div className={`col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
                    <h4 className="titles-primary mb-5">
                        <span className={`secondary-color-dark`}>Group: </span>
                        <span className={`primary-color-dark`}>{group.getName()}</span>
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

export default OneGroupView;
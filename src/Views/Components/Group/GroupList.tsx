
import React                    from "react";
import { Link, RouteComponentProps, withRouter }                 from "react-router-dom";
import Group                    from "../../../Models/Group";
import Cards, { ButtonDetails } from "../Forms/Cards";

interface GroupListprops extends RouteComponentProps<any> {
    groupList: Group[];
    deleteGroup: (groupId: string) => void;
}

class GroupList extends React.Component<GroupListprops, any> {

    public renderGroup = (): React.ReactNode => {
        const { groupList, deleteGroup } = this.props;
        return groupList.map((item: Group, index) => {
            return (
                <div className={`col-xs-2 col-sm-6 col-md-4 col-lg-3 mt-3`} key={`group-list-${index}`}>
                    <Cards
                        classMedia={"group-small-cards"}
                        legend={"Check your Group"}
                        mainTitle={item.getName()}
                        image={this.randomImage()}
                        cardMedia
                        actions
                        firstBtnDetails={{
                            onClick: () => {
                                const toSeeGroup = `/view-group/${item.get_id()}`;
                                this.props.history.push(toSeeGroup);
                            },
                            title: "View",
                        } as ButtonDetails}
                        secondBtnDetails={{
                            onClick: () => {
                                deleteGroup(item.get_id());
                            },
                            title: "Delete",
                        } as ButtonDetails}
                        />
                </div>
            );
        });
    }

    public randomImage = () => {
        const min = 1,
         max = 9,
        rand = min + Math.random() * (max - min),
        image = `game-${parseInt(rand.toString())}`;

        return require(`../../../images/${image}.jpg`);
    }

    public render(): React.ReactNode {
        return (
            <div className={`row`}>
                {this.renderGroup()}
            </div>
        );
    }

}

export default withRouter(GroupList);
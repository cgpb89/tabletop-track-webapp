
import React from "react";
import Group from "../../../Models/Group";
import Cards from "../Forms/Cards";

interface GroupListprops {
    groupList: Group[];
}

class GroupList extends React.Component<GroupListprops, any> {

    public renderGroup = (): React.ReactNode => {
        const { groupList } = this.props;
        console.log(groupList);
        return groupList.map((item: Group, index) => {
            console.log(item);
            return (
                <div className={`col-xs-2 col-sm-3 col-md-3 col-lg-3 mt-5`} key={`group-list-${index}`}>
                    <Cards
                        classMedia={"group-small-cards"}
                        legend={"Check your Groups"}
                        mainTitle={item.getName()}
                        image={this.randomImage()}
                        cardMedia
                        actions/>
                </div>
            );
        });
    }

    public randomImage = () => {
        const min = 1,
         max = 6,
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

export default GroupList;
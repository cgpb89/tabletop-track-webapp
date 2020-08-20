
import React from "react";
import { GroupStore } from "../../../Store/GroupStore";
import Cards from "../../../Views/Components/Forms/Cards";

interface CardViewModelprops {
    GroupStore: GroupStore;
}

class CardViewModel extends React.Component<CardViewModelprops, any> {

    public renderMembers = () => {
        return(
            <></>
        );
    }

    public render(): React.ReactNode {
        return (
            <Cards
            classMedia={"position-img"}
            mainTitle={"Stats"}
            legend={"Check your statistics"} />
        );
    }

}

export default CardViewModel;
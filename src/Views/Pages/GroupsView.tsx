import React from "react";
import { Container } from "@material-ui/core";
import ButtonC from "../Components/Forms/ButtonC";
import SearcherViewModel from "../../ViewModel/SearcherUserViewModel";

interface GroupsViewProps {
}

class GroupsView extends React.Component<GroupsViewProps, any> {
    public render(): React.ReactNode {
        return (

            < SearcherViewModel />
        );
    }
}

export default GroupsView;
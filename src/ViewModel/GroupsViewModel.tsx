import React        from "react";
import GroupsView   from "../Views/Pages/GroupsView";

interface GroupsViewModelProps {
}

class GroupsViewModel extends React.Component<any, any> {
    public render(): React.ReactNode {
        return(
            <GroupsView />
        );
    }
}

export default GroupsViewModel;
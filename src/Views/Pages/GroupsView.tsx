import React            from "react";
import { Container }    from "@material-ui/core";
import ButtonC          from "../Components/Forms/ButtonC";

interface GroupsViewProps {
}

class GroupsView extends React.Component<GroupsViewProps, any> {
    public render(): React.ReactNode {
        return (
            <Container className={`wrap-container main-content`}>
                <div className={`row`}>
                    <div className={`col-md-1 col-xs-1 col-sm-1 offset-md-11 offset-xs-10 offset-sm-10`}>
                        <ButtonC
                        label={`Add`}
                        iconPhrase
                        iconClass={``}
                        className={`btn btn-blue label-primary`}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

export default GroupsView;
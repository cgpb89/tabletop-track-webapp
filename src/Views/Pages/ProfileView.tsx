import React                    from "react";
import { Container }            from "@material-ui/core";
import Cards                    from "../Components/Forms/Cards";

const GAMES = require("../../images/Library.jpg");
const GROUPS = require("../../images/meeple2.jpg");
const STATS = require("../../images/bunnyk.png");

interface ProfileViewProps {
    cards?: {
        label: string
    };
}

class ProfileView extends React.Component<ProfileViewProps, any> {

    public render() {
        return(
            <Container className={`wrap-container main-content form-group`}>
                <div className={`row`}>
                    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4`}>
                        <div className={`card-container`}>
                            <Cards
                            mainTitle={"Games"}
                            image={GAMES}/>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4`}>
                        <div className={`card-container`}>
                        <Cards
                        mainTitle={"Groups"}
                            image={GROUPS}/>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4`}>
                        <div className={`card-container`}>
                        <Cards
                        classMedia={"position-img"}
                        mainTitle={"Stats"}
                            image={STATS}/>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default ProfileView;
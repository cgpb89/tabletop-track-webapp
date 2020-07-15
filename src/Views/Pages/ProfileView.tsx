import React                                from "react";
import { Container }                        from "@material-ui/core";
import Cards                                from "../Components/Forms/Cards";
import { RouteComponentProps, withRouter, Link }  from "react-router-dom";

const GAMES = require("../../images/Library.jpg");
const GROUPS = require("../../images/meeple2.jpg");
const STATS = require("../../images/bunnyk.png");

interface ProfileViewProps extends RouteComponentProps<any> {
    cards?: {
        label: string
    };
}

class ProfileView extends React.Component<ProfileViewProps, any> {

    public render() {
        return(
            <Container className={`wrap-container main-content`}>
                <div className={`row`}>
                    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4`}>
                        <div className={`card-container`}>
                            <Link to={"mygames"}>
                                <Cards
                                    mainTitle={"Games"}
                                    image={GAMES}
                                    legend={"Check your games"} />
                            </Link>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4`}>
                        <div className={`card-container`}>
                            <Link to={"groups"}>
                                <Cards
                                    mainTitle={"Groups"}
                                    image={GROUPS}
                                    legend={"See your groups"} />
                            </Link>
                        </div>
                    </div>
                    <div className={`col-xs-12 col-sm-12 col-md-4 col-lg-4`}>
                        <div className={`card-container`}>
                            <Link to={"stats"}>
                                <Cards
                                    classMedia={"position-img"}
                                    mainTitle={"Stats"}
                                    image={STATS}
                                    legend={"Check your statistics"} />
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withRouter(ProfileView);
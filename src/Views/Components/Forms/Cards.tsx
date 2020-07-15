import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";

const DEFAULT = require("../../../images/meeple2.jpg");

interface CardContainerProps {
    image?: string;
    mainTitle: string;
    legend?: string;
    classMedia?: string;
    actions?: boolean;
}
class Cards extends React.Component<CardContainerProps, any> {


    public render() {
        const { image, mainTitle, legend, classMedia, actions } = this.props;

        return (
            <Card className={`cards-container`} onClick={() => {
                console.log("Entra");
            }}>
                <CardActionArea >
                    <CardMedia
                    className={`cards-media ${classMedia}`}
                        image={image ? image : DEFAULT}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <span className={`headlines-primary`}>
                            {mainTitle}
                        </span>
                        <div>
                            <span className={`paragraph-primary secondary-color-dark`}>
                                {legend}
                            </span>
                        </div>
                    </CardContent>
                </CardActionArea>
                {actions ?
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                                </Button>
                        <Button size="small" color="primary">
                            Learn More
                                </Button>
                    </CardActions>
                    : <></>}
            </Card>
        );
    }
}

export default Cards;
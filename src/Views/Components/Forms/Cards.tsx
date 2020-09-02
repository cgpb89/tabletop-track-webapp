import React    from "react";
import { Card, CardActionArea, CardMedia, CardContent, CardActions, Button } from "@material-ui/core";

const DEFAULT = require("../../../images/meeple2.jpg");

interface CardContainerProps {
    image?: string;
    mainTitle: string;
    legend?: string;
    classMedia?: string;
    actions?: boolean;
    content?: React.ReactNode;
    cardMedia?: boolean;
}
class Cards extends React.Component<CardContainerProps, any> {


    public render() {
        const { image, mainTitle, legend, classMedia, actions, content, cardMedia } = this.props;

        return (
            <Card className={`cards-container`} onClick={() => {
                console.log("Entra");
            }}>
                <CardActionArea >
                    {cardMedia ? <CardMedia
                        className={`cards-media ${classMedia}`}
                        image={image ? image : DEFAULT}
                        title="Contemplative Reptile"
                    /> : <></>}

                    <CardContent>
                        <span className={`headlines-primary`}>
                            {mainTitle}
                        </span>
                        <div>
                            <span className={`paragraph-primary secondary-color-dark`}>
                                {legend}
                            </span>
                        </div>
                        <div>
                            {content}
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
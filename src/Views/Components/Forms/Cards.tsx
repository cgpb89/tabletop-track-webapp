import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";


const DEFAULT = require("../../../images/meeple2.jpg");

interface CardContainerProps {
    image?: string;
    mainTitle: string;
    legend?: string;
    classMedia?: string;
}
class Cards extends React.Component<CardContainerProps, any> {


    public render() {
        const { image, mainTitle, legend, classMedia } = this.props;

        return (
            <Card className={`cards-container`}>
                <CardActionArea>
                    <CardMedia
                    className={`cards-media ${classMedia}`}
                        image={image ? image : DEFAULT}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <span className={`headlines-primary`}>
                            {mainTitle}
                        </span>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {legend}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default Cards;
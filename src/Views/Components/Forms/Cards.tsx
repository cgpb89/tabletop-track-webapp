import React from "react";
import {
    Card, CardActionArea,
    CardMedia, CardContent, CardActions,
    Button
} from "@material-ui/core";
import ButtonC from "./ButtonC";

const DEFAULT = require("../../../images/game-8.jpg");

export interface ButtonDetails {
    title: string;
    onClick: () => void;
}

interface CardContainerProps {
    image?: string;
    mainTitle: string;
    legend?: string;
    classMedia?: string;
    actions?: boolean;
    content?: React.ReactNode;
    cardMedia?: boolean;
    cardMainAction?: () => void;
    firstBtnDetails?: ButtonDetails;
    secondBtnDetails?: ButtonDetails;
}
class Cards extends React.Component<CardContainerProps, any> {


    public render() {
        const { image, mainTitle, legend, classMedia, actions, content, cardMedia, firstBtnDetails, secondBtnDetails,
            cardMainAction } = this.props;

        return (
            <Card className={`cards-container`} onClick={() => {
                if (cardMainAction) {
                    cardMainAction();
                }
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
                        <ButtonC
                            className={"btn btn-blue medium label-secondary"}
                            label={firstBtnDetails?.title}
                            onClick={() => {
                                firstBtnDetails?.onClick();
                            }} />
                        <ButtonC
                            className={"btn btn-red medium label-secondary"}
                            label={secondBtnDetails?.title}
                            iconClass={`icon-bin`}
                            iconPhrase
                            onClick={() => {
                                secondBtnDetails?.onClick();
                            }}/>
                    </CardActions>
                    : <></>}
            </Card>
        );
    }
}

export default Cards;
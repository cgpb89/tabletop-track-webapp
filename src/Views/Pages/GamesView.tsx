import React            from "react";
import { Container }    from "@material-ui/core";

interface GamesViewProps {
}

class GamesView extends React.Component<GamesViewProps, any> {
    public render(): React.ReactNode {
        return (
            <Container className={`wrap-container main-content`}>
                <div className={`row`}>
                    Games
                </div>
            </Container>
        );
    }
}

export default GamesView;
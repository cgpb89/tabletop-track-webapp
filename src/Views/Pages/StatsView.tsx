import React            from "react";
import { Container }    from "@material-ui/core";

interface StatsViewProps {
}

class StatsView extends React.Component<StatsViewProps, any> {
    public render(): React.ReactNode {
        return(
            <Container className={`wrap-container main-content`}>
                <div className={`row`}>
                    Stats
                </div>
            </Container>
        );
    }
}

export default StatsView;
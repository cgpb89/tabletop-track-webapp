import React            from "react";
import { Container }    from "@material-ui/core";
import { Row }          from "reactstrap";


class HomeViewModel extends React.Component<any, any> {

    public render = () => {
        return (
            <Container>
                <Row>
                    <h1>This is the home page</h1>
                </Row>
            </Container>
        );
    }
}

export default HomeViewModel;
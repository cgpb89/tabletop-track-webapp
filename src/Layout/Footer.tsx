import React                                                from "react";
import { Container }    from "@material-ui/core";
import MenuIcon         from "@material-ui/icons/Menu";
import { Row, Col }          from "reactstrap";

class Footer extends React.Component<any, any> {

    public render = () => {
        return (
            <footer className={`footer`}>
                <Container>
                    <Row>
                        <Col xs="12" md="12">
                            <p>
                            <span className="d-block">Made by Carlos Pereira Brenes.</span>
                            <span className="d-block">Email: gpereirab89@gmail.com</span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;
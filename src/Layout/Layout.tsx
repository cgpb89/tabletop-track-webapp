import React                from "react";
import { Switch, Route }    from "react-router-dom";
import Routes               from "../Routes/routes";
import Footer               from "./Footer";
import HeaderViewModel      from "../ViewModel/HeaderViewModel";

class Layout extends React.Component<any, any> {

    public render = () => {
        return (
            <React.Fragment>
                <HeaderViewModel />
                <Switch>
                    {
                        Routes.map((page) => {
                            return (
                                <Route
                                    exact={page.exact}
                                    path={page.path}
                                    key={page.name}
                                    component={page.component}
                                    options={page.options}
                                />
                            );
                        })
                    }
                </Switch>
                <Footer />
            </React.Fragment>
        );
    }

}

export default Layout;
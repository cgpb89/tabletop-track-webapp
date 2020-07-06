import React, { ReactEventHandler }                         from "react";
import { AppBar, Toolbar, IconButton, Typography, Button }  from "@material-ui/core";
import MenuIcon                                             from "@material-ui/icons/Menu";
import ButtonC                                              from "../Views/Components/Forms/ButtonC";

interface HeaderProps {
    isUserLogin: boolean;
    onLogIn: (ev: React.MouseEvent<HTMLElement>) => void;
}

class Header extends React.Component<HeaderProps, any> {

    public render = () => {
        const { isUserLogin, onLogIn } = this.props;
        return (
            <div className={`header`}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={`menu`} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={`page-title headlines-primary`}>
                            TableTop Track
                        </Typography>

                        {!isUserLogin ? <ButtonC
                        className={`btn btn-white-outline label-primary`}
                            label={"Login"}
                            onClick={(ev: React.MouseEvent<HTMLElement>) => {
                                onLogIn(ev);
                            }} /> :
                            <span className={`icon-wondering`}></span>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
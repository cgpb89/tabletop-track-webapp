import React, { ReactEventHandler }                                                from "react";
import { AppBar, Toolbar, IconButton, Typography, Button }  from "@material-ui/core";
import MenuIcon                                             from "@material-ui/icons/Menu";

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
                        <Typography variant="h6" className={`page-title`}>
                            TableTop Track
                        </Typography>

                        {isUserLogin ?
                            <Button color="inherit"
                            onClick={(ev: React.MouseEvent<HTMLElement>) => {
                                onLogIn(ev);
                            }}>Login</Button> :
                            <>
                                <Button color="inherit">Signup</Button>
                            </>}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
import React                                                from "react";
import { AppBar, Toolbar, IconButton, Typography, Button }  from "@material-ui/core";
import MenuIcon                                             from "@material-ui/icons/Menu";

interface HeaderProps {
    isUserLogin: boolean;
}

class Header extends React.Component<HeaderProps, any> {

    public render = () => {
        const { isUserLogin } = this.props;
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
                            <></> :
                            <>
                                <Button color="inherit">Login</Button>
                                <Button color="inherit">Signup</Button>
                            </>}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
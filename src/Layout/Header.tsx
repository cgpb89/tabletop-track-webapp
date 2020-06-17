import React                                                from "react";
import { AppBar, Toolbar, IconButton, Typography, Button }  from "@material-ui/core";
import MenuIcon                                             from "@material-ui/icons/Menu";

class Header extends React.Component<any, any> {

    public render = () => {
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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
import React                                        from "react";
import { AppBar, Toolbar, IconButton, Typography }  from "@material-ui/core";
import MenuIcon                                     from "@material-ui/icons/Menu";
import ButtonC                                      from "../Views/Components/Forms/ButtonC";

interface HeaderProps {
    isUserLogin: boolean;
    onLogIn: (ev: React.MouseEvent<HTMLElement>) => void;
    userName?: string;
}

class Header extends React.Component<HeaderProps, any> {

    public render = () => {
        const { isUserLogin, onLogIn, userName } = this.props;
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
                            <ButtonC
                            className={`btn btn-circle btn-white-outline titles-primary medium`}
                            iconClass={"icon-user1"}/>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
import React        from "react";
import GamesView    from "../Views/Pages/GamesView";

interface GamesViewModelProps {
}

class GamesViewModel extends React.Component<any, any> {
    public render(): React.ReactNode {
        return(
            <GamesView />
        );
    }
}

export default GamesViewModel;
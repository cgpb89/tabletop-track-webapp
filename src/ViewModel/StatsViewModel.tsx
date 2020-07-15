import React        from "react";
import StatsView    from "../Views/Pages/StatsView";

interface StatsViewModelProps {
}

class StatsViewModel extends React.Component<any, any> {
    public render(): React.ReactNode {
        return(
            <StatsView />
        );
    }
}

export default StatsViewModel;
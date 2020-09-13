import { inject, observer }                 from "mobx-react";
import React                                from "react";
import { RouteComponentProps, withRouter }  from "react-router-dom";
import { GroupStore }                       from "../Store/GroupStore";
import { MessagesStore }                    from "../Store/MessagesStore";
import { UserStore }                        from "../Store/UserStore";

interface OneGroupViewModelProps extends RouteComponentProps<any>  {
    GroupStore?: GroupStore;
    UserStore?: UserStore;
    MessagesStore?: MessagesStore;
}

@inject(GroupStore.NAME_STORE, UserStore.NAME_STORE, MessagesStore.NAME_STORE)
@observer
class OneGroupViewModel extends React.Component<OneGroupViewModelProps, any> {
    get groupStore(): GroupStore {
        return this.props.GroupStore as GroupStore;
    }

    get userStore(): UserStore {
        return this.props.UserStore as UserStore;
    }

    get messagesStore(): MessagesStore {
        return this.props.MessagesStore as MessagesStore;
    }

    constructor(props: OneGroupViewModelProps) {
        super(props);
        const requestId = this.props.match.params.id;
    }


    public render() {
        return(
            <div>

            </div>
        );
    }
}

export default withRouter(OneGroupViewModel);
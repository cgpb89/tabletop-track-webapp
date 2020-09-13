import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inject, observer } from "mobx-react";
import { MessagesStore } from "../../../Store/MessagesStore";

interface NotificationProps {
    text?: string;
    error?: boolean;
    MessagesStore?: MessagesStore;
}

@inject(MessagesStore.NAME_STORE)
@observer
class Notification extends React.Component<NotificationProps, any> {

    get messagesStore(): MessagesStore {
        return this.props.MessagesStore as MessagesStore;
    }

    private onMessageClose = () => {

        // setTimeout(function() {
        //     console.log("Set");
            this.messagesStore.setMessage(undefined);
            this.messagesStore.setType(undefined);
        // }, 3000);
    }

    public render() {
        const { text, error } = this.props;


        toast(text, {
            autoClose: 5000,
            closeOnClick: true,
            draggable: true,
            hideProgressBar: false,
            onClose: this.onMessageClose,
            pauseOnHover: true,
            position: "bottom-center",
            progress: undefined,
            transition: Slide,
            type: error ? toast.TYPE.ERROR : toast.TYPE.INFO,
        });

        return (
            <div>
                <ToastContainer limit={2}/>
            </div>
        );
    }

}

export default Notification;
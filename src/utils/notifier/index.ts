import { store } from 'react-notifications-component';

const notificationConfig:any={
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
        duration: 2500
    },
    width:300
}

const notifier = {
    default : (title='Message',message=' ')=> store.addNotification({title,message,type: "default",...notificationConfig}),
    success : (title='Success',message=' ')=> store.addNotification({title,message,type: "success",...notificationConfig}),
    error : (title='Danger',message=' ')=> store.addNotification({title,message,type: "danger",...notificationConfig}),
    warning : (title='Warning',message=' ')=> store.addNotification({title,message,type: "warning",...notificationConfig}),
    info : (title='Info',message=' ')=> store.addNotification({title,message,type: "info",...notificationConfig}),
}

export default notifier;
import "bootstrap/dist/css/bootstrap.min.css";
import ApplicationSelector from "./components/ApplicationSelector";
import ApplicationView from "./components/ApplicationView";
import {useState, useEffect} from "react";
import _ from 'lodash';
const {remote, ipcRenderer} = window.require("electron");

function App() {

    const services = JSON.parse(remote.getGlobal("services")) || [{
        name: "GMail",
        url: "https://mail.google.com",
        icon: "https://mail.google.com/favicon.ico",
        notification: "\\(\\d\\)"
    }];

    const [currentApp, setCurrentApp] = useState(services[0]);
    const [notifications, setNotifications] = useState({});

    useEffect(() => {
        const trayNotification = _.reduce(
            notifications,
            (acc, service) => acc || service != null,
            false
        );
        ipcRenderer.send("tray-notification", trayNotification);
    }, [notifications]);

    const onNotificationChange = (service, hasNotification) => {

        if(
            (hasNotification && notifications[service.name]) ||
            (!hasNotification && !notifications[service.name])
        ){
            return;
        }

        const updatedNotifications = _.extend({}, notifications, {
            [service.name]: hasNotification ? service : null
        });

        setNotifications(updatedNotifications);
    }

    return (
        <div className="App">
            <ApplicationSelector
                app={currentApp}
                services={services}
                onClick={app => setCurrentApp(app)}
                notifications={notifications}
            />
            <ApplicationView
                app={currentApp}
                services={services}
                onNotificationChange={(service, hasNotification) =>
                    onNotificationChange(service, hasNotification)}
            />
        </div>
    );
}

export default App;

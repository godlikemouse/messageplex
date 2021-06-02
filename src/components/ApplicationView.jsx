import "./ApplicationView.css";
import _ from "lodash";
import classnames from "classnames";
import React, {useEffect} from "react";
const {shell} = window.require("electron");

const ApplicationView = props => {

    const {
        app,
        services,
        onNotificationChange
    } = props;

    const refs = _.map(services, service => React.createRef());

    const onNewWindow = e => {
        const protocol = (new URL(e.url)).protocol;
        if (protocol === "http:" || protocol === "https:") {
            e.preventDefault();
            shell.openExternal(e.url);
            return false;
        }
    }

    const onTitleUpdated = e => {

        const title = _.get(e, "title");
        const name = _.get(e, "target.attributes['name'].value");
        const service = _.find(services, s => s.name === name);
        const notification = _.get(service, "notification");

        if(!notification)
            return onNotificationChange(service, false);

        const re = new RegExp(notification.toString(), "g");
        const hasNotification = re.test(title);

        onNotificationChange(service, hasNotification);
    }

    useEffect(() => {

        _.each(refs, ref => {
            ref.current.addEventListener("new-window", onNewWindow);
            ref.current.addEventListener("page-title-updated", onTitleUpdated)
        });

        const refsClone = _.cloneDeep(refs);
        return () => {
            _.each(refsClone, ref => {
                ref.current.removeEventListener("new-window", onNewWindow);
                ref.current.removeEventListener("page-title-updated", onTitleUpdated);
            });
        }
    });

    return (
        <>
        {
            _.map(services, (service, i) =>
                <div
                    className={
                        classnames(
                            "application-view",
                            {
                                hidden: app.name !== service.name
                            }
                        )
                    }
                    key={`service-${service.name}`}
                >
                    <webview
                        className="application-webview"
                        src={service.url}
                        name={service.name}
                        autosize="on"
                        ref={refs[i]}
                    ></webview>
                </div>
            )
        }
        </>
    );

}

ApplicationView.defaultProps = {
    services: []
}

export default ApplicationView;

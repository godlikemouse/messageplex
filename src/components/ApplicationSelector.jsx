import "./ApplicationSelector.css";
import _ from "lodash";
import classnames from "classnames";

const ApplicationSelector = props => {

    const {
        app,
        services,
        onClick,
        notifications
    } = props;

    return (
        <div className="application-selector">
        {
            _.map(services, (service, i) =>
                <div
                    key={`application-${i}`}
                    className={
                        classnames("application", {
                            active: service.name === app.name
                        })
                    }
                    title={service.name}
                    onClick={() => onClick(service)}
                >
                    <img src={service.icon} className="service-icon" />
                    {
                        notifications[service.name] ?
                            <div className="notification"/> :
                            null
                    }
                </div>
            )
        }
        </div>
    )
}

ApplicationSelector.defaultProps = {
    apps: [],
    onClick: app => {}
}

export default ApplicationSelector;

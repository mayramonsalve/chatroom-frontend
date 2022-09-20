import { useEffect, useRef } from "react";

const MessagesComponent = ({messages}) =>
{
    const messageRef = useRef();

    useEffect(() => {
        if(messageRef && messageRef.current)
        {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return <div className="messages">
        {messages.map((m, index) =>
            index === messages.length - 1 ?
            (
            <div ref={messageRef} key={index} className="user-message">
                <div className={"message bg-primary" + (m.user === "Jobsity Chat Bot" ? " bot" : "")}>{m.message}</div>
                <div className="from-user">{m.user}<span>{new Date(m.date).toLocaleString()+''}</span></div>
            </div>
            ) :
            (
            <div key={index} className="user-message">
                <div className={"message bg-primary" + (m.user === "Jobsity Chat Bot" ? " bot" : "")}>{m.message}</div>
                <div className="from-user">{m.user}<span>{new Date(m.date).toLocaleString()+''}</span></div>
            </div>
            )
        )}
    </div>
}

export default MessagesComponent;
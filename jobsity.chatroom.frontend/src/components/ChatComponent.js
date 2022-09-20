import MessagesComponent from "./MessagesComponent"
import SendMessageComponent from "./SendMessageComponent";
import UsersComponent from "./UsersComponent";
import { Button } from 'react-bootstrap'

const ChatComponent = ({messages, sendMessage, closeConnection, users}) =>
<div>
    <UsersComponent users={users}></UsersComponent>
    <div className='chat'>
        <MessagesComponent messages={messages}></MessagesComponent>
        <SendMessageComponent sendMessage={sendMessage}></SendMessageComponent>
    </div>
    <div className="leave-room">
        <Button variant="danger" onClick={() => closeConnection()}>Leave Room</Button>
    </div> 
</div>

export default ChatComponent;
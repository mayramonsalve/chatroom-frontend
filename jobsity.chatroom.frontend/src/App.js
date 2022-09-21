import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LobbyComponent from './components/LobbyComponent'
import ChatComponent from './components/ChatComponent'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';

const App = () =>
{
  const [connection, setConnection] = useState();
  const [bot, setBot] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [roomName , setRoomName] = useState('')

  const  receiveRoomNameFromChild = (roomName) => {
    setRoomName(roomName)
  }

  const joinRoom = async(user, room) => 
  {
    try
    {
      const connection = new HubConnectionBuilder()
                          .withUrl("https://localhost:7181/chat")
                          .configureLogging(LogLevel.Information)
                          .build();
      const bot = new HubConnectionBuilder()
                          .withUrl("https://localhost:7203/bot")
                          .configureLogging(LogLevel.Information)
                          .build();
    
      connection.on("UsersInRoom", (users) => 
      {
        setUsers(users); 
      });

      connection.on("ReceiveMessage", (user, message, date) => 
      {
        setMessages(messages => [...messages, { user, message, date }]
                                .slice(messages.length > 49 ? 1 : 0)
                                .sort( (a, b) => new Date(a.date) - new Date(b.date) )); 
      });

      connection.onclose(e => {
        setConnection();
        setBot();
        setMessages([]);
        setUsers([]);
      });

      await connection.start();
      await bot.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
      setBot(bot);
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const closeConnection = async () =>
  {
    try
    {
      await connection.stop();
      await bot.stop();
      setRoomName("");
    }
    catch(e)
    {
      console.log(e);
    }
  }

  const sendMessage = async (message) =>
  {
    try
    {
      if(message.startsWith('/stock='))
      {
        var code = message.split('=');
        var stockCode = code[1];
        var room = roomName;
        await bot.invoke("StockBot", {stockCode, room});
      }
      else
      {
      var date = new Date();
      await connection.invoke("SendMessage", {message, date});
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }

  return <div className='app'>
    <h2>Jobsity Chat {connection && roomName ? " - Room: " + roomName : ""}</h2>
    <hr className='line'></hr>
    {!connection ?
    <LobbyComponent joinRoom={joinRoom} sendDataToParent={receiveRoomNameFromChild}></LobbyComponent> :
    <ChatComponent messages={messages} sendMessage={sendMessage} closeConnection={closeConnection}
          users={users}></ChatComponent>
    }
  </div>
}

export default App;
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'
import { useState } from 'react'

const SendMessageComponent = ({ sendMessage }) => 
{
    const[message, setMessage] = useState('');

    return <Form onSubmit={e => { e.preventDefault();
                                    sendMessage(message);
                                    setMessage('');
                            }}>
                <InputGroup className = "typebox">
                    <FormControl placeholder="Type message..." value={message}
                                onChange={e => setMessage(e.target.value)}></FormControl>
                    <Button variant="primary" type="submit" disabled={!message}>Send</Button>
                </InputGroup>
            </Form>
}
export default SendMessageComponent;
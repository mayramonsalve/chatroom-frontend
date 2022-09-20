import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

const Lobby = ({ joinRoom, sendDataToParent }) => {
    const[user, setUser] = useState();
    const[room, setRoom] = useState();
    let rooms = [
        "Jobsity General", "Business", "Hobbies"
    ];

    return <Form className='lobby' onSubmit={e => { e.preventDefault();
                                                    joinRoom(user, room);
                                                    sendDataToParent(room);
                                                    }}>
            <Form.Group>
                <Form.Control placeholder='User' onChange={e => setUser(e.target.value)}></Form.Control>
				<Form.Select onChange={e =>setRoom(e.target.value)}>
					<option value="">Select a room</option>
					{rooms.map((room) => <option key={room} value={room}>{room}</option>)}
				</Form.Select>
            </Form.Group>
            <Button variant='success' type='submit' disabled={!user || !room}>Join</Button>
    </Form>
}

export default Lobby;
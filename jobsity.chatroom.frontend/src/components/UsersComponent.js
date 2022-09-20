const UsersComponent = ({users}) => <div className="users-list">
    <h4>Users:</h4>
    {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
</div>

export default UsersComponent;
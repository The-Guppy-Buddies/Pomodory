import './Member.css';

function User({ existingUser }) {
    return (
        <div className="User">
            <h3>{existingUser["User ID"]}</h3>
            <h3>{existingUser["username"]}</h3>
            <p>{existingUser["Guppy No."]}</p>
        </div>
    );
}

export default User;
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import User from './components/Member';
import Timer from './components/CountdownTimer';
import { useRef } from 'react';
import Spline from '@splinetool/react-spline';


function App() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    //const [user, setUser] = useState('');

    const handleId = (event) => {
        setId(event.target.value);
    };

    const url = 'http://54.237.22.243:5000/user-collection';
    //const local_url = 'http://127.0.0.1:5000/user-collection'
    const search = async (id,username) => {
        await fetch(`${url}/${id||username}`)
            .then((response) => response.json())
            .then((data) => setUsername(data));
    }

    return (
        <div className="App">
            <h1>Guppy Buddies Home of Homies!</h1>
            <input id="id_inp" type="text" placeholder="User ID or username" onChange={handleId}></input>
            <button className="btn btn-primary" onClick={() => search(id || username)}>Search</button>
            <form action={`${url}/create`} method="post">
                <input className="mt-2 form-control" name="User ID" type="text" placeholder='User ID'></input>
                <input className="mt-2 form-control" name="username" type="text" placeholder='Username'></input>
                <input className="mt-2 form-control" name="Guppy No." type="text" placeholder='(1-5)'></input>
                <button className="mt-2 btn btn-primary" type="submit">Submit</button>
            </form>
            <User existingUser={username}/>
            <Timer/> 
            
        </div>
    );
}

//exposes App components to other "modules
export default App;

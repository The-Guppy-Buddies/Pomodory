import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import Member from './components/Member';
import Timer from './components/CountdownTimer';

function App() {
    const [id, setId] = useState('');
    const [member, setMember] = useState('');

    const handleId = (event) => {
        setId(event.target.value);
    };

    const search = async (id) => {
        await fetch(`https://Pomodory-1.guppy-buddies.repl.co/collection/${id}`)
            .then((response) => response.json())
            .then((data) => setMember(data));
    }

    return (
        <div className="App">
            <h1>Guppy Buddies Test Page!</h1>
            <input id="id_inp" type="text" placeholder="Member ID" onChange={handleId}></input>
            <button className="btn btn-primary" onClick={() => search(id)}>Search</button>
            <form action="https://Pomodory-1.guppy-buddies.repl.co/collection/create" method="post">
                <input className="mt-2 form-control" name="Member ID" type="text" placeholder='ID'></input>
                <input className="mt-2 form-control" name="name" type="text" placeholder='Name'></input>
                <input className="mt-2 form-control" name="occupation" type="text" placeholder='Occupation'></input>
                <button className="mt-2 btn btn-primary" type="submit">Submit</button>
            </form>
            <Member curMember={member}/>
            <Timer/> 
            
        </div>
    );
}

//exposes App components to other "modules"
export default App;

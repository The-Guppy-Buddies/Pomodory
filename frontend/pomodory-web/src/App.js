import './App.css';
import { useState } from 'react';
import Member from './components/Member';

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
            <input id="id_inp" type="text" onChange={handleId}></input>
            <button className="btn btn-primary" onClick={() => search(id)}>Search</button>
            <Member curMember={member}/>
        </div>
    );
}

//exposes App components to other "modules"
export default App;

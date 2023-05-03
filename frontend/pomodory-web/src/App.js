import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { useState } from 'react';
import Account from './components/Account'
import User from './components/Member';
import Timer from './components/CountdownTimer';
import TodoList from './components/TodoList';
import styled from "styled-components";
import SplineStuff from './components/SplineStuff';


function App() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');

    const handleId = (event) => {
        setId(event.target.value);
    };

    const setUserVar = (userToSet) => { setUser(userToSet); }

    const url = 'http://54.237.22.243:5000';
    // const url = 'http://127.0.0.1:5000';
    const search = async (id,username) => {
        await fetch(`${url}/user-collection/${id||username}`)
            .then((response) => response.json())
            .then((data) => setUsername(data));
    }

    const revealContent = () => {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("#main-content").style.display = "block";
    }

    return (
        <div className="App">
            <Wrapper> 
                <SplineStuff user={user}/>
                {/* <div id="loader">
                    <h2>Loading...</h2>
                </div> */}
                {/* <Spline scene="https://prod.spline.design/RM1G00svMv2hMQhd/scene.splinecode"/> */}
                <Content id="main-content">
                    <Account url={url} setUserFunc={setUserVar}/>
                    <h1>Guppy Buddies Home of Homies!</h1>
                    <input id="id_inp" type="text" placeholder="User ID or username" onChange={handleId}></input>
                    <button className="btn btn-primary" onClick={() => search(id)}>Search</button>
                    <form action={`${url}/user-collection/create`} method="post">
                        <input className="mt-2 form-control" name="User ID" type="text" placeholder='User ID'></input>
                        <input className="mt-2 form-control" name="username" type="text" placeholder='Username'></input>
                        <input className="mt-2 form-control" name="Guppy No." type="text" placeholder='(1-5)'></input>
                        <button className="mt-2 btn btn-primary" type="submit">Submit</button>
                    </form>
                    <User existingUser={username}/>
                    <Timer/> 
                    <TodoList url={url} userId={user["User ID"]}/>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#todo-modal">
                        Open Todo List
                    </button>
                </Content>
            </Wrapper>
        </div>
    );
}

//exposes App components to other "modules
export default App;

const Wrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    gap: 200px;
`;
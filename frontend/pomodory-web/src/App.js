import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import { useState } from 'react';
import { Toast } from 'bootstrap';
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

    const setUserVar = (userToSet) => {
        document.querySelector("#main-content").style.display = "none";
        setUser(userToSet); 
    }

    const url = 'http://54.237.22.243:5000';
    // const url = 'http://127.0.0.1:5000';
    const search = async (id,username) => {
        await fetch(`${url}/user-collection/${id||username}`)
            .then((response) => response.json())
            .then((data) => setUsername(data));
    }

    const revealContent = () => {
        if(user) {
            const toastElem = document.getElementById('toast-sign-in');
            toastElem.querySelector(".toast-body").innerHTML = `Welcome ${user.username}!`
            const toast = new Toast(toastElem);
            toast.show();
        }

        document.querySelector("#loader").style.display = "none";
        document.querySelector("#main-content").style.display = "block";
    }

    return (
        <div className="App">
            <Wrapper> 
                <SplineStuff user={user} revealContentFunc={revealContent}/>
                <div id="loader">
                    <h2>Loading...</h2>
                </div>
                {/* <Spline scene="https://prod.spline.design/RM1G00svMv2hMQhd/scene.splinecode"/> */}
                <Content id="main-content">
                    <Account url={url} setUserFunc={setUserVar}/>
                    <h1>Guppy Buddies Home of Homies!</h1>
                    <User existingUser={username}/>
                    <Timer/> 
                    <TodoList url={url} userId={user["User ID"]}/>
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
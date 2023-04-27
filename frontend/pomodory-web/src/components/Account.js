import './Account.css';
import { useState } from 'react';

function Account({ url, setUserFunc }) {
    const [id, setId] = useState('');

    function hideAccountScreen() {
        document.querySelector("#account-container").classList.add("hidden");
    }

    function showScreenById(id) {
        document.querySelector(`#${id}`).classList.remove("hidden");
        document.querySelector("#account").classList.add("hidden");
    }

    function backToAccountScreen() {
        document.querySelector("#account").classList.remove("hidden");
        document.querySelector("#sign-in").classList.add("hidden");
        document.querySelector("#create-user").classList.add("hidden");
    }

    function handleId(event) {
        document.querySelector("#status-error").classList.add("hidden");
        setId(event.target.value);
    };

    async function search(id, username) {
        function handleError() {
            document.querySelector("#status-loading").classList.add("hidden");
            document.querySelector("#status-error").classList.remove("hidden");
        }

        function signIn(data) {
            setUserFunc(data);
            hideAccountScreen();
        }

        document.querySelector("#status-loading").classList.remove("hidden");
        await fetch(`${url}/${id||username}`)
            .then((response) => response.json())
            .then((data) => signIn(data))
            .catch(() => handleError());
    }

    return (
        <div id="account-container">
            <div id="account">
                <button className="btn btn-primary" onClick={() => showScreenById("sign-in")}>Sign In</button>
                <button className="btn btn-primary" onClick={() => showScreenById("create-user")}>Create a Guppy</button>
            </div>
            <div id="sign-in" className="hidden">
                <input className="mt-2 form-control" type="text" placeholder="User ID or Username" onChange={handleId}></input>
                <button className="btn btn-primary" onClick={() => search(id)}>Sign In</button>
                <button className="btn btn-secondary" onClick={() => backToAccountScreen()}>Back</button>
                <p id="status-loading" className="sign-in-status hidden">Loading...</p>
                <p id="status-error" className="sign-in-status hidden">Error finding Guppy.<br></br>Please try again.</p>
            </div>
            <div id="create-user" className="hidden">
                <form action={`${url}/create`} method="post">
                    <input className="mt-2 form-control" name="User ID" type="text" placeholder='User ID' required></input>
                    <input className="mt-2 form-control" name="username" type="text" placeholder='Username' required></input>
                    <input className="mt-2 form-control" name="Guppy No." type="text" placeholder='(1-5)' required></input>
                    <button className="btn btn-primary" type="submit">Submit</button>
                    <button className="btn btn-secondary" type="button" onClick={() => backToAccountScreen()}>Back</button>
                </form>
            </div>
        </div>
    );
}

export default Account;

import './Account.css';
import { useState } from 'react';
import { Toast } from 'bootstrap';

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

            const toastElem = document.getElementById('toast-sign-in');
            toastElem.querySelector(".toast-body").innerHTML = `Welcome ${data.username}!`
            const toast = new Toast(toastElem);
            toast.show();
        }

        document.querySelector("#status-loading").classList.remove("hidden");
        await fetch(`${url}/user-collection/${id||username}`)
            .then((response) => response.json())
            .then((data) => signIn(data))
            .catch(() => handleError());
    }

    return (
        <>
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
                    <form action={`${url}/user-collection/create`} method="post">
                        <input className="mt-2 form-control" name="User ID" type="text" placeholder='User ID' required></input>
                        <input className="mt-2 form-control" name="username" type="text" placeholder='Username' required></input>
                        <input className="mt-2 form-control" name="Guppy No." type="text" placeholder='(1-5)' required></input>
                        <button className="btn btn-primary" type="submit">Submit</button>
                        <button className="btn btn-secondary" type="button" onClick={() => backToAccountScreen()}>Back</button>
                    </form>
                </div>
            </div>
            <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
                <div id="toast-sign-in" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Pomodory</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Welcome user!
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;

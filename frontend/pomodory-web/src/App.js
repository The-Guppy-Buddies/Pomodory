import './App.css';
//basic output onto localhost webpage 
//import './script'
function App() {
    return (
        <div className="App">
            <h1>Guppy Buddies Test Page!</h1>
            <input id="id_inp" type="text"></input>
            <button className="btn btn-primary" onClick={() => search()}>Search</button>  
            <script src = "main.py"></script>
        </div>
    );
}

async function search() {
    await fetch('http://localhost:5000/collection/001')
        .then((response) => response.json())
        .then((data) => console.log(data));
}

//we now want to create the search functionality using the prof's example in class
// export function search(){
//     return(
//         <div className = "search">
//             <h2>Search example
//                 <input type= "text"></input>
//                 <button>Search now</button>


//             </h2>

//         </div>
//     );
// }





//exposes App components to other "modules"
export default App;

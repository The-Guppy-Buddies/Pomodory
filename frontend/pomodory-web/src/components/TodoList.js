import './TodoList.css';
import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

function TodoList({ url, userId }) {
    const [detectChange, setDetectChange] = useState(0);
    const [items, setItems] = useState([]);
    const [savedItems, setSavedItems] = useState(items);

    async function fetchTodoList(id) {
        await fetch(`${url}/todo-collection/${id}`)
            .then((response) => response.json())
            .then((data) => { setItems(data.list); setSavedItems(data.list); })
            .catch(() => console.log("Could not find todo list entry for given user"));
    }

    useEffect(() => {
        if(userId) {
            fetchTodoList(userId);
        }
    }, [userId]);

    async function postTodoList(items) {
        await fetch(`${url}/todo-collection/save`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user_id": userId,
                "list": items
            })
        });
    }

    function saveItems() {
        const itemElems = document.querySelector("#todo-body").children;
        let updatedItems = [];

        for(let i = 0; i < itemElems.length; i++) {
            const itemText = itemElems[i].querySelector(".todo-text");

            if(itemText != null) {
                updatedItems.push({
                    id: itemElems[i].dataset.id,
                    text: itemText.value
                });
            }
        }

        setItems(updatedItems);
        setSavedItems(updatedItems);
        postTodoList(updatedItems);
    }

    function closeList() {
        setItems(savedItems);
        setDetectChange(detectChange + 1);
    }

    function addItem() {
        setItems(items.concat({id: uuidv4(), text: ""}));
    }

    function removeItem(id) {
        setItems(items.filter(item => item.id !== id));
    }

    return (
        <div className='container-box' id="todo-box">
            <div className="container-header">
                <h4 className="text-bg-light">Todo List</h4>
            </div>
            <div className="container-body" id="todo-body">
                {items.map(item => <TodoItem key={item.id} item={item} detectChange={detectChange} removeFunc={removeItem}/>)}
                <button type="button" className="btn btn-success" onClick={addItem}>Add Item</button>
            </div>
            <div className="container-footer">
                <button type="button" className="btn btn-primary" onClick={saveItems}>Save Changes</button>
            </div>
        </div>
    );
}

export default TodoList;
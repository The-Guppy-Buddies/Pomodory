import { useState } from 'react';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

function TodoList() {
    const [detectChange, setDetectChange] = useState(0);
    const [items, setItems] = useState([
        {
            id: uuidv4(),
            text: "Print hello world"
        },
        {
            id: uuidv4(),
            text: "Do something else"
        }
    ]);
    const [savedItems, setSavedItems] = useState(items);

    function saveItems() {
        const itemElems = document.querySelector("#todo-modal-body").children;
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
        <div className="modal fade" id="todo-modal" tabIndex="-1" aria-hidden="true" data-backdrop="static" data-keyboard="false" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-bg-light" id="exampleModalLabel">Todo List</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeList}></button>
                    </div>
                    <div className="modal-body" id="todo-modal-body">
                        {items.map(item => <TodoItem key={item.id} item={item} detectChange={detectChange} removeFunc={removeItem}/>)}
                        <button type="button" className="btn btn-success" onClick={addItem}>Add Item</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeList}>Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveItems}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodoList;
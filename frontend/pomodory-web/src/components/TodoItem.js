import './TodoItem.css';
import { useState, useEffect } from 'react';

function TodoItem({ item, detectChange, removeFunc }) {
    const [text, setText] = useState(item.text);

    useEffect(() => {
        setText(item.text);
    }, [detectChange]);

    return (
        <div className="input-group text-bg-light mb-3" data-id={item.id}>
            <input className="todo-text" type="text" value={text} onChange={e => setText(e.target.value)}/>
            <button className="btn btn-danger" type="button" onClick={() => {removeFunc(item.id)}}>Remove</button>
        </div>
    );
}

export default TodoItem;
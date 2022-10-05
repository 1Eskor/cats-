import React from "react";

const TodoList = ({todos, setTodos}) => {

    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    return (
        <div>
            {todos.map((todo) => (
                <li className="todo-list" key={todo.id}>
                    <input type="text"
                      value={todo.title} 
                      className="container-fluid align-middle text-center" 
                      onChange={(event) => event.preventDefault()}
                    />
                    <div>
                    <button className="button-delete tast-button" onClick={() => handleDelete(todo)}>
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </div>
    )
}

export default TodoList;
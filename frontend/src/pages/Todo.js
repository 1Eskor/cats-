import React, { useState, useEffect } from "react";
import Form from "../components/Form.js";
import TodoList from "../components/TodoList.js";

export default function Todo({ props }) {

    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);
    return (
        <>
            <div className="container-fluid m-0 py-2 align-middle text-center text-banner">
                My Todo List App - because johanna forced me
          </div>

            <div className="container-fluid m-0 py-2 align-middle text-center">
                <Form
                    input={input}
                    setInput={setInput}
                    todos={todos}
                    setTodos={setTodos}
                />
            </div>
            <div>
                <TodoList todos={todos} setTodos={setTodos} />
            </div>

        </>
    );
}
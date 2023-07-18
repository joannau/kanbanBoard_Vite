/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import KanbanBoard, {
    COLUMN_KEY_TODO,
    COLUMN_KEY_ONGOING,
    COLUMN_KEY_DONE,
} from "./KanbanBoard";
import AdminContext from "./context/AdminContext";

const DATA_STROE_KEY = "kanban-data-store";

function App() {
    const [todoList, setTodoList] = useState([
        { title: "开发任务-1", status: "2022-05-22 18:15" },
        { title: "开发任务-3", status: "2022-06-22 18:15" },
        { title: "开发任务-5", status: "2022-07-22 18:15" },
        { title: "测试任务-3", status: "2022-07-23 18:15" },
    ]);
    const [ongoingList, setOngoingList] = useState([
        { title: "开发任务-4", status: "2022-05-22 18:15" },
        { title: "开发任务-6", status: "2022-06-22 18:15" },
        { title: "测试任务-2", status: "2022-07-22 18:15" },
    ]);
    const [doneList, setDoneList] = useState([
        { title: "开发任务-2", status: "2022-06-24 18:15" },
        { title: "测试任务-1", status: "2022-07-03 18:15" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const updates = {
        [COLUMN_KEY_TODO]: setTodoList,
        [COLUMN_KEY_ONGOING]: setOngoingList,
        [COLUMN_KEY_DONE]: setDoneList,
    };
    const handleAdd = (column, card) => {
        updates[column]((curState) => [card, ...curState]);
    };
    const handleRemove = (column, card) => {
        updates[column]((curState) =>
            curState.filter((item) => item.title !== card.title)
        );
    };
    const [isAdmin, setIsAdmin] = useState(false);
    const handleToggleAdmin = (evt) => {
        setIsAdmin(!isAdmin);
    };
    const handleSaveAll = () => {};

    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    我的看板
                    <button onClick={handleSaveAll}>保存所有卡片</button>
                    <label>
                        <input
                            type="checkbox"
                            value={isAdmin}
                            onChange={handleToggleAdmin}
                        />
                        管理员模式
                    </label>
                </h1>
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <AdminContext.Provider value={isAdmin}>
                <KanbanBoard
                    isLoading={isLoading}
                    todoList={todoList}
                    ongoingList={ongoingList}
                    doneList={doneList}
                    onAdd={handleAdd}
                    onRemove={handleRemove}
                />
            </AdminContext.Provider>
        </div>
    );
}

export default App;

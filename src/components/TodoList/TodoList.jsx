import React, { useState } from 'react';
import {TodoInfo} from '../TodoInfo/TodoInfo';
import { ModalForm } from '../ModalForm/ModalForm';
import './TodoList.scss'

export const TodoList = ({ todos = [], updataSatus, deleteTodo, addTodo, updataTodos }) => {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setSelectedTodo(null)
    setModalIsOpen(false)
  };
  const selectTodo = (todo) => setSelectedTodo(todo);

    return (
    <> 
      <ul className="todo-list">
        {todos.map(todo => (
          <li className="todo-list__item" key={todo.id}>
            <TodoInfo 
              todo={todo}
              updataSatus={updataSatus}
              deleteTodo={deleteTodo}
              openModal={openModal}
              selectTodo={selectTodo}
            />
          </li>
        ))}
        <li className="todo-list__item todo-list__item-add">
          <div 
            onClick={() => openModal()}
            className="add-container"
          >
            <span>Add Todo</span>
            <span>+</span>
          </div>
        </li>
      </ul>
      {modalIsOpen && 
        <ModalForm 
          closeModal={closeModal}
          addTodo={addTodo}
          todo={selectedTodo}
          updataTodos={updataTodos}
        />
      }
    </> );
  };
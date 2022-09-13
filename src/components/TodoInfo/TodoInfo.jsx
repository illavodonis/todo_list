import React from 'react';
import './TodoInfo.scss';

export const TodoInfo = ({ todo, updataSatus, deleteTodo, openModal, selectTodo}) => {
    return (
    <>          
      <div className='functional-block'>
      <button 
        title='Edit'
        className="btn btn-edit"
        onClick={() => {
          selectTodo(todo)
          openModal()
        }}
      >
        <span className="mdi mdi-fountain-pen mdi-24px" />
      </button>
      <button 
        title='Delte'
        className="btn btn-delete"
        onClick={()=> deleteTodo(todo.id)}
      >
        <span className="mdi mdi-delete mdi-24px" />
        <span className="mdi mdi-delete-empty mdi-24px" />
      </button>
      </div>
        <div className="user-info">
          <h2 className="todo-info__name">{todo.name}</h2>
          <span>{todo.title}</span>
          <span className="user-info__date">{`${todo.date}`}</span>
        </div>
        <hr className="todo-info__divider" />
        <div className="todo-info">
            <p>{todo.description}</p>
            <div
              title={todo.completed ? 'Done' : 'In process'}
              onClick={()=>updataSatus(todo.id)}
              className="todo-info__status"
            >
            {` Satus: ${todo.completed ? '✅' : '🔴'}`}
            </div>
        </div>
    </>
  );
};
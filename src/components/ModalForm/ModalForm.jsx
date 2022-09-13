import React, {useState} from 'react';
import { TextField } from '../TextField/TextField';
import './ModalForm.scss'
import { getRandomDigits } from '../../utils/function';
 
export const ModalForm = ({ closeModal, todo = null, addTodo, updataTodos }) => {
  const [title, setTitle] = useState(todo ? todo.title : '');
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [name, setName] = useState(todo ? todo.name : '');

  const hundleSubmit = (event) => {
    event.preventDefault();
    if(!todo) {
      const newTodo = {
        id: getRandomDigits(),
        name,
        title,
        description,
        completed: false,
        date: new Date().toLocaleString(),
      };
      addTodo(newTodo)
    } else {
      const newTodo = {
        name,
        title,
        description,
        date: new Date().toLocaleString(),
      };
      updataTodos(todo.id, newTodo);
    }
    closeModal();
  }
  const activationForButton = !(title && name && description);  

  return (
    <div className='modal'>
        <form
        method='post'
        className='modal__form'
        onSubmit={(evnt) => hundleSubmit(evnt)}
        >
          <div className='modal__form-header'>
            <h1>
              {todo ? 'Update Todo' : 'Add Todo'}
            </h1>
            <button 
              onClick={() => {
                closeModal();
              }}
              className='modal__form-header-close-btn'
            >
              X
            </button>
          </div>
          <div className='modal__field'>
          <TextField 
              name="name"
              label="Name"
              value={name}
              onChange={(value) => {
                setName(value);
              }}
              required
            />
            <TextField 
              name="title"
              label="Title"
              value={title}
              onChange={(value) => {
                setTitle(value);
              }}
              required
            />
            <TextField 
              name="description"
              label="Description"
              value={description}
              onChange={(value) => {
                setDescription(value);
              }}
              required
            />
          </div>
          <div className='modal__footer'>
            <button
              type="submit"
              className="modal__button"
              disabled={activationForButton}
            >
              {todo ? 'Updata' : 'Add'}
            </button>
          </div>
        </form>
    </div>
  );
}
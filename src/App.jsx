import React, { useCallback, useEffect, useState } from 'react';
import lodash from 'lodash';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { useLocalStorage } from './utils/hook/useLocalStorage';

const App = () => {
  const [todos, setTodos] = useLocalStorage('todos',[]);
  const [query, setQuery] = useState('');
  const [filtredTodo, setFiltredTodo] = useState([]);
  const [targetValue, setTargetValue] = useState('all');
  const [appliedQuery, setAppliedQuery] = useState('');

  const applyQuery = useCallback(lodash.debounce(setAppliedQuery, 500), []);

  const handleQuery = (input) => {
    setQuery(input);
  };

  const handleTarget = (target) => {
    setTargetValue(target);
  };

  const filterForTodos = useCallback((target) => {
    switch (target) {
      case 'active':
        setFiltredTodo(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setFiltredTodo(todos.filter(todo => todo.completed));
        break;

      default:
        setFiltredTodo(todos);
        break;
    }

    setFiltredTodo((prevTodo) => {
      return prevTodo.filter(todo => todo.title.includes(appliedQuery) || 
        todo.description.includes(appliedQuery) ||
        todo.name.includes(appliedQuery)
        );
    });
  },[appliedQuery, todos])

  useEffect(() => {
    filterForTodos(targetValue);
  }, [filterForTodos, targetValue]);


  const updataSatus = (id) => {
    const updataTodos = todos.map(todo => {
      if (id === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      };
      return todo;
    });

    setTodos(updataTodos);
  };

  const deleteTodo = (id) => {
    const updataTodos = todos.filter(todo => todo.id !== id);

    setTodos(updataTodos);
  }

  const addTodo = (todo) => {
    setTodos([...todos, todo])
  }

  const updataTodos = (id, todoWithUpdata) => {
    const updataTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, ...todoWithUpdata};
      }

      return todo;
    });

    setTodos(updataTodos);
  };

  return (
    <div className="app">
      <h1 className="app__title">List of todos</h1>
      {
      todos.length ?
        <TodoFilter
          handleQuery={handleQuery}
          query={query}
          handleTarget={handleTarget}
          applyQuery={applyQuery}
        />
      :
        ''
      }
      <TodoList 
        todos={filtredTodo} 
        updataSatus={updataSatus}
        deleteTodo={deleteTodo}
        addTodo={addTodo}
        updataTodos={updataTodos}
      />
    </div>
  );
};

export default App;
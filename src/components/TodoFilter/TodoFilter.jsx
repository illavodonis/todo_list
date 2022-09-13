import React from 'react';
import './TodoFilter.scss'

export const TodoFilter = ({
  handleQuery,
  query,
  handleTarget,
  applyQuery,
}) => {
  return (
    <div className="filter">
      <div className="filter__select">
        <span className="select">
          <select
            defaultValue="all"
            onChange={(event) => {
              handleTarget(event.target.value);
            }}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
            </option>
          </select>
        </span>
      </div>

      <div className="filter__input">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(ev) => {
            handleQuery(ev.target.value);
            applyQuery(ev.target.value);
          }}
          value={query}
        />
          {query && (
            <button
              type="button"
              className='input__btn'
              onClick={() => {
                handleQuery('');
                applyQuery('');
              }}
            >
              X
            </button>
          )}
      </div>
    </div>
  );
};

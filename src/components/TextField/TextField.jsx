import classNames from 'classnames';
import React, { useState } from 'react';
import { getRandomDigits } from '../../utils/function';
import './TextField.scss'

export const TextField = ({
  name,
  value,
  label = name,
  required = false,
  onChange = () => {},

}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);
  const [touched, setToched] = useState(false);
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      <div className="control">
        <input
          id={id}
          className={classNames('field__input', {
            'field__error': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setToched(true)}
        />
      </div>

      {hasError && (
        <p className="field__help">{`*${label} is required`}</p>
      )}
    </div>
  );
};


import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const TextInputGroup = ({
    label,
    name,
    value,
    type,
    placeholer,
    onChange,
    error
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input type={type}
                name={name}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholer}
                value={value}
                onChange={onChange}
            />
            {error && <div className="invald-feedbac">{error}</div>}
        </div>
    );
};
TextInputGroup.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,

}
TextInputGroup.defaultProps = {
    type: 'text'
}
export default TextInputGroup
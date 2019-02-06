import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const InputGroup = ({
	name,
	placeholder,
	value,
	error,
	type,
	icon,
	onChange
}) => (
	<div className="input-group mb-3">
		<div className="input-group-prepend">
			<span className="input-group-text">
				<i className={icon} />
			</span>
		</div>
		<input
			type={type}
			className={classnames('form-control form-control-lg', {
				'is-invalid': error
			})}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
		/>
	</div>
);

InputGroup.defaultProps = {
	type: 'text'
};

InputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	icon: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired
};

export default InputGroup;

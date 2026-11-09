import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import s from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
};

export const Input = ({
	label,
	error,
	className,
	...restProps
}: InputProps) => {
	return (
		<label className={s['input-wrap']}>
			{label && <span className={s['input__label']}>{label}</span>}
			<input
				{...restProps}
				className={classNames(
					s['input'],
					{ [s['input_error']]: !!error },
					className
				)}
			/>
			{error && <span className={s['input__error']}>{error}</span>}
		</label>
	);
};

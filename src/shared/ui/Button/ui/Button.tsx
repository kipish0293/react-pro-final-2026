import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import s from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary';
	wide?: boolean;
};

export const Button = ({
	variant = 'primary',
	wide = false,
	className,
	children,
	...restProps
}: ButtonProps) => {
	return (
		<button
			{...restProps}
			className={classNames(
				s['button'],
				s[`button_type_${variant}`],
				{ [s['button_type_wide']]: wide },
				className
			)}>
			{children}
		</button>
	);
};

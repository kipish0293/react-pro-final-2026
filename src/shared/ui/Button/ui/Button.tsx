import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import s from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary';
	wide?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ variant = 'primary', wide = false, className, children, ...restProps },
		ref
	) => {
		return (
			<button
				{...restProps}
				ref={ref}
				className={classNames(
					s['button'],
					s[`button_type_${variant}`],
					{ [s['button_type_wide']]: wide },
					className
				)}>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

import classNames from 'classnames';
import { ReactNode, RefObject, type FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getModalContainer } from '../utils';
import s from './Modal.module.css';

interface Props {
	isOpen: boolean;
	title: string;
	body: ReactNode;
	closeHandler: () => void;
	triggerRef?: RefObject<HTMLElement>;
}

export const Modal: FC<Props> = ({ isOpen, ...restProps }) => {
	const parentModalElement = getModalContainer();
	if (!parentModalElement) return null;

	return createPortal(
		<div
			className={classNames(s['modal__overlay'], {
				[s['modal__overlay_open']]: isOpen,
			})}>
			<ModalInner {...restProps} isOpen={isOpen} />
		</div>,
		parentModalElement
	);
};

const ModalInner: FC<Props> = ({
	title,
	isOpen,
	closeHandler,
	body,
	triggerRef,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const closeIconRef = useRef<HTMLButtonElement>(null);
	const wasOpen = useRef(false);

	useEffect(() => {
		if (!isOpen) return;

		closeIconRef.current?.focus();

		const handleClickOutside = (event: MouseEvent): void => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				closeHandler();
			}
		};

		const handleKeyDown = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') closeHandler();
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [ref, isOpen, closeHandler]);

	useEffect(() => {
		if (isOpen) {
			wasOpen.current = true;
		} else if (wasOpen.current) {
			wasOpen.current = false;
			triggerRef?.current?.focus();
		}
	}, [isOpen, triggerRef]);

	return (
		<div
			ref={ref}
			role='dialog'
			aria-modal='true'
			aria-label={title}
			className={classNames(s['modal__container'], {
				[s['modal__container_open']]: isOpen,
			})}>
			<div className={classNames(s['modal__header'])}>
				<span className={classNames(s['modal__title'])}>{title}</span>
				<button
					type='button'
					aria-label='Закрыть'
					ref={closeIconRef}
					className={classNames(s['modal__close-icon'])}
					onClick={closeHandler}>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M6 6L18 18M18 6L6 18'
							stroke='#1a1a1a'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				</button>
			</div>
			<div>{body}</div>
		</div>
	);
};

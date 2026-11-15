/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import s from './CartAmount.module.css';
import classNames from 'classnames';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button } from '../../../../../shared/ui/Button';
import { Modal } from '../../../../../shared/ui/Modal';
import { useAppSelector } from '../../../../../shared/store/utils';
import { cartSelectors } from '../../../model/cart';

export const CartAmount = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);
	const [isOrderOpen, setIsOrderOpen] = useState(false);
	const orderButtonRef = useRef<HTMLButtonElement | null>(null);

	const { allPrice, allDiscount, total } = useMemo(
		() =>
			products.reduce(
				(acc, p) => {
					acc.allPrice += p.price * p.count;
					acc.allDiscount += p.discount * p.count;
					acc.total = acc.allPrice - acc.allDiscount;
					return acc;
				},
				{ allPrice: 0, allDiscount: 0, total: 0 }
			),
		[products]
	);

	const handleSubmitCart = useCallback(() => {
		const order = products.map((p) => ({ id: p.id, count: p.count }));
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
		setIsOrderOpen(false);
	}, [products]);

	const openOrderModal = useCallback(() => setIsOrderOpen(true), []);
	const closeOrderModal = useCallback(() => setIsOrderOpen(false), []);

	return (
		<div className={classNames(s['cart-amount'])}>
			<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
			<div className={classNames(s['cart-amount__table'])}>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						{`Товары (${products.length})`}
					</span>
					<span className={classNames(s['cart-amount__table-value'])}>
						{`${allPrice} ₽`}
					</span>
				</div>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						Скидка
					</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={classNames(s['cart-amount__total-cost'])}>
				<h2 className={classNames(s['cart-amount__total-cost-title'])}>
					Общая стоимость
				</h2>
				<span className={classNames(s['cart-amount__total-cost-value'])}>
					{`${total} ₽`}
				</span>
			</div>
			<Button wide ref={orderButtonRef} onClick={openOrderModal}>
				Оформить заказ
			</Button>
			<Modal
				isOpen={isOrderOpen}
				title='Оформление заказа'
				closeHandler={closeOrderModal}
				triggerRef={orderButtonRef}
				body={
					<>
						<p className={classNames(s['cart-amount__order-text'])}>
							{`Товаров в заказе: ${products.length}. К оплате: ${total} ₽`}
						</p>
						<Button wide onClick={handleSubmitCart}>
							Подтвердить заказ
						</Button>
					</>
				}
			/>
		</div>
	);
};


import s from './CartPage.module.css';
import classNames from 'classnames';
import { useAppSelector } from '../../../shared/store/utils';
import { cartSelectors } from '../../../features/cart/model/cart';
import { CartList } from '../../../features/cart/ui/CartList';
import { CartAmount } from '../../../features/cart/ui/CartAmount';

export const CartPage = () => {
	const products = useAppSelector(cartSelectors.getCartProducts);

	if (!products.length) {
		return <h1 className='header-title'>Товаров нет корзине</h1>;
	}

	return (
		<div className={classNames(s['content'], s['container'])}>
			<div className={classNames(s['content-cart'])}>
				<div className={classNames(s['cart-title'])}>
					<span>{products.length}</span> в корзине
				</div>
				<CartList />
				<CartAmount />
			</div>
		</div>
	);
};

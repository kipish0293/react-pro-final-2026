import classNames from 'classnames';
import s from './ProductCard.module.css';
import { Price } from '../../../../../shared/ui/Price';
import { Link } from 'react-router-dom';
import { LikeButton } from '../../../../favorites/ui/LikeButton';
import { useAppSelector } from '../../../../../shared/store/utils';
import { cartSelectors } from '../../../../cart/model/cart';
import { useAddToCart } from '../../../../cart/lib/useAddToCart';
import { CartCounter } from '../../../../cart/ui/CartCounter';
import { Button } from '../../../../../shared/ui/Button';

type ProductCardProps = {
	product: Product;
};
export const ProductCard = ({ product }: ProductCardProps) => {
	const { discount, price, name, tags, id, images } = product;
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const isProductInCart = cartProducts.some((p) => p.id === id);
	const { addProductToCart } = useAddToCart();

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<LikeButton product={product} />
			</div>
			<Link className={s['card__link']} to={`/products/${id}`}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<Button
					className={s['card__cart']}
					onClick={() => addProductToCart({ ...product, count: 1 })}>
					В корзину
				</Button>
			)}
		</article>
	);
};

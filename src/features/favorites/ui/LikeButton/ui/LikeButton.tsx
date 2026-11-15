import s from './LikeButton.module.css';
import { LikeIcon } from '../../../../../shared/assets/icons/LikeIcon';
import classNames from 'classnames';
import { useAppSelector } from '../../../../../shared/store/utils';
import { userSelectors } from '../../../../auth/model/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '../../../../products/api/productsApi';
import { toast } from 'react-toastify';
import { memo, startTransition, useCallback, useOptimistic } from 'react';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = memo(({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product?.likes.some((l) => l.userId === user?.id);
	
	const [like, setOptimisticLike] = useOptimistic<boolean, boolean>(
		isLike,
		(_, newLikeValue) => newLikeValue
	);

	const toggleLike = useCallback(() => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		startTransition(async () => {
			setOptimisticLike(!isLike);
			const response = isLike
				? await deleteLike({ id: `${product.id}` })
				: await setLike({ id: `${product.id}` });

			if (response.error) {
				const error = response.error as IErrorResponse;
				toast.error(error.data.message);
			}

			//чтобы не инвалидировать теги делаю глупую штуку и задерживаю транзишен
			await new Promise((res) => {
				setTimeout(() => {
					res({});
				}, 3000);
			});
		});
	}, [accessToken, isLike, deleteLike, setLike, product.id, setOptimisticLike]);

	return (
		<button
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: like,
			})}
			onClick={toggleLike}>
			<LikeIcon />
		</button>
	);
});

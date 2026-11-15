/* eslint-disable prettier/prettier */
import { cartActions } from '../model/cart';
import { useAppDispatch } from '../../../shared/store/utils';
import { useCallback } from 'react';

export const useAddToCart = () => {
	const dispatch = useAppDispatch();
	const addProductToCart = useCallback((cartProduct: CartProduct) => {
		dispatch(cartActions.addCartProduct(cartProduct));
	}, [dispatch]);

	return { addProductToCart };
};

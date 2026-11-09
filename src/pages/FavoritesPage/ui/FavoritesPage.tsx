import { WithProtection } from '../../../features/auth/lib/WithProtection';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { ProductList } from '../../../features/products/ui/ProductList';

export const FavoritesPage = WithProtection(() => {
	return (
		<>
			<br />
			<ButtonBack />
			<ProductList title='Избранные' />
		</>
	);
});

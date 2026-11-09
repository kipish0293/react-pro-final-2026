import { WithProtection } from '../../../features/auth/lib/WithProtection';
import { LoadMore } from '../../../features/products/ui/LoadMore';
import { ProductList } from '../../../features/products/ui/ProductList';

export const HomePage = WithProtection(() => {
	return (
		<>
			<ProductList title='Лакомства' />
			<LoadMore />
		</>
	);
});

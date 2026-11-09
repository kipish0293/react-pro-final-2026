import { WithQuery } from '../../../../../shared/lib/WithQuery';
import { CardList } from '../../../../../widgets/CardList';
import { useProducts } from '../../../model/useProducts';

const CardListWithQuery = WithQuery(CardList);

type ProductListProps = {
	title: string;
};

export const ProductList = ({ title }: ProductListProps) => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<CardListWithQuery
			title={title}
			isLoading={isLoading}
			isError={isError}
			products={products}
			error={error}
		/>
	);
};

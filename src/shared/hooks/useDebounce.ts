import { useEffect, useRef, useState } from 'react';

export const useDebounce = <V>(outerValue: V, ms: number) => {
	const [optimizedValue, setOptimizedValue] = useState<V>(outerValue);
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined
	);

	useEffect(() => {
		clearTimeout(timeoutIdRef.current);

		timeoutIdRef.current = setTimeout(() => {
			setOptimizedValue(outerValue);
		}, ms);

		return () => clearTimeout(timeoutIdRef.current)
	}, [ms, outerValue]);

	return optimizedValue;
};

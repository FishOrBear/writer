import { lwPolylineOptions_t } from '../Sections/EntitiesSection/Entities/LWPolyline';

export function bulge(fillet: number): number {
	const length = Math.sqrt(Math.pow(fillet, 2) + Math.pow(fillet, 2));
	const b = length / 2;
	const d = Math.sqrt(Math.pow(fillet, 2) - Math.pow(b, 2));
	const height = fillet - d;
	const bulge = -height / b;
	return bulge;
}

export type chamfer_t = {
	first: number;
	second?: number;
};

export type rectangleOptions_t = lwPolylineOptions_t & {
	chamfer?: chamfer_t;
	fillet?: number;
};

export type rgb_t = {
	r: number;
	g: number;
	b: number;
};

export function min(numbers: number[]) {
	let _min = Infinity;
	for (let i = 0; i < numbers.length; i++) {
		const n = numbers[i];
		if (n < _min) _min = n;
	}
	return _min;
}

export function max(numbers: number[]) {
	let _max = -Infinity;
	for (let i = 0; i < numbers.length; i++) {
		const n = numbers[i];
		if (n > _max) _max = n;
	}
	return _max;
}

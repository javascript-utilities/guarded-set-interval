import {
	Guarded_Set_Interval,
	Error_Missing_Callback,
	Error_Already_Started,
	Error_Not_Started,
} from '../src/index';

import type { Callback } from '../src/index';

/**
 * Mock interface of internal class returned by `setInterval` and `setTimeout`
 *
 * @see {@file node_modules/@types/node/timers.d.ts}
 */
class Timeout {
	ref() {
		return this;
	}

	unref() {
		return this;
	}

	hasRef() {
		return false;
	}

	refresh() {
		return this;
	}

	[Symbol.toPrimitive]() {
		return NaN;
	}

	[Symbol.dispose]() {
		return undefined;
	}
}

describe('Guarded_Set_Interval -- Error paths', () => {
	test('Guarded_Set_Interval().constructor() -- Throws when missing callback', () => {
		expect(() => {
			new Guarded_Set_Interval();
		}).toThrowError(Error_Missing_Callback);
	});

	test('Guarded_Set_Interval().callback() -- Throws error from inner callback', () => {
		const interval = new Guarded_Set_Interval({
			callback: {
				next: () => {
					throw new Error('Woot');
				},
			},
		});

		/* @ts-ignore */
		interval._id = NaN;

		expect(() => {
			/* @ts-ignore */
			interval.callback();
		}).toThrowError('Woot');
	});

	test('Guarded_Set_Interval().start() -- Throws error when already started', () => {
		const interval = new Guarded_Set_Interval({
			callback: {
				next: () => {
					throw new Error('Nope');
				},
			},
		});

		/* @ts-ignore */
		interval._id = NaN;

		expect(() => {
			interval.start();
		}).toThrowError(Error_Already_Started);
	});

	test('Guarded_Set_Interval().stop() -- Throws error when not started', () => {
		const interval = new Guarded_Set_Interval({
			callback: {
				next: () => {
					throw new Error('Nope');
				},
			},
		});

		expect(() => {
			interval.stop();
		}).toThrowError(Error_Not_Started);
	});
});

describe('', () => {
	/**
	 * @see {@link https://jestjs.io/docs/jest-object#jestspyonobject-methodname}
	 */
	afterAll(() => {
		jest.restoreAllMocks();
	});

	beforeAll(() => {
		jest
			.spyOn(global, 'setInterval')
			.mockImplementation((callback: (args: void) => void, milliseconds?: number) => {
				return new Timeout();
			});
	});

	test('Guarded_Set_Interval().start() -- Does expected things', () => {
		const interval = new Guarded_Set_Interval({
			callback: {
				next: () => {
					return {
						done: true,
						value: 'Woot',
					};
				},
			},
		});

		interval.start();
		/* @ts-ignore */
		interval.callback();

		expect(interval.done).toBeTruthy();
		expect(interval.value).toEqual('Woot');
	});

	test('Guarded_Set_Interval().stop() -- Does expected things', () => {
		const interval = new Guarded_Set_Interval({
			callback: {
				next: () => {
					return {
						done: false,
						value: 'WAT',
					};
				},
			},
		});

		interval.start();
		/* @ts-ignore */
		interval.callback();

		expect(interval.done).toBeFalsy();
		expect(interval.value).toEqual('WAT');

		interval.stop();
		expect(interval.done).toBeTruthy();
		expect(interval.value).toEqual('WAT');
	});
});

/**
 * @author S0AndS0
 * @license AGPL-3.0
 */

/**
 * Thrown when callback was expected but none is defined
 */
export class Error_Missing_Callback extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Error_Missing_Callback';
	}
}

/**
 * Thrown when attempting to start an already active/started instance of `Guarded_Set_Interval`
 */
export class Error_Already_Started extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Error_Already_Started';
	}
}

/**
 * Thrown when attempting to stop an instance of `Guarded_Set_Interval` that has yet to be started
 */
export class Error_Not_Started extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'Error_Not_Started';
	}
}

/**
 * Minimal interface for `callback` that implements `Generator.next()` like behavior
 */
export interface Callback<T = unknown, TReturn = any, TNext = unknown> {
	next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
}

/**
 * Wrapper for `setInterval` that implements drop-frame features to ensure only
 * one execution of `callback` happens within defined number of `milliseconds`
 *
 * @example
 *
 * ```typescript
 * const shared_state = { callback_count: 0 };
 *
 * const interval = new Guarded_Set_Interval({
 *   callback: {
 *     next: (...args) => {
 *       console.log('callback args:', args);
 *       shared_state.count++;
 *       if (shared_state.count > 3) {
 *         return { done: true, value: shared_state.count };
 *       }
 *       return { done: false, value: shared_state.count };
 *     }
 *   },
 *   args: ['foo', 'bar'],
 *   milliseconds: 1000,
 *   verbose: true,
 * });
 *
 * interval.start();
 *
 * // ... Do other stuff...
 *
 * interval.stop();
 * ```
 */
export class Guarded_Set_Interval<T = unknown, TReturn = any, TNext = unknown> {
	verbose: boolean;
	private _milliseconds: number;
	private _locked: boolean;
	private _id?: NodeJS.Timeout;
	private _callback: Callback<T, TReturn, TNext>;
	private _args: [] | [TNext];
	private _done?: any;
	private _value?: IteratorResult<T, TReturn>['value'];

	/**
	 * @throws
	 * - `Error_Missing_Callback` if no callback was provided
	 */
	constructor({
		callback,
		args = [],
		milliseconds = 1000,
		verbose = false,
	}: {
		/**
		 * Function to call _about_ every N `milliseconds`
		 */
		callback?: Guarded_Set_Interval<T, TReturn, TNext>['_callback'];
		/**
		 * List of arguments to pass to `callback`
		 */
		args?: Guarded_Set_Interval<T, TReturn, TNext>['_args'];
		/**
		 * Target number of milliseconds between execution of `callback`
		 */
		milliseconds?: Guarded_Set_Interval<T, TReturn, TNext>['_milliseconds'];
		/**
		 * Set to `true` to enable debugging output via `console` methods
		 */
		verbose?: boolean;
	} = {}) {
		if (!callback) {
			throw new Error_Missing_Callback('Missing callback');
		}

		this.verbose = verbose;

		this._callback = callback;
		this._args = args;
		this._milliseconds = milliseconds;
		this._locked = false;
		this._done = false;
		this._value = undefined;
	}

	/**
	 * Wrapper for callback passed to `constructor` to ensure `Guarded_Set_Interval` executes no
	 * more than once within `milliseconds` defined.
	 */
	private callback() {
		if (this._locked) {
			if (this.verbose) {
				console.warn(
					`Guarded_Set_Interval ID ${this._id} skipping because lock is ${this._locked}`
				);
			}
			return undefined;
		}

		this._locked = true;
		const time_start = new Date().getTime();
		try {
			const result = this._callback.next(...this._args);
			this._value = result?.value;
			if (result?.done) {
				if (this.verbose) {
					console.warn('Guarded_Set_Interval callback done');
				}
				this.stop();
			}
		} catch (error) {
			if (this.verbose) {
				console.error('Guarded_Set_Interval callback error:', error);
			}
			this.stop();
			throw error;
		} finally {
			this._locked = false;
		}
	}

	/**
	 * Call `setInterval` and set internal state to allow stopping
	 *
	 * @throws
	 * - `Error_Already_Started` when instance of `Guarded_Set_Interval` is already started
	 */
	start() {
		if (this._id !== undefined) {
			throw new Error_Already_Started(`Guarded_Set_Interval already started with ID: ${this._id}`);
		}

		this._id = setInterval(this.callback.bind(this), this._milliseconds);
		return this;
	}

	/**
	 * Stop `setInterval` for this instance of `Guarded_Set_Interval` and run clean-um of internal state
	 *
	 * @throws
	 * - `Error_Not_Started` when instance of `Guarded_Set_Interval` has not yet been started
	 */
	stop() {
		if (this._id === undefined) {
			throw new Error_Not_Started('Guarded_Set_Interval not yet started');
		}
		clearInterval(this._id);
		this._id = undefined;
		this._done = true;
		return this;
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Most recent done (boolean translated) state returned by callback
	 */
	get done() {
		return this._done;
	}

	/**
	 * Most recent value returned by callback
	 */
	get value() {
		return this._value;
	}

	/**
	 * ID of `setInterval` for this instance of `Guarded_Set_Interval`
	 */
	get id() {
		return this._id;
	}

	/**
	 * `true` if currently executing `this.callback` and `false` if not
	 */
	get locked() {
		return this._locked;
	}

	/**
	 * Target number of milliseconds between `this.callback` execution
	 */
	get milliseconds() {
		return this._milliseconds;
	}
}

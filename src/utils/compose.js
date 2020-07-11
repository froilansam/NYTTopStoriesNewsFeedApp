/**
 * Composition helper for multiple HOC
 * Source: https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj
 *
 * @author mico
 */
export default (...fns) => (args) =>
	fns.reduceRight((arg, fn) => fn(arg), args);

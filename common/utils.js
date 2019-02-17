/**
 * Export for utils commonly used in other modules
 */


/**
 * Convert mg/dL to mmoL
 * @param {*} int Blood Glucose Number
 * @return int Converted Blood Glucose Number
 */
export function mmol(bg) {
	return (Math.round((bg / 18) * 10) / 10).toFixed(1);
}

/**
 * Convert mmoL to mg / dL
 * @param {*} int Blood Glucose Number
 * @return int Converted Blood Glucose Number
 */
export function mgdl(bg) {
	return (Math.round(bg * 18.018).toFixed(0));
}
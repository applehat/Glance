/*
 * Copyright (C) 2018 Ryan Mason - All Rights Reserved
 *
 * Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.
 *
 * https://github.com/Rytiggy/Glance/blob/master/LICENSE
 * ------------------------------------------------
 *
 * You are free to modify the code but please leave the copyright in the header.
 *
 * ------------------------------------------------
 */

import { memory } from "system";

console.info('--WATCHDOG INITIATED--');

export function reportMemory() {
	let percent = Math.floor((memory.js.used / memory.js.total) * 100);
	console.info(`--WATCHDOG-- JS Memory Usage: ${percent}% (${memory.js.used}/${memory.js.total})`);
}

memory.monitor.addEventListener('onmemorypressurechange',() => {
	let msg = `--WATCHDOG-- Memory Pressure Changed: ${memory.monitor.pressure}`;
	switch (memory.monitor.pressure) {
		case "normal":
			console.log(msg);
			break;
		case "high":
			console.warn(msg);
			break;
		case "critical":
			console.error(msg);
			break;
	}
	reportMemory();
})
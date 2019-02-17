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

import asap from "fitbit-asap/app"
import { inbox } from "file-transfer";
import fs from "fs";

let payloadFunction = (payload) => {
	console.log('Payload recieved, but no payload function created');
}

/**
 * Send command to the collector.
 * @param {*} data
 */
export function sendCommand(command, data) {
	//console.log('app - transfer - send')
	// Send a command to the companion
	asap.send({
		command: command,
		data: data,
	});
}

export function doCompanionTransport(data) {
	sendCommand('doCompanionTransport',data);
}

asap.onmessage = function (evt) {
	if (evt.command === 'file') {
		console.log('Receiver payload from ASAP interface');
		payloadFunction(evt.data);
	}
};

inbox.onnewfile = () => {
	console.log("Receiver recieved new payload from File.");
	let fileName;
	do {
		// If there is a file, move it from staging into the application folder
		fileName = inbox.nextFile();
		if (fileName) {
			let newData = fs.readFileSync(fileName, "cbor");
			payloadFunction(newData);
		}
	} while (fileName);
};

export function onPayload(func){
	payloadFunction = func;
}

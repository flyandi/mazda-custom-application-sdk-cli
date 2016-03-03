#!/usr/bin/env node
/**
 * Custom Applications SDK for Mazda Connect Infotainment System
 *
 * A mini framework that allows to write custom applications for the Mazda Connect Infotainment System
 * that includes an easy to use abstraction layer to the JCI system.
 *
 * Written by Andreas Schwarz (http://github.com/flyandi/mazda-custom-applications-sdk)
 * Copyright (c) 2016. All rights reserved.
 *
 * WARNING: The installation of this application requires modifications to your Mazda Connect system.
 * If you don't feel comfortable performing these changes, please do not attempt to install this. You might
 * be ending up with an unusuable system that requires reset by your Dealer. You were warned!
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 * License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program.
 * If not, see http://www.gnu.org/licenses/
 *
 */

/**
 * (casdk) Command line tool helper
 */

var fs = require("fs"),
	colors = require('colors');


/***
 * (customApplicationSkeleton)
 */

var customApplicationSkeleton = {"app.js":"LyoqCiAqIFt7QVBQX05BTUV9XQogKgogKiBAdmVyc2lvbjogMC4wLjEKICogQGF1dGhvcjogW2F1dGhvcl0KICogQGRlc2NyaXB0aW9uIFtkZXNjcmlwdGlvbl0KICoKICogW2xpY2Vuc2VdCiAqLwoKCi8qKgogKiBDdXN0b20gQXBwbGljYXRpb24KICovCgpDdXN0b21BcHBsaWNhdGlvbnNIYW5kbGVyLnJlZ2lzdGVyKCJ7QVBQX0lEfSIsIG5ldyBDdXN0b21BcHBsaWNhdGlvbih7CgoJLyoqCgkgKiAocmVxdWlyZSkKCSAqCgkgKiBBbiBvYmplY3QgYXJyYXkgdGhhdCBkZWZpbmVzIHJlc291cmNlcyB0byBiZSBsb2FkZWQgc3VjaCBhcyBqYXZhc2NyaXB0J3MsIGNzcydzLCBpbWFnZXMsIGV0YwoJICoKCSAqIEFsbCByZXNvdXJjZXMgYXJlIHJlbGF0aXZlIHRvIHRoZSBhcHBsaWNhdGlvbnMgcm9vdCBwYXRoCgkgKi8KCglyZXF1aXJlOiB7CgoJCS8qKgoJCSAqIChqcykgZGVmaW5lcyBqYXZhc2NyaXB0IGluY2x1ZGVzCgkJICovCgoJCWpzOiBbXSwKCgkJLyoqCgkJICogKGNzcykgZGVmaW5lcyBjc3MgaW5jbHVkZXMKCQkgKi8KCgkJY3NzOiBbJ2FwcC5jc3MnXSwKCgkJLyoqCgkJICogKGltYWdlcykgZGVmaW5lcyBpbWFnZXMgdGhhdCBhcmUgYmVpbmcgcHJlbG9hZGVkCgkJICoKCQkgKiBJbWFnZXMgYXJlIGFzc2lnbmVkIHRvIGFuIGlkLCBlLmcuIHtjb29sQmFja2dyb3VuZDogJ2ltYWdlcy9jb29sLWJhY2tncm91bmQucG5nJ30KCQkgKi8KCgkJaW1hZ2VzOiB7CgoJCX0sCgl9LAoKCS8qKgoJICogKHNldHRpbmdzKQoJICoKCSAqIEFuIG9iamVjdCB0aGF0IGRlZmluZXMgYXBwbGljYXRpb24gc2V0dGluZ3MKCSAqLwoKCXNldHRpbmdzOiB7CgoJCS8qKgoJCSAqICh0aXRsZSkgVGhlIHRpdGxlIG9mIHRoZSBhcHBsaWNhdGlvbiBpbiB0aGUgQXBwbGljYXRpb24gbWVudQoJCSAqLwoKCQl0aXRsZTogJ3tBUFBfTkFNRX0nLAoKCQkvKioKCQkgKiAoc3RhdHVzYmFyKSBEZWZpbmVzIGlmIHRoZSBzdGF0dXNiYXIgc2hvdWxkIGJlIHNob3duCgkJICovCgoJCXN0YXR1c2JhcjogdHJ1ZSwKCgkJLyoqCgkJICogKHN0YXR1c2Jhckljb24pIGRlZmluZXMgdGhlIHN0YXR1cyBiYXIgaWNvbgoJCSAqCgkJICogU2V0IHRvIHRydWUgdG8gZGlzcGxheSB0aGUgZGVmYXVsdCBpY29uIGFwcC5wbmcgb3Igc2V0IGEgc3RyaW5nIHRvIGRpc3BsYXkKCQkgKiBhIGZ1bGx5IGN1c3RvbSBpY29uLgoJCSAqCgkJICogSWNvbnMgbmVlZCB0byBiZSAzN3gzNwoJCSAqLwoKCQlzdGF0dXNiYXJJY29uOiB0cnVlLAoKCQkvKioKCQkgKiAoc3RhdHVzYmFyVGl0bGUpIG92ZXJyaWRlcyB0aGUgc3RhdHVzYmFyIHRpdGxlLCBvdGhlcndpc2UgdGl0bGUgaXMgdXNlZAoJCSAqLwoKCQlzdGF0dXNiYXJUaXRsZTogZmFsc2UsCgoJCS8qKgoJCSAqIChzdGF0dXNiYXJIaWRlSG9tZUJ1dHRvbikgaGlkZXMgdGhlIGhvbWUgYnV0dG9uIGluIHRoZSBzdGF0dXNiYXIKCQkgKi8KCgkJLy8gc3RhdHVzYmFySGlkZUhvbWVCdXR0b246IGZhbHNlLAoKCQkvKioKCQkgKiAoaGFzTGVmdEJ1dHRvbikgaW5kaWNhdGVzIGlmIHRoZSBVSSBsZWZ0IGJ1dHRvbiAvIHJldHVybiBidXR0b24gc2hvdWxkIGJlIHNob3duCgkJICovCgoJCWhhc0xlZnRCdXR0b246IGZhbHNlLAoKCQkvKioKCQkgKiAoaGFzTWVudUNhcmV0KSBpbmRpY2F0ZXMgaWYgdGhlIG1lbnUgaXRlbSBzaG91bGQgYmUgZGlzcGxheWVkIHdpdGggYW4gY2FyZXQKCQkgKi8KCgkJaGFzTWVudUNhcmV0OiBmYWxzZSwKCgkJLyoqCgkJICogKGhhc1JpZ2h0QXJjKSBpbmRpY2F0ZXMgaWYgdGhlIHN0YW5kYXJkIHJpZ2h0IGFyYyBzaG91bGQgYmUgZGlzcGxheWVkCgkJICovCgoJCWhhc1JpZ2h0QXJjOiBmYWxzZSwKCgl9LAoKCgkvKioqCgkgKioqIEFwcGxpY2F0aW9uIExpZmUgQ3ljbGVzCgkgKioqLwoKCS8qKgoJICogKGNyZWF0ZWQpCgkgKgoJICogRXhlY3V0ZWQgd2hlbiB0aGUgYXBwbGljYXRpb24gaXMgaW5pdGlhbGl6ZWQgZm9yIHRoZSBmaXJzdCB0aW1lLiBPbmNlIGFuIGFwcGxpY2F0aW9uIGlzCgkgKiBpbml0aWFsaXplZCBpdCBhbHdheXMga2VlcHMgaXQncyBjdXJyZW50IHN0YXRlIGV2ZW4gdGhlIGFwcGxpY2F0aW9uIGlzIG5vdCBkaXNwbGF5ZWQuCgkgKgoJICogVXN1YWxseSB5b3Ugd2FudCB0byBpbml0aWFsaXplIHlvdXIgdXNlciBpbnRlcmZhY2UgaGVyZSBhbmQgZ2VuZXJhdGUgYWxsIHJlcXVpcmVkIERPTSBFbGVtZW50cy4KCSAqCgkgKgoJICogQGV2ZW50CgkgKiBAcmV0dXJuIHt2b2lkfQoJICovCgoJY3JlYXRlZDogZnVuY3Rpb24oKSB7CgoJfSwKCgkvKioKCSAqIChmb2N1c2VkKQoJICoKCSAqIEV4ZWN1dGVzIHdoZW4gdGhlIGFwcGxpY2F0aW9uIGdldHMgZGlzcGxheWVkIG9uIHRoZSBJbmZvdGFpbm1lbnQgZGlzcGxheS4KCSAqCgkgKiBZb3Ugbm9ybWFsbHkgd2FudCB0byBzdGFydCB5b3VyIGFwcGxpY2F0aW9uIHdvcmtmbG93IGZyb20gaGVyZSBhbmQgYWxzbyByZWNvdmVyIHRoZSBhcHAgZnJvbSBhbnkKCSAqIHByZXZpb3VzIHN0YXRlLgoJICoKCSAqIEBldmVudAoJICogQHJldHVybiB7dm9pZH0KCSAqLwoKCWZvY3VzZWQ6IGZ1bmN0aW9uKCkgewoKCX0sCgoKCS8qKgoJICogKGxvc3QpCgkgKgoJICogTG9zdCBpcyBleGVjdXRlZCB3aGVuIHRoZSBhcHBsaWNhdGlvbiBpcyBiZWluZyBoaWRkZW4uCgkgKgoJICogVXN1YWxseSB5b3Ugd2FudCB0byBhZGQgbG9naWMgaGVyZSB0aGF0IHN0b3BzIHlvdXIgYXBwbGljYXRpb24gd29ya2Zsb3cgYW5kIHNhdmUgYW55IHZhbHVlcyB0aGF0CgkgKiB5b3VyIGFwcGxpY2F0aW9uIG1heSByZXF1aXJlIG9uY2UgdGhlIGZvY3VzIGlzIHJlZ2FpbmVkLgoJICoKCSAqIEBldmVudAoJICogQHJldHVybiB7dm9pZH0KCSAqLwoKCWxvc3Q6IGZ1bmN0aW9uKCkgewoKCX0sCgoKCS8qKgoJICogKHRlcm1pbmF0ZWQpCgkgKgoJICogVXN1YWxseSB5b3UgbmV2ZXIgaW1wbGVtZW50IHRoaXMgbGlmZWN5Y2xlIGV2ZW50LiBZb3VyIGN1c3RvbSBhcHBsaWNhdGlvbiBzdGF5cyBhbGl2ZSBhbmQga2VlcHMgaXQncwoJICogc3RhdGUgZHVyaW5nIHRoZSBlbnRpcmUgcnVudGltZSBvZiB3aGVuIHlvdSB0dXJuIG9uIHlvdXIgSW5mb3RhaW5tZW50IHVudGlsIHlvdSB0dXJuIGl0IG9mZi4KCSAqCgkgKiBUaGlzIGhhcyB0d28gYWR2YW50YWdlczogRmlyc3QgYWxsIG9mIHlvdXIgcmVzb3VyY2VzIChpbWFnZXMsIGNzcywgdmlkZW9zLCBldGMpIGFsbCBuZWVkIHRvIGJlIGxvYWRlZCBvbmx5CgkgKiBvbmNlIGFuZCBzZWNvbmQgd2hpbGUgeW91IHdhbmRlciB0aHJvdWdoIGRpZmZlcmVudCBhcHBsaWNhdGlvbnMgbGlrZSB0aGUgYXVkaW8gcGxheWVyLCB5b3VyIGFwcGxpY2F0aW9uCgkgKiBuZXZlciBuZWVkcyB0byBiZSByZWluaXRpYWxpemVkIGFuZCBpcyBqdXN0IGVmZmVjdGl2aWx5IHBhdXNlZCB3aGVuIGl0IGRvZXNuJ3QgaGF2ZSB0aGUgZm9jdXMuCgkgKgoJICogSG93ZXZlciB0aGVyZSBhcmUgcmVhc29ucywgd2hpY2ggSSBjYW4ndCB0aGluayBhbnkgb2ZmLCB0aGF0IHlvdXIgYXBwbGljYXRpb24gbWlnaHQgbmVlZCB0byBiZQoJICogdGVybWluYXRlZCBhZnRlciBlYWNoIGxvc3QgbGlmZWN5bGUuIFlvdSBuZWVkIHRvIGFkZCB7dGVybWluYXRlT25Mb3N0OiB0cnVlfSB0byB5b3VyIGFwcGxpY2F0aW9uIHNldHRpbmdzCgkgKiB0byBlbmFibGUgdGhpcyBmZWF0dXJlLgoJICoKCSAqIEBldmVudAoJICogQHJldHVybiB7dm9pZH0KCSAqLwoKCXRlcm1pbmF0ZWQ6IGZ1bmN0aW9uKCkgewoKCX0sCgoKCS8qKioKCSAqKiogQXBwbGljYXRpb24gRXZlbnRzCgkgKioqLwoKCiAgICAvKioKICAgICAqIChldmVudCkgb25Db250ZXh0RXZlbnQKICAgICAqCiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgY29udGV4dCBvZiBhbiBlbGVtZW50IHdhcyBjaGFuZ2VkCiAgICAgKgogICAgICogVGhlIGV2ZW50SWQgbWlnaHQgYmUgZWl0aGVyIEZPQ1VTRUQgb3IgTE9TVC4gSWYgRk9DVVNFRCwgdGhlIGVsZW1lbnQgaGFzIHJlY2VpdmVkIHRoZQogICAgICogY3VycmVudCBjb250ZXh0IGFuZCBpZiBMT1NULCB0aGUgZWxlbWVudCdzIGNvbnRleHQgd2FzIHJlbW92ZWQuCiAgICAgKgogICAgICogQGV2ZW50CiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRJZCAtIFRoZSBldmVudElkIG9mIHRoaXMgZXZlbnQKICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjb250ZXh0IC0gVGhlIGNvbnRleHQgb2YgdGhpcyBlbGVtZW50IHdoaWNoIGRlZmluZXMgdGhlIGJlaGF2aW9yIGFuZCBib3VuZGluZyBib3gKICAgICAqIEBwYXJhbSB7SlF1ZXJ5RWxlbWVudH0gZWxlbWVudCAtIFRoZSBKUXVlcnkgRE9NIG5vZGUgdGhhdCB3YXMgYXNzaWduZWQgdG8gdGhpcyBjb250ZXh0CiAgICAgKiBAcmV0dXJuIHt2b2lkfQogICAgICovCgogICAgb25Db250ZXh0RXZlbnQ6IGZ1bmN0aW9uKGV2ZW50SWQsIGNvbnRleHQsIGVsZW1lbnQpIHsKCiAgICAgICAgc3dpdGNoKGV2ZW50SWQpIHsKCiAgICAgICAgCS8qKgogICAgICAgIAkgKiBUaGUgZWxlbWVudCByZWNlaXZlZCB0aGUgZm9jdXMgb2YgdGhlIGN1cnJlbnQgY29udGV4dAogICAgICAgIAkgKi8KCiAgICAgICAgCWNhc2UgdGhpcy5GT0NVU0VEOgoKICAgICAgICAJCWJyZWFrOwoKICAgICAgICAJLyoqCiAgICAgICAgCSAqIFRoZSBlbGVtZW50IGxvc3QgdGhlIGZvY3VzCiAgICAgICAgCSAqLwoKICAgICAgICAJY2FzZSB0aGlzLkxPU1Q6CgogICAgICAgIAkJYnJlYWs7CiAgICAgICAgfQoKICAgIH0sCgoJLyoqCgkgKiAoZXZlbnQpIG9uQ29udHJvbGxlckV2ZW50CgkgKgoJICogQ2FsbGVkIHdoZW4gYSBuZXcgKG11bHRpKWNvbnRyb2xsZXIgZXZlbnQgaXMgYXZhaWxhYmxlCgkgKgoJICogQGV2ZW50CgkgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRJZCAtIFRoZSBNdWx0aWNvbnRyb2xsZXIgZXZlbnQgaWQKCSAqIEByZXR1cm4ge3ZvaWR9CgkgKi8KCglvbkNvbnRyb2xsZXJFdmVudDogZnVuY3Rpb24oZXZlbnRJZCkgewoKCQlzd2l0Y2goZXZlbnRJZCkgewoKCQkJLyoKCQkJICogTXVsdGlDb250cm9sbGVyIHdhcyBtb3ZlZCB0byB0aGUgbGVmdAoJCQkgKi8KCQkJY2FzZSB0aGlzLkxFRlQ6CgoJCQkJYnJlYWs7CgoJCQkvKgoJCQkgKiBNdWx0aUNvbnRyb2xsZXIgd2FzIG1vdmVkIHRvIHRoZSByaWdodAoJCQkgKi8KCQkJY2FzZSB0aGlzLlJJR0hUOgoKCQkJCWJyZWFrOwoKCQkJLyoKCQkJICogTXVsdGlDb250cm9sbGVyIHdhcyBtb3ZlZCB1cAoJCQkgKi8KCQkJY2FzZSB0aGlzLlVQOgoKCQkJCWJyZWFrOwoKCQkJLyoKCQkJICogTXVsdGlDb250cm9sbGVyIHdhcyBtb3ZlZCBkb3duCgkJCSAqLwoJCQljYXNlIHRoaXMuRE9XTjoKCgkJCQlicmVhazsKCgkJCS8qCgkJCSAqIE11bHRpQ29udHJvbGxlciBXaGVlbCB3YXMgdHVybmVkIGNsb2Nrd2lzZQoJCQkgKi8KCQkJY2FzZSB0aGlzLkNXOgoKCQkJCWJyZWFrOwoKCQkJLyoKCQkJICogTXVsdGlDb250cm9sbGVyIFdoZWVsIHdhcyB0dXJuZWQgY291bnRlci1jbG9ja3dpc2UKCQkJICovCgkJCWNhc2UgdGhpcy5DQ1c6CgoJCQkJYnJlYWs7CgoJCQkvKgoJCQkgKiBNdWx0aUNvbnRyb2xsZXIncyBjZW50ZXIgd2FzIHB1c2hlZCBkb3duCgkJCSAqLwoJCQljYXNlIHRoaXMuU0VMRUNUOgoKCQkJCWJyZWFrOwoKCQkJLyoKCQkJICogTXVsdGlDb250cm9sbGVyIGhvdCBrZXkgImJhY2siIHdhcyBwdXNoZWQKCQkJICovCgkJCWNhc2UgdGhpcy5CQUNLOgoKCQkJCWJyZWFrOwoJCX0KCgl9LAoKCn0pKTsgLyoqIEVPRiAqKi8K","app.css":"LyoqCiAqIFt7QVBQX05BTUV9XQogKgogKiBAdmVyc2lvbjogMC4wLjEKICogQGF1dGhvcjogW2F1dGhvcl0KICogQGRlc2NyaXB0aW9uIFtkZXNjcmlwdGlvbl0KICoKICogW2xpY2Vuc2VdCiAqLwoKLyoqCiAqIE5PVElDRTogSXQncyBpbXBvcnRhbnQgdGhhdCB5b3UgdGFyZ2V0IHlvdXIgYXBwbGljYXRpb24gd2l0aCB0aGUgW2FwcF0gYXR0cmlidXRlCiAqLwoKW2FwcD0ie0FQUF9JRH0iXSB7CgliYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwOwp9","app.png":"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"};

/***
 * (createCustomApplication)
 */

var createCustomApplication = function(name, options) {

	var outputDir = (options.ouput || __dirname).replace(/\/$/, ''),
		outputName = 'app.' + name.replace(/\s|-/g, '_'),
		outputLocation = outputDir + '/' + outputName;

	try {
		if(fs.statSync(outputLocation).isDirectory()) {
			console.log(('The application ' + outputName + ' already exists').red);
			console.log(outputLocation.gray);
			return false;
		}
	} catch(e) {
		// continue
	}

	console.log(('Creating application ' + outputName).green);
	console.log(outputLocation.gray);

	// create output directory
	fs.mkdirSync(outputLocation);

	// create app values
	var appValues = {
		APP_ID: outputName,
		APP_NAME: name,
	}, preventParsing = ['app.png'];

	Object.keys(customApplicationSkeleton).forEach(function(key) {

		var appFn = key,
			appContent = new Buffer(customApplicationSkeleton[key], 'base64');

		if(preventParsing.indexOf(key) == -1) {

			appContent = appContent.toString();

			Object.keys(appValues).forEach(function(appKey) {

				appContent = appContent.replace('/{' + appKey + '}/g', appValues[appKey]);

			});

		}

		fs.writeFile(outputLocation + '/' + key, appContent);

	});
};




/**
 * (command processor)
 */

var program = require('commander');

program
  .version('0.0.1')
  .description('A command line tool for building custom applications for the Mazda Infotainment System')

program
  .command('create <name>')
  .description('Creates a new application')
  .option("-o, --output [output]", "The directory where to write the application. Default is the current working directory")
  .action(function(name, options){
  	createCustomApplication(name, options);
  });


program.parse(process.argv);

if (!program.args.length) program.help();
















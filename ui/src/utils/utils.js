
var keyStr = 	"ABCDEFGHIJKLMNOP" +
				"QRSTUVWXYZabcdef" +
				"ghijklmnopqrstuv" +
				"wxyz0123456789+/" +
				"=";


var utils = {

	extend(obj) {
		if (arguments.length == 1) return obj;
		for (var i=1; i<arguments.length; i++) {
			var src = arguments[i];
			for (var p in src) {
				obj[p] = src[p];
			}
		}
		return obj;
	},

	has(obj, key) {
		return obj != null && hasOwnProperty.call(obj, key);
	},

	getAjaxError(response,caption) {
		if (response.status != 404 && response.responseJSON && response.responseJSON.message) {
			return caption + '\n' + response.responseJSON.message;
		} 
		return caption + '\n Status: ' + response.status + ' - ' + response.statusText;
	},

	encode64(input) {
     input = escape(input);
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;
     do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
           enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
           enc4 = 64;
        }

        output = output +
           keyStr.charAt(enc1) +
           keyStr.charAt(enc2) +
           keyStr.charAt(enc3) +
           keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
     } while (i < input.length);
 
     return output;
  },

  decode64(input) {
     var output = "";
     var chr1, chr2, chr3 = "";
     var enc1, enc2, enc3, enc4 = "";
     var i = 0;
 
     // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
     var base64test = /[^A-Za-z0-9\+\/\=]/g;
     if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding.");
     }
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
     do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
 
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
 
        output = output + String.fromCharCode(chr1);
 
        if (enc3 != 64) {
           output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
           output = output + String.fromCharCode(chr3);
        }
 
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
 
     } while (i < input.length);
 
     return unescape(output);
  },

  decodeJwt(token){
  	var parts = token.split(".");
  	console.log(parts);
  	var info = this.decode64(parts[1]);
  	console.log(info);
  	info = JSON.parse(info);
  	if (typeof info.roles == 'string') info.roles = JSON.parse(info.roles);
  	return info;
  }

}

module.exports = utils;
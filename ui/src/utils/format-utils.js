module.exports = {

	dateToStr(value){
		var date = new Date(value);
		var y = date.getFullYear() + '';
		var m = (date.getMonth()+1) + '';
		var d = date.getDate() + '';
		if (m.length == 1) m = '0'+m;
		if (d.length == 1) d = '0'+d;
		return (d + '/' + m + '/' + y);
	},

	strToDate(value) {
		var av = value.split('/');
		var d = parseInt(av[0]);
		var m = parseInt(av[1])-1;
		var y = parseInt(av[2]);
		if (!isNaN(d) && !isNaN(m) && !isNaN(y) && y > 1900) {
			if (m >= 0 && m < 12 && d >= 1 && d <= 31) {
				return new Date(y,m,d);	
			}
		}		
	},

	strDateToJoda(str) {
		var av = str.split('/');
		var d = parseInt(av[0]) + '';
		var m = parseInt(av[1]) + '';
		var y = parseInt(av[2]) + '';
		if (m.length == 1) m = '0'+m;
		if (d.length == 1) d = '0'+d;
		return y + '-' + m + '-' + d;
	}

}
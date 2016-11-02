const express = require("express");


const app = express();

const port = 3000;

const mapObject = {
	"Jan":"January",
	"Feb": "February",
	"Mar":"March",
	"Apr":"April",
	"May":"May",
	"Jun":"June",
	"Jul":"July",
	"Aug":"August",
	"Sep":"September",
	"Oct":"October",
	"Nov":"November",
	"Dec":"December"
}

const getStringFromUrl = function(url){
	return url.substring(1,url.length).replace(/%20/g," ");
}

const getNaturalDate = function(d){
	var dateString = d.toDateString();
	var arr = dateString.split(" ");
	return mapObject[arr[1]] + " " + arr[2] + ", " + arr[3];
}

app.get("*", function(req,res){
	var timeStamp,naturalDate;
	var dateInUrl = getStringFromUrl(req.originalUrl);
	console.log("Date is "+dateInUrl);

	//if timestamp is passed
	var dateParse = Date.parse(dateInUrl);
	console.log("date parsed is "+dateParse);
	if(!isNaN(dateInUrl)){
		console.log("Date is a unix time stamp");
		timeStamp = dateInUrl;
		naturalDate = getNaturalDate(new Date(Number(dateInUrl)));
		console.log(naturalDate);
	}
	else if(dateParse){
		console.log("Date is a natural string");
		naturalDate = dateInUrl;
		timeStamp = dateParse;
	}
	else{
		console.log("Date is none");
		naturalDate = null;
		timeStamp = null;
	}
	res.status(200).json({
		"unix":timeStamp,
		"natural":naturalDate
	})
});

app.listen(port, function(){
	console.log("Server is listening on port "+port);
});
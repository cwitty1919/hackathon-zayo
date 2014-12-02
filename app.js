var mongojs = require('mongojs');
var fs = require('fs');

var db_zayo = mongojs("mongodb://localhost/zayo/", ['zayo']);

var db_yelp_business = mongojs("mongodb://localhost/yelp/", ['businesses']);

var db_yelp_reviews = mongojs("mongodb://localhost/yelp/", ['reviews']);

var output = "";

db_zayo.zayo.find().forEach(function (err, doc) {

	if(doc == null)
		return;

	db_yelp_business.businesses.find( { location: { $near: { $geometry: doc.loc, $maxDistance: 100 } } } ).forEach(function(err, a){

		// if(a != null)
		// 	output += a.name+","+a.location.coordinates[0]+","+a.location.coordinates[1]+"\n";


	});
	
});

setTimeout(function()
{
	console.log(output);
	fs.writeFileSync('outfile.csv', output);
}, 10000);
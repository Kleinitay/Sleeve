
function initialize_map() {
    var latlng = new google.maps.LatLng(32.819496,35.000519);
    var myOptions = {
	zoom: 18,
	center: latlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
				  myOptions);
}

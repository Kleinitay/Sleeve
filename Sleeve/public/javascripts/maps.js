
function initialize_map() {
    var latlng = new google.maps.LatLng(32.819496,35.000519);
    var myOptions = {
	zoom: 18,
	center: latlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    $.getJSON('/files.json', function(data) {
	/* loop over array over objects */
	$.each(data, function(i, obj) {
	    /* loop over each object */
	    $.each(obj, function(type, file) {
		/* add markers */
		//var fileLocation = new google.maps.LatLng(file.Lat, file.Long);
		var fileLocation = new google.maps.LatLng(32.819496,35.000519);
		var marker = new google.maps.Marker({
		    position:fileLocation,
		    title:file.name});
		marker.setMap(map);

		/* add popups
		 * TODO: delay creating popups until necessary
		 * TODO: shows preview for pictures
		 * TODO: put this in a separate file
		 */
		var contentString = '<div id="popup">'+
		    '<h2>' + file.source_file_name + '</h2>' +
		    '<p>' +
		    '<a href="/files/download/' + file.id + '">Download</a>' +
		    '</p>' +
		    '</div>';
		
		var infowindow = new google.maps.InfoWindow({
		    content: contentString,
		    maxWidth: 100
		});

		google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map,marker);
		});
	    });
	});
    });
}


/* Eek! A global! Burn it! */
var infoWindow = null;
function getInfoWindow() {
    if (!infoWindow)
	infoWindow = new google.maps.InfoWindow({});
    return infoWindow;
}

function startsWith(haystack, needle) {
    return haystack.substring(0, needle.length) == needle;
}

/**
 * Add a control to the map for uploading files.
 * This constructor takes the control DIV as a parameter
 */
function UploadButton(controlDiv, map) {
    // Set CSS styles for the DIV containing the control
    // Setting padding to 5 px will offset the control
    // from the edge of the map
    controlDiv.style.padding = '5px';

    // Set CSS for the control border
    var controlUI = document.createElement('DIV');
    controlUI.style.backgroundColor = 'pink';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '2px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to upload a file';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('DIV');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '20px';
    controlText.style.paddingLeft = '4px';
    controlText.style.paddingRight = '4px';
    controlText.innerHTML = 'Upload File';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago
    google.maps.event.addDomListener(controlUI, 'click', function() {
	var startupWeekend = new google.maps.LatLng(32.819496,35.000519);
	marker = new google.maps.Marker({
	    map:map,
	    icon:"images/drop.gif",
	    draggable:true,
	    animation: google.maps.Animation.DROP,
	    position: startupWeekend
	});
	marker.setAnimation(google.maps.Animation.BOUNCE);
	google.maps.event.addListener(marker, 'click', function (){
	    marker.setAnimation(null);
	});
	google.maps.event.addListener(marker, 'dragstart', function (){
	    infoWindow = getInfoWindow();
	    infoWindow.open(map, marker);
	    infoWindow.setContent(getUploadHTML(marker));
	});
    });
}

/**
 * Add upload buttons to the map
 */
function initializeMapButtons(map) {
    var controlDiv = document.createElement('DIV');
    var control = new UploadButton(controlDiv, map);

    controlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM].push(controlDiv);
}

/* HTML for the "Download file" popup */
function getDownloadHTML(filename, id, mime) {
    url = "/files/download/" + id;
    
    if (startsWith(mime, "image/")) {
	return '<div class="map_popup">'+
	    '<h2>' + filename + '</h2>' +
	    '<p><img src="' + url + '" /></p>' +
	    '<p><a href="' + url + '">Download</a></p>' +
	    '</div>';
    }

    else {
	return '<div class="map_popup">'+
	    '<h2>' + filename + '</h2>' +
	    '<p><a href="/files/download/' + id + '">Download</a></p>' +
	    '</div>';
    }
}


/* marker: the draggable upload marker */
function getUploadHTML(marker) {
    return '<div id="upload">' +
    '<form accept-charset="UTF-8" action="/space_files" enctype="multipart/form-data" method="post">' +
	'  <label for="space_file_name">Name</label><br />' +
	'  <input id="space_file_name" name="space_file[name]" size="30" type="text" /><br />' +
	'  <label for="space_file_File">File</label>' +
	'  <input id="space_file_source" name="space_file[source]" type="file" />' +
	'  <input id="space_file_submit" name="commit" type="submit" value="Upload" />' +
	'</form>' +
	'</div>';
}


/* Populate the map with file markers */
function populateMap(map) {
    // Load JSON of all files
    // TODO: only fetch nearby files 
    $.getJSON('/files.json', function(data) {
	$.each(data, function(i, obj) {
	    $.each(obj, function(type, file) {
		var fileLocation = new google.maps.LatLng(file.Lat, file.Long);
		var marker = new google.maps.Marker({
		    position:fileLocation,
		    title:file.name});
		marker.setMap(map);

		google.maps.event.addListener(marker, 'click', function() {
		    var downloadHTML = getDownloadHTML(file.source_file_name,
						       file.id,
						       file.source_content_type);
		    infoWindow = getInfoWindow();
		    infoWindow.setContent(downloadHTML);
		    infoWindow.open(map, marker);
		});
	    });
	});
    });
}

/* Main initializer for the map */
function initializeMap() {
    /* Coordinates for Startup Weekend Haifa */
    var startupWeekend = new google.maps.LatLng(32.819496,35.000519);

    /* Create the map */
    var myOptions = {
	zoom: 18,
	center: startupWeekend,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    populateMap(map);
    initializeMapButtons(map);
}


class Points {
	constructor( coordinatesList =  [
		 {lat: 55.782722, lng: 37.718626},
		 {lat: 55.750371, lng: 37.789867},
		 {lat: 55.721852, lng: 37.688383},
		 {lat: 55.660029, lng: 37.748309},
		 {lat: 55.668832, lng: 37.550622},
		 {lat: 55.675631, lng: 37.505684},
		 {lat: 55.778599, lng: 37.582600},
		 {lat: 55.817061, lng: 37.633365},
		 {lat: 55.838851, lng: 37.572031}]) 
	{
		this.list = coordinatesList;
		this.markers = [];
	}
	
	getClosestTo (click) {
		let distances = {};
		for (let point_number in this.list) {
			let point = this.list[point_number];
			distances[point_number] = (point.lat - click.lat)**2 + (point.lng - click.lng)**2;
		}
		let listOfDistances = Object.entries(distances);
		listOfDistances = listOfDistances.sort(([point_number, value], [point_number2, value2]) => { return value-value2 });
		return listOfDistances;
	}

	showClosestTo(click) {
		const listOfDistances = this.getClosestTo(click);
		this.markers[+listOfDistances[0][0]].setIcon('https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png');
		for (let markerId in this.markers) {
			if (!(markerId == +listOfDistances[0][0])) {
				let marker = this.markers[markerId];
				if (marker.wasChangedBefore) {
					marker.setIcon("https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png");
					marker.wasChangedBefore = false;
				}
			}
		}
		this.markers[+listOfDistances[0][0]].wasChangedBefore = true;
		console.log("Выбран пункт вывоза №", +listOfDistances[0][0]);
		return this.markers[+listOfDistances[0][0]];
	}
}
			


function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 55.757142, lng: 37.615001},
	  zoom: 10
	});

	const points = new Points();
	for (let position of points.list) {
	    var marker = new google.maps.Marker({
	      map: map,
	      position: position,
	      title: 'Точка самовывоза',
	      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
	    });
	    points.markers.push(marker);
	}

	map.addListener('click', function(event) {
		data = {lat: event.latLng.lat(), lng: event.latLng.lng()};
	  	points.showClosestTo(data);
	});
}
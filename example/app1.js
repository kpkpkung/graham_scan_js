function initialize() {

    var coords = [
        {'lat': -123.22919505240282,'lon': 39.150360051597865 },
        {'lat': -123.22331565024217,'lon': 39.18535202944107 },
        {'lat': -123.2105697930034,'lon': 39.19877898458537 },
        {'lat': -123.20430415274461,'lon': 39.19476717355366 },
        {'lat': -123.18112986685594,'lon': 39.14818222541186 },
        {'lat': -123.15915721060594,'lon': 39.134063202088775 },
        {'lat': -123.17014353873094,'lon': 39.12606109594828 },
        {'lat': -123.20636408926805,'lon': 39.119668744914804 },
        {'lat': -123.22919505240282,'lon': 39.150360051597865 }

    ];


    var centrePoint = new google.maps.LatLng(48.85, 11.25);

    var mapOptions = {
        zoom: 10,
        center: centrePoint,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var poly;
    var polyHull;
    var convexHull = new ConvexHullGrahamScan();


    poly = new google.maps.Polygon({
        paths: coords.map(function(item){
            return new google.maps.LatLng(item.lat, item.lon);
        }),
        strokeColor: '#000',
        strokeOpacity: 0.2,
        strokeWeight: 2,
        fillColor: '#000',
        fillOpacity: 0.1
    });


    coords.forEach(function (item) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.lat, item.lon),
            map: map
        });
        convexHull.addPoint(item.lon, item.lat);
    });


    if (convexHull.points.length > 0) {
        var hullPoints = convexHull.getHull();



        //Convert to google latlng objects
        hullPoints = hullPoints.map(function (item) {
            return new google.maps.LatLng(item.y, item.x);
        });

        console.log(hullPoints);

        polyHull = new google.maps.Polygon({
            paths: hullPoints,
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000',
            fillOpacity: 0.35
        });

        polyHull.setMap(map);

    }
}

google.maps.event.addDomListener(window, 'load', initialize);

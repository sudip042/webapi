
mapboxgl.accessToken = 'pk.eyJ1Ijoic3NhZ2FyciIsImEiOiJjanhwamdkZmowaWtoM3BvMXg5aXgzbmtzIn0.ufDEIntwFMye3eaQ-T4REQ';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [85.323959, 27.717245],
    zoom: 12,
});
new mapboxgl.Marker()
    .setLngLat([85.328103, 27.721303])
    .addTo(map);

new mapboxgl.Marker()
    .setLngLat([85.314188, 27.671577])
    .addTo(map);

new mapboxgl.Marker()
    .setLngLat([85.527748, 27.633224])
    .addTo(map);


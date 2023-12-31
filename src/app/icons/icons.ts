import * as L from 'leaflet';

export const selectedIcon = new L.Icon({
  iconUrl: '../../assets/marker-icon.png',
  iconRetinaUrl: '../../assets/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '../../assets/marker-shadow.png',
  shadowSize: [41, 41],
});

export const defaultIcon = new L.Icon({
  iconUrl: '../../assets/marker-icon.png',
  iconRetinaUrl: '../../assets/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '../../assets/marker-shadow.png',
  shadowSize: [41, 41],
});

export const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

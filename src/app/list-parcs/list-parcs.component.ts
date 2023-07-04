import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as L from 'leaflet';
import { GET_PARCS } from '../graphql.operations';

@Component({
  selector: 'app-list-parcs',
  templateUrl: './list-parcs.component.html',
  styleUrls: ['./list-parcs.component.css'],
})
export class ListParcsComponent implements OnInit {
  parcs: any[] = [];
  error: any;
  map: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_PARCS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.parcs = data.parcs;
        this.error = error;

        const zoomLevel = 12;
        const jardinDesPlantes = { lat: 47.219444, lng: -1.542778 };

        this.map = L.map('map', {
          center: [jardinDesPlantes.lat, jardinDesPlantes.lng],
          zoom: zoomLevel,
        });

        const mainLayer = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            minZoom: 12,
            maxZoom: 18,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        );

        mainLayer.addTo(this.map);

        const Icons = new L.Icon({
          iconUrl: '../../assets/marker-icon.png',
          iconRetinaUrl: '../../assets/marker-icon-2x.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl: '../../assets/marker-shadow.png',
          shadowSize: [41, 41],
        });

        // ${parc?.img ? `<img src=${parc?.img } alt=${parc?.nom}>` : ''}
        this.parcs.forEach((parc: any) => {
          const position = parc?.position;
          const parcDesc = `
            <h3>${parc?.nom}</h3>
            <div>${parc?.adresse}</div>
            ${parc?.creation ? `<div>créé en: ${parc.creation}</div>` : ''}
            ${parc?.hectares ? `${parc.hectares} hectares</div>` : ''}
            ${
              parc?.quartier
                ? `<div>quartier(s): ${parc.quartier.join(', ')}</div>`
                : ''
            }
            `;

          const marker = L.marker(position, {
            icon: Icons,
          }).addTo(this.map);
          marker.bindPopup(parcDesc);
        });
      });
  }
}

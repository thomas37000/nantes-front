import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as L from 'leaflet';
import { selectedIcon, defaultIcon, greenIcon } from '../icons/icons';
import { GET_DATAS } from '../graphql.operations';

@Component({
  selector: 'app-list-parcs',
  templateUrl: './list-parcs.component.html',
  styleUrls: ['./list-parcs.component.css'],
})
/***************** TODO: ******************/

/* récupérer user_position
 * pour calculer la distance entre le parc sélectionné
 * et celui de l'user avec la géolocalisation
 * Afficher le tracé avec Leaflet entre les 2 markers
 */
/******************************************/
export class ListParcsComponent implements OnInit {
  parcs: any[] = [];
  piscines: any[] = [];
  error: any;
  map: any;

  selectedParc: number | null = -1;
  markers: any[] = [];

  constructor(private apollo: Apollo) {}

  initMap(): void {
    this.apollo
      .watchQuery({
        query: GET_DATAS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.parcs = data.parcs;
        this.piscines = data.piscines;
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

        // AFFICHE toute les parcs sur la carte
        this.parcs.forEach((parc: any, id: any) => {
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
            ${
              parc?.img && parc.img.length > 0
                ? `<div class="parcImgs">
                    ${parc.img
                      .map(
                        (photo: any) => `<img src="${photo}" alt="${parc.nom}">`
                      )
                      .join('')}
                  </div>`
                : ''
            }
            `;

          const marker = L.marker(position, {
            icon: greenIcon,
          }).addTo(this.map);

          // FIXME:
          // marker.on('click', () => {
          //   this.onSelectedPark(id);
          // });

          marker.bindPopup(parcDesc);
          this.markers.push(marker);
        });

        // AFFICHE toute les piscines sur la carte
        this.piscines.forEach((piscine: any, id: any) => {
          const position = piscine?.position;

          const piscineDesc = `
            <h3>${piscine?.nom}</h3>
            <div>${piscine?.adresse}</div>
            ${
              piscine?.creation ? `<div>créé en: ${piscine.creation}</div>` : ''
            }
            ${
              piscine?.quartier
                ? `<div>quartier(s): ${piscine.quartier.join(', ')}</div>`
                : ''
            }
            `;

          const marker = L.marker(position, {
            icon: defaultIcon,
          }).addTo(this.map);

          marker.bindPopup(piscineDesc);
        });
      });
  }

  onSelectedPark(parc: any): void {
    console.log(parc);
  }

  ngOnInit(): void {
    this.initMap();
  }
}

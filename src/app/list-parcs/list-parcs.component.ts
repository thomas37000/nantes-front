import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_PARCS } from '../graphql.operations';

@Component({
  selector: 'app-list-parcs',
  templateUrl: './list-parcs.component.html',
  styleUrls: ['./list-parcs.component.css'],
})
export class ListParcsComponent implements OnInit {
  parcs: any[] = [];
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: GET_PARCS,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.parcs = data.parcs;
        this.error = error;
      });
  }
}

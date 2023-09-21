import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  searchText: any;
  heroes = [
    { id: 'z0001', name: 'SuraChat', lastName: 'Rattana' },
    { id: 'z0002', name: 'Napaparn', lastName: 'Unna' },
    { id: 'z0003', name: 'Urai', lastName: 'KunKum' },
    { id: 'z0004', name: 'Jaruwan', lastName: 'Noppha' },
  ];

  constructor() { }
  ngOnInit(): void {
    console.log("Test please Show")
  }

}

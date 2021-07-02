import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
    button {
      margin-right: 3px;
    }
    `
  ]
})
export class PorRegionComponent {

  regiones: string[] = [
    'africa', 
    'americas', 
    'asia', 
    'europe', 
    'oceania'
  ];
  regionActiva: string = '';

  paises: Country[] = [];
  
  activarRegion(region: string){
    if(region === this.regionActiva){ return; }
    this.regionActiva = region;

    this.paises = [];

    this.paisService.getRegiones(this.regionActiva)
      .subscribe((pais) => this.paises = pais,
        (error) => this.paises = []
      );
  }

  getClaseCSS(region: string): string {
    return (this.regionActiva === region) ? 'btn btn-primary': 'btn btn-outline-primary'
  }
  
  constructor(private paisService: PaisService) { }


}

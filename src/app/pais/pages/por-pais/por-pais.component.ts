import { Component, NgModule, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent implements OnInit {


  termino: string = '';
  public hayError: boolean = false;

  public paises: Country[] = [];

  public paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  buscar(termino: string){
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais( termino )
      .subscribe((paises) => this.paises = paises,
        (error) => {
          this.hayError = true;
          this.paises = [];
        }
      );
  }

  sugerencias(termino: string) {
    this.hayError = false;

    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
      .subscribe(
        paises => this.paisesSugeridos = paises.splice(0, 3),
        (error) => this.paisesSugeridos = []);
    this.termino = termino;
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

}

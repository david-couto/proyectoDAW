import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../service/actividad.service';
import { Actividad } from '../models/actividad';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-nueva-actividad',
  templateUrl: './nueva-actividad.component.html',
  styleUrls: ['./nueva-actividad.component.css']
})
export class NuevaActividadComponent implements OnInit {
  actividad : Actividad = new Actividad();
  categorias: any[] = [];
  dificultades: any[] =[];
  constructor(
    
    private actividadService: ActividadService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log(this.actividad)
    this.cargarCategorias();
    this.cargarDificultades();
  }
  cargarCategorias(): void {
    
      this.actividadService.getCategorias().subscribe(
        data => {
          data.forEach(categoria =>{
            this.categorias.push({name: categoria})
          })
        }
      );
}
cargarDificultades(): void {
    
  this.actividadService.getDificultades().subscribe(
    data => {
      data.forEach(dificultad =>{
        this.dificultades.push({name: dificultad})
      })
    }
  );
}
onCreate(): void {
  this.actividad.categoria= this.actividad.categoria['name']
  this.actividad.dificultad= this.actividad.dificultad['name']
  console.log(this.actividad);
  this.actividadService.save(this.actividad).subscribe(
    (response) =>{
      console.log(response)
      this.router.navigate(['/actividades'])
    }
  );
  
}
}
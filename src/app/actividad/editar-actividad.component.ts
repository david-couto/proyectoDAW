import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../service/actividad.service';
import { Actividad } from '../models/actividad';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent implements OnInit {
  actividad: Actividad = new Actividad();
  categorias: any[] = [];
  dificultades: any[] =[];
  id: number;
  constructor(private actividadService: ActividadService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getActividadById()
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
  getActividadById(){
   this.id = this.activatedRoute.snapshot.params['id'];
   console.log(this.id)
    this.actividadService.getActividadById(this.id).subscribe(
      (actividad) => {
        console.log(actividad)
        this.actividad=actividad;
        this.actividad.categoria={name : actividad.categoria}
        this.actividad.dificultad={name : actividad.dificultad}
        console.log(this.actividad)
      }
    )

  }
  onEdit(){
    this.actividad.categoria= this.actividad.categoria['name']
  this.actividad.dificultad= this.actividad.dificultad['name']
  this.actividadService.update(this.id,this.actividad).subscribe(
    (response) =>{
      console.log(response)
      this.router.navigate(['/actividades'])
    }
  )
  }
}

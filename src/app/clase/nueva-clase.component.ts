import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../service/actividad.service';
import { Actividad } from '../models/actividad';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/api';
import { Clase } from '../models/Clase';
import { ClaseService } from '../service/clase.service';
import { UsuarioService } from '../service/usuario.service';
import { Monitor } from '../models/Monitor';
import { DatePipe, formatDate,registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'
import swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.css']
})
export class NuevaClaseComponent implements OnInit {
  actividades : any[] = []
  clase : Clase = new Clase()
  monitores: any[] = []
  hoy: Date = new Date()

  constructor(private actividadService: ActividadService,
    private usuarioService: UsuarioService,
    private router: Router,
    private claseService: ClaseService) { }

  ngOnInit(): void {
    console.log(this.clase)
    this.cargarActividades()
    this.cargarMonitores();
    console.log(this.hoy)
  }
  cargarActividades(): void {
    this.actividadService.getActividades().subscribe(
      (actividades) =>{
        actividades.forEach(actividad =>{
          this.actividades.push({name: actividad.nombre, id: actividad.id})
        })
      }
    )
  }
  cargarMonitores(): void{
    this.usuarioService.getMonitores().subscribe(
      (monitores) =>{
        monitores.forEach(monitor =>{
          this.monitores.push({name: monitor.nombre, id: monitor.id})
        })
      }
    )
  }
  onCreate(){
   
    this.clase.actividad= this.clase.actividad['id']
    this.clase.monitor=this.clase.monitor['id']
    console.log(this.clase)
    this.claseService.save(this.clase).subscribe(
      (response) => {
        console.log(response)
        swal.fire("Clase Creada",response.mensaje,'success')
        this.router.navigate(['/clases'])
      }
    )
  }
}

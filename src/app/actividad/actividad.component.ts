import { Component, OnInit } from '@angular/core';
import { Actividad } from '../models/actividad';
import { ActividadService } from '../service/actividad.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { ClaseService } from '../service/clase.service';
import { PrimeNGConfig } from 'primeng/api';
import { Clase } from '../models/Clase';
import swal from 'sweetalert2';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  clase : Clase= new Clase()
  nombre: String;
  actividades: Actividad[] = [];
  isAdmin = false;  
  isEmp= false;
  categorias: any[] = [];
  dificultades: any[] = [];
  nombres: String[] = [];
  activityValues: number[] = [0, 100];
  monitores: any[]= []
  loading: boolean = true;
  displayModal: boolean = false;
  hoy: Date = new Date()
  constructor( 
    private actividadService: ActividadService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private router: Router,
    private usuarioService: UsuarioService,
    private claseService: ClaseService,
    private primengConfig: PrimeNGConfig
  ) { }
    
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.cargarActividades();
    this.isAdmin = this.tokenService.isAdmin();
    this.isEmp= this.tokenService.isEmp();
    this.cargarMonitores();
   ;
    
    this.actividades.forEach(actividad => {
      if(this.nombres.indexOf(actividad.nombre) < 0){
        this.nombres.push(actividad.nombre)
      }
    })
    this.categorias = [
      { label: 'CARDIO', value: 'CARDIO' },
      { label: 'HIT', value: 'HIT' },
      { label: 'TORSO', value: 'TORSO' },
      { label: 'CORE', value: 'CORE' },
      { label: 'PIERNAS', value: 'PIERNAS' },
    
    ];
    this.dificultades = [
      { label: 'BAJA', value: 'BAJA' },
      { label: 'MEDIA', value: 'MEDIA' },
      { label: 'ALTA', value: 'ALTA' },

    
    ];
  }
  cargarActividades(): void {
    this.actividadService.getActividades().subscribe(
      data => {
        this.actividades = data;
        this.loading = false;
        console.log(this.actividades)
      }
    );
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
  editarActividad(id: Number): void{
  this.actividadService.actividadId=id
  this.router.navigate(['/editarActividad'])
 }
 onDelete(id : Number): void{
  
  
  swal.fire({
    title: 'Esta seguro de eliminar esta actividad?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    reverseButtons: false
  }).then((result) => {
    if (result.isConfirmed) {
      //Descargar
      this.actividadService.delete(id).subscribe(
        (response) =>{
          swal.fire("Actividad eliminada","Actividad eliminada con exito ",'success')
          this.cargarActividades()
        }
      )


    }
  })
 }
 showModalDialog(actividad: Actividad) {
   
  
  console.log(this.monitores)
  this.clase.actividad=actividad
  if(!this.isAdmin && this.isEmp) {
    this.usuarioService.getMisDatos(this.tokenService.getUserName()).subscribe(
      (datos) =>{
        console.log(datos)
        this.clase.monitor={nombre: datos['nombre'],id: datos['id']}
        console.log(this.clase.monitor)
        this.displayModal = true;
      }
    )
  }else{
    this.displayModal = true;
  }

}
closeModalDialog() {
   
  this.displayModal = false;
  this.clase= new Clase()

}

onCrearClase(){
  this.clase.actividad=this.clase.actividad['id']
  this.clase.monitor=this.clase.monitor['id']
  console.log(this.clase)
    this.claseService.save(this.clase).subscribe(
      (response) => {
        console.log(response)
      }
    )
    this.clase= new Clase()
  this.displayModal=false;
}
 
}

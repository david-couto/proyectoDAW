import { Component, OnInit } from '@angular/core';
import { Clase } from '../models/Clase';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';
import { ClaseService } from '../service/clase.service';
import { ActividadService } from '../service/actividad.service';
import { UsuarioService } from '../service/usuario.service';
import { ForwardRefHandling } from '@angular/compiler';
import { PrimeNGConfig } from 'primeng/api';
import swal from 'sweetalert2';
@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styleUrls: ['./clase.component.css']
})
export class ClaseComponent implements OnInit {
  clase: Clase = new Clase();
  clases: Clase[] = [];
  misClases: Clase[] = []
  misClasesImpartidas: Clase[]=[]
  isEmp= false;
  isAdmin=false;
  actividades: any[] = [];
  monitores: any[] = []
  dificultades: any[] = [];
  categorias:any[] = [];
  loading: boolean = true;
  displayModal: boolean = false;
  disabled: boolean = true;
  constructor(private tokenService: TokenService,
    private primengConfig: PrimeNGConfig,
    private actividadService: ActividadService,
    private usuarioService: UsuarioService,
    private router: Router,
    private claseService: ClaseService) { 

    }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.cargarClases()
    this.cargarActividades()
    this.cargarCategorias()
    this.cargarDificultades()
    this.cargarMonitores()
    this.cargarMisClases()
    this.isAdmin= this.tokenService.isAdmin() 
    this.isEmp=this.tokenService.isEmp()
    if(this.isEmp){
      this.cargarMisClasesImpartidas()
    }
  }
  cargarClases(){
    this.claseService.getClasesFuturas().subscribe(
      (clases) => {
        this.clases=clases;
       
        this.loading = false;
       
        this.clases.forEach(
          (clase) =>{
            clase.fechaClase = new Date(clase.fechaClase)
           
          }
        )
        
      }
    )
  }
  cargarActividades(){
    this.actividadService.getActividades().subscribe(
      (actividades) =>{
        actividades.forEach((actividad)=>{
          this.actividades.push({label: actividad.nombre, value:actividad.nombre})
         
        })
        
      }
    )
  }
  cargarCategorias(){
    this.actividadService.getCategorias().subscribe(
      (categorias) =>{
        categorias.forEach((categoria)=>{
          this.categorias.push({label: categoria, value:categoria})
        })
        
      }
    )
  }
  cargarDificultades(){
    this.actividadService.getDificultades().subscribe(
      (dificultades) =>{
        dificultades.forEach((dificultad) =>{
          this.dificultades.push({label: dificultad, value:dificultad})
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
  updateAsistenteClase(id: Number){
   
    let nombreUsuario  = this.tokenService.getUserName();
    this.claseService.updateAsistente(id,nombreUsuario).subscribe(
      (response) =>{
        
        this.cargarClases()
        this.cargarMisClases()
        
      }
    )
  }

  cargarMisClases(){
    let nombreUsuario = this.tokenService.getUserName();
    this.claseService.getMisClases(nombreUsuario).subscribe(
      (clases) =>{
        
        this.misClases=clases
        
      }
    )
  }
  cargarMisClasesImpartidas(){
    let nombreUsuario = this.tokenService.getUserName();
    this.claseService.getMisClasesImpartidas(nombreUsuario).subscribe(
      (clases) =>{
        
        this.misClasesImpartidas=clases
        
      }
    )
  }
  estaApuntadoEnClase(clase: Clase): boolean{
  
   let prueba = this.misClases.find(c => c.id == clase.id  )
    
   return  prueba != undefined ? true: false
  }
  estaImpartiendoClase(clase : Clase):boolean{
    if(this.isEmp){
    let prueba = this.misClasesImpartidas.find(c => c.id == clase.id  )
    
    return  prueba != undefined ? true: false
    }else{
      return false;
    }
  }
  onEditarClase(clase: Clase){
    console.log(clase)
    clase.actividad=clase.actividad['id']
    clase.monitor=clase.monitor['id']
    console.log(clase)
      this.claseService.update(clase.id,clase).subscribe(
        (response) => {
          console.log(response)
          this.displayModal=false;
          swal.fire("OK",response.mensaje,"success")
          this.cargarClases()
          this.clase = new Clase() 
        }
      )
      this.displayModal=false;
      
      
     
   
  }
  onDelete(id : Number): void{
    swal.fire({
      title: 'Esta seguro de eliminar esta clase?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        //Descargar
        this.claseService.delete(id).subscribe(
          (response) =>{
            swal.fire("Clase eliminada","Clase eliminada con exito",'success')
            
            this.cargarClases()
          }
        )
  
  
      }
    })
  }
  showModalDialog(id: Number) {   
    
    this.claseService.getClaseById(id).subscribe(
      (clase) =>{
        console.log(clase)
        this.clase.id= clase.id
        this.clase.monitor= clase.monitor
        this.clase.actividad= clase.actividad
        this.clase.fechaClase= new Date(clase.fechaClase)
        this.clase.horaInicio= new Date(clase.fechaClase+"T"+clase.horaInicio)
        this.displayModal=true
       
      }
    )
     

  }
  closeModalDialog() {    
    this.displayModal = false;   
    this.clase = new Clase() 
    this.cargarClases()
  }
  
}

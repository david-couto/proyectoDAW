import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Monitor } from '../models/Monitor';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { NuevoMonitor } from '../models/nuevoMonitor';
import { AuthService } from '../service/auth.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  constructor(    private tokenService: TokenService,
    private router: Router,
    private usuarioService: UsuarioService,private authService: AuthService,) { }

   
    
    maxDate: Date;
    minDate: Date = new Date();
 nuevoMonitor: NuevoMonitor= new NuevoMonitor()
    isAdmin = false;  
    monitores: Monitor[]= []
    loading: boolean = true;
    displayModal=false;
  ngOnInit(): void {
   
    this.maxDate= new Date()
   
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
    this.minDate.setFullYear(this.minDate.getFullYear() - 65)
    this.isAdmin=this.tokenService.isAdmin()
    this.cargarMonitores()
  }
  cargarMonitores(){
    this.usuarioService.getMonitores().subscribe(
      (monitores) =>{
        console.log(monitores)
        this.monitores=monitores;
        this.monitores.forEach((monitor)=>{
          monitor.fechaNacimiento= new Date(monitor.fechaNacimiento)
          
        })
        console.log(monitores)
        this.loading=false;
      }
    )
  }
  onCrearMonitor(){
    this.nuevoMonitor.roles= ["emp"]
    this.authService.nuevo(this.nuevoMonitor).subscribe(
      (data) =>{
        swal.fire("Usuario registrado",data.mensaje,'success')
        this.cargarMonitores()
        this.displayModal=false;
        this.nuevoMonitor= new NuevoMonitor()
      }
      
    )
  }
  showModalDialog(){
    this.displayModal=true;
  }
  closeModalDialog(){
    this.displayModal=false;
    this.nuevoMonitor= new NuevoMonitor()
  }
  onDelete(id: Number){
    swal.fire({
      title: 'Esta seguro de eliminar este monitor?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        //Descargar
        this.usuarioService.delete(id).subscribe(
      
          (data) =>{
            swal.fire("Monitor dado de baja con exito ",data.mensaje,'success')
            this.cargarMonitores()
            this.nuevoMonitor= new NuevoMonitor()
          }
        )
      }
    })
   

  }
}

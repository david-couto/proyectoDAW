import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ThisReceiver } from '@angular/compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  isEmp= false;
  items!: MenuItem[];
  constructor(private tokenService: TokenService,  private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isLogged = this.tokenService.isLogged();
        this.isAdmin = this.tokenService.isAdmin();
        this.isEmp= this.tokenService.isEmp();    
        console.log(this.isAdmin,this.isEmp,this.isLogged)
        this.items = [
    
          {
            label: 'Actividades',
            items: [{
              label: 'Listar Actividades',
              icon: 'pi pi-fw pi-list',
              visible: this.isLogged,
              routerLink: "/actividades"
            }, {
              label: 'Crear Actividad',
              icon: 'pi pi-fw pi-plus',
              visible: this.isAdmin,
              routerLink: "/nuevaActividad"
            }
            ],
            visible: this.isLogged
    
          }
          ,
    
          {
            label: 'Clases',
            items: [{
              label: 'Listar Clases',
              icon: 'pi pi-fw pi-list',
              visible: this.isLogged,
              routerLink: "/clases"
            }, {
              label: 'Crear Clase',
              icon: 'pi pi-fw pi-plus',
              visible: this.isEmp,
              routerLink: "/nuevaClase"
            }
            ],
            visible: this.isLogged
    
          },
          {
            label: 'Monitores',
            icon: 'pi pi-fw pi-list',
            visible: this.isLogged,
            routerLink: "/monitores"
          },
          {
            label: 'Calendario',
            icon: 'pi pi-fw pi-calendar',
            visible: this.isLogged,
            routerLink: "/miCalendario"
          },
    
        ];
      }
    })
    
   
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.isAdmin = false;
    this.isLogged = false;
    this.isEmp= false;
  }

}

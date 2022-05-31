import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { IndexGuard } from './guards/index.guard';
import { ActividadComponent } from './actividad/actividad.component';
import { NuevaActividadComponent } from './actividad/nueva-actividad.component';
import { AdminGuardService } from './guards/adminGuard.service';
import { EditarActividadComponent } from './actividad/editar-actividad.component';
import { NuevaClaseComponent } from './clase/nueva-clase.component';
import { ClaseComponent } from './clase/clase.component';
import { ClasesCalendarComponent } from './cliente/misClases/clases-calendar/clases-calendar.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpGuardService } from './guards/empGuard.service';


const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [IndexGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'actividades', component: ActividadComponent, canActivate: [IndexGuard] },
  { path: 'nuevaActividad', component: NuevaActividadComponent, canActivate: [AdminGuardService],data: { expectedRol: ['admin'] } },
  { path: 'editarActividad/:id', component: EditarActividadComponent, canActivate: [AdminGuardService],data: { expectedRol: ['admin'] } },
  { path: 'nuevaClase', component: NuevaClaseComponent, canActivate: [EmpGuardService],data: { expectedRol: ['emp'] } },
  { path: 'monitores', component: EmpleadoComponent, canActivate: [IndexGuard]},
  { path: 'clases', component: ClaseComponent, canActivate: [IndexGuard] },
  { path: 'miCalendario', component: ClasesCalendarComponent, canActivate: [IndexGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
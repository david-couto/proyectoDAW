import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { ClaseService } from 'src/app/service/clase.service';
import { TokenService } from 'src/app/service/token.service';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { EventInput } from '@fullcalendar/angular';
import { Clase } from 'src/app/models/Clase';
import esLocale from '@fullcalendar/core/locales/es';
import { getCurrencySymbol } from '@angular/common';
import { ignoreElements, reduce } from 'rxjs';
@Component({
  selector: 'app-clases-calendar',
  templateUrl: './clases-calendar.component.html',
  styleUrls: ['./clases-calendar.component.css']
})
export class ClasesCalendarComponent implements OnInit {
  Events: any[] = [];
clases: Clase[] = []
clase: Clase = new Clase();
misClases: Clase[] = []
isEmp: boolean = false;
misClasesImpartidas: Clase[]=[]
  calendarVisible = false;
  displayModal=false;
  claseExists= false;
  calendarOptions: CalendarOptions = {
   /* headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    //initialEvents: this.cargarEventos(this)  , // alternatively, use the `events` setting to fetch from a feed
   /* weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    //select: this.handleDateSelect.bind(this),
    //eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];
  currentEvent: EventApi;
  nombreUsuario:string;
  constructor(private claseService: ClaseService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.nombreUsuario=this.tokenService.getUserName()
    this.isEmp=this.tokenService.isEmp()
    this.cargarCalendar()
    this.cargarMisClases()
    if(this.isEmp)  this.cargarMisClasesImpartidas()
    
  }
  cargarCalendar(){
    
   
    return this.claseService.getClasesCalendar(this.nombreUsuario).subscribe(
      (clases) =>{        
        clases.forEach((clase)=>{
       this.Events.push(
          clase
          )
        })
        this.calendarOptions = {
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          },
          slotMinTime: '06:00',
          slotMaxTime: '23:00',
          initialView: 'timeGridWeek',
          //dateClick: this.onDateClick.bind(this),
          events: this.Events,
          weekends: true,
          editable: false,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          select: this.handleDateSelect.bind(this),
          eventClick: this.handleEventClick.bind(this),
          eventsSet: this.handleEvents.bind(this),
          locale: esLocale
         
        };
        this.calendarVisible = true;
      }
      
    )
 
      

    
  
   
   
  }
  onDateClick(res: any) {
    console.log(res)

  }
  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    selectInfo.view.type="timeGridDay"
    console.log(selectInfo)
   // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.changeView("timeGridDay",selectInfo.start)
    console.log(selectInfo.startStr + 'T12:00:00')
    calendarApi.unselect(); // clear date selection
/*
    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr + 'T18:00:00',
        
       
      });
    }*/
  }

  handleEventClick(clickInfo: EventClickArg) {
    let id = parseInt(clickInfo.event._def.publicId)
    this.claseService.getClaseById(id).subscribe(
      (clase) =>{
        this.clase=clase
        this.displayModal=true;
        this.claseExists=true;
        this.currentEvent= clickInfo.event;
      }
    )
  }
  closeModalDialog(){
    this.displayModal=false;
    this.claseExists=false;
  }
  handleEvents(events: EventApi[]) {
    console.log(events)
    this.currentEvents = events;
  }
  cargarMisClases(){
    let nombreUsuario = this.tokenService.getUserName();
    this.claseService.getMisClases(nombreUsuario).subscribe(
      (clases) =>{
        console.log(clases)
        this.misClases=clases
        
      }
    )
  }
  cargarMisClasesImpartidas(){
    let nombreUsuario = this.tokenService.getUserName();
    this.claseService.getMisClasesImpartidas(nombreUsuario).subscribe(
      (clases) =>{
        console.log(clases)
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
   updateAsistenteClase(){
   
    let nombreUsuario  = this.tokenService.getUserName();
    this.claseService.updateAsistente(this.clase.id,nombreUsuario).subscribe(
      (response) =>{
        
        
        if(this.currentEvent._def.ui.backgroundColor=="lightgreen"){
          this.currentEvent._def.ui.backgroundColor="lightblue"
        }else{
          this.currentEvent._def.ui.backgroundColor="lightgreen"
        }
        console.log(this.currentEvent)
        
        console.log(this.currentEvent)
        this.cargarMisClases()
        this.cargarCalendar()
        this.displayModal=false;
        
      }
    )
    this.displayModal=false;
  }
}

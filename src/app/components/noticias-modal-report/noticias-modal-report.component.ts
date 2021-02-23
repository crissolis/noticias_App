import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medio } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticia/noticias.service';

@Component({
  selector: 'app-noticias-modal-report',
  templateUrl: './noticias-modal-report.component.html',
  styleUrls: ['./noticias-modal-report.component.scss'],
})
export class NoticiasModalReportComponent implements OnInit {

  graficos = [
    {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data:  [24, 30, 46],
      type: 'doughnut',
      leyenda: 'El pan se come con'
    },
    {
      labels: ['Hombres', 'Mujeres'],
      data:  [4500, 6000],
      type: 'doughnut',
      leyenda: 'Entrevistados'
    },
     {
      labels: ['Si', 'No'],
      data:  [95, 5],
      type: 'doughnut',
      leyenda: '¿Le dan gases los frijoles?'
    },
    {
      'labels': ['No', 'Si'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': '¿Le importa que le den gases?'
    },

  ]
  hoy=new Date().getFullYear();
  customDayShortNames = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  fechaI:Date=new Date();
  fechaF:Date=new Date();
  medios:Medio[]=[];
  medio:number;
  constructor(private modalController: ModalController,private noticiasService:NoticiasService) { 
    noticiasService.getMedios().subscribe(med=>{
      this.medios=med.resp;
      // // this.categoriaSelect=med.resp[0];
      // this.cargarNoticiasCateg(this.categorias[0].medio_id,this.tipo);

    });
  }

  
   
  ngOnInit() {
 
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    window.location.reload();  //*ver mas luego
  }


  compareWith(o1: Medio, o2: Medio) {
    return o1 && o2 ? o1.medio_id === o2.medio_id : o1 === o2;
  }

  Cargar(){
    console.log(this.fechaI,this.fechaF,this.medio);
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Medio } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticia/noticias.service';
import { Noticia } from '../../interfaces/interfaces';

@Component({
  selector: 'app-noticias-modal-report',
  templateUrl: './noticias-modal-report.component.html',
  styleUrls: ['./noticias-modal-report.component.scss'],
})
export class NoticiasModalReportComponent implements OnInit {

  graficos = [
    // {
    //   labels: ['Positivas', 'Neutras', 'Negativas'],
    //   data:  [24, 30, 46],
    //   type: 'doughnut',
    //   leyenda: 'El pan se come con'
    // },
    // {
    //   labels: ['Hombres', 'Mujeres'],
    //   data:  [4500, 6000],
    //   type: 'doughnut',
    //   leyenda: 'Entrevistados'
    // },
    //  {
    //   labels: ['Si', 'No'],
    //   data:  [95, 5],
    //   type: 'doughnut',
    //   leyenda: '¿Le dan gases los frijoles?'
    // },
    // {
    //   'labels': ['No', 'Si'],
    //   'data':  [85, 15],
    //   'type': 'doughnut',
    //   'leyenda': '¿Le importa que le den gases?'
    // },

  ]
  hoy=new Date().getFullYear();
  customDayShortNames = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  fechaI:Date=new Date();
  fechaF:Date=new Date();
  medios:Medio[]=[];
  medio:number;
  noticias:Noticia[]=[];
  positivas:number=0;
  negativas:number=0;
  neutras:number=0;
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
    this.noticias=[];
  
    var fi=`${this.tiempo(this.fechaI)}:00`;
     var ff=`${this.tiempo(this.fechaF)}:59` ;

     console.log(fi,ff)
    this.noticiasService.getNoticiasFecha(fi,ff,this.medio,undefined).subscribe(datos=>{
      console.log(datos)
      this.noticias=datos.noticias;
      this.clasificar(this.noticias);
      this.graficos=[{
        labels: ['Positivas', 'Neutras', 'Negativas'],
        data:  [this.positivas,this.neutras, this.negativas],
        type: 'doughnut',
        leyenda: 'Analisis de las noticias'
      }]
   });
  }


  clasificar(noticias:Noticia[]){
    this.negativas=0;
    this.positivas=0;
    this.neutras=0;
    noticias.forEach(n=>{
      
      if(n.porcentaje > -0.05 && n.porcentaje < 0.05) {
        // return "../assets/img/esceptico.png";
        this.neutras=this.neutras+1;
    }else if(n.porcentaje > 0.05){
      // return "../assets/img/feliz.png";
      this.positivas=this.positivas+1;
    }else if(n.porcentaje < 0){
      // return "../assets/img/triste.png";
        this.negativas=this.negativas+1;
    }
    

    });
  }


  tiempo(fecha: Date) {
    console.log(fecha)
    fecha=new Date(fecha);
    let day = fecha.getDate();
    let month = fecha.getMonth() +1;
    let year = fecha.getFullYear();

    // let day = fecha.getUTCDay()
    // let month = fecha.getUTCDate()
    // let year = fecha.getUTCFullYear()

    let  hora=fecha.getHours();
    let  min=fecha.getMinutes();
    let  sec=fecha.getSeconds();

   

    let des: string;
    if (month < 10) {
      des = `${year}-0${month}-${day} ${hora}:${min}`;
    } else {
      des = `${year}-${month}-${day}  ${hora}:${min}`;
    }
    return des;
  }

}

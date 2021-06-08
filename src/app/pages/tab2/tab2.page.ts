import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, ModalController } from '@ionic/angular';
import { NoticiasService } from '../../services/noticia/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';
import { Noticia, Medio } from '../../interfaces/interfaces';
import { NoticiasModalComponent } from '../../components/noticias-modal/noticias-modal.component';
import { NoticiasModalReportComponent } from '../../components/noticias-modal-report/noticias-modal-report.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild (IonSegment) segment:IonSegment;
  noticias:Noticia[]=[];
  categorias:Medio[]=[];

  
  
   
  categoriaSelect:Medio;
  tipos = [
    {
      nombre: 'positivas',
      id:0,
      q:'DESC'
    },
    {
      nombre: 'negaivas',
     id:1,
     q:'ASC'
    },
  ]

  categoria=0;
  tipo=0;
   i:Date=new Date();
   f:Date=new Date();


  constructor( private noticiasService:NoticiasService,private modalController:ModalController) {
    noticiasService.getMedios().subscribe(med=>{
      this.categorias=med.resp;
     console.log(med)
      this.cargarNoticiasCateg(this.categorias[0].medio_id,this.tipo);

    });
    
    console.log(this.i.getMonth(),this.f.getMonth())
   
  }

  ngOnInit(){ 
    // this.segment.value=this.categorias[0];
   
  }

  cargarNoticiasCateg(categoria:number,tipo){
    console.log(categoria);
    console.log(this.tipo);
    this.noticias=[];
      if (this.categoria!==categoria) {
        this.noticias=[];
      }
      this.categoria=categoria;
      this.tipo=tipo;
    let  fi=this.tiempo(this.i);
          fi=`${fi} 00:00:00`;
        
    let  ff=this.tiempo(this.f);
          ff=`${ff} 23:59:59`;
    console.log(fi,ff)
      //  let id=this.noticias[this.noticias.length - 1].id;
      
        this.noticiasService.getNoticiasFecha(fi,ff,categoria,this.tipos[tipo].q).subscribe(datos=>{
          console.log(datos),
        datos.noticias.forEach(not => {
          console.log(not)
          let n= this.noticias.find(notic=>notic.id===not.id);
            if (n) {
              return;
            }else{
              this.noticias.push( not );
            }
          });
  
       });
      
       
  
  }

  // loadData(event){
  //  this.cargarNoticiasCateg(this.categoria,event);
  // }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NoticiasModalComponent,
    });
    return await modal.present();
  }

  async presentModalR(){
    const modal = await this.modalController.create({
      component: NoticiasModalReportComponent,
    });
    return await modal.present();
  }

  selectipo(id:number){
    // console.log(this.categoria,id);
    this.tipo=id;
    this.cargarNoticiasCateg(this.categoria,this.tipo);
  }


  tiempo(fecha: Date) {
    let day = fecha.getDate()
    let month = fecha.getMonth() +1
    let year = fecha.getFullYear()

    // let day = fecha.getUTCDay()
    // let month = fecha.getDate()
    // let year = fecha.getUTCFullYear()

    let  hora=fecha.getHours();
    let  min=fecha.getMinutes();
    let  sec=fecha.getSeconds();

   

    let des: string;
    if (month < 10) {
      des = `${year}-0${month}-${day}`;
    } else {
      des = `${year}-${month}-${day}`;
    }
    return des;
  }

}


// if (month < 10) {
//   des = `${year}-0${month}-${day} ${hora}:${min}:${sec}`;
// } else {
//   des = `${year}-${month}-${day} ${hora}:${min}:${sec}`;
// }
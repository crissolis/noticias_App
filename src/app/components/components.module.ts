import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { MediosComponent } from './medios/medios.component';
import { NoticiasModalComponent } from './noticias-modal/noticias-modal.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';

import { ChartsModule } from 'ng2-charts';
import { NoticiasModalReportComponent } from './noticias-modal-report/noticias-modal-report.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NoticiaComponent,NoticiasComponent,
    MediosComponent,NoticiasModalComponent,
    GraficoDonaComponent,NoticiasModalReportComponent],
  imports: [
    CommonModule,
    ChartsModule,
    IonicModule,
    FormsModule
    
  ],
  exports:[
    NoticiaComponent,
    NoticiasComponent,
    MediosComponent,
    NoticiasModalComponent,
    GraficoDonaComponent,
    NoticiasModalReportComponent
  ]
})
export class ComponentsModule { }

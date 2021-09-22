import { Component } from '@angular/core';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { NoticiasService } from '../../services/noticia/noticias.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private dataLocal:DataLocalService,private notciasService:NoticiasService) {
   notciasService.getFavorito().subscribe(resp=>{
    //  console.log(resp);
     dataLocal.cargarFavoritos(resp.noticias);
   })
  }
      
}

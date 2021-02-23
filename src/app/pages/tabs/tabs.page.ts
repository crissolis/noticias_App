import { Component } from '@angular/core';
import { DataLocalService } from '../../services/dataLocal/data-local.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private dataLocal:DataLocalService) {
    dataLocal.cargarFavoritos();
  }
      
}

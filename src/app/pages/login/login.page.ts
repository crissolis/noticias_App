import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NoticiasService } from '../../services/noticia/noticias.service';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nick:string="";
  constructor(private router:Router,private noticiasService:NoticiasService,
    private datalocal:DataLocalService, private toastController: ToastController) {
      
     
      // console.log(this.datalocal.estaLogeado())
      // if ( this.datalocal.estaLogeado()) {
      //   this.router.navigate(['/login/tabs/tab1']);
      //   console.log("wwww") 
      // }
     }

  ngOnInit() {

  }


  
  ingresar(forma:NgForm){
    console.log(forma)
    if (forma.invalid) {
      return;
    }

    // let user ={
    //   usuario:forma.value.nick,
    //   clave:forma.value.password
    // }
    this.noticiasService.login(forma.value.nick,forma.value.password).subscribe(res=>{
      console.log(res);
      if (res.status==="400") {
        this.presentToast(res.message,null);
      }else{
        this.presentToast(null,res.user[0].nombre);
       this.datalocal.guardarUsuario(res.user[0]);
       this.router.navigate(['/tab1']);
      }
    });

    // let usuario=new Usuario(null,forma.value.email,forma.value.password);
    // this.usuarioS.login(usuario,this.recuerdame).subscribe(res=>{
    //   console.log(res);
      // this.router.navigate(['login/tabs/tab1']);
    // });
  }


  
   presentToast(message:string,usuario:string) {
    // const toast = await this.toastController.create({
    //   message,
    //   position:'bottom',
    //   duration: 2000
    // });
    // toast.present();
  
    if (usuario) {
      Swal.fire({
       title: 'Ingreso existos',
        text:'bien venido '+usuario,
       icon: 'success',
       backdrop:false,
      }
        
      ) 
    }else{
      Swal.fire({
        title: 'Error',
         text:message,
        icon: 'error',
        backdrop:false,  

       }
         
       )
    }
   
  }

  
}

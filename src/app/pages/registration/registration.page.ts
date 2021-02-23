import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticia/noticias.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor(private router:Router,private noticiasService:NoticiasService,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  registrar(forma:NgForm){
   
    if (forma.invalid) {
      return;
    }else{
      if (forma.value.password!==forma.value.password1) {
        this.presentToast("Las contraseñas no coinciden");
        return
      }

      let user ={
        nombre:forma.value.nombre,
        apellido:forma.value.apellido,
        nick:forma.value.nick,
        correo:forma.value.correo,
        password:forma.value.password,
      }
      console.log(user);
      this.noticiasService.register(user).subscribe(resp=>{
        if (resp.status==="400") {
          this.presentToast(resp.message);
          return;
        }
        this.presentToast(resp.message);
        this.router.navigate(['/login']);
      });
     
    }

  
    // this.noticiasService.login(forma.value.nick,forma.value.password).subscribe(res=>{
    //   console.log(res);
    //   if (res.status==="400") {
    //     this.presentToast(res.message);
    //   }else{
    //     this.presentToast("Ingreso existos,bien venido "+res.user[0].nombre);
    //    this.datalocal.guardarUsuario(res.user[0]);
    //    this.router.navigate(['/tab1']);
    //   }
    // });


  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      position:'bottom',
      duration: 2000
    });
    toast.present();
  }

}

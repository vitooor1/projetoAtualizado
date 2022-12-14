import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    //Ferramenta do carregando!
    private loading: LoadingController,

    //ferramenta do toast *(mensagem)
    private toast: ToastController
  ) { }

  //Metodo do Loading
  async carregando(message: string) {
    const load = this.loading.create({
      mode: 'ios',
      message: message,
      duration: 2000

    });


    (await load).present();
  }
  async toastando(message: string, position: "top" | "middle" | "bottom", color: string, duration: number) {
    const toastando = this.toast.create({
      mode: 'ios',
      message,
      duration ,
      position,
      color


    });

    (await toastando).present();
    //location.reload();

  }
}






import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Produtos } from 'src/app/model/produto.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  produtosVariados: Produtos[] = [];
  constructor(
    private http: HttpClient,
    //loadingController - Ferramento do carregando
    private loadCtrl: LoadingController,

    //alertController - Ferramenta que cria um alert
    private alertCtrl: AlertController
  ) { }



  ngOnInit() {
    //Carrega o método no inicio da página
    this.carregando();
    this.http.get<Produtos[]>('http://localhost:3000/produtos').subscribe(results => this.produtosVariados = results);
  }

  // método do carregando (load)
  async carregando() {

    const load = this.loadCtrl.create({
      mode: 'ios',
      message: 'Carregando...',
      duration: 2000
    });

    (await load).present();

  }

  //Método do alertando

  async alertando() {
    const alert = this.alertCtrl.create({
      mode: 'ios',
      header: 'Cadastro de produtos',
      inputs:[
        {
          name: 'produto',
          type: 'text',
          placeholder: 'Informe o produto'
        },
        {
          name: 'quantidade',
          type: 'text',
          placeholder: 'Informe a Quantidade'
        }
      ],
      buttons: ['ok']
    });

    (await alert).present();


  }
}

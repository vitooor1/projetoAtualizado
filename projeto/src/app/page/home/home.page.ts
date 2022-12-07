
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Produtos } from 'src/app/model/produto.model';
import { BancoServiceService } from 'src/app/servico/banco-service.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  produtosVariados: Produtos[] = [];
  constructor(
    private DataBase: BancoServiceService,

    //loadingController - Ferramento do carregando
    private loadCtrl: LoadingController,

    //alertController - Ferramenta que cria um alert
    private alertCtrl: AlertController
  ) { }



  ngOnInit() {
    //Carrega o método no inicio da página
    this.carregando();
    //this.http.get<Produtos[]>().subscribe(results => this.produtosVariados = results)
    this.DataBase.getItem().subscribe(results=> this.produtosVariados = results)
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
      mode: 'ios', // mostra com o formato ios
      header: 'Cadastro de produtos',

      inputs: [
        {
          name: 'item',
          type: 'text',
          placeholder: 'Informe o produto'
        },
        {
          name: 'qtd',
          type: 'text',
          placeholder: 'Informe a Quantidade'
        }
      ],
      buttons: [
        //botão de cancelar
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('CPF CANCELADO');
          }
        },
        //botão de cadastrar
        {
          text: 'Cadastrar',
          handler: (form) => {
            //Objeto que ira formar nosso item da lista.
            let item = {
              produtos: form.item,
              quantidade: form.qtd
              
            };
            this.DataBase.postItem(item);
            console.log(item);
          }
    
        }
      ]
    });

    (await alert).present();


  }

  //Método do botão excluir
  deletar(id: number) {
    this.DataBase.deleteItem(id);
    //atualiza a página
    location.reload();

  }
}

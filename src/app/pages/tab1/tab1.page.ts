import { Component } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public taskListService: TaskListService, private router: Router, public alertController: AlertController) {
  }

  async addList() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'New List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Name List'
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Operation Cenceled');
          }
        },{
          text: 'Create',
          handler: ( data ) => {
            // console.log(data);
            if (data.title.length === 0) {
              return;
            }
            const idList = this.taskListService.createList(data.title);
            this.router.navigateByUrl(`/tabs/tab1/add/${idList}`);
          }
        }]
    });

    await alert.present();
  }

  // selectedList(list: List){
  //   // console.log(list);
  //   this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
  // }

}

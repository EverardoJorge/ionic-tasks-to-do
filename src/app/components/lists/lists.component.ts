import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { List } from 'src/app/models/list.model';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList ) list: IonList;
  @Input() terminated = true;

  constructor(public taskListService: TaskListService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {}

  selectedList(list: List){
    if (this.terminated) {
      this.router.navigateByUrl(`/tabs/tab2/add/${list.id}`);
    }else {
      this.router.navigateByUrl(`/tabs/tab1/add/${list.id}`);
    }
  }

  deleteList(list: List){
    this.taskListService.deleteList(list);
  }

 async editList(list: List){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Edit List',
      inputs: [
        {
          name: 'title',
          type: 'text',
          value: list.title
        }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Operation Cenceled');
            this.list.closeSlidingItems();
          }
        },{
          text: 'Update',
          handler: ( data ) => {
            if (data.title.length === 0) {
              return;
            }
            list.title = data.title;
            this.taskListService.saveStorage();
            this.list.closeSlidingItems();
          }
        }]
    });

    await alert.present();
  }

}

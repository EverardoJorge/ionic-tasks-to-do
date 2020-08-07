import { Component, OnInit } from '@angular/core';
import { TaskListService } from 'src/app/services/task-list.service';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { ItemList } from 'src/app/models/item-list.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list: List;
  itemName = '';

  constructor(private taskListService: TaskListService, private route: ActivatedRoute) {
    const idList = this.route.snapshot.paramMap.get('idList');
    // console.log(idList);
    this.list = this.taskListService.getList(idList);
    // console.log(this.list);
  }

  ngOnInit() {
  }

  addItem(){
    if (this.itemName.length === 0) {
      return;
    }
    const newItem = new ItemList(this.itemName);
    this.list.items.push(newItem);
    this.itemName = '';
    this.taskListService.saveStorage();
  }
  changeCheck(item: ItemList){
    // console.log(item);
    const pendings = this.list.items.filter(dataItem => !dataItem.completed).length;
    // console.log({pendings});
    if (pendings === 0) {
      this.list.completedDate = new Date();
      this.list.completed = true;
    }else {
      this.list.completedDate = null;
      this.list.completed = false;
    }
    this.taskListService.saveStorage();
    console.log(this.taskListService.lists);
  }

  delete(i:number){
    this.list.items.splice(i, 1);
    this.taskListService.saveStorage();
  }
}

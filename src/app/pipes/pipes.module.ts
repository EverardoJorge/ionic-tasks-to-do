import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedFilterPipe } from './completed-filter.pipe';



@NgModule({
  declarations: [CompletedFilterPipe],
  exports: [CompletedFilterPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }

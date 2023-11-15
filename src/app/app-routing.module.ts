import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanHoComponent } from 'src/components/can-ho/can-ho.component';
import { CuDanComponent } from 'src/components/cu-dan/cu-dan.component';
import { MainComponent } from 'src/components/main/main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: MainComponent
  // },
  {
    path: 'CuDan',
    component: CuDanComponent
  },
  {
    path: 'CanHo',
    component: CanHoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

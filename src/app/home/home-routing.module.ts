import { RouterModule, Routes } from '@angular/router';
import { NgModule} from '@angular/core';
import { HomeComponent } from './home.component';
import { FeedComponent } from '../feed/feed.component';

const homeRoutes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: FeedComponent},
      { path: 'feed', component: FeedComponent},

    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

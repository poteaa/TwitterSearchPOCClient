import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TweetsComponent } from './tweets.component';
import { TweetItemComponent } from './tweet-item/tweet-item.component';
import { SharedModule } from '../../shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InfiniteScrollModule
  ],
  declarations: [
    TweetsComponent,
    TweetItemComponent
  ]
})
export class TweetsModule { }

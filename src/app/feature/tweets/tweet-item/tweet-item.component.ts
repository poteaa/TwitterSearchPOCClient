import { Component, OnInit, Input } from '@angular/core';
import { Tweet } from './../shared/tweet';
import { TweetsService } from '../shared/tweets.service';

@Component({
  selector: 'app-tweet-item',
  templateUrl: './tweet-item.component.html',
  styleUrls: ['./tweet-item.component.less']
})
export class TweetItemComponent implements OnInit {

  @Input() tweet: Tweet;
  showMoreInfo = false;
  moreInfo = '';

  constructor(private tweetsService: TweetsService) { }

  ngOnInit() {
  }

  showMore() {
    if (this.showMoreInfo) {
      this.showMoreInfo = false;
      return;
    }
    this.tweetsService.getTweet(this.tweet.id)
      .subscribe(
        tweet => {
          console.log('tweet/' + this.tweet.id, tweet);
          this.moreInfo = tweet.text;
          this.showMoreInfo = true;
        },
        error => {
          console.log(`An error ocurred. ${error}`);
        }
      );
  }

  markAsFavorite(id: string) {
    console.log('markAsFavorite');
    this.tweetsService.markAsFavorite(id)
      .subscribe(() => {
        this.tweet.favorite = true;
      });
  }
}

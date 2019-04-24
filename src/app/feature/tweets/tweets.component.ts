import { Component, OnInit } from '@angular/core';
import { TweetsService } from './shared/tweets.service';
import { AuthService } from './../auth/shared/auth.service';
import { Tweet } from './shared/tweet';
import { Constants } from '../../shared/constants';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.less']
})
export class TweetsComponent implements OnInit {
  tweets: Tweet[] = [];
  nextPageQuery = '';
  searchText = '';

  constructor(private tweetsService: TweetsService,
      private authService: AuthService) {
        // this.tweets = [{
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "Coating the night sk..."
        // }, {
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "It's #TaxDay. As a t..."
        // }, {
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "JUST IN: Scientists ..."
        // }, {
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "When we talk about t..."
        // }, {
        //   "username": "NASA JPL",
        //   "nickname": "NASAJPL",
        //   "userImage": "http://pbs.twimg.com/profile_images/1033103993709322240/m7jGqR6X_normal.jpg",
        //   "summary": "During @CassiniSatur..."
        // }, {
        //   "username": "Intl. Space Station",
        //   "nickname": "Space_Station",
        //   "userImage": "http://pbs.twimg.com/profile_images/1057727869370204162/EZOgkXiP_normal.jpg",
        //   "summary": "Former @NASA astrona..."
        // }, {
        //   "username": "Hubble",
        //   "nickname": "NASAHubble",
        //   "userImage": "http://pbs.twimg.com/profile_images/3468011581/efb985f24af0a814a722457a768f3cc5_normal.jpeg",
        //   "summary": "#HubbleClassic Like ..."
        // }, {
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "This might not be We..."
        // }, {
        //   "username": "NASA HQ PHOTO",
        //   "nickname": "nasahqphoto",
        //   "userImage": "http://pbs.twimg.com/profile_images/67630775/button_meatball_normal.png",
        //   "summary": "The @northropgrumman..."
        // }, {
        //   "username": "NASA Earth",
        //   "nickname": "NASAEarth",
        //   "userImage": "http://pbs.twimg.com/profile_images/674396782630014976/qNGmQlRC_normal.png",
        //   "summary": "While you’re waiting..."
        // }, {
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "We’re saddened by th..."
        // }, {
        //   "username": "Hubble",
        //   "nickname": "NASAHubble",
        //   "userImage": "http://pbs.twimg.com/profile_images/3468011581/efb985f24af0a814a722457a768f3cc5_normal.jpeg",
        //   "summary": "Tuesdays starting to..."
        // }, {
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "Our NEOWISE mission ..."
        // }, {
        //   "username": "NASA",
        //   "nickname": "NASA",
        //   "userImage": "http://pbs.twimg.com/profile_images/1091070803184177153/TI2qItoi_normal.jpg",
        //   "summary": "On a mission to find..."
        // }
        // ];
      }

  ngOnInit() {
  }

  search(text: string) {
    if (!this.searchText) {
      return;
    }
    this.tweets = [];
    this.nextPageQuery = '';
    // this.tweetsService.getTweets(text, this.nextPage).subscribe(tweets => {
    this.tweetsService.getTweets(`?q=${text}`)
      .subscribe(
        tweets => this.processTweets(tweets),
        error => {
          console.log(`An error ocurred. ${error}`);
        });
  }

  onScroll() {
    if (!this.searchText) {
      return;
    }
    console.log('scrolled!!');
    // this.tweetsService.getTweets(text, this.nextPage).subscribe(tweets => {
    this.tweetsService.getTweets(this.nextPageQuery)
      .subscribe(tweets => this.processTweets(tweets));
  }

  private processTweets(tweets) {
    console.log(tweets);
    // this.nextPageQuery = tweets.results.next;
    this.nextPageQuery = tweets.search_metadata.next_results;
    // tweets.results.forEach(tweet => {
    tweets.statuses.forEach(tweet => {
      // this.tweetsService.getUser(tweet.user['id_str']).subscribe(user => {
      //   console.log('user:', user);
        this.tweets.push(
          new Tweet(
            tweet.id_str,
            tweet.user.name,
            tweet.user.screen_name,
            tweet.user.profile_image_url,
            tweet.created_at,
            tweet.text,
            tweet.favorited
          ));
        });
      // });
      console.log('tweets count: ', this.tweets.length);
  }

}

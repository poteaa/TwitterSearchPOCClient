import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../../core/http/custom-http.service';
import { Observable } from 'rxjs';
import { Constants } from '../../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  private readonly tweetUrl = 'tweets';
  private readonly usersUrl = 'users';
  private readonly favoritesUrl = 'favorites';

  constructor(private customHttpService: CustomHttpService) { }

  // getTweets(valueToSearch: string, next: string = ''): Observable<any> {
  getTweets(queryString: string): Observable<any> {
    // const params = [
    //   {name: 'query', value: valueToSearch},
    //   {name: 'maxResults', value: Constants.SearchPageSize.toString()}
    // ];
    // if (next) {
    //   params.push({name: 'next', value: next});
    // }
    return this.customHttpService.get(
      `${this.tweetUrl}${queryString}&count=${Constants.SearchPageSize}`,
      // params
      );
  }

  getTweet(id: string): Observable<any>  {
    return this.customHttpService.get(`${this.tweetUrl}/${id}`);
  }

  getUser(id: string): Observable<any>  {
    return this.customHttpService.get(`${this.usersUrl}/${id}`);
  }

  markAsFavorite(id: string) {
    return this.customHttpService.post(this.favoritesUrl, {id: id});
  }
}

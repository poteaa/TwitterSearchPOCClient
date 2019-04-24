import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../../core/http/custom-http.service';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../../../shared/constants';
import { AuthToken } from './auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenReqUrl = 'token';
  public authenticated = new BehaviorSubject<boolean>(false);

  constructor(private customHttpService: CustomHttpService) {
    this.login();
  }

  login() {
    if (!localStorage.getItem(Constants.TokenKey)) {
      this.customHttpService.post<AuthToken, any>(
        this.tokenReqUrl, {}
      )
      .subscribe((res: AuthToken) => {
        console.log(res);
        if (res && res.access_token) {
          localStorage.setItem(Constants.TokenKey, res.access_token);
          this.authenticated.next(true);
        }
      });
    } else {
      this.authenticated.next(true);
    }
  }
}

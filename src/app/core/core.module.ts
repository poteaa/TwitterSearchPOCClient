import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.modle';
import { TweetsModule } from '../feature/tweets/tweets.module';
import { HttpInterceptorService } from './http/http-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    TweetsModule
  ],
  declarations: [],
  exports: [
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ]
})
export class CoreModule { }

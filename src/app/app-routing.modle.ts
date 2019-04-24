import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TweetsComponent } from './feature/tweets/tweets.component';

const appRoutes = [
    { path: '', component: TweetsComponent },
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}

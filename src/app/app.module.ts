import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {ProfileComponent} from './components/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {PostComponent} from './components/post/post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth.service';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {YoutubePostComponent} from './components/youtube-post/youtube-post.component';
import {WallComponent} from './components/wall/wall.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {PassportComponent} from './components/passport/passport.component';
import {TopComponent} from './components/top/top.component';
import {FreshComponent} from './components/fresh/fresh.component';
import {SkeletonComponent} from './components/skeleton/skeleton.component';
import {UserCardComponent} from './components/user-card/user-card.component';
import {NgxCaptchaModule} from 'ngx-captcha';

const loggedRoutes: Routes = [
  {path: '', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'top', component: TopComponent, canActivate: [AuthGuard]},
  {path: 'fresh', component: FreshComponent, canActivate: [AuthGuard]},
  {path: 'passport', component: PassportComponent, canActivate: [AuthGuard]},
  {path: 'user/:userId', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'post/:postId', component: PostComponent, canActivate: [AuthGuard]},
];

const appRoutes: Routes = [
  {path: '', component: SkeletonComponent, children: loggedRoutes, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export function jwtTokenGetter() {
  return localStorage.getItem('jwt_token');
}


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    PostComponent,
    LoginComponent,
    YoutubePostComponent,
    WallComponent,
    RegistrationComponent,
    PassportComponent,
    TopComponent,
    FreshComponent,
    SkeletonComponent,
    UserCardComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgxCaptchaModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
      }
    }),
  ],
  providers: [
    AuthGuard,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

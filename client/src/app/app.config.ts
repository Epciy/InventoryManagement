import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './_services/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideClientHydration(),provideHttpClient(withInterceptors([authInterceptor]))]
};

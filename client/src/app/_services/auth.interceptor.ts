import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //debugger;

  const myToken = localStorage.getItem('auth_token');

  const cloneRequest =  req.clone({
    setHeaders:{
      Authorization: `Bearer ${myToken}`
    }
  });
  return next(cloneRequest);
};
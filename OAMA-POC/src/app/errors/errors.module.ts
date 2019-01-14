import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsHandler } from './errors-handler';
import { JwtInterceptorProvider } from './jwt.interceptor';
import { ErrorInterceptorProvider } from './http-error.interceptor';
import { ErrorComponent } from './error/error.component';
import { ErrorRoutingModule } from './errors-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, RouterModule, ErrorRoutingModule],
  providers: [
    ErrorInterceptorProvider,
    JwtInterceptorProvider,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ]
})
export class ErrorsModule {}

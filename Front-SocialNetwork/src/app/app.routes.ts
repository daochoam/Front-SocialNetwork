import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'wall', canActivate: [AuthGuard], loadComponent: () => import('./views/user-wall/user-wall.component').then(m => m.UserWallComponent) }
];

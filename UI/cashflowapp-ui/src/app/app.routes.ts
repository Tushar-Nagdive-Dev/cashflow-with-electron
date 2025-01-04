import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

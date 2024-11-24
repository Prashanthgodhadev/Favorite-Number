import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full',
    },
    {
        path: 'form',
        component: FormComponent,
    },
    {
        path: '**',
        redirectTo: 'form',
    },
];

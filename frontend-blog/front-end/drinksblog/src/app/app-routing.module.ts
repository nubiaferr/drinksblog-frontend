import { ThemeDeleteComponent } from './delete/theme-delete/theme-delete.component';
import { ThemeEditComponent } from './edit/theme-edit/theme-edit.component';
import { ThemeComponent } from './theme/theme.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'theme', component: ThemeComponent},
  {path: 'theme-edit/:id', component: ThemeEditComponent},
  {path: 'theme-delete/:id', component: ThemeDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

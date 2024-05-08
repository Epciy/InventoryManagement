import { Routes } from '@angular/router';

import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { OrganizationDashboardComponent } from './dashboard/organization-dashboard/organization-dashboard.component';
import { MemberDashboardComponent } from './dashboard/member-dashboard/member-dashboard.component';
import { DashboardLoginComponent } from './dashboard/dashboard-login/dashboard-login.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {MaterialManagementComponent} from './pages/material-management/material-management.component';
import {MemberComponent} from './pages/member/member.component';
import {OrganizationComponent} from'./pages/organization/organization.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RequestComponent} from './pages/request/request.component';
import {CustomizeProfileComponent} from './pages/customize-profile/customize-profile.component';
import { AddUserComponent} from './_shared/add-user/add-user.component';
import { AddOrganizationComponent} from './_shared/add-organization/add-organization.component';
import { AddMaterialComponent} from './_shared/add-material/add-material.component';


import { authGuard } from './_services/auth.guard';
import {roleGuard} from './_services/role.guard';
export const routes: Routes = [
	{
		path:'',
		component:HomeComponent
	
	},
	{
		path:'admin-dashboard',
		children:[
			{	path:'',
			    component:AdminDashboardComponent,
			    canActivate: [authGuard,roleGuard],
			    data: { role: 'admin' },
		    },
			{
				path:'material',
				component:MaterialManagementComponent,
				canActivate: [authGuard,roleGuard],
			    data: { role: 'admin' },
				
			},
			{
				path:'member',
				component:MemberComponent,
				canActivate: [authGuard,roleGuard],
			    data: { role: 'admin' },
			},
			{
				path:'organization',
				component:OrganizationComponent,
				canActivate: [authGuard,roleGuard],
			    data: { role: 'admin' },
			},

		]
	},
	{
		path:'organization-dashboard',
		component:OrganizationDashboardComponent,
		canActivate: [authGuard,roleGuard],
		data: { role: 'organization' },
		children:[
		   { 
				path: 'requests', 
				component: RequestComponent,
				canActivate: [authGuard],
			},

		],

	},
	{
		path:'member-dashboard',
		component:MemberDashboardComponent,
		canActivate: [authGuard,roleGuard],
		data: { role: 'member' },
		
		  

	},
	{
		path:'register',
		component:RegisterComponent,
	},
	{ 
		path: 'login', 
		component:DashboardLoginComponent,
	},
	{
		path: 'login/:userType',
  		component: LoginComponent,
	},
	{
		path:'profile/:userType',
		component:ProfileComponent,
	},
	{
		path:'edit-profile',
		component:CustomizeProfileComponent,
		canActivate: [authGuard],
	},
	{
		path:'add-user',
		component:AddUserComponent,
		canActivate: [authGuard],
	},
	{
		path:'edit-user/:id',
		component:AddUserComponent,
		canActivate: [authGuard],
	},
	{
		path:'add-organization',
		component:AddOrganizationComponent,
		canActivate: [authGuard],
	},
	{
		path:'edit-organization/:id',
		component:AddOrganizationComponent,
		canActivate: [authGuard],
	},
	{
		path:'add-material',
		component:AddMaterialComponent,
		canActivate: [authGuard],
	},
	{ 
		path: 'edit-material/:id', 
		component: AddMaterialComponent,
		canActivate: [authGuard],
	},
	{ 
		path: 'requests', 
			component: RequestComponent,
			canActivate: [authGuard],
	},

];

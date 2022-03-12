import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'details/:id',
		loadChildren: () => import('./pages/details/details.module').then(m => m.DetailsPageModule)
	},
	{
		path: 'chapter/:id',
		loadChildren: () => import('./pages/chapter/chapter.module').then(m => m.ChapterPageModule)
	}
];
@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }

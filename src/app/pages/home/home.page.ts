import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IDetails, INovels } from '../../api/novels.model';
import { NovelsService } from '../../api/novels.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	novels$: Observable<(INovels & IDetails)[]>
	constructor(
		private navCtrl: NavController,
		private novelService: NovelsService,
	) { }

	ngOnInit() {
		this.novels$ = this.novelService.getNovels();
	}

	public openItem(novelId: string): void {
		console.log(novelId);
		this.navCtrl.navigateForward(["details"], {
			queryParams: {
				novelId,
			}
		});
	}

}

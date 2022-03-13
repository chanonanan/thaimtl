import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
	novelId: string;

	constructor(
		private route: ActivatedRoute,
		private navCtrl: NavController,
	) { }

	ngOnInit() {
		this.novelId = this.route.snapshot.queryParamMap.get('novelId');
	}

	public openItem(chapter: number): void {
		this.navCtrl.navigateForward(["chapter"], {
			queryParams: {
				novelId: this.novelId,
				chapter
			}
		});
	}

}

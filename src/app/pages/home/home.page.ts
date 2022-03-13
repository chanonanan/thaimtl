import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	constructor(private navCtrl: NavController) { }

	ngOnInit() {
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

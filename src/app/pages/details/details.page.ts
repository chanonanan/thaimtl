import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
	id: number;

	constructor(
		private route: ActivatedRoute,
		private navCtrl: NavController,
	) { }

	ngOnInit() {
		this.id = +this.route.snapshot.params.id;
	}

	public openItem(itemId: number): void {
		this.navCtrl.navigateForward(["chapter", itemId]);
	}

}

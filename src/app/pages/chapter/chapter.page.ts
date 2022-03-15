import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { NovelsService } from '../../api/novels.service';

@Component({
	selector: 'app-chapter',
	templateUrl: './chapter.page.html',
	styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {
	novelId: string;
	chapter: string;

	content$: Observable<string[]>;
	@ViewChild(IonContent, { static: false }) content: IonContent;

	private loading: HTMLIonLoadingElement;

	constructor(
		private route: ActivatedRoute,
		private novelService: NovelsService,
		private navCtrl: NavController,
		public loadingController: LoadingController,
	) { }

	ngOnInit() {
		this.content$ = this.route.queryParams.pipe(
			distinctUntilChanged(),
			tap(params => {
				this.novelId = params.novelId;
				this.chapter = params.chapter;
				this.novelService.setLastRead(this.novelId, this.chapter);
				this.presentLoading();
			}),
			switchMap(() =>
				this.novelService.getChapter(this.novelId, this.chapter).pipe(
					map(res => res.content.split('\n')),
					tap(() => this.dismissLoading())
				)
			)
		);

	}

	public getDefaultHref() {
		return `/details?novelId=${this.novelId}`;
	}

	public nextChapter() {
		this.navCtrl.navigateForward(["chapter"], {
			queryParams: {
				novelId: this.novelId,
				chapter: +this.chapter + 1,
			}
		});
	}

	async presentLoading() {
		this.loading = await this.loadingController.create({
			cssClass: 'my-custom-class',
			message: 'Please wait...',
		});
		await this.loading.present();
	}

	async dismissLoading() {
		if (this.loading) {
			await this.loading.dismiss();
		}
		if (this.content) {
			this.content.scrollToTop(500);
		}
	}

}

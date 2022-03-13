import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NovelsService } from '../../api/novels.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.page.html',
	styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy {
	novelId: string;
	list$: Observable<{ chapter: number, lastRead: boolean }[]>;

	@ViewChildren("chapterList", { read: ElementRef }) renderedchapterList: QueryList<ElementRef>;

	private timeout;

	constructor(
		private route: ActivatedRoute,
		private navCtrl: NavController,
		private novelService: NovelsService,
	) { }

	ngOnInit() {
		this.novelId = this.route.snapshot.queryParamMap.get('novelId');
		this.list$ = this.novelService.getDetails(this.novelId).pipe(
			map(details => {
				return new Array(details.total).fill(null).map((_, index) => ({
					chapter: index + 1,
					lastRead: details.lastRead === index + 1
				}));
			}),
			tap((list) => this.scrollIntoView(list.find(item => item.lastRead)?.chapter))
		);
	}

	ngOnDestroy() {
		clearTimeout(this.timeout);
	}

	public openItem(chapter: number): void {
		this.navCtrl.navigateForward(["chapter"], {
			queryParams: {
				novelId: this.novelId,
				chapter
			}
		});
	}

	public scrollIntoView(chapter: number) {
		// Make sure that list is already rendered
		this.timeout = setTimeout(() => {
			const chapterToScrollOn = this.renderedchapterList.toArray();
			chapterToScrollOn[chapter - 1].nativeElement.scrollIntoView({behavior: 'smooth'});
		}, 1000);
	}

}

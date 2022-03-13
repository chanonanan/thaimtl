import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-chapter',
	templateUrl: './chapter.page.html',
	styleUrls: ['./chapter.page.scss'],
})
export class ChapterPage implements OnInit {
	novelId: string;
	chapter: string;

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		this.novelId = this.route.snapshot.queryParamMap.get('novelId');
		this.chapter = this.route.snapshot.queryParamMap.get('chapter');
	}

	public getDefaultHref() {
		return `/details?novelId=${this.novelId}`;
	}

}

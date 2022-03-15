import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

	constructor(
		private route: ActivatedRoute,
		private novelService: NovelsService,
	) { }

	ngOnInit() {
		this.novelId = this.route.snapshot.queryParamMap.get('novelId');
		this.chapter = this.route.snapshot.queryParamMap.get('chapter');

		this.content$ = this.novelService.getChapter(this.novelId, this.chapter).pipe(
			map(res => res.content.split('\n')),
		);

	}

	public getDefaultHref() {
		return `/details?novelId=${this.novelId}`;
	}

}

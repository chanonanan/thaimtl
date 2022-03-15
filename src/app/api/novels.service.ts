import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { IChapters, IDetails, INovels } from './novels.model';

@Injectable({
	providedIn: 'root'
})
export class NovelsService {

	constructor(private db: AngularFireDatabase) { }

	getNovels(): Observable<(INovels & IDetails)[]> {
		return this.db.list<INovels>('novels').valueChanges().pipe(
			take(1),
			map(novels => novels.filter(novel => novel.display)),
			switchMap(novels => {
				return combineLatest(this.getNovelName(novels))
			}),
		)
	}

	getDetails(novelId: string): Observable<IDetails> {
		return this.db.object<IDetails>(`details/${novelId}`).valueChanges();
	}

	getChapter(novelId: string, chapter: string): Observable<IChapters> {
		return this.db.object<IChapters>(`chapters/${novelId}/${chapter}`).valueChanges().pipe(take(1));
	}

	setLastRead(novelId: string, chapter: string) {
		this.db.object(`details/${novelId}/lastRead`).set(+chapter);
	}

	private getNovelName(novels: INovels[]) {
		return novels.map(novel => this.getDetails(novel.novelId).pipe(
			map(details => ({
				...novel,
				...details
			}))
		))
	}
}

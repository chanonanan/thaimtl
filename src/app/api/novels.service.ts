import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { IDetails, INovels } from './novels.model';

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
			tap(console.log)
		)
	}

	getDetails(id: string): Observable<IDetails> {
		return this.db.object<IDetails>(`details/${id}`).valueChanges().pipe(take(1));
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

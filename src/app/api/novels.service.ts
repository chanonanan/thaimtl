import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IDetails } from './novels.model';

@Injectable({
	providedIn: 'root'
})
export class NovelsService {

	constructor(private db: AngularFireDatabase) { }

	getDetails(id: string): Observable<IDetails> {
		return this.db.object<IDetails>(`details/${id}`).valueChanges().pipe(take(1));
	}
}

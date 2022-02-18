import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    constructor(private firestore : AngularFirestore){

    }

    agregarAutor(autor : any): Promise<any>{
        return this.firestore.collection('autores').add(autor);
    }

    getAutores(): Observable<any>{
        return this.firestore.collection('autores').snapshotChanges();
    }

    agregarLibro(libros : any): Promise<any>{
        return this.firestore.collection('libros').add(libros);
    }

}
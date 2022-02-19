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

    getLibros(): Observable<any>{
        return this.firestore.collection('libros').snapshotChanges();
    }

    eliminarLibro(id:string){
        return this.firestore.collection('libros').doc(id).delete();
    }

    getLibro(id:string) : Observable<any>{
        return this.firestore.collection('libros').doc(id).snapshotChanges();
    }

    editarLibro(id:string, data:any): Promise<any>{
        return this.firestore.collection('libros').doc(id).update(data);
    }

}
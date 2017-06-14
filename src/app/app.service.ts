import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Appel des routes de l'API
@Injectable()
export class AppService {
  baseUrl = 'http://localhost:8000';

  constructor(private http: Http) { }

  findAnimals() {
    return this.http.get(`${this.baseUrl}/animals`)
      .map(this.extractData); // si quelque chose est attendu en retour de la méthode appelé par la route
  }

  removeAnimal(id: string) {
    return this.http.delete(`${this.baseUrl}/animals/${id}`);
  }


// Route d'edition (l'ID inclus dans le formulaire = payload est envoyé)
  editAnimal(payload) {
    return this.http.put(`${this.baseUrl}/animals/${payload.id}`,{
      name: payload.name
    });
  }

// Route de creation (tout le formulaire = payload est envoyé avec ID et Nom)
  createAnimal(payload) {
    return this.http.post(`${this.baseUrl}/animals`,payload);
  }

  private extractData(res: Response) {
    return res.json();
  }
}

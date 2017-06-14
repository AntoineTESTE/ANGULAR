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


  // Route de récupération de tous les animaux
  findAnimals() {
    return this.http.get(`${this.baseUrl}/animals`)
      .map(this.extractData); // si quelque chose est attendu en retour de la méthode appelé par la route
  }

  // Route de suppression (L'ID est envoyé pour récupérer l'animal en question)
  removeAnimal(id: string) {
    return this.http.delete(`${this.baseUrl}/animals/${id}`);
  }


  // Route d'edition (le formulaire (payload) est envoyé contenant l'animal (l'id pour récupérer l'animal et le nom à insérer))
  editAnimal(payload) {
    return this.http.put(`${this.baseUrl}/animals/${payload.id}`, { // on récupère par l'ID contenu dans le formulaire
      name: payload.name // On insère par le NOM contenu dans le formulaire
    });
  }

  // Route de creation (le formulaire (payload) est envoyé ne contenant que le NOM rentré)
  createAnimal(payload) {
    return this.http.post(`${this.baseUrl}/animals`, payload);
  }

  private extractData(res: Response) {
    return res.json();
  }
}

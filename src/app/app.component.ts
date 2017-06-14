import { Component } from '@angular/core';
import { AppService } from './app.service';



interface Animal {
  id: string;
  name: string;
}


// Le composant fait appel
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})

export class AppComponent {
  animals: Animal;
  form = { name: '' };

  // constructeur des services de l'API
  constructor(
    private appService: AppService
  ) { }

  // Fonction d'initialisation qui se lance au démarrage et lance la fonction Find
  ngOnInit() {
    this.appService.findAnimals()
      .subscribe(
      (animals) => this.animals = animals, // (animals) est ce qui est attendu en retour de fonction
      (err) => console.error(err)
      );
  }

  // Fonction d'initialisation de formulaire (EDIT)
  initForm(animal: any) { // initilisation du champ du formulaire avec un animal en paramètre
    if (animal) { // si un animal est present
      return this.form = Object.assign({}, animal); //retourne cet objet animal
    }
    this.form = { // sinon tu renvoi un champ vide
      name: ''
    }
  }


// Fonction de mise à jour de l'animal
  update(form) { // si tu appui sur SEND tu envoie le formulaire
    this.appService[form.id ? 'editAnimal' : 'createAnimal'](form) // si il n'a uniquement un id dans le formualaire tu envoie la fonction editAnimal sinon tu creer l'animal
      .subscribe(
      () => this.ngOnInit(),
      (err) => console.error(err)
      );
  }



  //Fonction de suppresion de l'animal
  removeAnimal(id: string) { // paramètre passé dans la fonction
    this.appService.removeAnimal(id)
      .subscribe(
      () => this.ngOnInit(), // () indique si l'on attend quelque chose en retour de la fonction
      (err) => console.error(err)
      );
  }

}

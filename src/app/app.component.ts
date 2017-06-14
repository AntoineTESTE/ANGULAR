import { Component } from '@angular/core';
import { AppService } from './app.service';



interface Animal {
  id: string;
  name: string;
}


// Le composant est appelé
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})

export class AppComponent {
  animals: Animal;
  form = { name: '' };
  message: string;

  // constructeur des services de l'API
  constructor(
    private appService: AppService
  ) { }

  // Fonction de démarrage
  ngOnInit() {
    this.appService.findAnimals() // le fonction Find est appelé
      .subscribe( // souscription 
      (animals) => this.animals = animals, // retour = animaux
      (err) => console.error(err) // sinon erreur
      );
  }

  // Fonction d'initialisation de formulaire (EDIT)
  initForm(animal: any) { // initialisation du champ du formulaire avec un animal en paramètre
    if (animal) { // si un animal est present
      return this.form = Object.assign({}, animal); //retourne cet objet animal
    }
    this.form = { // sinon tu renvoi un champ vide (qui peut etre mis à jour)
      name: ''
    }
  }


// Fonction de mise à jour de l'animal
  update(form) { // si tu appui sur SEND tu envoie le formulaire
    const isNew = !form.id;
    this.appService[isNew ? 'createAnimal' : 'editAnimal'](form) // si il qu'un id dans le formulaire tu envoie la fonction editAnimal sinon tu creer l'animal
      .subscribe( // souscription
      () => {
        this.message = `${isNew ? 'created' : 'updated'} successfully`;
        this.ngOnInit();
      }, // retour = fonction d'Init
      (err) => console.error(err)
      );
      
  }



  //Fonction de suppresion de l'animal
  removeAnimal(id: string) { // paramètre passé dans la fonction
    this.appService.removeAnimal(id)
      .subscribe(
      () => this.ngOnInit(),  // retour = fonction d'Init
      (err) => console.error(err)
      );

  }

}

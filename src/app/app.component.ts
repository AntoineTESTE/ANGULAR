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

  ngOnInit() {
    this.appService.findAnimals()
      .subscribe(
        (animals) => this.animals = animals,
        (err) => console.error(err)
      );
  }

  initForm(animal: any) {
    if(animal) {
      return this.form = animal;
    }
    this.form = {
      name: ''
    }
  }

  removeAnimal(id: string) {
    this.appService.removeAnimal(id)
      .subscribe(
        () => this.ngOnInit(),
        (err) => console.error(err)
      );
  }
}

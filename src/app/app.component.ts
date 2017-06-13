import { Component } from '@angular/core';
import {  AppService } from './app.service';



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

    this.appService.removeAnimal()
      .subscribe(
      (animals) => this.animals = animals,
      (err) => console.error(err)

      );
  }
}

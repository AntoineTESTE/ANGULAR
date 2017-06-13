import { Component } from '@angular/core';
import { AppService } from './app.service';

interface Animal {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent {
  animals: Animal;

  constructor(
    private appService: AppService
  ) {}

  ngOnInit() {
    this.appService.findAnimals()
      .subscribe(
        (animals) => this.animals = animals,
        (err) => console.error(err)
      );
  }
}

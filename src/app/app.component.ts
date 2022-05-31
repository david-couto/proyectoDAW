import { Component } from '@angular/core';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gimnasio-app';
  isLogged = false;
  constructor(private tokenService: TokenService) { }
  ngOnInit() {
    this.isLogged = this.tokenService.isLogged();
  }
}

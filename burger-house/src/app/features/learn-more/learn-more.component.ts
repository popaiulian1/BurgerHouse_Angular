import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-learn-more',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './learn-more.component.html',
  styleUrl: './learn-more.component.scss'
})
export class LearnMoreComponent {

  private router = inject(Router);

  navigateToHome(){
    this.router.navigateByUrl('/home');
  }
}

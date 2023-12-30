import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubscriptionInterface } from 'src/app/models/subscription-interface';
import { SubscibersService } from 'src/app/services/subscibers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.scss']
})
export class SubscriptionFormComponent {
  public errorMessage!: string;
  public successMessage!: string;
  constructor(private subscribersService: SubscibersService) { }

  public onSubmit(subForm: NgForm): void {
    const subData: SubscriptionInterface = {
      name: subForm.value.name,
      email: subForm.value.email
    };

    this.subscribersService.addSubscriber(subData).then(() => {
      subForm.reset();
      this.errorMessage = '';
      this.successMessage = 'Thank you for subscribing !!'
    })
    .catch((err: any) => {
      this.errorMessage = 'Email already exists in the subscription list.';
      this.successMessage = ''
    })

  }

}

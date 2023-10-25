import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit{
  
  id:string = 'newCustomer';
  customerForm: FormGroup;
  
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService){
      this.customerForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(6)]),
        birthDay: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email, this.emailValidator()])
      })
  }


  emailValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any } | null => {
      const email: string = control.value;
      if (email && email.indexOf('@ada.com') === -1) {
        return { 'invalidEmailAda': true};
      } return null;
    }
  }

  ngOnInit() {
    const getId = this.route.snapshot.paramMap.get('id');
    if (getId){
      this.id = getId;
      const currentCustomer = this.customerService.getById(this.id);
      
    }
  }

  loadCustomer(id: string) {
    const customersData = localStorage.getItem('customers');
    console.log('customersData:', customersData);
  }

  // save(customer: Customer){
  //   if (this.id === 'newCustomer')
  //   this.customerService.create(customer);
  // else{
  //   customer.id = this.id;
  //   this.customerService.update(customer);
  // }
  // }

  onSubmit(customer: Customer){
    if (this.id === 'newCustomer'){
      this.customerService.create(customer);
    }else{
      customer.id = this.id;
      this.customerService.update(customer);
    }
    this.router.navigate(['customer-list']);
  }
}

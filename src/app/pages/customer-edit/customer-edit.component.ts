import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit{
  
  id:number = -2
  customer: Customer = {
    id: 1,
    name: "",
    birthDay : new Date(),
    email: ""
  }

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService){

  }

  ngOnInit() {
    const getId = this.route.snapshot.paramMap.get('id');
    if (getId){
      this.id = parseInt(getId);
      this.loadCustomer(this.id);
    }
  }

  loadCustomer(id: number) {
    const customersData = localStorage.getItem('customers');
    console.log('customersData:', customersData);
  }

  save(){
      this.customerService.update(this.customer);
      this.router.navigate(['customer-list'])
      
  }


}

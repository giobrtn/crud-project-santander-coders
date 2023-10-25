import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[] = [];
  customer: Customer | null = null;

  constructor() {
    this.loadCustomersFromLocalStorage();
  }

  getList(): Customer[] {
    return this.customers;
  }

  getById(id: string){
    return this.customers.find( customer => customer.id === id);
  }  
  update(customer: Customer) {
    const existingCustomer = this.customers.find(customer => customer.id === customer.id);
    if (existingCustomer) {
      existingCustomer.name = customer.name;
      existingCustomer.email = customer.email;
      existingCustomer.birthDay = customer.birthDay;
    } else {
      this.customers.push(customer);
    }

    this.saveCustomersToLocalStorage();
  }

  delete(id: string) {
    this.customers = this.customers.filter(customer => customer.id !== id);
    this.saveCustomersToLocalStorage();
  }

  create(customer:Customer){

    let uuid = self.crypto.randomUUID();
    customer.id = uuid;
    this.customers.push(customer)
  }

  private saveCustomersToLocalStorage() {
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  private loadCustomersFromLocalStorage() {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      this.customers = JSON.parse(storedCustomers);
      
    }
  }
}

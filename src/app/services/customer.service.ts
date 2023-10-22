import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[] = []
  nextId: number = 1;
  private readonly CUSTOMERS_KEY = 'customers';
  private readonly NEXT_ID_KEY = 'nextId';
  constructor() {

    const customer:Customer = {
      id: 1,
      name: "Giovanni",
      email: "teste@teste.com",
      dateOfBirth: new Date("1996-03-24")
    }

    this.customers.push(customer);
  }

  getList() : Customer[]{
    return JSON.parse(JSON.stringify(this.customers));
  }

  getById(){

  }
  update(){

  }

  delete(id:number): void {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }

  create(customer: Customer): void {
    customer.id = this.nextId++;
    this.customers.push(customer);
    this.saveToLocalStorage();
  }

  private loadFromLocalStorage(): void{
    const storedCustomers = localStorage.getItem(this.CUSTOMERS_KEY);
    const storedNextId = localStorage.getItem(this.NEXT_ID_KEY);

    if (storedCustomers){
      this.customers = JSON.parse(storedCustomers);
    }
    if (storedNextId){
      this.nextId = JSON.parse(storedNextId);
    }
  }

  private saveToLocalStorage(): void{
    localStorage.setItem(this.CUSTOMERS_KEY, JSON.stringify(this.customers));
    localStorage.setItem(this.NEXT_ID_KEY, JSON.stringify(this.nextId));
  }
}

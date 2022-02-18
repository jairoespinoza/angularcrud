import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Customer, Representative } from 'src/app/customer';
import { CustomerService } from 'src/app/customerservice';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AutoresComponent implements OnInit {
  customers: Customer[] = [];

  selectedCustomers: Customer[] = [];

  representatives: Representative[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];


    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers = customers;
            this.loading = false;

        });

    }

}

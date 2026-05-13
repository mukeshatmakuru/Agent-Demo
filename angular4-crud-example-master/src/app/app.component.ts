import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Angular 4 CRUD Example Using Bootstrap Datatable';
  userForm: FormGroup;
  @ViewChild('modalClose') modalClose: ElementRef;

  //Static data, you can change as per your need
  persons: any[] = [
    { id: '1', name: 'Aaron 2Moore', jobTitle: 'Regional Configuration Producer' },
    { id: '2', name: 'Yvonne Conroy Mrs.', jobTitle: 'Global Mobility Orchestrator' },
    { id: '3', name: 'Laron Padberg', jobTitle: 'Senior Directives Supervisor' },
    { id: '4', name: 'Dr. Maryam Spinka', jobTitle: 'Dynamic Mobility Associate' },
    { id: '5', name: 'Kiley Baumbach', jobTitle: 'Principal Metrics Orchestrator' },
    { id: '6', name: 'Hollis MacGyver', jobTitle: 'Direct Markets Assistant' },
    { id: '7', name: 'Axel McLaughlin', jobTitle: 'Forward Mobility Architect' },
    { id: '8', name: 'Ricardo Botsford', jobTitle: 'Direct Quality Consultant' },
    { id: '10', name: 'Corbin Funk Mrs.', jobTitle: 'Human Configuration Manager' },
    { id: '11', name: 'Rosalind Paucek', jobTitle: 'Future Creative Supervisor' },
    { id: '12', name: 'Henderson Moore', jobTitle: 'Internal Accountability Director' },
    { id: '13', name: 'Kelli Schoen', jobTitle: 'National Accountability Architect' },
    { id: '14', name: 'Kenna Fritsch', jobTitle: 'Legacy Response Administrator' },
    { id: '15', name: 'Judge Marquardt', jobTitle: 'Human Program Specialist' },
    { id: '16', name: 'Kurtis Hane', jobTitle: 'International Optimization Director' },
    { id: '17', name: 'Nicolette Lind', jobTitle: 'Legacy Marketing Facilitator' },
    { id: '18', name: 'Idella Green', jobTitle: 'Dynamic Division Orchestrator' },
    { id: '19', name: 'Mackenzie Bartell', jobTitle: 'National Directives Associate' },
    { id: '20', name: 'Mose Kohler', jobTitle: 'Lead Implementation Executive' },
    { id: '21', name: 'Cielo Kuphal', jobTitle: 'Dynamic Division Analyst' },
    { id: '22', name: 'Haleigh Stokes', jobTitle: 'Global Intranet Executive' },
    { id: '23', name: 'Tyrese Walter', jobTitle: 'Senior Web Liason' },
    { id: '24', name: 'Barney Shields', jobTitle: 'District Web Administrator' },
    { id: '25', name: 'Favian Abbott Miss', jobTitle: 'Lead Implementation Facilitator' },
    { id: '26', name: 'Carissa Kunze', jobTitle: 'Regional Division Technician' }
  ];

  displayedUsers: any[] = [];
  itemCount = this.persons.length;
  params = { offset: 0, limit: 10, sortBy: 'name', sortAsc: true };
  formFlag = 'add';

  constructor() {
    this.reloadItems();
  }

  get currentPage(): number {
    return Math.floor(this.params.offset / this.params.limit) + 1;
  }

  get lastPage(): number {
    return Math.ceil(this.itemCount / this.params.limit);
  }

  get pages(): number[] {
    return Array.from({ length: this.lastPage }, (_, i) => i + 1);
  }

  reloadItems(params: { offset?: number; limit?: number; sortBy?: string; sortAsc?: boolean } = {}) {
    this.params = { ...this.params, ...params };
    this.itemCount = this.persons.length;

    const items = [...this.persons];

    if (this.params.sortBy) {
      items.sort((a, b) => {
        const valueA = a[this.params.sortBy];
        const valueB = b[this.params.sortBy];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB);
        }
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      });

      if (!this.params.sortAsc) {
        items.reverse();
      }
    }

    const offset = this.params.offset || 0;
    const limit = this.params.limit || 10;
    this.displayedUsers = items.slice(offset, offset + limit);
  }

  sort(column: string) {
    if (this.params.sortBy === column) {
      this.params.sortAsc = !this.params.sortAsc;
    } else {
      this.params.sortBy = column;
      this.params.sortAsc = true;
    }
    this.reloadItems({ offset: 0 });
  }

  changePage(page: number) {
    if (page < 1 || page > this.lastPage) {
      return;
    }
    this.reloadItems({ offset: (page - 1) * this.params.limit });
  }

  rowClick(item: any) {
    console.log('Clicked: ' + item.name);
  }

  rowDoubleClick(item: any) {
    alert('Double clicked: ' + item.name);
  }

  rowTooltip(item: any) {
    return item.jobTitle;
  }

  // Init method
  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      jobTitle: new FormControl(null, Validators.required)
    });
  }

  initUser() {
    this.userForm.reset();
    this.formFlag = 'add';
  }

  // Save user's data
  saveUser() {
    if (this.formFlag === 'add') {
      this.userForm.value.id = this.persons.length + 1;
      this.persons.unshift(this.userForm.value);
    } else {
      const index = this.persons.findIndex(x => x.id === this.userForm.value.id);
      if (index !== -1) {
        this.persons[index] = this.userForm.value;
      }
    }
    this.reloadTableManually();
    this.modalClose.nativeElement.click();
    this.userForm.reset();
  }

  // Get data while edit
  getData(item: any) {
    this.userForm.patchValue(item);
    this.formFlag = 'edit';
  }

  // Delete user's data
  delData(item: any) {
    this.persons.splice(this.persons.indexOf(item), 1);
    this.reloadTableManually();
  }

  // Reload table manually after add/edit
  reloadTableManually() {
    this.reloadItems();
  }
}

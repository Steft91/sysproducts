import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  
  constructor() { }
  
  ngOnInit(): void {
    // Any initialization logic can go here
  }
}

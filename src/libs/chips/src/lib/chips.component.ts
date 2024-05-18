import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@scifi/material/material.module';
import { RouterModule } from '@angular/router';
import { Product } from '@scifi/product';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.sass'],
})
export class ChipsComponent {
  @Input() product: Product | undefined;
}

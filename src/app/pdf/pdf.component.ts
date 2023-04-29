import { Component } from '@angular/core';
import { PdfService } from '../_services/pdf.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  constructor(private pdfService: PdfService) {}

  generatePdf(): void {
    this.pdfService.generatePdf();
  }

}

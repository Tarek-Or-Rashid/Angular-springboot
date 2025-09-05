import { Component, OnInit } from '@angular/core';
import { WorkProgress } from '../model/work-pogress.model';
import { WorkProgressService } from '../service/work-pogress.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-work-report',
  templateUrl: './work-report.component.html',
  styleUrls: ['./work-report.component.css']
})
export class WorkReportComponent implements OnInit {
  reportList: any[] = [];
  tenderIdForReport: number = 0;
  private baseUrl = 'http://localhost:8080/api/workprogress';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getWorkReport() {
    if (!this.tenderIdForReport) {
      alert('Please enter a valid Tender ID');
      return;
    }

    this.http.get<any[]>(`${this.baseUrl}/work-report/${this.tenderIdForReport}`)
      .subscribe(
        data => {
          this.reportList = data;
        },
        err => {
          console.error(err);
          alert('Failed to fetch work report');
        }
      );
  }

}

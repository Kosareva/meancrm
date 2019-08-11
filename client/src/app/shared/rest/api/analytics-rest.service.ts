import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OverviewPage} from "../../types/OverviewPage";
import {AnalyticsPage} from "../../types/AnalyticsPage";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsRestService {

  constructor(private http: HttpClient) {
  }

  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>(`api/analytics/analytics`);
  }

  getOverview(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>(`api/analytics/overview`);
  }

}

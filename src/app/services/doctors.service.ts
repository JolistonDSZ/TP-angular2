import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medecin } from '../types/medecin';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  httpClient = inject(HttpClient);

  getDoctors(): Observable<Medecin[]> {
    return this.httpClient.get<Medecin[]>('http://localhost:8080/restGSB/medecins?nom=');
  }
}

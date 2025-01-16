import { Component, DestroyRef, inject, OnInit  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Medecin } from './types/medecin';
import { DoctorsService } from './services/doctors.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DoctorComponent } from './doctor/doctor.component';
import { FormControl,ReactiveFormsModule, FormsModule  } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DoctorComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  private readonly doctorsService = inject(DoctorsService);
  private readonly destroyRef = inject(DestroyRef);
  filteredMedecins!: Medecin[];
  medecins!: Medecin[];
  searchDoctorControl = new FormControl<string | null>(null);
  
  

  ngOnInit(): void {
    this.doctorsService.getDoctors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((medecins) => {
      this.medecins = medecins;
      this.filteredMedecins = medecins;
    });
  }

  searchDoctor(): void {
    const name = this.searchDoctorControl.value;
    if (!name) {
      this.filteredMedecins = this.medecins;
      return;
    }
    this.filteredMedecins = this.medecins.filter((medecin) => medecin?.nom.toLowerCase().includes(name.toLowerCase()));
    console.log(this.filteredMedecins);
  }
}

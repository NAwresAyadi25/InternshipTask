import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApieventService } from 'src/app/apievent.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: ApieventService) { }

  ngOnInit(): void {
    this.createEventForm();
  }

  createEventForm() {
    this.eventForm = this.fb.group({
      clubName: ['', Validators.required],
      startDate: [null, Validators.required],
      finishDate: [null, Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      isVirtual: [false],
      isPhysical: [false],
      location: this.fb.group({
        state: [''],
        placeName: [''],
        placeLink: [''],
        locationDescription: [''],
      }),
      virtualDetails: this.fb.group({
        application: [''],
        applicationLink: [''],
      }),
    });

    // Subscribe to changes in the isVirtual and isPhysical checkboxes
    this.eventForm.get('isVirtual')!.valueChanges.subscribe((isVirtual: boolean) => {
      this.toggleVirtualControls(isVirtual);
    });

    this.eventForm.get('isPhysical')!.valueChanges.subscribe((isPhysical: boolean) => {
      this.togglePhysicalControls(isPhysical);
    });
  }

  toggleVirtualControls(isVirtual: boolean) {
    const virtualDetailsControl = this.eventForm.get('virtualDetails');

    if (virtualDetailsControl) {
      if (isVirtual) {
        virtualDetailsControl.enable();
      } else {
        virtualDetailsControl.disable();
      }
    }
  }

  togglePhysicalControls(isPhysical: boolean) {
    const locationControl = this.eventForm.get('location');

    if (locationControl) {
      if (isPhysical) {
        locationControl.enable();
      } else {
        locationControl.disable();
      }
    }
  }

  onSubmit() {
    this.service.addevent(this.eventForm.value).subscribe((data: any) => {
      console.log("added");
    });
  }
}

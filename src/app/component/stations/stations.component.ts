import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StationsService } from '../../shared/services/stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
  stationsList: any;
  stationToBeUpdated: any;
  isCreateStation: boolean = true;
  stationsForm!: FormGroup;

  constructor(
    private stationsService: StationsService,
    private modalService: NgbModal
  ) {
    this.stationsForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllStations();
  }

  getAllStations() {
    this.stationsService.getstations().subscribe(
      (res) => {
        this.stationsList = res;
      },
      (error) => {
        alert(error);
      }
    );
  }

  // Open Create Station Modal.
  openCreateStationModal() {
    this.isCreateStation = true;
    this.stationsForm.reset();
  }

  openEditStationModal(station: any) {
    this.isCreateStation = false;
    this.stationsForm.patchValue(station);
    this.stationToBeUpdated = station;
  }

  createStation() {
    this.stationsService.creatstation(this.stationsForm.value).subscribe(
      (res) => {
        this.getAllStations();
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  editStation() {
    this.stationsService
      .updatestation(this.stationToBeUpdated.id, this.stationsForm.value)
      .subscribe(
        (res) => {
          this.getAllStations();
        },
        (error) => {
          alert(error.error.error);
        }
      );
  }

  deleteStation(id: string) {
    this.stationsService.deletestation(id).subscribe(
      (res) => {
        this.getAllStations();
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }
}

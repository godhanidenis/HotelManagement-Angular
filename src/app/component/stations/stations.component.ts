import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StationsService } from '../../shared/services/stations.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent implements OnInit {
  stationsList: any;
  closeResult = '';
  stationId = '';
  createStation: boolean = false;
  stationsForm = new FormGroup({
    name: new FormControl(''),
    comment: new FormControl(''),
  });
  constructor(
    private stationsService: StationsService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllStatiions();
  }

  getAllStatiions() {
    this.stationsService.getstations().subscribe(
      (res) => {
        this.stationsList = res;
      },
      (error) => {
        alert(error);
      }
    );
  }

  open(content: any, condition: boolean) {
    this.createStation = condition;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.stationsService
      .creatstations(this.stationsForm.value)
      .subscribe((res) => {
        this.getAllStatiions();
      });
  }
  editStation(content: any, station: any) {
    this.open(content, true);
    this.stationsForm.patchValue(station);
    this.stationId = station.id;
  }
  editStationForm() {
    this.stationsService
      .updatestations(this.stationId, this.stationsForm.value)
      .subscribe((res) => {
        this.getAllStatiions();
      });
  }

  deleteStation(id: string) {
    this.stationsService.deletestations(id).subscribe(
      (res) => {
        this.getAllStatiions();
      },
      (error) => {
        alert(error);
      }
    );
  }
}

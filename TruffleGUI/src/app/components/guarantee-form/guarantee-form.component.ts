import {Component, Input, OnChanges, Output, OnDestroy, OnInit, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'guarantee-form',
  templateUrl: './guarantee-form.component.html',
  styleUrls: ['./guarantee-form.component.scss']
})
export class GuaranteeFormComponent implements OnChanges {
  @Input() data: any;
  @Input() modalType: string;
  @Output() postNewRequest: EventEmitter<any> = new EventEmitter();
  @Output() updateRequest: EventEmitter<any> = new EventEmitter();
  newGuarantee: FormGroup;
  state: any[] = [
    {
      label: "המבקש",
      value: "המבקש",
    },
    {
      label: "הבנק",
      value: "הבנק",
    },
    {
      label: "המוטב",
      value: "המוטב",
    },
  ];

  // bank dropdown options
  requestsStates: any[];
  selectedRequestsStates: string;
  cancelReason: string;
  terminateReason: string;
  newValue: number;
  newDate: string;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.requestsStates = [
      {
        label: 'בחר גורם מטפל',
        value: null
      },
      {
        label: 'יעוץ משפטי',
        value: 'יעוץ משפטי'
      },
      {
        label: 'ניהול אשראי שוטף',
        value: 'ניהול אשראי שוטף'
      },
      {
        label: 'מנהל קשרי לרקוחות',
        value: 'מנהל קשרי לרקוחות'
      }
    ]
  }

  createForm() {
    if(isNullOrUndefined(this.data)){
      this.newGuarantee = this.fb.group({
        userName: '',
        userId: '',
        userAddress: '',
        beneficiary: '',
        beneficiaryAddress: '',
        purpose: '',
        amount: '',
        startDate: '',
        endDate: ''
      })
    }
  }

  onBasicUploadAuto(e) {
    console.log('e', e);
    console.log('File Uploaded');
  }

  submitGuarantee() {
    console.log('this.newGuarantee', this.newGuarantee);
    let formValues = Object.assign({}, this.newGuarantee.value);
    this.postNewRequest.emit(formValues);
  }

  ngOnChanges() {
    this.newGuarantee.reset();
    this.selectedRequestsStates = '';
    this.cancelReason = '';
    this.terminateReason = '';
  }

  changeRequest(type) {
    let eventData = {
      type: type,
      requestId: this.data.GRequestID,
      guaranteeId: '',
      details: '',
      update: {}
    };

    switch (type) {
      case 'withdrawal':
        break;
      case 'updateBank':
        eventData.details = this.selectedRequestsStates;
        break;
      case 'accept':
        break;
      case 'reject':
        eventData.details = this.cancelReason;
        break;
      case 'terminate':
        eventData.details = this.terminateReason;
        break;
      case 'guaranteeUpdate':
        eventData.update = {
          date: this.newDate,
          amount: this.newValue
        };
        break;
    }

    this.updateRequest.emit(eventData);
}
}

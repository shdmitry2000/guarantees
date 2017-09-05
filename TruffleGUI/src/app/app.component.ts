import { Component, HostListener, NgZone } from '@angular/core';
const Web3 = require('web3');
const contract = require('truffle-contract');
const metaincoinArtifacts = require('../../build/contracts/MetaCoin.json');
import { canBeNumber } from '../util/validation';

import {allRequests, allRequests as Requests} from '../../tempData/data';
import {GRequest} from "./interfaces/request";
import {isNullOrUndefined} from "util";

declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  MetaCoin = contract(metaincoinArtifacts);

  // TODO add proper types these variables
  account: any;
  accounts: any;
  web3: any;

  balance: number;
  myRequests: GRequest[];
  data: any; // Dialog data
  openFormDialog: boolean = false; // show dialog
  modalType: string = 'user'; // dialog types
  sendingAmount: number;
  recipientAddress: string;
  status: string;
  canBeNumber = canBeNumber;

  constructor(private _ngZone: NgZone) {

  }

  @HostListener('window:load')
  windowLoaded() {
    /** setup web3 connection and get accounts **/
    // this.checkAndInstantiateWeb3();
    // this.onReady();

    // TODO - remove after binded to web3
    // skipping to bind to gui
    this.getAllGRequests();
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      console.warn(
        'Using web3 detected from external source. If you find that your accounts don\'t appear or you have 0 MetaCoin, ensure you\'ve configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.warn(
        'No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it\'s inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
      );
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
    }
  };

  onReady = () => {
    // Bootstrap the MetaCoin abstraction for Use.
    this.MetaCoin.setProvider(this.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        alert('There was an error fetching your accounts.');
        return;
      }

      if (accs.length === 0) {
        alert(
          'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
        );
        return;
      }
      this.accounts = accs;
      this.account = this.accounts[0];

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() => {
        this.getAllGRequests();
        this.getAllGuarantees();
      });
    });
  };

  getAllGuarantees = () => {

  };

  getAllGRequests = () => {
    /** Get current user balance */
    /** re-write to get user Grequests and guarantees */
    // let meta;
    // this.MetaCoin
    //   .deployed()
    //   .then(instance => {
    //     meta = instance;
    //     return meta.getBalance.call(this.account, {
    //       from: this.account
    //     });
    //   })
    //   .then(value => {
    //     this.balance = value;
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     this.setStatus('Error getting balance; see log.');
    //   });
    this.myRequests = allRequests;
  };

  getGRequestData = (GRequestId, type: number) => {
    //type = user, bank or beneficiary
  };

  getGuaranteesData = (GRequestId, type: number) => {
    //type = user, bank or beneficiary
  };

  withdrawalRequest = (requestId) => {
    // ביטול של יוזר
  };

  rejectRequest = (requestId) => {
    // ביטול של בנק
  };

  terminateRequest = (requestId) => {
    // ביטול של מוטב
  };

  guaranteeUpdateRequest = () => {

  };

  acceptRequest = (requestId) => {
    // אישור של בנק
  };

  setStatus = message => {
    this.status = message;
  };

  createRequest = () => {
    const amount = this.sendingAmount;
    const receiver = this.recipientAddress;
    let meta;

    this.setStatus('Initiating transaction... (please wait)');

    this.MetaCoin
      .deployed()
      .then(instance => {
        meta = instance;
        return meta.sendCoin(receiver, amount, {
          from: this.account
        });
      })
      .then(() => {
        this.setStatus('Transaction complete!');
        // this.getAllGRequests();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error sending coin; see log.');
      });
  };

  /** Handle form modal */
  openModal(e) {
    console.log('e', e);
    this.modalType = e.user;
    if(!isNullOrUndefined(e.request)) {
      this.data = e.request
    }
    this.openFormDialog = true;
console.log('this.openFormDialog', this.openFormDialog);
  }

  clearData() {
    this.data = null;
  }
}

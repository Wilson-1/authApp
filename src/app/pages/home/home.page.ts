import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { NetworkService } from '../../services/network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage implements OnDestroy {
  estadoOnline = true;
  private netSub?: Subscription;

  constructor(private net: NetworkService) {
    this.netSub = this.net.isOnline$.subscribe(flag => {
      this.estadoOnline = flag;
    });
  }

  ngOnDestroy() {
    this.netSub?.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.component/auth.service';
import { Subscription } from 'rxjs-compat/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataStorageService, private authService: AuthService,
    private router: Router) { }
  
  isAuthenticated = false;
  private userSub: Subscription;

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user => {
      this.isAuthenticated = !!user;
    })
  }
  onSaveData(){
    this.dataService.storeExercises();
  }

  logout(){
    this.authService.logout();
  }

  onFetchData(){
    this.dataService.fetchExercises();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}

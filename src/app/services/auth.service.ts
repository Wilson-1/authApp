import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userData = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userData.asObservable();

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, user => {
      this.userData.next(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // Registro con correo y contraseña
  register(email: string, pass: string) {
    return createUserWithEmailAndPassword(this.auth, email, pass);
  }

  // Login con correo y contraseña
  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // Alias para cumplir con loginWithEmail (útil para tu login.page.ts)
  loginWithEmail(email: string, pass: string) {
    return this.login(email, pass);
  }

  // Login con Facebook
  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Login con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  // Cerrar sesión
  logout() {
    return signOut(this.auth);
  }

  // Verifica si hay usuario logueado
  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}

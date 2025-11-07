import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name: string;
  family_name: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: any;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private isInitialized = false;
  private authStateSubject = new BehaviorSubject<boolean>(false);
  public authState$ = this.authStateSubject.asObservable();
  private tokenClient: TokenClient | null = null;

  constructor() {
    this.checkAuthState();
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('authToken');
    this.authStateSubject.next(!!token);
  }

  private getCurrentOrigin(): string {
    return window.location.origin;
  }

  private validateOrigin(): boolean {
    const currentOrigin = this.getCurrentOrigin();
    const allowedOrigins = [
      'http://localhost:4200',
      'https://localhost:4200',
      'https://chikex.me'
    ];

    return allowedOrigins.includes(currentOrigin);
  }
  async initializeGoogleAuth(): Promise<void> {
    if (this.isInitialized) return;

    if (!this.validateOrigin()) {
      console.warn('Current origin not in allowed list:', this.getCurrentOrigin());
    }

    return new Promise((resolve, reject) => {
      // Check if Google Identity Services is already loaded
      if (window.google?.accounts?.id) {
        this.configureGoogleAuth();
        resolve();
        return;
      }

      // Load Google Identity Services script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Wait a bit for the library to fully initialize
        setTimeout(() => {
          if (window.google?.accounts?.id) {
            this.configureGoogleAuth();
            resolve();
          } else {
            reject(new Error('Google Identity Services failed to initialize'));
          }
        }, 100);
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services script'));
      };

      document.head.appendChild(script);
    });
  }

  private configureGoogleAuth(): void {
    if (!window.google?.accounts?.id) {
      console.error('Google Identity Services not available');
      return;
    }

    try {
      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: environment.googleClientId,
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: 'popup'
      });

      // Initialize OAuth2 token client for popup flow
      if (window.google.accounts.oauth2) {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: environment.googleClientId,
          scope: 'email profile openid',

        });
      }

      this.isInitialized = true;
      console.log('Google Identity Services initialized successfully');
    } catch (error) {
      console.error('Error configuring Google Auth:', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<GoogleUser> {
    await this.initializeGoogleAuth();

    return new Promise((resolve, reject) => {
      if (!window.google?.accounts?.id) {
        reject(new Error('Google Identity Services not available'));
        return;
      }

      // Try One Tap first
      this.tryOneTapSignIn()
        .then(resolve)
        .catch(() => {
          // Fallback to popup flow
          console.log('One Tap failed, falling back to popup');
          this.signInWithPopup()
            .then(resolve)
            .catch(reject);
        });
    });
  }

  private tryOneTapSignIn(): Promise<GoogleUser> {
    return new Promise((resolve, reject) => {
      if (!window.google?.accounts?.id) {
        reject(new Error('Google Identity Services not available'));
        return;
      }

      // Set up callback for ential response
      window.google.accounts.id.initialize({
        client_id: environment.googleClientId,
        callback: (response: CredentialResponse) => {
          try {
            const user = this.decodeCredentialResponse(response);
            resolve(user);
          } catch (error) {
            reject(error);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // Show the One Tap prompt
      window.google.accounts.id.prompt((notification: PromptMomentNotification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          const reason = notification.getNotDisplayedReason?.() || notification.getSkippedReason?.() || 'Unknown reason';
          console.log('One Tap not displayed:', reason);
          reject(new Error(`One Tap not available: ${reason}`));
        }
      });
    });
  }

  private signInWithPopup(): Promise<GoogleUser> {
    return new Promise((resolve, reject) => {
      if (!this.tokenClient) {
        reject(new Error('Token client not initialized'));
        return;
      }

      // Set up the callback for this specific request
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: environment.googleClientId,
        scope: 'email profile openid',
        callback: async (response: TokenResponse) => {
          if (response.access_token) {
            try {
              const user = await this.fetchUserProfile(response.access_token);
              resolve(user);
            } catch (error) {
              reject(error);
            }
          } else {
            reject(new Error('Failed to get access token'));
          }
        },
        error_callback: (error: any) => {
          console.error('OAuth2 error:', error);
          reject(new Error(error.error || 'Google Sign-In failed'));
        }
      });

      // Request access token
      tokenClient.requestAccessToken();
    });
  }

  private async fetchUserProfile(accessToken: string): Promise<GoogleUser> {
    try {
      const response = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
      }

      const userInfo = await response.json();

      return {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        given_name: userInfo.given_name,
        family_name: userInfo.family_name
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  }

  private decodeCredentialResponse(response: CredentialResponse): GoogleUser {
    const payload = this.decodeJwtPayload(response.credential);

    if (!payload) {
      throw new Error('Invalid credential response');
    }

    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      given_name: payload.given_name,
      family_name: payload.family_name
    };
  }

  private decodeJwtPayload(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT payload:', error);
      throw new Error('Failed to decode JWT payload');
    }
  }

  async authenticateWithBackend(userData: any): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();

      if (result.success && result.token) {
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.authStateSubject.next(true);
      }

      return result;
    } catch (error) {
      console.error('Backend authentication error:', error);
      throw error;
    }
  }

  signOut(): void {
    // Clear local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.authStateSubject.next(false);

    // Disable Google auto-select
    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.disableAutoSelect();
      } catch (error) {
        console.warn('Error disabling Google auto-select:', error);
      }
    }
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Method to revoke Google access token
  revokeGoogleAccess(accessToken: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.google?.accounts?.oauth2) {
        reject(new Error('Google OAuth2 not available'));
        return;
      }

      window.google.accounts.oauth2.revoke(accessToken, () => {
        resolve();
      });
    });
  }

  // Method to check if Google Identity Services is loaded
  isGoogleLoaded(): boolean {
    return !!(window.google?.accounts?.id);
  }
}
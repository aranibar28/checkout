import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
  getStore(key: string) {
    return window.localStorage.getItem(key);
  }
  setStore(key: string, data: any) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}

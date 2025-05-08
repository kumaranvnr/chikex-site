import * as cookies from 'browser-cookies';
import * as CryptoJS from 'crypto-js';

export class CookieStore {

    static access_token_key = 'UKM98';
    static role_key = 'BTBBV';
    static userinfo_key = 'UYHNsd';
    static enc_key = 'UTYMNRDSFEWVBN';
    static saveAccessToken(token: string): void {
        this.clearBearerToken();
        if (localStorage) {
            localStorage.setItem(this.access_token_key, token);
        } else {
            cookies.set(this.access_token_key, token);
        }
    }

    static getBearerToken(): string | null {
        if (localStorage && localStorage.getItem(this.access_token_key)) {
            return 'Bearer ' + localStorage.getItem(this.access_token_key);
        } else {
            const cookie = cookies.get(this.access_token_key);
            if (cookie) {
                return 'Bearer ' + cookie;
            }
            return null;
        }
    }

    static getBasicToken(): string | null {
        return 'Basic f02e2a9eef1f8a3fcab097e011eccb8cfb9e3110';
    }

    static getToken(): string | null {
        if (localStorage && localStorage.getItem(this.access_token_key)) {
            return localStorage.getItem(this.access_token_key);
        } else {
            const cookie = cookies.get(this.access_token_key);
            if (cookie) {
                return cookie;
            }
            return null;
        }
    }

    static clearBearerToken(): void {
        if (localStorage) {
            localStorage.removeItem(this.access_token_key);
            localStorage.removeItem(this.userinfo_key);
            localStorage.removeItem(this.role_key);
        } else {
            cookies.set(this.access_token_key, '');
            cookies.set(this.userinfo_key, '');
            cookies.set(this.role_key, '');
        }
    }

    static encrypt(val: string): string {
        const data = btoa(val);
        return CryptoJS.AES.encrypt(data, this.enc_key).toString();
    }
    static decrypt(val: string): string {
        const data = CryptoJS.AES.decrypt(val, this.enc_key).toString(CryptoJS.enc.Utf8);
        return atob(data);
    }
    static saveUserInfo(userinfo: any): void {
        this.clearUserInfo();
        let roles: string[] = [];
        if (userinfo.groups && userinfo.groups.length > 0) {
            const portal_group = userinfo.groups.find((c: any) => c.group_id === 'chikex_erp');
            if (portal_group && portal_group.roles && portal_group.roles.length > 0) {
                roles = portal_group.roles;
            }
        }
        if (localStorage) {
            localStorage.setItem(this.userinfo_key, this.encrypt(JSON.stringify(userinfo)));

            if (roles && roles.length > 0) {
                localStorage.setItem(this.role_key, this.encrypt(JSON.stringify(roles)));
            }
        } else {
            cookies.set(this.userinfo_key, this.encrypt(JSON.stringify(userinfo)));
            if (roles && roles.length > 0) {
                cookies.set(this.role_key, this.encrypt(JSON.stringify(roles)));
            }
        }
    }

    static getUserInfo(): any {
        if (localStorage && localStorage.getItem(this.userinfo_key)) {
            const userinfo = localStorage.getItem(this.userinfo_key);
            if (userinfo) {
                return JSON.parse(this.decrypt(userinfo));
            } else {
                return null;
            }
        } else {
            const cookie = cookies.get(this.userinfo_key);
            if (cookie) {
                return JSON.parse(this.decrypt(cookie));
            }
            return null;
        }
    }

    static clearUserInfo(): void {
        if (localStorage) {
            localStorage.removeItem(this.userinfo_key);
            localStorage.removeItem(this.role_key);
        } else {
            cookies.set(this.userinfo_key, '');
            cookies.set(this.role_key, '');
        }
    }

    static clearAllStorage() {
        if (localStorage) {
            var cache_length = localStorage.length;
            var items_to_remove = [];
            for (let index = 0; index < cache_length; index++) {
                const saved_key = localStorage.key(index);
                if (saved_key) {
                    items_to_remove.push(saved_key)
                }
            }
            for (const item_to_remove of items_to_remove) {
                localStorage.removeItem(item_to_remove)
            }
        }
    }

    static getRoles(): string[] | null {
        if (localStorage && localStorage.getItem(this.role_key)) {
            const roles = localStorage.getItem(this.role_key);
            if (roles) {
                return JSON.parse(this.decrypt(roles));
            }
            return null;
        } else {
            const cookie = cookies.get(this.role_key);
            if (cookie) {
                return JSON.parse(this.decrypt(cookie));
            }
            return null;
        }
    }

    static isRoleExists(roles_to_check: string[]): boolean {
        let present = false;
        const roles = this.getRoles();
        if (roles && roles.length > 0) {
            for (const role_to_check of roles_to_check) {
                if (roles.find(c => c === role_to_check)) {
                    present = true;
                }
            }
        }
        return present;
    }

    static getCacheKey(key: any) {
        const cache_key = (<any>window).cache_key || 'default';
        key = "v-" + cache_key + "-" + key
        return key;
    }

    static async saveDataAsync(key: string, data: any): Promise<any> {
        try {
            key = this.getCacheKey(key);
            if (localStorage) {
                localStorage.setItem(key, JSON.stringify(data));
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }

        } catch (error) {
            return Promise.resolve(false);
        }

    }

    static async getDataAsync(key: string): Promise<any> {

        try {
            key = this.getCacheKey(key);
            if (localStorage && localStorage.getItem(key)) {
                const data = localStorage.getItem(key);
                if (data) {
                    return Promise.resolve(JSON.parse(data));
                }
            }

            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }

    }

    static clearDataAsync(key: string) {
        key = this.getCacheKey(key);
        if (localStorage && localStorage.getItem(key)) {
            localStorage.removeItem(key);
        } else {
            cookies.set(key, '');
        }

    }

}

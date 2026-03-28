
export class CommonErrorHelper {
    static read = 'read';
    static save = 'save';
    static update = 'update';
    static delete = 'delete';

    static handleErrorMessagge(error: any, type: string, message: string = ''): string {
        if (error.error && error.error.error && error.error.error.error_description) {
            return error.error.error.error_description;
        } else {
            if (message) {
                return message;
            }
            if (type === this.save) {
                return 'Error while save data';
            } else if (type === this.update) {
                return 'Error while update data';
            } else if (type === this.delete) {
                return 'Error while delete data';
            } else if (type === this.read) {
                return 'Error while read data';
            } else {
                return '';
            }

        }
    }
}

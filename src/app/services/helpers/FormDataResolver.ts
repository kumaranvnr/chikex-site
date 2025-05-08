import { FormArray, FormGroup } from '@angular/forms';

export class FromDataResolver {
    static getFormArray(form: any, name: string): FormArray {
        return form.get(name) as FormArray;
    }

    static getFormArrayControlls(form: any, name: string): FormGroup[] {
        return (form.get(name) as FormArray).controls as FormGroup[];
    }



    static getFormGroup(form: any, name: string): FormGroup {
        return form.get(name) as FormGroup;
    }

    // getDetailsArrayFromArray(form_array: any[], index: number, name: string) {
    //     return (<FormArray>form_array.controls[index].get(name)).controls;
    // }

    static getValueFromFromGroup(form: any, name: string): any {
        return this.getFormGroup(form, name).value;
    }


    static identify(index: number, item: any): number {
        return index;
    }

}

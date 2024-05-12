import { FormControl, FormGroup } from '@angular/forms';

export type AddressFormGroup = FormGroup<{
  addressLine1: FormControl<string | null>;
  addressLine2: FormControl<string | null>;
  city: FormControl<string | null>;
  county: FormControl<string | null>;
  postcode: FormControl<string | null>;
}>;

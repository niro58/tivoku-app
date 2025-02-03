import type TextInput from './variant/default/TextInput.svelte';
import type A11yNotice from './variant/accessibility/A11yNotice.svelte';
import type A11ySingleNotice from './variant/accessibility/A11ySingleNotice.svelte';
import type Input from './variant/default/Input.svelte';
import type Wrapper from './variant/default/Wrapper.svelte';
import type PickerIndicator from './variant/default/PickerIndicator.svelte';
import type NullabilityCheckbox from './variant/default/NullabilityCheckbox.svelte';

export type Components = {
	pickerIndicator: typeof PickerIndicator;
	textInput: typeof TextInput;
	input: typeof Input;
	nullabilityCheckbox: typeof NullabilityCheckbox;
	wrapper: typeof Wrapper;

	a11yNotice?: typeof A11yNotice;
	a11ySingleNotice?: typeof A11ySingleNotice;
};

export type A11yColor = {
	placeholder?: string;
	size?: 'normal' | 'large';
} & (
	| {
			textHex: string;
			bgHex?: string;
			reverse: true;
	  }
	| {
			bgHex?: string;
			reverse?: false;
	  }
);

export type A11yColorContract = A11yColor & {
	contrast?: number;
};

import { IContainerStyle } from '../common'

export interface IFormFieldProps {
    title?: string;
    type?: FormFieldTypes;
    placeholder?: string;
    drowDownValues?: Array<string>;
}

export interface IFormFieldWrapperProps {
    formFields: Array<IFormFieldProps>;
    containerStyle?: IContainerStyle;
    style?: string;
}

export interface IFormFieldPropsValues {
}
  
export const FormFieldTypes = {
    "paragraph": "paragraph" as "paragraph",
    'radio': "radio" as "radio",
    'text': "text" as "text",
    'drop-down': "drop-down" as "drop-down"
};
  
export type FormFieldTypes = typeof FormFieldTypes[keyof typeof FormFieldTypes];
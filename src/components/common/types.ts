import { IContainerStyle } from '../';

export interface ITextStyle {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
}

export interface IContainerStyle {
    borderRadius?: string;
    width?: string;
    minWidth?: string;
    padding?: string;
    background?: string;
    paddingTop?: string;
    paddingBottom?: string;
    paddingLeft?: string;
    paddingRight?: string;
    boxShadow?: string;
    responsive?: boolean;
}

export interface ImageStyle {
    width?: string | number;
    height?: string | number;
    name?: string;
    borderRadius?: string;
    type?: Array<string>;
    containerStyle?: IContainerStyle;
}
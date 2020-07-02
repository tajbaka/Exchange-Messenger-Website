// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { convertPadding } from "../../functions";

import "./styles.scss";

import { IContainerStyle, InputTypes } from '../';

export interface InputProps {
  className?: string;
  containerStyle?: IContainerStyle;
  placeholder: string;
  types?: InputTypes;
  onChange?:(event: any) => void;
}

export class Input extends React.Component<InputProps> {
    constructor(props: InputProps){
        super(props);
    }

    public render(){
      const { className, containerStyle, placeholder, types, onChange } = this.props;
      const classes = 'input'; 

      return (
        <input 
            className={classNames(classes, className, types)} 
            placeholder={placeholder} 
            style={convertPadding(containerStyle)} 
            onChange={onChange} 
        />
      )
    }
}
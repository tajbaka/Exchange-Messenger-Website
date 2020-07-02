// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { convertPadding } from "../../functions";

import "./styles.scss";

import { IButtonProps, Button, Input, InputProps, IContainerStyle } from '../';

export interface InputWithButtonProps {
  className?: string;
  containerStyle?: IContainerStyle;
  button: IButtonProps;
  input: InputProps;
  style?: any;
}

export class InputWithButton extends React.Component<InputWithButtonProps> {
    constructor(props: InputWithButtonProps){
      super(props);
    }

    public render(){
      const { className, containerStyle, button, input, style } = this.props;
      const classes = 'input-with-button'; 

      return (
        <div className={classNames(classes, style, className)} style={convertPadding(containerStyle)}>
            <Button {...button} />
            <Input {...input} />
        </div>
      )
    }
}
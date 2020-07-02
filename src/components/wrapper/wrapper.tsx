// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import "./styles.scss";

import { PageContent } from '../';

interface IWrapperProps {
  style?: string;
}

export class Wrapper extends React.Component<IWrapperProps> {
    constructor(props: IWrapperProps){
      super(props);
    }

    public render(){
      const { style } = this.props;
      const classes = 'button'; 

      return (
        <div className={classNames(classes, className, types)}>
            
        </div>
      )
    }
}
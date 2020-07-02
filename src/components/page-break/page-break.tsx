// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import "./styles.scss";

interface IPageBreakProps {
  className?: string;
  height?: string;
  flex?: number;
}

export class PageBreak extends React.Component<IPageBreakProps> {
    constructor(props: IPageBreakProps){
      super(props);
    }

    public render(){
      const { className, ...props } = this.props;
      const classes = 'page-break';

      return (
        <div className={classes} style={props} />
      );
    }
}
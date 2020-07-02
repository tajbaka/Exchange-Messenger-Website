// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import "./styles.scss";

import { ITextStyle, IContainerStyle, ImageStyle, IButtonProps, Button, ContentImage } from '../';
import { convertPadding } from "../../functions";

export interface IBannerProps {
  className?: string;
  containerStyle?: IContainerStyle;
  title?: string;
  titleStyle?: ITextStyle
  iconSrc?: string;
  icon?: any;
  iconStyle?: ImageStyle;
  actionButton: IButtonProps;
  outerRef: any;
}

export class Banner extends React.Component<IBannerProps> {
    constructor(props: IBannerProps){
      super(props);
    }

    public render(){
      const { className, iconSrc, iconStyle, title, outerRef, titleStyle, containerStyle, actionButton  } = this.props;
      const classes = 'content-banner'; 
 
      return (
        <div className={classNames(classes, className)} style={convertPadding(containerStyle)} ref={outerRef}>
            <div className={classNames(classes + '-left')}>
                {iconSrc &&
                    <ContentImage src={iconSrc} style={iconStyle as any}  />
                }
                <div className={classNames(classes + '-title')} style={titleStyle as any}>
                    { title }
                </div>
            </div>
            {actionButton &&
                <div className={classNames(classes + '-right')}>
                    <Button {...actionButton} />
                </div>
            }
        </div>
      )
    }
}
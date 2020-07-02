// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { ContentImage } from '../';

import { ButtonTypes } from './types';

import "./styles.scss";

export interface IButtonProps {
  className?: string;
  name?: string;
  image?: any;
  imageStyle?: any;
  title: string;
  href?: string;
  types?: Array<ButtonTypes>;
  onClick?: (event: any) => void;
}

export class Button extends React.Component<IButtonProps> {
    constructor(props: IButtonProps){
      super(props);
    }

    public render(){
      const { name, title, className, types, href, image, imageStyle, onClick } = this.props;
      const classes = 'button'; 

      if(process.env.NODE_ENV === 'production' && types && types.includes("only-show-development")){
        return null;
      }

      if(image && image.file && image.file.url){
        return (
          <a className={classNames("button", className)} style={{ background: 'none', border: 'none', padding: 0 }} href={href}>
            <ContentImage src={image.file.url} style={imageStyle} />
          </a>
        ) 
      }
      

      if(href !== undefined && href !== null){
        return (
          <a className={classNames("button", name, types, className)} href={href && (href.charAt(0) === '/' ? href : '/' + href)}>
            { title }
          </a>
        ) 
      }

      return (
        <button className={classNames(classes, className, types)} onClick={onClick}>
          { title }
        </button>
      )
    }
}
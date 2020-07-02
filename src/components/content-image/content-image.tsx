// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { convertPadding } from "../../functions";

import { ImageStyle } from '../';


import "./styles.scss";

export interface IContentImageProps {
  className?: string;
  src?: string;
  style?: ImageStyle;
}

interface IContentImageState {
  cover?: boolean;
  style?: ImageStyle;
}

export class ContentImage extends React.Component<IContentImageProps, IContentImageState> {
    constructor(props: IContentImageProps){
      super(props);

      let style;
      let cover = false;

      if(this.props.style && this.props.style.type && this.props.style.type.includes('cover')){
        style = JSON.parse(JSON.stringify(this.props.style));
        style.backgroundImage = `url(${this.props.src})`;
        style.backgroundRepeat = 'no-repeat';
        style.backgroundSize = 'cover';
      }

      this.state = {
        style,
        cover
      }
    }
    
    public componentWillReceiveProps(nextProps: IContentImageProps) {
      if(this.props.src !== nextProps.src && nextProps.style && nextProps.style.type && nextProps.style.type.includes('cover')){
        const style = JSON.parse(JSON.stringify(this.props.style));
        style.backgroundImage = `url(${this.props.src})`;
        style.backgroundRepeat = 'no-repeat';
        style.backgroundSize = 'cover';
        this.setState({ style, cover: true });
      }
      if(nextProps.style && this.props.style && this.props.style.type !== nextProps.style.type &&  nextProps.style.type && nextProps.style.type.includes('cover')) {
        this.setState({ cover: true });
      }
    }

    public render(){
      const { className, src } = this.props;
      const { cover, style } = this.state;
      let containerStyle;

      const classes = 'content-image'; 

      if(style){
        containerStyle = style.containerStyle;
      }

      if(cover){
        return (
          <figure className={classNames(classes, "image", className)} style={convertPadding(containerStyle)} >
            <div style={style} />
          </figure>
        );
      }

      return (
        <figure className={classNames(classes, "image", this.props.style && this.props.style.type, className)} style={convertPadding(containerStyle)}>
          <img src={src} style={this.props.style} />
        </figure>
      );
    }
}
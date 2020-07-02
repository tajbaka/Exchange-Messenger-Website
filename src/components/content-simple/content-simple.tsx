// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { Button, ImageStyle, InputWithButton, IContainerStyle, ContentSimpleHeader, IContentSimpleHeaderProps, ContentImage } from '../'
import { convertPadding } from "../../functions";


import "./styles.scss";

interface IContentSimpleProps {
  className?: string;
  headers?: Array<IContentSimpleHeaderProps>;
  buttons?: any;
  imageSrc?: string;
  style?: any;
  name?: string;
  imageStyle?: ImageStyle;
  containerStyle?: IContainerStyle;
}

interface IContentHeaderState {
    isRow: boolean;
    spacing?: any;
}

export class ContentSimple extends React.Component<IContentSimpleProps, IContentHeaderState> {
    constructor(props: IContentSimpleProps){
        super(props);

        const { style } = this.props;
        let isRow = false;

        if(style && style.includes('row')){
            isRow = true;
            style.splice(style.indexOf('row'), 1);
        }
        else if(style && style.includes('column')){
            style.splice(style.indexOf('column'), 1);
        }

        this.state = {
            isRow
        }
    }

    public componentWillReceiveProps({style }: IContentSimpleProps){
        if(style !== this.props.style){
            let isRow = false;

            if(style && style.includes('row')){
                isRow = true;
                style.splice(style.indexOf('row'), 1);
            }
            else if(style && style.includes('column')){
                style.splice(style.indexOf('column'), 1);
            }
            this.setState({ isRow })
        }
    }

    public render(){
        const { headers, buttons, imageSrc, name, className, imageStyle, containerStyle, style } = this.props;
        const { isRow } = this.state;
        const classes = 'content-simple';

        return (
            <div 
                className={classNames(classes, isRow && 'row', style, name, className)} 
                style={convertPadding(containerStyle)}
            >
                <div className={classNames(classes + '-content')}>
                    {headers && headers.map((header: IContentSimpleHeaderProps) => (
                        <ContentSimpleHeader {...header} />
                    ))}
                    {buttons && buttons.length > 0 &&
                        <div className={classNames(classes + '-buttons')}>
                            {buttons.map((item: any) => (
                                <React.Fragment>
                                    {item.__typename === 'ContentfulButton' ?
                                        <Button {...item} className={classes + '-button'}  />
                                        :
                                    item.__typename === 'ContentfulInputWithButton' &&
                                        <InputWithButton {...item} />
                                    }
                                </React.Fragment>
                            ))}
                        </div>
                    }
                </div>
                {imageSrc &&
                    <ContentImage className={classNames(classes + '-image')} src={imageSrc} style={imageStyle} />
                }
            </div>
        );
    }
}
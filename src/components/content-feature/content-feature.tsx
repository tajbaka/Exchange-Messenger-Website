// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import "./styles.scss";

import { ITextStyle, ImageStyle, IContainerStyle, ContentImage, Button } from '../'

export interface IContentFeatureProps {
    className?: string;
    title: string;
    description: string;
    iconSrc?: string;
    buttons?: Array<any>;
    icon?: any;
    imageSrc?: string;
    imageStyle?: ImageStyle;
    iconStyle?: ImageStyle;
    image?: any;
    titleStyle?: ITextStyle;
    descriptionStyle?: ITextStyle;
    selectedContainerStyle?: IContainerStyle;
    containerStyle?: IContainerStyle;
    active?: boolean;
    isMobileOrTablet?: boolean;
    onClick?: (event: any) => void;
}



export class ContentFeature extends React.Component<IContentFeatureProps> {
    constructor(props: IContentFeatureProps){
      super(props);
    }

    public render(){
      const { className, imageStyle, imageSrc, buttons, description, title, descriptionStyle, titleStyle, iconStyle, iconSrc, onClick } = this.props;
      const classes = 'content-feature'; 

        return (
            <div className={classNames(classes, className)}>
                {imageSrc &&
                    <ContentImage className={classNames(classes + '-image')} src={imageSrc} style={imageStyle} />
                }
                <div className={classes + '-content-wrapper'} >
                    {title && 
                        <div className={classNames("title", classes + "-title")} style={titleStyle as any} dangerouslySetInnerHTML={{__html: title}} />
                    }
                    {description &&
                        <div className={classNames("description", classes + "-description")} style={descriptionStyle as any} dangerouslySetInnerHTML={{__html: description}}/>
                    }
                    {buttons &&
                        <div className={classes + '-button-wrapper'}>
                            {buttons.map((element: any, index: any) => (
                                <Button {...element} className={classes + '-button'} />
                            ))}
                        </div>
                    }
                </div>
                {iconSrc &&
                    <div className={classNames(classes + '-icon-wrapper')} style={iconStyle}>
                        <ContentImage src={iconSrc} style={iconStyle} />
                    </div>
                }
            </div>
        );
    }
}
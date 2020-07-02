// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { ITextStyle, IContainerStyle } from '../../';

import { convertPadding } from "../../../functions";


import "./styles.scss";

export interface IContentSimpleHeaderProps {
    className?: string;
    title: string;
    name?: string;
    subtitle?: string;
    description?: string;
    longDescription?: any;
    titleStyle?: ITextStyle;
    subtitleStyle?: ITextStyle;
    descriptionStyle?: ITextStyle;
    containerStyle?: IContainerStyle;
    style?: any;
}

export class ContentSimpleHeader extends React.Component<IContentSimpleHeaderProps> {
    constructor(props: IContentSimpleHeaderProps){
        super(props);
    }

    public render(){
        const { className, containerStyle, name, title, description, longDescription, titleStyle, descriptionStyle, subtitle, style, subtitleStyle } = this.props;
        const classes = 'content-simple-header';

        return (
            <div className={classNames(classes, name, className, style)} style={convertPadding(containerStyle)}>
                {subtitle &&
                    <h3 className={classNames(classes + "-subtitle")} style={subtitleStyle as any}>
                        { subtitle }
                    </h3>
                }
                {title && 
                    <div className={classNames(classes + "-title")} style={titleStyle as any} dangerouslySetInnerHTML={{__html: title}} />
                }
                {description && 
                    <p className={classNames(classes + "-description")} style={descriptionStyle as any} dangerouslySetInnerHTML={{__html: description}} />
                }
                {longDescription &&  longDescription.longDescription &&
                    <div className={classNames(classes + "-description")} style={descriptionStyle as any} dangerouslySetInnerHTML={{__html: longDescription.longDescription }} />
                }
            </div>
        );
    }
}
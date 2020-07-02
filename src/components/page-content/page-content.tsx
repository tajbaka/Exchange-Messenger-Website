// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { ContentSimple, ContentSimpleHeader, Button, Form, IContainerStyle, PageBreak, ContentVideo } from "../../components"

import { convertPadding } from '../../functions'

import "./styles.scss";

interface IPageContentProps {
    className?: string;
    content?: Array<any>;
    containerStyle?: IContainerStyle;
}

export class PageContent extends React.Component<IPageContentProps> {
    constructor(props: IPageContentProps){
      super(props);
    }

    public render(){
        const { content, className, containerStyle } = this.props;
        const classes = 'page-content';
    
        let isRow = false;  

        if(className && className.includes('row')){
            isRow = true;
        }

        let background;
        let remaining;
        let borderRadius;

        const newContainerStyle = convertPadding(containerStyle)

        if(newContainerStyle){
            const { background: back, borderRadius: radius, ...rest } = newContainerStyle;
            background = back;
            borderRadius = radius;
            remaining = rest;
        }

        return (
            <div className={classNames(classes)} style={{ background, borderRadius, ...remaining }}>
                <div className={classNames(classes + '-inner-wrapper', isRow && 'row', className)}>
                    {content && content.map((item: any) => (
                        item.__typename === "ContentfulContentSimple" ?
                            <ContentSimple {...item} imageSrc={item.image && item.image.file && item.image.file.url} />
                        :
                        item.__typename === "ContentfulForm" ?
                            <Form {...item}  />
                        :
                        item.__typename === "ContentfulContentHeader" ?
                            <ContentSimpleHeader {...item}  />
                        :
                        item.__typename === 'ContentfulPageBreak' ?
                            <PageBreak {...item} />
                        :
                        item.__typename === 'ContentfulContentVideo' ?
                            <ContentVideo {...item} url={item.url.file.url} />
                        :
                        item.__typename === 'ContentfulButton' ?
                            <Button {...item} />
                        :
                        item.__typename === "ContentfulContentWrapper" && 
                            <PageContent 
                                className={classNames(classes + '-inner', item.name, item.style)}
                                {...item}
                            />
                    ))}
                </div>
            </div>
        );
    }
}
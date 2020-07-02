// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import "./styles.scss";

import { MainHeaderItemProps } from './types';

interface IMainHeaderItemProps extends MainHeaderItemProps {
    className?: string;
}

interface IMainHeaderItemState {
    hover: boolean;
}

export class MainHeaderItem extends React.Component<IMainHeaderItemProps, IMainHeaderItemState> {

    constructor(props: IMainHeaderItemProps){
        super(props);
        this.state = {
            hover: false
        }
    }

    public render(){
        const { title, href, items, className, image, style, imageStyle } = this.props;
        const classes = 'main-header-item';

        const hasDropdown = items !== null;

        if(hasDropdown){
            return (
                <div className={classNames(classes, 'navbar-item', 'has-dropdown', 'is-hoverable', className)} >
                    <a className={classNames("navbar-link", style)} href={href && (href.charAt(0) === '/' ? href : '/' + href)}>
                        {image && image.file &&
                            <figure className={classNames(classes + '-image', "image")} >
                                <img src={image.file.url} style={imageStyle} />
                            </figure>
                        }
                        { title }
                    </a>
                    {items &&
                        <div className="navbar-dropdown">
                            {items.map((item: MainHeaderItemProps)  => (
                                <MainHeaderItem
                                    {...item}
                                />
                            ))}
                        </div>
                    }
                </div>
            );
        }

        return (
            <React.Fragment>
                {image && image.file &&
                    <figure className={classNames(classes + '-image', "image")} >
                        <img src={image.file.url} />
                    </figure>
                }
                <a className={classNames(classes, 'navbar-item', style, className)} href={href && (href.charAt(0) === '/' ? href : '/' + href)}>
                    { title }
                </a>
            </React.Fragment>
        );
    }
}
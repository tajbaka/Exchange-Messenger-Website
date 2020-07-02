// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IContainerStyle, ContentImage } from '../';
import { convertPadding } from "../../functions";

import "./styles.scss";

interface IContentVideoProps {
  className?: string;
  url?: string;
  containerStyle?: IContainerStyle;
  placeholderContainerStyle?: IContainerStyle;
}

interface IContentVideoState {
    isActive: boolean;
}

export class ContentVideo extends React.Component<IContentVideoProps, IContentVideoState> {
    constructor(props: IContentVideoProps){
        super(props);
        this.state = {
            isActive: false
        }
    }

    public render(){
        const classes = 'content-video';

        const { containerStyle, placeholderContainerStyle, url } = this.props;
        const { isActive } = this.state;

        if(isActive){
            return (
                <div className={classNames(classes, isActive && "modal is-active")} style={!isActive ? convertPadding(containerStyle) : {}} >
                    <div className="modal-background" onClick={() => this.setState({ isActive: false })}></div>
                    <div className="modal-content" >
                        <video controls={true} autoPlay={true} style={convertPadding(containerStyle)}>
                            <source src={url} type="video/mp4"  />
                        </video>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => this.setState({ isActive: false })} />
                </div>
            );
        }

        return (
            <div className={classNames(classes)} style={placeholderContainerStyle}>
                <div onClick={() => this.setState({ isActive: true })} style={{ cursor: 'pointer' }}>
                    <ContentImage className={classNames(classes + '-image', 'no-grow')} src={'https://images.ctfassets.net/nxg3r2mbp764/7vPQEFyAKbqpbArprLfLXw/d3264fee50cefc8714f2423f17363f48/play-button.png'} style={{ width: 120, height: 70 }} />
                </div>
            </div>
        );
    }
}
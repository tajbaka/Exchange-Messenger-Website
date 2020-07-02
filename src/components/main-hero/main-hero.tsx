// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IContentFeatureProps, ImageStyle, ContentFeature, ContentImage } from '../';

import "./styles.scss";

interface IMainHeroProps {
  className?: string;
  content: Array<IContentFeatureProps>;
  containerStyle?: any;
  imageStyle?: ImageStyle;
  style?: any;
  video: any;
}

interface IMainHeroState {
    selectedContentFeatureIndex: number;
    tabletOrSmaller?: boolean;
}

export class MainHero extends React.Component<IMainHeroProps, IMainHeroState> {

    constructor(props: IMainHeroProps){
        super(props);
        this.setTimingSwitch = this.setTimingSwitch.bind(this);

        this.state = {
            selectedContentFeatureIndex: 0,
        }
    }

    public render(){
        const { className, content, containerStyle, style, video } = this.props;
        const { selectedContentFeatureIndex, tabletOrSmaller } = this.state;
        const classes = 'main-hero';

        return (
            <div className={classNames(classes, style, className)} style={containerStyle}>
                <div style={{ backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundImage: `url(${'https://images.ctfassets.net/w6mtslgh21b3/2vFbeHZQhLHlzRC8LY7MsH/7da592f1b16b9ddae2065cb1a2b9c774/black-textile-41949.jpg'}` }} className={classNames(classes + '-image', 'selected', className)}/>
                {content && content[selectedContentFeatureIndex] &&
                    <div className={classNames(classes + '-content')}>
                        <ContentFeature {...content[selectedContentFeatureIndex]} className={classes + '-content-feature'} iconSrc={content[selectedContentFeatureIndex].icon && content[selectedContentFeatureIndex].icon.file.url} />
                    </div>
                }
                <div className={classNames(classes + '-icon-wrapper')} >
                    <div style={{ width: '300px', height: '608px', position: 'relative' }}>
                        <ContentImage className={classes + '-border'} src={'https://images.ctfassets.net/w6mtslgh21b3/6eHzkfGAhXVLhgND5tvSKb/b09fc899d8947625a3281a90c816f59a/android.png'} style={{ width: '300px' }} />
                        <div style={{ position: 'absolute', borderRadius: 50, top: 40, bottom: 100, left: 25, right: 18, backgroundColor: 'white' }} />
                        {video && video.file &&
                            <div className={classes + '-video'}>
                                <video loop={true} autoPlay={true} controls={false} muted={true} src={video.file.url} />
                            </div>
                        }
                    </div>
                </div>
                {!tabletOrSmaller &&
                    <div className={classes + '-map-gradient'} />
                }
            </div>
        );
    }

    private setTimingSwitch(){
        // this.timer = setInterval(() => {
        // const content = this.props.content;
        // for(let i = 0; i < content.length; i++){
        //     if(this.state.selectedContentFeatureIndex === i){
        //         if(this.state.selectedContentFeatureIndex === content.length - 1){
        //             this.setState({ selectedContentFeatureIndex: 0 })
        //         }
        //         else {
        //             this.setState({ selectedContentFeatureIndex: i + 1 });
        //         }
        //         break;
        //     }
        // }
        // }, 5000);
    }
}
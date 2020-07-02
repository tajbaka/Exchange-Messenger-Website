// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import "./styles.scss";

import { IContainerStyle, ImageStyle, ContentImage } from '../';

import { convertPadding } from '../../functions';

interface IMainFooterProps {
    containerStyle?: IContainerStyle;
    image?: any;
    items: any;
    imageSrc?: string;
    imageStyle?: ImageStyle;
}

interface IMainFooterState {
  items: any;
}

export class MainFooter extends React.Component<IMainFooterProps, IMainFooterState> {
    constructor(props: IMainFooterProps){
      super(props);

      const { items } = this.props;

      let newItems: Array<any>  = [];
      let innerArr: Array<any> = [];

      for(let i = 0; i < items.length; i++){
        const item = items[i];
        if(item.style === 'category'){
          innerArr = [];
          newItems.push(innerArr)
        }
        innerArr.push(item)
      }

      this.state = {
        items: newItems
      }

    }

    public render(){
      const classes = 'main-footer';
      const { containerStyle, imageSrc, imageStyle } = this.props;
      const { items } = this.state;

      return (
        <div className={classNames(classes)} style={convertPadding(containerStyle)}>
            <div className={classes + '-left'}>
              <ContentImage 
                src={imageSrc}
                style={imageStyle as any}
              />
            </div>
            <div className={classes + '-center'}>
              {items && items.map((footerColumn: any, footerIndex: number) => (
                <div className={classes + '-column'}>
                <div className={classes + '-groups'}>
                  {footerColumn.map((item: any, itemIndex: number) => (
                    <a className={item.style} href={item.href && (item.href.charAt(0) === '/' ? item.href : '/' + item.href)}>
                      { item.title }
                    </a>
                  ))}
                </div>
                </div>
              ))}
            </div>
            <div className={classes + '-right'}>
              <div className={classNames(classes + '-groups')}>
                <a href='https://google.com'>
                  <ContentImage
                    className='no-grow'
                    src={'https://images.ctfassets.net/nxg3r2mbp764/aaTE0CyErxJhwn626MXFx/1268ac865617a4d2481f1d6b97cd6f93/app-store-pic.png'}
                    style={{ width: '120px', height: '40px' }}
                  />
                </a>
                <a href='https://google.com'>
                  <ContentImage 
                    className='no-grow'
                    src={'https://images.ctfassets.net/nxg3r2mbp764/Z0lHcRfjRaZEFaSonOUCg/82ca6e1f2f37b770056fb91760f7990d/google-play.png'}
                    style={{ width: '135px', height: '40px' }}
                  />
                </a>
              </div>
            </div>
        </div>
      );
    }
}
// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { MainHeaderItem, IBannerProps, Banner, Button, ITextStyle } from '../';

import "./styles.scss";

interface IMainHeaderProps {
  title?: string;
  titleStyle?: ITextStyle;
  src?: string;
  rightItems?: Array<any>;
  topItems: Array<any>;
  leftItems: Array<any>;
  logoHref?: string;
  logoStyle?: any;
  fixed?: boolean;
  style?: any;
  banner?: IBannerProps;
  headerRef?: any;
  topHeaderRef?: any;
}

interface IMainHeaderState {
  active: boolean;
}

export class MainHeader extends React.Component<IMainHeaderProps, IMainHeaderState> {

    constructor(props: IMainHeaderProps){
      super(props);

      this.state = {
        active: false
      }
    }

    public componentDidMount(){
      const elements = document.getElementsByClassName("navbar-burger");
      const element = elements[0];

      element.addEventListener("click", () => {
        if(element && element.className.includes('is-active')){
          this.setState({ active: true });
        }
        else {
          this.setState({ active: false })
        }
      });
      
      window.addEventListener("resize", () => {
        const width = window.innerWidth;
        if(width > 1023){
          this.setState({ active: false });
        }
      });
    }

    public render(){
      const { leftItems, style, rightItems, topItems, logoStyle, titleStyle, title, src, banner, logoHref, topHeaderRef, headerRef } = this.props;
      const { active } = this.state;
      const classes = 'main-header';

      return (
        <React.Fragment>
            {banner && 
              <Banner 
                {...banner} 
                iconSrc={banner.icon.file.url} 
              />
            }
            <nav
              className={classNames(classes + '-navbar', active && 'is-active', 'navbar')} 
              role="navigation" aria-label="main navigation"
              style={style}
              ref={headerRef}
            >
            {!active &&
                  <div className={classes + '-navbar-top'} style={style} ref={topHeaderRef}>
                    {topItems && topItems.map(topItem => (
                      topItem.__typename === 'ContentfulButton' ?
                        <div className="navbar-item">
                          <Button {...topItem} types={topItem.types} />
                        </div>
                        :
                        <MainHeaderItem
                          {...topItem}
                        />
                    ))}
                  </div>
                }
              <div
                className="navbar-brand" 
              >
                {src && src.trim().length > 0 &&
                  <a className={classNames("navbar-item", classes + '-logo')} href={logoHref} tabIndex={-1}>
                    <img src={src} width={logoStyle.width} height={logoStyle.height} tabIndex={-1} />
                    <div className={classes + '-title'} style={titleStyle as any}>
                      { title }
                    </div>
                  </a>
                }
                
                <a role="button" tabIndex={-1} onClick={() => this.setState({ active: !active })} className={classNames("navbar-burger burger", active && 'is-active')} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true" tabIndex={-1} />
                  <span aria-hidden="true"tabIndex={-1} />
                  <span aria-hidden="true"tabIndex={-1} />
                </a>
              </div>
                <div style={{ background: style.background }} id="navbarBasicExample" className={classNames("navbar-menu", active && 'is-active')}>
                  {leftItems && 
                    <div className="navbar-start">
                      {leftItems.map(leftItem => (
                        leftItem.__typename === 'ContentfulButton' ?
                          <div className={classNames("navbar-item", 'navbar-button')}>
                            <Button {...leftItem} types={leftItem.types} />
                          </div>
                          :
                          <MainHeaderItem
                            {...leftItem}
                          />
                      ))}
                    </div>
                  }
                  {rightItems &&
                    <div className="navbar-end">
                      {rightItems.map((rightItem) => (
                        rightItem.__typename === 'ContentfulButton' ?
                          <div className={classNames("navbar-item", 'navbar-button')}>
                            <Button {...rightItem} types={rightItem.types} />
                          </div>
                          :
                          <MainHeaderItem
                            {...rightItem}
                          />
                      ))}
                    </div>
                  }
                </div>
              </nav>
          </React.Fragment>
      );
    }
  
    

  }
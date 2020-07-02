import { IContainerStyle } from '../components';

let windowVar: any;

export function setWindow(window: any){
  windowVar = window;
}

export function isTabletOrSmaller() {
    if((typeof windowVar !== 'undefined' && windowVar.innerWidth <= 898)) {
      return true;
    } else {
      return false;
    }
}

export function getPadding(containerStyle: IContainerStyle){
  if(containerStyle){
    const { paddingTop, paddingRight, paddingLeft, paddingBottom } = containerStyle;
    const padding = `${ paddingTop ? paddingTop : 0 } ${ paddingRight ? paddingRight : 0 } ${ paddingBottom ? paddingBottom : 0 } ${ paddingLeft ? paddingLeft : 0 }`;
    return padding;
  }
  return;
}

export function convertPadding(containerStyle?: IContainerStyle, spacing?: string){
  if(containerStyle){
    const newContainerStyle = JSON.parse(JSON.stringify(containerStyle));

    if(newContainerStyle.minWidth === null){
      newContainerStyle.minWidth = newContainerStyle.width;
    }

    if(isTabletOrSmaller()){
      if(spacing === undefined){
        spacing = '20px';
      }

      if(containerStyle.responsive) {
        newContainerStyle.paddingLeft = spacing;
        newContainerStyle.paddingRight = spacing;
      }
      else {
        newContainerStyle.paddingLeft = '0px';
        newContainerStyle.paddingRight = '0px';
      }
    }

    if(newContainerStyle.backgroundImage){
      newContainerStyle.background = `url(https:${newContainerStyle.backgroundImage.file.url})`;
    }

    return newContainerStyle;
  }

  return containerStyle;

}
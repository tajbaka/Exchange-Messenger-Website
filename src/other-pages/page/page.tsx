// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { default as mapboxgl }  from 'mapbox-gl';

import axios from 'axios';

import { graphql } from "gatsby";

import { MainHeader, PageContent, MainFooter, MainHero } from "../../components";

import { convertPadding, setWindow } from '../../functions';

import "./styles.scss";

interface IPageProps {
  data?: any;
  className?: string;
}

interface IPageState {
  offSetPadding?: string;
  headerStyle: any;
  hero?: any;
  src: string;
  zoom: number;
  loaded: boolean;
  customCssFile?: string;
  language: string;
}

class Page extends React.Component<IPageProps, IPageState> {

    private mapContainer: any;
    private eventListener: any;
    private headerRef: any;
    private topHeaderRef: any;

    constructor(props: IPageProps){
      super(props);

      this.headerRef = React.createRef();
      this.topHeaderRef = React.createRef();

      this.getOffsetPadding = this.getOffsetPadding.bind(this);

      mapboxgl.accessToken = 'pk.eyJ1IjoiYXRsYXNvbmUiLCJhIjoiY2s2c3IwZmM1MGpwdTNlbGFsdDRoY3MzZyJ9.4TxXyDROaejGp5UaF8WO1w';

      const { data } = this.props;
      const { contentfulPages } = data;

      let customCssFile;

      if(contentfulPages.customCssFile) {
        customCssFile = 'https:' + contentfulPages.customCssFile.file.url;
      }
      const headerStyle = JSON.parse(JSON.stringify(data.contentfulPages.header.containerStyle));
      headerStyle.background = 'transparent';

      let language = 'en';

      const hero = JSON.parse(JSON.stringify(this.props.data.contentfulPages.hero));

      this.state = {
        hero,
        customCssFile,
        language,
        headerStyle,
        src: contentfulPages.header.logoSecondary.file.url,
        zoom: 10,
        loaded: false,
      }
    }

    async componentDidMount(){
      if(typeof window !== 'undefined'){
        setWindow(window);
      }
      
      setTimeout(() => {
        const offSetPadding = this.getOffsetPadding();
        if(offSetPadding !== undefined){
          const headerStyle = JSON.parse(JSON.stringify(this.props.data.contentfulPages.header.containerStyle));
          headerStyle.background = 'transparent';
          this.setState({ offSetPadding, loaded: true, headerStyle });
        }
      }, 0);
      
      this.eventListener = document.addEventListener("scroll", () => {
        var scrollTop = window.pageYOffset;
        const { data } = this.props;
        const headerStyle = JSON.parse(JSON.stringify(data.contentfulPages.header.containerStyle));

        if(scrollTop > 0){
          headerStyle.opacity = 0;
          this.setState({ headerStyle, src: data.contentfulPages.header.logoSecondary.file.url });
        }
        else {
          headerStyle.opacity = 1;
          headerStyle.background = 'transparent';
          this.setState({ headerStyle, src: data.contentfulPages.header.logo.file.url });
        }
      });

      let language = navigator.language;
      
      if(language.includes('es')){
        language = 'es';
        const hero = this.props.data.contentfulPages.hero;
        hero.video = hero.spanishVideo;
        this.setState({ hero }, async () => {
            const constructUrl = () => {
              const API_KEY = 'AIzaSyAREhxB566smEG2sPyJLvNh6CWEROh5gZs';
              let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
              url += `&source=${'en'}`;
              url += `&target=${language}`;
              return url
            }
      
            let { title, description } = hero.content[0];
    
            let url = constructUrl();
            url += '&q=' + encodeURI(title);
            
            await axios.post(url).then((response) => {
              hero.content[0].title = response.data.data.translations[0].translatedText;
            });
    
            url = constructUrl();
            url += '&q=' + encodeURI(description);
    
            await axios.post(url).then((response) => {
              hero.content[0].description = response.data.data.translations[0].translatedText;
            });
            
            this.setState({ hero: JSON.parse(JSON.stringify(this.state.hero)) });
        })
      }
      
    }

    public componentWillUnmount(){
      if(this.eventListener){
        this.eventListener.removeEventListener('scroll');
      }
    }

    public render(){
        const classes = 'page';
        const { className, data } = this.props;
        const { customCssFile, headerStyle, src, loaded, hero } = this.state;
        const { content, containerStyle, header, footer, name } = data.contentfulPages;

        return (
          <div className={classNames(classes, loaded && 'loaded', name, className)}>
            <link rel="stylesheet" href={customCssFile} />
            {header && 
              <MainHeader {...header} style={headerStyle} src={src} topHeaderRef={this.topHeaderRef} headerRef={this.headerRef}  />
            }
            <div className={classes + '-inner-wrapper'}>
              {hero ? 
              <div className={classes + '-hero-wrapper'}>
                <MainHero
                  className={classes + '-carousel'}
                  {...hero}
                />
              </div>
              :
              <div className={classes + '-map-gradient'} />
              }
              <div className={classes + '-content-wrapper'} style={convertPadding(containerStyle)}>
                <PageContent content={content}/>
              </div>
              {footer &&
                <MainFooter {...footer} imageSrc={footer.image.file.url} />
              }
            </div>
          </div>
        )
    }

    private getOffsetPadding(){
      if(this.headerRef && this.headerRef.current && this.topHeaderRef && this.topHeaderRef.current){
        const offSetPadding = this.headerRef.current.clientHeight + this.topHeaderRef.current.clientHeight + 100;
        return offSetPadding;
      }
    }
}

export const pageQuery = graphql`
    query pageQuery($slug: String!){
        contentfulPages(slug: {eq: $slug}){
            slug
            name
            showMap
            customCssFile {
              file {
                url
              }
            }
            footer {
              containerStyle {
                backgroundImage {
                  file {
                    url
                  }
                }
                transform
                boxShadow
                paddingTop
                paddingBottom
                paddingRight
                paddingLeft
                background
                borderRadius
                border
                borderWidth
                width
                height
                responsive
              }
              image {
                file {
                  url
                }
              }
              imageStyle {
                minWidth
                width
                height
                borderRadius
                type
              }
              items {
                title
                style
                href
              }
            }
            header {
              logo {
                file {
                  url
                }
              }
              logoSecondary {
                file {
                  url
                }
              }
              logoHref
              logoStyle {
                width
                height
                borderRadius
                type
              }
              containerStyle {
                backgroundImage {
                  file {
                    url
                  }
                }
                transform
                boxShadow
                paddingTop
                paddingBottom
                paddingRight
                paddingLeft
                background
                borderRadius
                border
                borderWidth
                width
                height
                responsive
              }
              rightItems {
                __typename
                ...on ContentfulHeaderItem {
                  title
                  href
                  style
                  items {
                    title
                    href
                    image {
                      file {
                        url
                      }
                    }
                    imageStyle {
                      minWidth
                      width
                      height
                      containerStyle {  
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        transform
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        borderWidth
                        width
                        height
                        responsive
                      }
                    }
                  }
                }
                ...on ContentfulButton {
                  name
                  title
                  href
                  types 
                }
              }
              title
              titleStyle {
                fontSize
                color
                textAlign
                fontWeight
                maxWidth
              }
              topItems {
                __typename
                ...on ContentfulHeaderItem {
                  title
                  href
                  style
                  items {
                    title
                    href
                    image {
                      file {
                        url
                      }
                    }
                    imageStyle {
                      minWidth
                      width
                      height
                      containerStyle {
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        transform
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        borderWidth
                        width
                        height
                        responsive
                      }
                    }
                  }
                }
                ...on ContentfulButton {
                  name
                  title
                  href
                  types 
                }
            }
              leftItems {
                __typename
                ...on ContentfulHeaderItem {
                  title
                  href
                  style
                  items {
                    title
                    href
                    image {
                      file {
                        url
                      }
                    }
                    imageStyle {
                      minWidth
                      width
                      height
                      containerStyle {
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        transform
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        borderWidth
                        width
                        height
                        responsive
                      }
                    }
                  }
                }
                ...on ContentfulButton {
                  name
                  title
                  href
                  types 
                }
            }
          }
            hero {
              __typename
              ... on ContentfulContentCarousel {
                style
                containerStyle {
                  backgroundImage {
                    file {
                      url
                    }
                  }
                  transform
                  boxShadow
                  paddingTop
                  paddingBottom
                  paddingRight
                  paddingLeft
                  background
                  borderRadius
                  border
                  borderWidth
                  width
                  height
                  responsive
                }
                video {
                  file {
                    url
                  }
                }
                spanishVideo {
                  file {
                    url
                  }
                }
                imageStyle {
                  minWidth
                  width
                  height
                  borderRadius
                  type
                  containerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    transform
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    borderWidth
                    width
                    height
                    responsive
                  }
                }
                content {
                  title
                    description
                    selectedContainerStyle {
                      backgroundImage {
                        file {
                          url
                        }
                      }
                      transform
                      boxShadow
                      paddingTop
                      paddingBottom
                      paddingRight
                      paddingLeft
                      background
                      borderRadius
                      border
                      borderWidth
                      width
                      height
                      responsive
                    }
                    button {
                      title
                      href
                      types
                      image {
                        file {
                          url
                        }
                      }
                      imageStyle  {
                        minWidth
                        width
                        height
                        borderRadius
                        type
                        containerStyle {
                          backgroundImage {
                            file {
                              url
                            }
                          }
                          boxShadow
                          paddingTop
                          paddingBottom
                          paddingRight
                          paddingLeft
                          background
                          borderRadius
                          border
                          width
                          height
                          responsive
                        }
                      }
                    }
                    containerStyle {
                      backgroundImage {
                        file {
                          url
                        }
                      }
                      transform
                      boxShadow
                      paddingTop
                      paddingBottom
                      paddingRight
                      paddingLeft
                      background
                      borderRadius
                      border
                      borderWidth
                      width
                      height
                      responsive
                    }
                    titleStyle {
                      fontSize
                      color
                      textAlign
                      fontWeight
                      maxWidth
                    }
                    descriptionStyle {
                      fontSize
                      color
                      textAlign
                      fontWeight
                      maxWidth
                    }
                    image {
                      file {
                        url
                      }
                    }
                    
                    icon {
                      file {
                        url
                      }
                    }
                    iconStyle {
                      width
                      height
                      borderRadius
                      type
                    }
                }
              }
              ...on ContentfulContentSimple {
                style
                headers {
                  title
                  description
                  longDescription {
                    longDescription
                  }
                  subtitle
                  titleStyle {
                    fontSize
                    color
                    textAlign
                    fontWeight
                    maxWidth
                  }
                  descriptionStyle {
                    fontSize
                    color
                    textAlign
                    fontWeight
                    maxWidth
                  }
                  subtitleStyle {
                    fontSize
                    color
                    textAlign
                    fontWeight
                    maxWidth
                  }
                  containerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    width
                    height
                    responsive
                  }
                }
                containerStyle {
                  backgroundImage {
                    file {
                      url
                    }
                  }
                  boxShadow
                  paddingTop
                  paddingBottom
                  paddingRight
                  paddingLeft
                  background
                  borderRadius
                  border
                  width
                  height
                  responsive
                }
                buttons {
                  __typename
                  ... on ContentfulButton {
                    title
                    href
                    types
                  }
                  ... on ContentfulInputWithButton {
                    style
                    containerStyle {
                      backgroundImage {
                        file {
                          url
                        }
                      }
                      boxShadow
                      paddingTop
                      paddingBottom
                      paddingRight
                      paddingLeft
                      background
                      borderRadius
                      border
                      width
                      height
                      responsive
                    }
                    button {
                      title
                      href
                      types
                    }
                    input {
                      placeholder
                      types
                      containerStyle {
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        width
                        height
                        responsive
                      }
                    }
                  }
                }
                image {
                  file {
                    url
                  }
                }
                imageStyle {
                  minWidth
                  width
                  height
                  borderRadius
                  type
                  containerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    width
                    height
                    responsive
                  }
                }
              }
            }
            containerStyle {
              backgroundImage {
                file {
                  url
                }
              }
              transform
              boxShadow
              paddingTop
              paddingBottom
              paddingRight
              paddingLeft
              background
              borderRadius
              border
              borderWidth
              width
              height
              responsive
            }
            content {
                __typename
                ... on ContentfulForm {
                  hubspotFormId
                  hubspotPortalId
                  successUrl
                  containerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    transform
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    borderWidth
                    width
                    height
                    responsive
                  }
                  formFieldWrappers {
                    style
                    containerStyle {
                      backgroundImage {
                        file {
                          url
                        }
                      }
                      transform
                      boxShadow
                      paddingTop
                      paddingBottom
                      paddingRight
                      paddingLeft
                      background
                      borderRadius
                      border
                      borderWidth
                      width
                      height
                      responsive
                    }
                    formFields {
                      ... on ContentfulButton {
                        name
                        title
                        href
                        types
                      }
                      ... on ContentfulFormField {
                        type
                        title
                        placeholder
                        dropdownvalues 
                        style
                        required
                        formFieldId
                        containerStyle {
                          backgroundImage {
                            file {
                              url
                            }
                          }
                          transform
                          boxShadow
                          paddingTop
                          paddingBottom
                          paddingRight
                          paddingLeft
                          background
                          borderRadius
                          border
                          borderWidth
                          width
                          height
                          responsive
                        }
                      }
                    }
                  }
                }
                ... on ContentfulContentVideo {
                  containerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    transform
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    borderWidth
                    width
                    height
                    responsive
                  }
                  placeholderContainerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    transform
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    borderWidth
                    width
                    height
                    responsive
                  }
                  url {
                    file {
                      url
                    }
                  }
                }
                ... on ContentfulContentCarousel {
                  style
                  containerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    transform
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    borderWidth
                    width
                    height
                    responsive
                  }
                  video {
                    file {
                      url
                    }
                  }
                  imageStyle {
                    minWidth
                    width
                    height
                    borderRadius
                    type
                    containerStyle {
                      backgroundImage {
                        file {
                          url
                        }
                      }
                      transform
                      boxShadow
                      paddingTop
                      paddingBottom
                      paddingRight
                      paddingLeft
                      background
                      borderRadius
                      border
                      borderWidth
                      width
                      height
                      responsive
                    }
                  }
                  content {
                    title
                      description
                      selectedContainerStyle {
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        transform
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        borderWidth
                        width
                        height
                        responsive
                      }
                      containerStyle {
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        transform
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        borderWidth
                        width
                        height
                        responsive
                      }
                      titleStyle {
                        fontSize
                        color
                        textAlign
                        fontWeight
                        maxWidth
                      }
                      descriptionStyle {
                        fontSize
                        color
                        textAlign
                        fontWeight
                        maxWidth
                      }
                      image {
                        file {
                          url
                        }
                      }
                      
                      icon {
                        file {
                          url
                        }
                      }
                      iconStyle {
                        width
                        height
                        borderRadius
                        type
                      }
                  }
                }
                ...on ContentfulPageBreak {
                  height
                  flex
                }
                ...on ContentfulContentWrapper {
                    name
                    style
                    containerStyle {
                      backgroundImage {
                        file {
                          url
                        }
                      }
                      transform
                      boxShadow
                      paddingTop
                      paddingBottom
                      paddingRight
                      paddingLeft
                      background
                      borderRadius
                      border
                      borderWidth
                      width
                      height
                      responsive
                    }
                    content {
                      __typename
                        ...on ContentfulButton {
                          name
                          title
                          href
                          types
                        }
                        ... on ContentfulForm {
                          hubspotFormId
                          hubspotPortalId
                          successUrl
                          containerStyle {
                            backgroundImage {
                              file {
                                url
                              }
                            }
                            transform
                            boxShadow
                            paddingTop
                            paddingBottom
                            paddingRight
                            paddingLeft
                            background
                            borderRadius
                            border
                            borderWidth
                            width
                            height
                            responsive
                          }
                          formFieldWrappers {
                            style
                            containerStyle {
                              backgroundImage {
                                file {
                                  url
                                }
                              }
                              transform
                              boxShadow
                              paddingTop
                              paddingBottom
                              paddingRight
                              paddingLeft
                              background
                              borderRadius
                              border
                              borderWidth
                              width
                              height
                              responsive
                            }
                            formFields {
                              ... on ContentfulButton {
                                name
                                title
                                href
                                types
                              }
                              ... on ContentfulFormField {
                                type
                                style
                                title
                                required
                                formFieldId
                                titleStyle {
                                  fontSize
                                  color
                                  textAlign
                                  fontWeight
                                }
                                containerStyle {
                                  backgroundImage {
                                    file {
                                      url
                                    }
                                  }
                                  transform
                                  boxShadow
                                  paddingTop
                                  paddingBottom
                                  paddingRight
                                  paddingLeft
                                  background
                                  borderRadius
                                  border
                                  borderWidth
                                  width
                                  height
                                  responsive
                                }
                                placeholder
                                dropdownvalues 
                              }
                            }
                          }
                        }
                        ... on ContentfulContentVideo {
                          containerStyle {
                            backgroundImage {
                              file {
                                url
                              }
                            }
                            transform
                            boxShadow
                            paddingTop
                            paddingBottom
                            paddingRight
                            paddingLeft
                            background
                            borderRadius
                            border
                            borderWidth
                            width
                            height
                            responsive
                          }
                          placeholderContainerStyle {
                            backgroundImage {
                              file {
                                url
                              }
                            }
                            transform
                            boxShadow
                            paddingTop
                            paddingBottom
                            paddingRight
                            paddingLeft
                            background
                            borderRadius
                            border
                            borderWidth
                            width
                            height
                            responsive
                          }
                          url {
                            file {
                              url
                            }
                          }
                        }
                        ... on ContentfulContentCarousel {
                          style
                          containerStyle {
                            backgroundImage {
                              file {
                                url
                              }
                            }
                            transform
                            boxShadow
                            paddingTop
                            paddingBottom
                            paddingRight
                            paddingLeft
                            background
                            borderRadius
                            border
                            borderWidth
                            width
                            height
                            responsive
                          }
                          video {
                            file {
                              url
                            }
                          }
                          imageStyle {
                            minWidth
                            width
                            height
                            borderRadius
                            type
                            containerStyle {
                              backgroundImage {
                                file {
                                  url
                                }
                              }
                              transform
                              boxShadow
                              paddingTop
                              paddingBottom
                              paddingRight
                              paddingLeft
                              background
                              borderRadius
                              border
                              borderWidth
                              width
                              height
                              responsive
                            }
                          }
                          content {
                            title
                              description
                              selectedContainerStyle {
                                backgroundImage {
                                  file {
                                    url
                                  }
                                }
                                transform
                                boxShadow
                                paddingTop
                                paddingBottom
                                paddingRight
                                paddingLeft
                                background
                                borderRadius
                                border
                                borderWidth
                                width
                                height
                                responsive
                              }
                              containerStyle {
                                backgroundImage {
                                  file {
                                    url
                                  }
                                }
                                transform
                                boxShadow
                                paddingTop
                                paddingBottom
                                paddingRight
                                paddingLeft
                                background
                                borderRadius
                                border
                                borderWidth
                                width
                                height
                                responsive
                              }
                              titleStyle {
                                fontSize
                                color
                                textAlign
                                fontWeight
                                maxWidth
                              }
                              descriptionStyle {
                                fontSize
                                color
                                textAlign
                                fontWeight
                                maxWidth
                              }
                              image {
                                file {
                                  url
                                }
                              }
                              icon {
                                file {
                                  url
                                }
                              }
                              iconStyle {
                                width
                                height
                                borderRadius
                                type
                              }
                          }
                        }
                       ...on ContentfulContentHeader {
                        title
                        name
                        description
                        longDescription {
                          longDescription
                        }
                        subtitle
                        style
                        titleStyle {
                          fontSize
                          color
                          textAlign
                          fontWeight
                          maxWidth
                        }
                        subtitleStyle {
                          fontSize
                          color
                          textAlign
                          fontWeight
                          maxWidth
                        }
                        descriptionStyle {
                          fontSize
                          fontWeight
                          color
                          textAlign
                          maxWidth
                        }
                        containerStyle {
                          backgroundImage {
                            file {
                              url
                            }
                          }
                          transform
                          boxShadow
                          paddingTop
                          paddingBottom
                          paddingRight
                          paddingLeft
                          background
                          borderRadius
                          border
                          borderWidth
                          width
                          height
                          responsive
                        }
                      }
                      ...on ContentfulContentSimple {
                        name
                        style
                        headers {
                          title
                          description
                          longDescription {
                            longDescription
                          }
                          subtitle
                          titleStyle {
                            fontSize
                            color
                            textAlign
                            fontWeight
                            maxWidth
                          }
                          descriptionStyle {
                            fontSize
                            color
                            textAlign
                            fontWeight
                            maxWidth
                          }
                          subtitleStyle {
                            fontSize
                            color
                            textAlign
                            fontWeight
                            maxWidth
                          }
                          containerStyle {
                            backgroundImage {
                              file {
                                url
                              }
                            }
                            transform
                            boxShadow
                            paddingTop
                            paddingBottom
                            paddingRight
                            paddingLeft
                            background
                            borderRadius
                            border
                            borderWidth
                            width
                            height
                            responsive
                          }
                        }
                        containerStyle {
                          backgroundImage {
                            file {
                              url
                            }
                          }
                          transform
                          boxShadow
                          paddingTop
                          paddingBottom
                          paddingRight
                          paddingLeft
                          background
                          borderRadius
                          border
                          borderWidth
                          width
                          height
                          responsive
                        }
                        buttons {
                          __typename
                          ... on ContentfulButton {
                            name
                            title
                            href
                            types
                          }
                        }
                        image {
                          file {
                            url
                          }
                        }
                        imageStyle {
                          minWidth
                          width
                          height
                          borderRadius
                          type
                          containerStyle {
                            backgroundImage {
                              file {
                                url
                              }
                            }
                            transform
                            boxShadow
                            paddingTop
                            paddingBottom
                            paddingRight
                            paddingLeft
                            background
                            borderRadius
                            border
                            borderWidth
                            width
                            height
                            responsive
                          }
                        }
                      }
                    }
                  }
                ...on ContentfulContentSimple {
                    name
                    style 
                    headers {
                        title
                        description
                        longDescription {
                          longDescription
                        }
                        subtitle
                        titleStyle {
                          fontSize
                          color
                          textAlign
                          fontWeight
                          maxWidth
                        }
                        descriptionStyle {
                          fontSize
                          color
                          textAlign
                          fontWeight
                          maxWidth
                        }
                        subtitleStyle {
                          fontSize
                          color
                          textAlign
                          fontWeight
                          maxWidth
                        }
                        containerStyle {
                          backgroundImage {
                            file {
                              url
                            }
                          }
                          transform
                          boxShadow
                          paddingTop
                          paddingBottom
                          paddingRight
                          paddingLeft
                          background
                          borderRadius
                          border
                          borderWidth
                          width
                          height
                          responsive
                        }
                    }
                    containerStyle {
                      backgroundImage {
                        file {
                          url
                        }
                      }
                      transform
                      boxShadow
                      paddingTop
                      paddingBottom
                      paddingRight
                      paddingLeft
                      background
                      borderRadius
                      border
                      borderWidth
                      width
                      height
                      responsive
                    }
                    buttons {
                      __typename
                      ... on ContentfulButton {
                        name
                        title
                        href
                        types
                      }
                    }
                    image {
                      file {
                        url
                      }
                    }
                    imageStyle {
                      minWidth
                      width
                      height
                      borderRadius
                      type
                      containerStyle {
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        transform
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        borderWidth
                        width
                        responsive
                      }
                    }
                }
                ... on ContentfulContentHeader {
                  title
                  name
                  description
                  longDescription {
                    longDescription
                  }
                  subtitle
                  style
                  containerStyle {
                    backgroundImage {
                      file {
                        url
                      }
                    }
                    transform
                    boxShadow
                    paddingTop
                    paddingBottom
                    paddingRight
                    paddingLeft
                    background
                    borderRadius
                    border
                    borderWidth
                    width
                    responsive
                  }
                  titleStyle {
                    fontSize
                    fontWeight
                    color
                    textAlign
                    maxWidth
                  }
                  subtitleStyle {
                    fontSize
                    fontWeight
                    color
                    textAlign
                    maxWidth
                  }
                  descriptionStyle {
                    fontSize
                    fontWeight
                    color
                    textAlign
                    maxWidth
                  }
                }
                
            }
        }
        allContentfulHeader {
          edges{
            node{
              logoHref
              logoStyle {
                width
                height
              }
              containerStyle {
                backgroundImage {
                  file {
                    url
                  }
                }
                transform
                boxShadow
                paddingTop
                paddingBottom
                paddingRight
                paddingLeft
                background
                borderRadius
                border
                borderWidth
                width
                responsive
              }
              rightItems {
                __typename
                ...on ContentfulHeaderItem {
                  title
                  style
                  href
                  items {
                    title
                    href
                    image {
                      file {
                        url
                      }
                    }
                    imageStyle {
                      minWidth
                      width
                      height
                      borderRadius
                      type
                      containerStyle {
                        backgroundImage {
                          file {
                            url
                          }
                        }
                        transform
                        boxShadow
                        paddingTop
                        paddingBottom
                        paddingRight
                        paddingLeft
                        background
                        borderRadius
                        border
                        borderWidth
                        width
                        responsive
                      }
                    }
                  }
                }
                ...on ContentfulButton {
                  name
                  title
                    href
                    types 
                }
              }
              logo {
                file {
                  url
                  fileName
                  contentType
                }
              }
              logoSecondary {
                file {
                  url
                  fileName
                  contentType
                }
              }
            }
          }
      }
  }
`

export default Page;
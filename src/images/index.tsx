// import { navigate } from "@reach/router";

import * as React from "react";

import { setWindow } from '../functions';

import Page from '../other-pages/page/page';

import "./styles.scss";

interface IndexPageProps {
  data?: any;
}

export class IndexPage extends React.Component<IndexPageProps> {
  constructor(props: IndexPageProps){
    super(props);
  }
  
    public componentDidMount(){
    const portalId = "6156803";
    const formId = "1b85ef03-7d87-4a2e-aef1-9cddbe97c8ee";
    const url = "https:api.hsforms.com/submissions/v3/integration/submit"
    const postUrl = `${url}/${portalId}/${formId}`;

    const isBrowser = typeof window !== 'undefined';
    const hutk = isBrowser ? Cookies.get('hubspotutk') : null;
    const pageUri = isBrowser ? window.location.href : null;
    const pageName = isBrowser ? document.title : null;

    const email = 'ariant2013@gmail.com';

    const body = {
      submittedAt: Date.now(),
      fields: [
        {
          name: 'email',
          value: email,
        }
      ],
      context: {
        hutk,
        pageUri,
        pageName,
      },
    };

    fetch(postUrl, {
      method: 'post',
      body: JSON.stringify(body),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json, application/xml, text/plain, text/html, *.*',
      }),
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  public componentWillMount(){
    if(typeof window !== 'undefined'){
      setWindow(window);
    }
  }


  public render(){
    return <Page {...this.props.data} />;
  }
}
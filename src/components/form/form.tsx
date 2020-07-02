// tslint:disable jsx-no-lambda
import * as classNames from "classnames";
import * as React from "react";

import { IContainerStyle, Button } from '..';

import axios from 'axios';

import { navigate } from "gatsby"

import { IFormFieldWrapperProps } from './types';

import { convertPadding } from '../../functions';

import "./styles.scss";

interface IFormProps {
    className?: string;
    containerStyle: IContainerStyle;
    formFieldWrappers?: Array<IFormFieldWrapperProps>;
    hubspotFormId: string;
    hubspotPortalId: string;
    successUrl: string;
}

interface IFormState {
    formFieldWrappers: any;
    error: boolean;
}

interface formErrors {
    message: string;
    errorType: string;
}

export class Form extends React.Component<IFormProps, IFormState> {
    constructor(props: IFormProps){
        super(props);

        this.onChangeValue = this.onChangeValue.bind(this);
        this.onActionClick = this.onActionClick.bind(this);

        const formFieldWrappers = JSON.parse(JSON.stringify(this.props.formFieldWrappers));
        this.state = {
            formFieldWrappers,
            error: false
        }
    }

    public render(){
        const { className, containerStyle } = this.props;
        const { formFieldWrappers } = this.state; 

        const classes = 'form';

        return (
            <div className={classNames(classes, className)} style={convertPadding(containerStyle)}>
                {formFieldWrappers && formFieldWrappers.map((formFieldWrapper: any, formFieldWrapperIndex: any) => (
                    <div className={classNames("field", formFieldWrapper.style)} style={convertPadding(formFieldWrapper.containerStyle)}>
                        {formFieldWrappers.formFields && formFieldWrapper.formFields.map((formField: any, formFieldIndex: any) => (
                            formField.type === 'text' ?
                                <div className={classNames(formFieldWrapper.style === 'row' && 'column', 'form-item')}>
                                    <label className="label"> { formField.title } {!formField.required && <span> (optional) </span>} </label>
                                    <div className="control">
                                        <input 
                                            className={classNames("input", formField.style, formField.error && 'error')} 
                                            type="text" 
                                            placeholder={ formField.placeholder } 
                                            style={formField.containerStyle} 
                                            onChange={(event: any) => this.onChangeValue(event, 'input', formFieldWrapperIndex, formFieldIndex)}
                                            value={formField.value}
                                        />
                                        {formField.error && 
                                            <div className={'control-error'}> { formField.error } </div>
                                        }
                                    </div>
                                </div>
                            : formField.type === 'drop-down' ?
                                <div className={classNames(formFieldWrapper.style === 'row' && 'column', 'form-item')}>
                                    <label className="label"> { formField.title } {!formField.required && <span> (optional) </span> } </label>
                                    <div className="control">
                                        <div className={classNames("select", formField.style, formField.error && 'error')}>
                                            <select
                                                style={formField.containerStyle}
                                                value={formField.value}
                                                onChange={(event: any) => this.onChangeValue(event, 'select', formFieldWrapperIndex, formFieldIndex)}
                                            >
                                                <option value="" disabled selected> { formField.placeholder } </option>
                                                {formField.dropdownvalues.map((option: any) => (
                                                    <option> { option } </option>
                                                ))}
                                            </select>
                                            {formField.error && 
                                                <span className={'control-error'}> { formField.error } </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            : formField.type === 'radio' ?
                                <div className={classNames(formFieldWrapper.style === 'row' && 'column', 'form-item')}>
                                    <label className="label"> { formField.title } {!formField.required && <span> (optional) </span>} </label>
                                    <div className="control">
                                        {formField.dropdownvalues.map((option: any) => (
                                            <label className={classNames("radio", formField.style, formField.error && 'error')}>
                                                <input 
                                                    type="radio" 
                                                    name="answer" 
                                                    onChange={(event: any) => this.onChangeValue(event, 'radio', formFieldWrapperIndex, formFieldIndex)} 
                                                    style={formField.containerStyle} 
                                                />
                                                &nbsp; { option }
                                            </label>
                                        ))}
                                        {formField.error && 
                                            <span className={'control-error'}> { formField.error } </span>
                                        }
                                    </div>
                                </div>
                            : formField.type === 'paragraph' ?
                                <div className={classNames(formFieldWrapper.style === 'row' && 'column', 'form-item')}>
                                    <label className="label"> { formField.title } {!formField.required && <span> (optional) </span> } </label>
                                    <div className="control">
                                        <textarea 
                                            className={classNames("textarea", formField.style, formField.error && 'error')}
                                            onChange={(event: any) => this.onChangeValue(event, 'input', formFieldWrapperIndex, formFieldIndex)} 
                                            placeholder={formField.placeholder} 
                                            style={formField.containerStyle}
                                            value={formField.value}
                                        />
                                        {formField.error && 
                                            <span className={'control-error'}> { formField.error } </span>
                                        }
                                    </div>
                                </div>
                            :
                            formField.__typename === "ContentfulButton" &&
                                <Button className={'form-item'} {...formField} onClick={this.onActionClick} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }

    private onChangeValue(event: any, type: string, formFieldWrapperIndex: any, formFieldIndex: any){
        const { formFieldWrappers } = this.state;
        let value;
        if(type === 'input'){
            value = event.target.value;
        }
        else if(type === 'select'){
            value = event.target.value;
        }
        else if(type === 'radio'){
            
        }
        formFieldWrappers[formFieldWrapperIndex].formFields[formFieldIndex].value = value;
        formFieldWrappers[formFieldWrapperIndex].formFields[formFieldIndex].error = false;
        this.setState({ formFieldWrappers });
    }

    private onActionClick(){
        const { formFieldWrappers } = this.state;
        const { hubspotPortalId, hubspotFormId, successUrl } = this.props;

        let error = false;

        const url = "https://api.hsforms.com/submissions/v3/integration/submit"
        const postUrl = `${url}/${hubspotPortalId}/${hubspotFormId}`;

        const isBrowser = typeof window !== 'undefined';
        const hutk =  null;
        const pageUri = isBrowser ? window.location.href : null;
        const pageName = isBrowser ? document.title : null;

        const fields = [];

        for(let i = 0; i < formFieldWrappers.length; i++){
            const formFields = formFieldWrappers[i].formFields;
            for(let j = 0; j < formFields.length; j++){
                let formField = formFields[j];
                let field: any;
                if(formField.__typename !== "ContentfulButton"){
                    field = {
                        name: formField.formFieldId,
                        value: formField.value,
                        required: formField.required
                    }
                }
                if(field && field.name && field.name.length > 0 && field.value && field.value.length > 0){
                    fields.push(field)
                }
                else if(formField.required){
                    error = true;
                    formField.error = 'Field is required';
                }
            }
        }

        const body = {
            submittedAt: Date.now(),
            fields,
            context: {
              hutk,
              pageUri,
              pageName,
            }
        }

        const headers = new Headers ({
            'Content-Type': 'application/json',
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        });

        if(!error){
            axios.post(postUrl, body, {
                headers: headers,
                baseURL: '/'
              })    
              .then((response) => {
                navigate(successUrl);
              })
              .catch((error) => {
                const data = error.response.data;
                const errors = data.errors;

                for(let i = 0; i < formFieldWrappers.length; i++){
                    const formFields = formFieldWrappers[i].formFields;
                    for(let j = 0; j < formFields.length; j++){
                        let formField = formFields[j];
                        const errorIndex = errors.findIndex((error:formErrors) => error.message.includes(formField.formFieldId));
                        if(errorIndex !== -1){
                            formField.error = errors[errorIndex].message;
                        }
                    }
                }
                this.setState({ formFieldWrappers })
              })
        }
        else {
            this.setState({ error });
        }
    }
}
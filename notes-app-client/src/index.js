import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import Amplify from "aws-amplify";
import config from "./config";

Amplify.configure({
    //cognito
    Auth: {
    // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
    // REQUIRED - Amazon Cognito Region
        region: config.cognito.REGION,
    // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: config.cognito.USER_POOL_ID,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true   
    },

    //storage
    Storage: {
        bucket: config.s3.BUCKET, //REQUIRED -  Amazon S3 bucket
        region: config.s3.REGION, //OPTIONAL -  Amazon service region
        identityPoolId: config.cognito.IDENTITY_POOL_ID //Specify your identityPoolId for Auth and Unauth access to your bucket;
    },

    //API Gateway
    API: {
        endpoints: [
            {
                name: "notes",
                endpoint: config.apiGateway.URL,                
                region: config.apiGateway.REGION
            }
        ]
    }

});

ReactDOM.render(
    <Router> 
        <App /> 
    </Router>, 
    document.getElementById('root')
);
registerServiceWorker();

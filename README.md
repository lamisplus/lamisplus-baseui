# [Lamis Plus Frontend](https://github.com/lamisplus/lamisplus-baseui.git)



## Preview

You can check out [live preview](https://lamisplus.org).

## Quick Start

1.  Clone the repo `git clone git@github.com:lamisplus/lamisplus-baseui.git`
2.  Go to your project folder from your terminal
3.  Run: `npm install` or `yarn install`
4.  After install, run: `npm run start` or `yarn start`
5.  It will open your browser(http://localhost:3000)

## Note
The endpoint URL is localhost:8081/api/
## Endpoint for for the Patient Module 


#Patient Registration

Method = POST
REQUEST  localhost:8081/api/patients

    {
        "alternatePhoneNumber": "string",
        "archive": "string",
        "city": "string",
        "countryId": 0,
        "dateRegistration": "dd-MM-yyyy",
        "dob": "dd-MM-yyyy",
        "dobEstimated": true,
        "educationId": 0,
        "email": "string",
        "facilityId": 0,
        "firstName": "string",
        "genderId": 0,
        "hospitalNumber": "string",
        "landmark": "string",
        "lastName": "string",
        "maritalStatusId": 0,
        "mobilePhoneNumber": "string",
        "occupationId": 0,
        "otherNames": "string",
        "personRelativeDTOList": [
                {
                "address": "string",
                "alternatePhoneNumber": "string",
                "email": "string",
                "firstName": "string",
                "lastName": "string",
                "mobilePhoneNumber": "string",
                "otherNames": "string",
                "relationshipTypeId": 0
                }
            ],
        "provinceId": 0,
        "stateId": 0,
        "street": "string",
        "titleId": 0,
        "zipCode": "string"
    }


RESPONSE if successful
    
    {
      "status": "ok",
      "message": "Registered successfully! "
    }
       

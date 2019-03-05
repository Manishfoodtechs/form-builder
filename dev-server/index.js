
const express = require('express')
const _ = require('lodash')

const app = express()
app.use(express.json())

/**
 * Testing manager form data
 */

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const nameField = 'profile_manager.first_name'
const surnameField = 'profile_manager.last_name'
const fullnameField = 'profile_manager.full_name'
const emailField = 'email'
const phonesField = 'profile_manager.phones'
const smtpField = 'profile_manager.smtp'
const smtpHostField = 'profile_manager.smtp_host'
const statusField = 'status'

app.post('/manager', function (req, res) {
    let data = req.body
    let errors = {}


    // check name ( TEST SIMPLE ERROR )
    if ( ! _.get(data, nameField) ) {
        errors[nameField] = ['The name is required']
    }


    // check email ( TEST SIMPLE ERROR WITH NON NORMALIZED PATH )
    if ( ! emailRegExp.test( _.get(data, emailField) ) ) {
        errors[ '\[' + emailField + '\]' ] = ['It doesn`t look like email']
    }


    // check phones ( TEST MULTIBLOCK ERRORS AND PHONE FIELD ERRORS )
    _.get(data, phonesField, []).forEach( (phone, i) => {
        if ( ! phone.phone ) return
        if ( /\D/g.test(phone.phone) ) {
            errors[phonesField + '[' + i + ']phone' ] = 'Number must contain digits only'
        }
    })


    // check smtp ( TEST MULTISELECT ERRORS )
    if ( _.get(data, smtpField) && ( data[statusField] !== 'Manager') ) {
        errors[smtpHostField] = ['Only manager can use email']
    }


    if ( _.isEmpty(errors) ) {

        // format data ( TEST DATA REPLACEMENT FROM RESPONSE )
        _.set( data, fullnameField, _.get(data, nameField) + ' ' + _.get(data, surnameField) )
        let phones = []
        _.get( data, phonesField, []).forEach( phone => {
            if ( phone.phone ) {
                phones.push({
                    phone: phone.phone,
                    validated: '+380' + phone.phone
                })
            }
        })
        _.set( data, phonesField, phones )

        res.json({
            message: 'The manager was successfully updated',
            success: true,
            data: data
        });

    } else {

        // send error response ( TEST APPLYING ERRORS )
        res.status(422)
            .json({
                message: 'The given data was invalid.',
                errors: errors
            })
    }

});

app.listen(3030)
console.log('Dev server running on port 3030')
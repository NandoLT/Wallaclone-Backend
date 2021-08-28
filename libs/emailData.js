'use strict'

const emailData = (from, to, subject, template) => {

    const data = {
        from: from,
        to: to, 
        subject: subject,
        html:template
    }
    return data
}

module.exports = emailData;

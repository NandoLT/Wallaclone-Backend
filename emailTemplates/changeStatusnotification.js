module.exports = (advert, relatedTemplate, header, footer) => {
    if(advert.status == 2) {
        advert.status = 'Reserved';
    } else {
        advert.status = 'Sold'
    };

    relatedTemplate ? relatedTemplate : '';

    // return (
    // `
    // <div>
    //     <h1>Wallaclone Notifications System</h1>
    //     <p>The next advert's status has been modified.<br>
    //     It's include into your favorite list, please contact with the vendor if you are still interested.</p>
    //     <br />
    //     <hr>
    //     <h2> ${advert.status} </h2>
    //     <h3> ${advert.name} </h3>
    //     <h4> ${advert.description} </h4>
    //     <h4> ${advert.price} € </h4>
    //     <h4> ${advert.province} </h4>
    //     <hr>
    //     ${relatedTemplate}
    //     <br>
    // </div>
    // `
    // );
    return (
        `
        ${header}
        <div class="es-wrapper-color" style="background-color: #141b24">
          <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#141b24"></v:fill>
            </v:background>
          <![endif]-->
          <table
            class="es-wrapper"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              border-collapse: collapse;
              border-spacing: 0px;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
              background-repeat: repeat;
              background-position: center top;
              background-color: #141b24;
            "
          >
            <tbody>
              <tr style="border-collapse: collapse">
                <td valign="top" style="padding: 0; margin: 0">
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    class="es-content"
                    align="center"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      table-layout: fixed !important;
                      width: 100%;
                    "
                  >
                    <tbody>
                      <tr style="border-collapse: collapse">
                        <td
                          align="center"
                          bgcolor="#141B24"
                          style="padding: 0; margin: 0; background-color: #141b24"
                        >
                          <table
                            bgcolor="#141B24"
                            class="es-content-body"
                            align="center"
                            cellpadding="0"
                            cellspacing="0"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                              background-color: #141b24;
                              width: 600px;
                            "
                          >
                            <tbody>
                              <tr style="border-collapse: collapse">
                                <td
                                  align="left"
                                  bgcolor="#72B5DF"
                                  style="
                                    margin: 0;
                                    padding-left: 15px;
                                    padding-right: 15px;
                                    padding-top: 40px;
                                    padding-bottom: 40px;
                                    background-color: #72b5df;
                                  "
                                >
                                  <table
                                    cellpadding="0"
                                    cellspacing="0"
                                    width="100%"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      border-collapse: collapse;
                                      border-spacing: 0px;
                                    "
                                  >
                                    <tbody>
                                      <tr style="border-collapse: collapse">
                                        <td
                                          align="center"
                                          valign="top"
                                          style="
                                            padding: 0;
                                            margin: 0;
                                            width: 570px;
                                          "
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tbody>
                                              <tr style="border-collapse: collapse">
                                                <td
                                                  align="center"
                                                  class="es-infoblock es-m-txt-c"
                                                  style="
                                                    padding: 0;
                                                    margin: 0;
                                                    line-height: 19px;
                                                    font-size: 16px;
                                                    color: #ffffff;
                                                  "
                                                >
                                                  <h1
                                                    style="
                                                      margin: 0;
                                                      line-height: 31px;
                                                      mso-line-height-rule: exactly;
                                                      font-family: roboto,
                                                        'helvetica neue', helvetica,
                                                        arial, sans-serif;
                                                      font-size: 26px;
                                                      font-style: normal;
                                                      font-weight: bold;
                                                      color: #ffffff;
                                                    "
                                                  >
                                                    Wallaclone&nbsp;Notifications&nbsp;System
                                                  </h1>
                                                </td>
                                              </tr>
                                              <tr style="border-collapse: collapse">
                                                <td style="padding: 0; margin: 0">
                                                  <p
                                                    style="
                                                      margin: 0;
                                                      -webkit-text-size-adjust: none;
                                                      -ms-text-size-adjust: none;
                                                      mso-line-height-rule: exactly;
                                                      font-family: 'Open Sans',
                                                        sans-serif;
                                                      line-height: 21px;
                                                      color: white;
                                                      font-size: 14px;
                                                    "
                                                  >
                                                    The next advert's status has
                                                    been modified.<br />
                                                    It's include into your favorite
                                                    list, please contact with the
                                                    vendor if you are still
                                                    interested.
                                                  </p>
                                                  <br />
                                                  <hr style="margin: 0" />
                                                  <br />
                                                  <h2
                                                    style="
                                                      margin: 0;
                                                      line-height: 22px;
                                                      mso-line-height-rule: exactly;
                                                      font-family: roboto,
                                                        'helvetica neue', helvetica,
                                                        arial, sans-serif;
                                                      font-size: 18px;
                                                      font-style: normal;
                                                      font-weight: normal;
                                                      color: #ffffff;
                                                      text-align: center;
                                                    "
                                                  >
                                                    ${advert.name}
                                                  </h2>
                                                  <h3
                                                    style="
                                                      margin: 0;
                                                      line-height: 19px;
                                                      mso-line-height-rule: exactly;
                                                      font-family: roboto,
                                                        'helvetica neue', helvetica,
                                                        arial, sans-serif;
                                                      font-size: 16px;
                                                      font-style: normal;
                                                      font-weight: bold;
                                                      color: #efefef;
                                                      letter-spacing: 0px;
                                                    "
                                                  >
                                                    Status: ${advert.status}
                                                  </h3>
                                                  <h4
                                                    style="
                                                      margin: 0;
                                                      line-height: 120%;
                                                      mso-line-height-rule: exactly;
                                                      font-family: roboto,
                                                        'helvetica neue', helvetica,
                                                        arial, sans-serif;
                                                    "
                                                  >
                                                    Description:
                                                    ${advert.description}
                                                  </h4>
                                                  <h4
                                                    style="
                                                      margin: 0;
                                                      line-height: 120%;
                                                      mso-line-height-rule: exactly;
                                                      font-family: roboto,
                                                        'helvetica neue', helvetica,
                                                        arial, sans-serif;
                                                    "
                                                  >
                                                    Price: ${advert.price} €
                                                  </h4>
                                                  <h4
                                                    style="
                                                      margin: 0;
                                                      line-height: 120%;
                                                      mso-line-height-rule: exactly;
                                                      font-family: roboto,
                                                        'helvetica neue', helvetica,
                                                        arial, sans-serif;
                                                    "
                                                  >
                                                    Province: ${advert.province}
                                                  </h4>
                                                  <br />
                                                  <hr style="margin: 0" />
                                                  <br />
                                                  ${relatedTemplate} <br />
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    ${footer}
    `
    );
}
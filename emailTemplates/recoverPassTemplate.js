// module.exports = (user) => {
//     return (
//     `<div>
//         <h1>Wallaclone Recover Password Process</h1>
//         <h2>Hello, ${user.name} ${user.nickname}</h2>
//         <p>This is the process to recover your password:</p>
//         <br />
//         <p>Please, click on given link to reset your password:</p>
//         <p><a href="http://18.188.214.80/reset-password"> -_Recover Password_-</a></p>
//     </div>`);
// }

module.exports = (user, header, footer) => {
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
                                                    Wallaclone&nbsp;Recover&nbsp;Password&nbsp;Process
                                                  </h1>
                                                </td>
                                              </tr>
                                              <tr style="border-collapse: collapse">
                                                <td style="padding: 0; margin: 0">
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
                                                    "
                                                  >
                                                    Hello, ${user.name}
                                                    ${user.nickname}
                                                  </h2>
                                                  <hr
                                                    style="margin: 0; width: 65%"
                                                  />
                                                  <br />
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
                                                    This is the process to recover
                                                    your password:
                                                  </p>
                                                  <br />
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
                                                      text-align: center;
                                                    "
                                                  >
                                                    Please, click on given link to
                                                    reset your password:
                                                  </p>
                                                </td>
                                              </tr>
                                              <tr style="border-collapse: collapse">
                                                <td
                                                  align="center"
                                                  class="es-m-txt-c"
                                                  style="
                                                    padding: 0;
                                                    margin: 0;
                                                    padding-top: 20px;
                                                  "
                                                >
                                                  <!--[if mso
                                                    ]><a
                                                      href="http://18.188.214.80/reset-password"
                                                      target="_blank"
                                                    >
                                                      <v:roundrect
                                                        xmlns:v="urn:schemas-microsoft-com:vml"
                                                        xmlns:w="urn:schemas-microsoft-com:office:word"
                                                        esdevVmlButton
                                                        href="http://18.188.214.80/reset-password"
                                                        style="
                                                          height: 46px;
                                                          v-text-anchor: middle;
                                                          width: 247px;
                                                        "
                                                        arcsize="26%"
                                                        stroke="f"
                                                        fillcolor="#ffffff"
                                                      >
                                                        <w:anchorlock></w:anchorlock>
                                                        <center
                                                          style="
                                                            color: #0c66ff;
                                                            font-family: 'Open Sans',
                                                              sans-serif;
                                                            font-size: 14px;
                                                            font-weight: 700;
                                                          "
                                                        >
                                                          Recover Password
                                                        </center>
                                                      </v:roundrect></a
                                                    >
                                                  <![endif]-->
                                                  <!--[if !mso]><!-- --><span
                                                    class="msohide es-button-border"
                                                    style="
                                                      border-style: solid;
                                                      border-color: #0c66ff;
                                                      background: #ffffff;
                                                      border-width: 0px;
                                                      display: inline-block;
                                                      border-radius: 12px;
                                                      width: auto;
                                                      mso-hide: all;
                                                    "
                                                    ><a
                                                      href="http://18.188.214.80/reset-password"
                                                      class="es-button"
                                                      target="_blank"
                                                      style="
                                                        mso-style-priority: 100 !important;
                                                        text-decoration: none;
                                                        -webkit-text-size-adjust: none;
                                                        -ms-text-size-adjust: none;
                                                        mso-line-height-rule: exactly;
                                                        color: #0c66ff;
                                                        font-size: 14px;
                                                        border-style: solid;
                                                        border-color: #ffffff;
                                                        border-width: 15px 30px 15px
                                                          30px;
                                                        display: inline-block;
                                                        background: #ffffff;
                                                        border-radius: 12px;
                                                        font-family: 'Open Sans',
                                                          sans-serif;
                                                        font-weight: bold;
                                                        font-style: normal;
                                                        line-height: 17px;
                                                        width: auto;
                                                        text-align: center;
                                                      "
                                                      >Recover Password</a
                                                    ></span
                                                  >
                                                  <!--<![endif]-->
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
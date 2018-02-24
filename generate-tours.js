// generate-tours.js

const jquery = require("jquery");
const request = require('request');
const secret = require("./secret.js");

module.exports = {
    "jsTitle": "generate-tours",
    "sayHello": function() {
        console.log("generate-tours.js was loaded successfully");
        // console.log(jquery);
    },
    "doJSThing": function() {
        console.log("called doJSThing()")
        request.post("https://sso.sbb.ch/auth/realms/SBB_Public/protocol/openid-connect/token",
            {
                form: secret.creds
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    json = JSON.parse(body);
                    module.exports.token = json.access_token;
                    console.log("TOKEN IS NOW:", module.exports.token);
                }
            }
        );
    },
    "token": undefined
}

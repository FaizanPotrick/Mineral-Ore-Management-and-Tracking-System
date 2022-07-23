const nodemailer = require("nodemailer");
const RegistrationEmailSender = (req) => {
  const user_id = req.user_id;
  const user_name = req.user_name;
  const user_type = req.user_type;
  const email_address = req.email_address;
  const password = req.password;
  const template = `
     <h2>Hello, ${user_name}</h2>
     <div>Your ${user_type} has been successfully registered.</div>
     <div>Here are your Credentials for the Login:</div>
     <div><strong>UserName: ${user_id}<strong/></div>
     <div><strong>Password: ${password}<strong/></div>
     <br/>
     <br/>
     <div>Regards,</div>
     <div>Ministry of Mines</div>
    `;

  nodemailer
    .createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
    .sendMail(
      {
        from: process.env.EMAIL_ID,
        to: email_address,
        subject: "Your Mine is Successfully Registered ✔",
        html: template,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
};
module.exports = RegistrationEmailSender;
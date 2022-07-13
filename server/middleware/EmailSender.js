const nodemailer = require("nodemailer");
const EmailSender = (req, res) => {
  const {
    mine_name,
    location,
    owner_name,
    email_address,
    phone_no,
    block_no,
    gst_no,
    period,
  } = req.body;
  const password = req.password;
  const template = `
     <h2>Hello, ${owner_name}</h2>
     <p>Your Mine has been successfully registered.</p>
     <p>Here are your Credentials for the Login.</p>
     <h3>UserName: ${email_address}</h3>
     <h3>Password: ${password}</h3>
     <br/>
     <br/>
     <p>Regards,</p>
     <p>Ministry of Mines</p>
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
module.exports = { EmailSender };

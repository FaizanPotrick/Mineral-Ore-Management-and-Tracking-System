const nodemailer = require("nodemailer");
const MinerEmailSender = (req) => {
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
     <div>Your Mine has been successfully registered.</div>
     <div>Here are your Credentials for the Login:</div>
     <div><strong>UserName: ${email_address}<strong/></div>
     <div><strong>Password: ${password}<strong/></div>
     <br/>
     <div>Here are your Registration Details:</div>
     <div><strong>Mine Name: ${mine_name}<strong/></div>
     <div><strong>Mine Location: ${location}<strong/></div>
     <div><strong>Phone No.: ${phone_no}<strong/></div>
     <div><strong>Block No.: ${block_no}<strong/></div>
     <div><strong>GST No.: ${gst_no}<strong/></div>
     <div><strong>Lease Period: upto ${period} years<strong/></div>
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
module.exports = MinerEmailSender;

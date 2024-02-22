const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
const postmarkTransport = require("nodemailer-postmark-transport");

module.exports = class Email {
<<<<<<< Updated upstream
  constructor(user) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.from = process.env.EMAIL_FROM;
=======
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    if (process.env.NODE_ENV === "production") {
      this.from = process.env.EMAIL_FROM_PROD;
    } else {
      this.from = `Learnly.io <${process.env.EMAIL_FROM}>`;
    }
>>>>>>> Stashed changes
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
<<<<<<< Updated upstream
      // Sendgrid
=======
      // postmark
>>>>>>> Stashed changes
      return nodemailer.createTransport(
        postmarkTransport({
          auth: {
            apiKey: process.env.POSTMARK_APIKEY,
          },
        })
      );
    }

<<<<<<< Updated upstream
    return nodemailer.createTransport(
      postmarkTransport({
        auth: {
          apiKey: process.env.POSTMARK_APIKEY,
        },
      })
    );
=======
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
>>>>>>> Stashed changes
  }

  async send(template, subject) {
    //1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
<<<<<<< Updated upstream
      //url: this.url,
=======
      url: this.url,
>>>>>>> Stashed changes
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: htmlToText.convert(html),
      html: html,
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};

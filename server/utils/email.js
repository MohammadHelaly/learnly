const nodemailer = require("nodemailer");
const postmarkTransport = require("nodemailer-postmark-transport");
const htmlToText = require("html-to-text");
const pug = require("pug");
const ejs = require("ejs");
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    if (process.env.NODE_ENV === "production") {
      this.from = process.env.EMAIL_FROM_PROD;
    } else {
      this.from = `Learnly.io <${process.env.EMAIL_FROM}>`;
    }
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // postmark
      return nodemailer.createTransport(
        postmarkTransport({
          auth: {
            apiKey: process.env.POSTMARK_APIKEY,
          },
        })
      );
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    //1) Render HTML based on a pug template
    const html = await ejs.renderFile(
      `${__dirname}/../views/email/${template}.ejs`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

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

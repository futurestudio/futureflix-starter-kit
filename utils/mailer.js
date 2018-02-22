'use strict'

const Fs = require('fs')
const Path = require('path')
const Boom = require('boom')
const Util = require('util')
const ReadFile = Util.promisify(Fs.readFile)
const Nodemailer = require('nodemailer')
const Handlebars = require('handlebars')
const HtmlToText = require('html-to-text')
const PostmarkTransport = require('nodemailer-postmark-transport')
const Transporter = Nodemailer.createTransport(
  PostmarkTransport({
    auth: {
      apiKey: process.env.POSTMARK_API_KEY
    }
  })
)
const Templates = Path.resolve(__dirname, '..', 'email-templates')

/**
 * filename: email template name, without ".html" file ending. Email templates are located within "server/email-templates"
 * options: data which will be used to replace the placeholders within the template
 **/
async function prepareTemplate (filename, options = {}) {
  try {
    const templatePath = Path.resolve(Templates, `${filename}.html`)
    const content = await ReadFile(templatePath, 'utf8')

    // use handlebars to render the email template
    // handlebars allows more complex templates with conditionals and nested objects, etc.
    // this way we have much more options to customize the templates based on given data
    const template = Handlebars.compile(content)
    const html = template(options)

    // generate a plain-text version of the same email
    const text = HtmlToText.fromString(html)

    return {
      html,
      text
    }
  } catch (error) {
    throw new Boom('Cannot read the email template content.')
  }
}

/**
 * Send emails with Node.js using Nodemailer
 *
 * @param  {string} template the template name which will be used to render an HTML mail
 * @param  {object} user     the user model, required for the recipient
 * @param  {string} subject  subject line
 * @param  {object} data     view specific data that will be rendered into the view
 * @return {Promise}
 */
exports.send = async (template, user, subject, data) => {
  const { html, text } = await prepareTemplate(template, data)
  const mailOptions = {
    from: `Marcus Poehls <marcus@futurestud.io>`,
    to: user.email,
    subject: subject,
    html,
    text
  }

  // fire and forget
  // will be changed later to use a queue with retries
  // to handle the case of downtimes on the email delivery service
  return Transporter.sendMail(mailOptions)
}

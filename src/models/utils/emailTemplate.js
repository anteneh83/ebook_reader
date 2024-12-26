exports.verificationTemplate = (verificationUrl) => {
    return `
      <html>
        <body>
          <h1>Email Verification</h1>
          <p>Please click on the following <a href="${verificationUrl}">link</a> to verify your email address.</p>
        </body>
      </html>
    `;
  };
  
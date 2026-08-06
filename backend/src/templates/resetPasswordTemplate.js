const resetPasswordTemplate = (
  name,
  resetUrl
) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<title>Reset Password</title>
</head>

<body style="font-family:Arial;background:#f5f5f5;padding:40px;">

<div style="max-width:600px;margin:auto;background:#fff;padding:40px;border-radius:10px;">

<h2>Hello ${name},</h2>

<p>
We received a request to reset your password.
</p>

<p>
Click the button below to reset your password.
</p>

<a
href="${resetUrl}"
style="
display:inline-block;
padding:14px 30px;
background:#000;
color:#fff;
text-decoration:none;
border-radius:6px;
"
>

Reset Password

</a>

<p style="margin-top:30px;">
This link will expire in 15 minutes.
</p>

<p>
If you didn't request this, simply ignore this email.
</p>

</div>

</body>

</html>
`;
};

module.exports = resetPasswordTemplate;
<!DOCTYPE html>
<html>
<head>
	<title>NerdLuv</title>
	<meta charset="utf-8">
	<link href="https://webster.cs.washington.edu/images/nerdluv/heart.gif" type="image/gif" rel="shortcut icon">
	<link href="nerdluv.css" type="text/css" rel="stylesheet">
</head>
<body>
	<div id="bannerarea">
			<img src="https://webster.cs.washington.edu/images/nerdluv/nerdluv.png" alt="banner logo"> <br>
			where meek geeks meet
	</div>
	<form action="submit-signup.php" method="post">
		<fieldset>
			<legend>New User Signup:</legend>
			<strong>Name:</strong>
			<div>
				<input type="text" name="name" size="16"><br>
			</div>
			<strong>Gender:</strong>
			<div>
				<input type="radio" name="sex" value="M">Male
				<input type="radio" name="sex" value="F" checked="checked">Female<br>
			</div>
			<strong>Age:</strong> 
			<div>
				<input type="text" name="age" size="6" maxlength="2"><br>
			</div>
			<strong>Personality Type:</strong> 
			<div>
				<input type="text" name="personality" size="6" maxlength="4">
				(<a href="http://www.humanmetrics.com/cgi-win/JTypes2.asp">Don't know your type?</a>)
				<br>
			</div>
			<strong>Favorite OS:</strong> 
			<div>
						<select name="OS">
		  					<option value="Windows">Windows</option>
		  					<option value="Linux">Linux</option>
		  					<option value="Mac">Mac OS X</option>
						</select><br>
			</div>
			<strong>Seeking age:</strong> 
			<div>
				<input type="text" name="min" placeholder="min" size="6" maxlength="2">
				<input type="text" name="max" placeholder="max" size="6" maxlength="2"><br>
			</div>
			<input type="submit" value="Sign Up">
		</fieldset>
	</form>

	<div>
			<p>
				This page is for single nerds to meet and date each other!  Type in your personal information and wait for the nerdly luv to begin!  Thank you for using our site.
			</p>
			
			<p>
				Results and page (C) Copyright NerdLuv Inc.
			</p>
			
			<ul>
				<li>
					<a href="index.php">
						<img src="https://webster.cs.washington.edu/images/nerdluv/back.gif" alt="icon">
						Back to front page
					</a>
				</li>
			</ul>
		</div>
		<div id="w3c">
			<a href="https://webster.cs.washington.edu/validate-html.php"><img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML"></a>
			<a href="https://webster.cs.washington.edu/validate-css.php"><img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS"></a>
		</div>
<body>
<html>
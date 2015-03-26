<html><!-- CSE 154 Homework 4 (NerdLuv) --><!-- shared page top HTML --><head>
		<title>NerdLuv</title>
		
		<meta charset="utf-8">
		
		<!-- instructor-provided CSS and JavaScript links; do not modify -->
		<link href="https://webster.cs.washington.edu/images/nerdluv/heart.gif" type="image/gif" rel="shortcut icon">
		<link href="nerdluv.css" type="text/css" rel="stylesheet">
		
		
	</head>

	<body>
		<div id="bannerarea">
			<img src="https://webster.cs.washington.edu/images/nerdluv/nerdluv.png" alt="banner logo"> <br>
			where meek geeks meet
		</div>
		
		<!-- your HTML output follows -->
		<?php 
			$myfile = fopen("singles.txt", "a");
			fwrite($myfile, $_POST["name"]);
			fwrite($myfile, ",");
			fwrite($myfile, $_POST["sex"]);
			fwrite($myfile, ",");
			fwrite($myfile, $_POST["age"]);
			fwrite($myfile, ",");
			fwrite($myfile, $_POST["personality"]);
			fwrite($myfile, ",");
			fwrite($myfile, $_POST["OS"]);
			fwrite($myfile, ",");
			fwrite($myfile, $_POST["min"]);
			fwrite($myfile, ",");
			fwrite($myfile, $_POST["max"]);
			fwrite($myfile, "\n");
			fclose($myfile);
		?>
		<h1>Thank you!</h1>
		<p>Welcome to NerdLuv, <?php echo $_POST["name"]; ?> <p>
		<p>Now <a href="matches.php">log in to see your matches!</a></p>
		
		<!-- shared page bottom HTML -->
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
	
</body></html>
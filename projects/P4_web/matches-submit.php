<!DOCTYPE html>
<html>
	<!-- CSE 154 Homework 4 (NerdLuv) -->
	<!-- shared page top HTML -->
	
	<head>
		<title>NerdLuv</title>
		
		<meta charset="utf-8" />
		
		<!-- instructor-provided CSS and JavaScript links; do not modify -->
		<link href="https://webster.cs.washington.edu/images/nerdluv/heart.gif" type="image/gif" rel="shortcut icon" />
		<link href="https://webster.cs.washington.edu/css/nerdluv.css" type="text/css" rel="stylesheet" />
		
		<script src="http://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js" type="text/javascript"></script>
		<script src="https://webster.cs.washington.edu/js/nerdluv/provided.js" type="text/javascript"></script>
	</head>

	<body>
		<div id="bannerarea">
			<img src="https://webster.cs.washington.edu/images/nerdluv/nerdluv.png" alt="banner logo" /> <br />
			where meek geeks meet
		</div>
		
		<!-- your HTML output follows -->
		
		<div>
			<h1>Matches for <?php echo $_POST["name"]; ?></h1>
	
			<?php
				//finds the user, based on input name
				$file1 = fopen("singles.txt","r");

				while(! feof($file1)){
  					$line = fgets($file1). "<br />";
  					list($name, $sex, $age, $personality, $OS, $ageMin, $ageMax) = explode(",", $line);
  					if($name == $_POST["name"]){
  						$User_sex = $sex;
  						$User_age = $age;
  						$User_personality = $personality;
  						$User_OS = $OS;
  						$User_min = $ageMin;
  						$User_max = $ageMax;
  					}
  				}
  				fclose($file1);

  				//compares all possible matches from the singles.txt file
  				$file2 = fopen("singles.txt", "r");


  				while(! feof($file2)){
  					$line = fgets($file2). "<br />";
  					list($name, $sex, $age, $personality, $OS, $ageMin, $ageMax) = explode(",", $line);
  					if($User_sex != $sex && $User_OS == $OS && $User_min <= $age && $User_max >= $age && $User_age >= $ageMin && $User_age <= $ageMax){
  						$User_arr = str_split($User_personality);
  						$Match_arr = str_split($personality); 
  						$count = 0;
  						if($User_arr[0] == $Match_arr[0]){
  							$count = $count + 1;
  						}
  						if($User_arr[1] == $Match_arr[1]){
  							$count = $count + 1;
  						}
  						if($User_arr[2] == $Match_arr[2]){
  							$count = $count + 1;
  						}
  						if($User_arr[3] == $Match_arr[3]){
  							$count = $count + 1;
  						}
  						if($count >= 1){
  							echo '<div class="match"><p><img src="https://webster.cs.washington.edu/images/nerdluv/user.jpg" alt="photo" />'.$name.'</p>
  							<ul><li><strong>gender:</strong>'.$sex.'</li>
  							<li><strong>age:</strong>'.$age.'</li>
  							<li><strong>type:</strong>'.$personality.'</li>
  							<li><strong>OS:</strong>'.$OS.'</li></ul></div>';
  						}
  					}
				}
				fclose($file2);
			 ?>
		</div>

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
						<img src="https://webster.cs.washington.edu/images/nerdluv/back.gif" alt="icon" />
						Back to front page
					</a>
				</li>
			</ul>
		</div>

		<div id="w3c">
			<a href="https://webster.cs.washington.edu/validate-html.php"><img src="https://webster.cs.washington.edu/images/w3c-html.png" alt="Valid HTML" /></a>
			<a href="https://webster.cs.washington.edu/validate-css.php"><img src="https://webster.cs.washington.edu/images/w3c-css.png" alt="Valid CSS" /></a>
		</div>
	</body>
</html>

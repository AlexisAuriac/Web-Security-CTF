 <?php 
if(isset($_GET['source'])){
  show_source(__FILE__);
  die();
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>UNO Center</title>

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>
    <div id="navbar" class="navbar-collapse collapse">
      <a class="navbar-brand" href="index.php?lang=en.php">English</a>
      <a class="navbar-brand" href="index.php?lang=fr.php">Français</a>
    </div><!--/.navbar-collapse -->
      </div>
    </nav>

    <div class="jumbotron">
    </div>
    <div class="container">
      <?php
      error_reporting(-1);
      ini_set("display_errors", 1);
      require('config.php');
      if (isset($_GET['lang']))
      {
          require($_GET['lang']);
      }
      else
      {
        require('fr.php');
      }
      $array = ["https://www.youtube.com/watch?v=CapLbFlOVOs", "https://www.youtube.com/watch?v=kHia40ycUng", "https://www.youtube.com/watch?v=uX5VOHiWYFA", "https://www.youtube.com/watch?v=5-OdATE0WvI", "https://www.youtube.com/watch?v=Hh820Oky0KM"];
      echo "<br/><h2>Videos</h2><br/><ul>";
      foreach($array as $i => $url) {
        echo '<li><a href="'. $url .'">' . $i . '</a></li>';
      }
      echo "</ul>"
      ?>
      </div>
      <footer>
    <p>&copy; 2017 Hub security, Inc.</p>
      </footer>


        <!-- Bootstrap core JavaScript
         ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  </body>
</html>

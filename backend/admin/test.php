<?php
$a = array("red", "blue", "red");
$b = array("green");
$result = array_diff($b, $a);

print_r($result);

$result = array_diff($a, $b);

print_r($result);
?>
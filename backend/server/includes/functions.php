<?
	function generateCode($length = 8){//Генератор рандомного кода
		$chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
		$numChars = strlen($chars);
		$string = '';
		for ($i = 0; $i < $length; $i++) {
			$string .= substr($chars, rand(1, $numChars) - 1, 1);
		}
		return $string;
	}
	
	function getRandomFileName($path, $extension=''){//Генератор названия файла, который проверяет папку на заданный файл
        $extension = $extension ? '.' . $extension : '';
        $path = $path ? $path . '/' : '';
 
        do {
            $name = uniqid();
            $file = $path . $name . $extension;
        } while (file_exists($file));
 
        return $name;
    }
	
	function getRandomStringName($bd, $var){//Генератор названия файла, который проверяет папку на заданный файл
 
        do {
            $name = uniqid();
            $checker = mysql_query('SELECT * FROM `'.$bd.'` WHERE '.$var.'='.$name);
        } while ($checker != '');
 
        return $name;
    }
?>
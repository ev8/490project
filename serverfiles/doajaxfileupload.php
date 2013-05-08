<?php

function respond ($message) 
    {
        echo json_encode($message);
    }
function send_post ($url, $data) {
    $c = curl_init($url);
    curl_setopt($c, CURLOPT_HTTPHEADER, array('Content-Type' => 'application/json'));
    curl_setopt($c, CURLOPT_POST, true);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($c, CURLOPT_POSTFIELDS, json_encode($data));
    $r = json_decode(curl_exec($c), true); 
    curl_close ($c); 
    return $r;
}
	echo $_POST['action'];
	$error = "";
	$msg = "";
	$res="";
	$fileElementName = 'fileToUpload';
	if(!empty($_FILES[$fileElementName]['error']))
	{
		switch($_FILES[$fileElementName]['error'])
		{

			case '1':
				$error = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
				break;
			case '2':
				$error = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
				break;
			case '3':
				$error = 'The uploaded file was only partially uploaded';
				break;
			case '4':
				$error = 'No file was uploaded.';
				break;

			case '6':
				$error = 'Missing a temporary folder';
				break;
			case '7':
				$error = 'Failed to write file to disk';
				break;
			case '8':
				$error = 'File upload stopped by extension';
				break;
			case '999':
			default:
				$error = 'No error code avaiable';
		}
	}elseif(empty($_FILES['fileToUpload']['tmp_name']) || $_FILES['fileToUpload']['tmp_name'] == 'none')
	{
		$error = 'No file was uploaded..';
	}else 
	{		$file = file_get_contents($_FILES['fileToUpload']['tmp_name'],true);
			$tosend['action']='cachefile';
			$tosend['data']=$file;
			$tosend['mime_type']=$_FILES['fileToUpload']['type'];
			$tosend['title']=$_FILES['fileToUpload']['name'];
			send_post('http://localhost/clientproxy.php',$tosend);
			$msg .= " File Name: " . $_FILES['fileToUpload']['name'] . ", ";
			$msg .= " File Size: " . @filesize($_FILES['fileToUpload']['tmp_name']);
			//for security reason, we force to remove all uploaded file
			@unlink($_FILES['fileToUpload']);		
	}		
	echo "{";
	echo				"error: '" . $error . "',\n";
	echo				"msg: '" . $msg.$res. "'\n";
	echo "}";

?>
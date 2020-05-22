<?php
/**
 * @package Users class
 *
 * @author Luis Galvis
 *
 */

include("DBConnection.php");
class Users
{
    protected $db;
    private $_username;
    private $_usernamePW;

	public function setUsername($Login) {
        $this->_username = $Login;
    }

    public function setPassword($Password) {
        $this->_usernamePW = $Password;
    }

	public function __construct() {
        $this->db = new DBConnection();
        $this->db = $this->db->returnConnection();
   }

    // create user
    public function createUser() {
		try {
    		$sql = "INSERT INTO Users (Login, Password)
					VALUES (:login, :password)";
    		$data = [
			    'login' => $this->_username,
				'password' => $this->_usernamePW
			];
			$stmt = $this->db->prepare($sql);
	    	$stmt->execute($data);
			$status = $stmt->rowCount();
            return $status;
		} catch (Exception $e) {
    		die("There's an error in the query!");
		}
    }
?>
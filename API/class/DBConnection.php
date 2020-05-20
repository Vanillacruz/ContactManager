<?php
/**
 * @package PHP Rest API(DBConnection)
 *
 * @author Ngoc Nguyen
 *   
 */

// Database Connection
class DBConnection {
    private $_dbHostname = "localhost";
    private $_dbName = "116751";
    private $_dbUsername = "116751";
    private $_dbPassword = "password";
    private $_con;

    public function __construct() {
    	try {
        	$this->_con = new PDO("mysql:host=$this->_dbHostname;dbname=$this->_dbName", $this->_dbUsername, $this->_dbPassword);    
        	$this->_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    } catch(PDOException $e) {
			  echo "Connection failed: " . $e->getMessage();
		  }
    }
    // return Connection
    public function returnConnection() {
        return $this->_con;
    }
}
?>
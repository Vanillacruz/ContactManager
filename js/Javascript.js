var urlBase = 'http://COP4331-3.com/LAMPAPI'; //have to chang to our website url
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doSignup()
{
  	var newUser = document.getElementById("signupText").value;
	document.getElementById("signupResult").innerHTML = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	var url = urlBase + '/Signup.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("signupResult").innerHTML = "User has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userId = jsonObject.id;
		
		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();
	
		window.location.href = "contactPage.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" ) // I think we might not need this
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function returnToLogin()
{
	window.location.href = "index.html";
}

function moveToSignUp()
{
	window.location.href = "signUp.html";
}

function returnToContactPage()
{
	window.location.href = "contactPage.html";
}

function goToAddContact()
{
	window.location.href = "createNewContact.html";
}

function goToEditContact()
{
	window.location.href = "editContact.html";
	// autofill the contacts information 
}

function addContact()
{
	var firstName = document.getElementById("firstNameText").value;
	var lastName = document.getElementById("lastNameText").value;
	var emailContact = document.getElementById("emailContact").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var addressContact = document.getElementById("addressContact").value;
	var notesContact = document.getElementById("notesContact").value;
	
	document.getElementById("firstNameAddResult").innerHTML = "";
	document.getElementById("lastNameAddResult").innerHTML = "";
	document.getElementById("emailContactAddResult").innerHTML = "";
	document.getElementById("phoneNumberAddResult").innerHTML = "";
	document.getElementById("addressContactAddResult").innerHTML = "";
	document.getElementById("notesContactAddResult").innerHTML = "";
	
	var jsonPayload = '{"First Name" : "' + firstName + '", "Last Name" : "' +lastName+ '", "Email" : "' +emailContact+ '", "Phone Number" : "' +phoneNumber+ '", "Address" : "' +addressContact+ '", "Notes" : "' +notesContact+ '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("firstNameAddResult").innerHTML = "Contact has been Added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}	
}

function searchContact()
{
	var srch = document.getElementById("searchBar").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
	var contactList = "";
	
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchContacts.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Conatct(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}	
}

function updateContact()
{


}

function deleteContact()
{
	var r = confirm("Are you sure you want to delete this Knightact?");
	if (r == true) 
	{
 		// delete and redirect back to contactPage.html
	}
	else {
  		return;
	}
	
}

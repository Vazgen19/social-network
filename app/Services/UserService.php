<?php 

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserService
{
	private $status_code    =        200;

	public function signIn($requestData) {

		$credentials = $requestData->only('email', 'password');
		
		if (Auth::attempt($credentials)) {
			$user = Auth::user();
			$token = $user->createToken($user->email.'-'.now());					
            return [
            	'status' => $this->status_code,
            	'success' =>	true,
            	'message' => 'You have logged in successfully',
            	'user' => $user,
            	'token' => $token->accessToken
            ];
        }else {
        	return [
            	'status' => 'failed',
            	'success' =>	false,
            	'message' => 'Wrong credentials'
            ];
        }
	}

	public function signUp($requestData) {
	  $existUser = User::where('email', $requestData->email)->first();	 

	  if(is_null($existUser)) {
	  	$userData = array(
	  		'name' => $requestData->name,
	  		'surname' => $requestData->surname,
	  		'email' => $requestData->email,
	  		'password' => Hash::make($requestData->password)
	  	);

	  	$user = User::create($userData);

	  	if(!is_null($user)){
	  		return array(
	  			'status' => $this->status_code,
            	'success' =>	true,
            	'message' => 'Registration completed successfully',
            	'data' => $user
	  		);
	  	}else {
	  		return array(
	  			'status' => 'failed',
            	'success' =>	false,
            	'message' => 'Failed to register'
	  		);
	  	}
	  }else {
	  		return array(
	  			'status' => 'failed',
            	'success' =>	false,
            	'message' => 'Email already registered'
	  		);
	  }
	}

	public function  logout() {
		if (Auth::user()) {
	        $token = Auth::user()->token();
	        $token->revoke();
	        return array(
  				'status' => 200
  			);
      }
	}
}





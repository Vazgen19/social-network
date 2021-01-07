<?php 

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserService
{
	private $status_code    =        200;
	private $friends_statuses = [
	  'approved' => 0,
	  'pending' => 1,
	  'rejected' => 2
	];

	public function updateProfile($requestData) {

		$user  = Auth::user();

		$user->update(['name'=> $requestData->name, 'surname' => $requestData->surname]);

		return [
			'status' => $this->status_code,
        	'success' =>	true,
        	'message' => 'Profile updated Successfully',
        	'user' => $user,
		];
	}

	public function friendsList() {
		  $user = Auth::user();
		  return [
			'status' => $this->status_code,
			'friends'=> array_merge($user->friends->toArray(), $user->friendsOf->toArray()),
		  ];
	}

	public function unfriend($requestData) {
		$user = Auth::user();
		$user->friends()->detach($requestData->id);
		$user->friendsOf()->detach($requestData->id);

		return [
			'status' => $this->status_code,
			'friends'=> array_merge($user->friends->toArray(), $user->friendsOf->toArray()),
		  ];

	}

	public function updateFriend($requestData) {
		$user = Auth::user();
		$user->friendsOf()
			->updateExistingPivot($requestData->id,['status' => $this->friends_statuses[$requestData->status]]);

		return [
			'status' => $this->status_code,
			'friends'=> array_merge($user->friends->toArray(), $user->friendsOf->toArray()),
		 ];

	}

	public function searchFriends($requestData){
			
		$users = User::where('name', 'like', '%' . $requestData->search . '%')
					  ->where('id', '<>', Auth::user()->id)
					  ->whereNotIn('id',  Auth::user()->friends)
					  ->get();
		
		return [
			'status' => $this->status_code,
			'msg' => $users ? 'Search Result': 'Not found user for this keyword', 
			'users'=> $users
		]; 

	}
}





<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\UserService;
use App\User;

class UserController extends Controller
{
	

    public function signIn(UserService $userService, Request $request){

    	$validator              =        Validator::make($request->all(), [
            "email"             =>          "required|email",
            "password"          =>          "required|min:8"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        return response()->json($userService->signIn($request));



    }

    public function signUp(UserService $userService, Request $request){


      	$validator              =        Validator::make($request->all(), [
            "name"              =>          "required",
            "surname"           =>          "required",
            "email"             =>          "required|email",
            "password"          =>          "required|min:8"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        return response()->json($userService->signUp($request));
    }

    public function logOut(Userservice $userService){
        return response()->json($userService->logout());
    }

    public function updateProfile(Userservice $userService, Request $request){

        $validator              =        Validator::make($request->all(), [
            "name"              =>          "required",
            "surname"           =>          "required"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        return response()->json($userService->updateProfile($request));
    }

    public function friendsList(Userservice $userService) {
        return response()->json($userService->friendsList());
    }

    public function unfriend(UserService $userService, Request $request) {    
        return response()->json($userService->unfriend($request));
    }

    public function updateFriend(UserService $userService, Request $request) {    
        return response()->json($userService->updateFriend($request));
    }

    public function searchFriends(UserService $userService, Request $request) {

        $validator              =        Validator::make($request->all(), [
            "search"              =>          "required"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        return response()->json($userService->searchFriends($request));
    }

}

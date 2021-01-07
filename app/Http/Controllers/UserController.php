<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\UserService;

class UserController extends Controller
{

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

    public function friendRequest(UserService $userService, Request $request){
        $validator              =        Validator::make($request->all(), [
            "id"              =>          "exists:users"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        return response()->json($userService->friendRequest($request));
    }

}

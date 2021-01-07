<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function signIn(AuthService $authService, Request $request){

    	$validator              =        Validator::make($request->all(), [
            "email"             =>          "required|email",
            "password"          =>          "required|min:8"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        return response()->json($authService->signIn($request));



    }

    public function signUp(AuthService $authService, Request $request){


      	$validator              =        Validator::make($request->all(), [
            "name"              =>          "required",
            "surname"           =>          "required",
            "email"             =>          "required|email",
            "password"          =>          "required|min:8"
        ]);

        if($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
        }

        return response()->json($authService->signUp($request));
    }

    public function logOut(AuthService $authService){
        return response()->json($authService->logout());
    }
}

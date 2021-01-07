<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/sign-in', 'AuthController@signIn')->name('login');
Route::post('/sign-up', 'AuthController@signUp')->name('register');

Route::middleware('auth:api')->group(function() {
	Route::post('/logout', 'AuthController@logOut')->name('logout');
	Route::post('/profile', 'UserController@updateProfile')->name('profile.update');
	Route::get('/friends', 'UserController@friendsList')->name('friends');
	Route::put('/friend', 'UserController@updateFriend')->name('friend.update');
	Route::delete('/friend', 'UserController@unfriend')->name('friend.delete');
	Route::post('/friend', 'UserController@friendRequest')->name('friend.request');
	Route::post('/find-friend', 'UserController@searchFriends')->name('friend.search');
});

<template>
  <div class="flex justify-center items-center  min-h-screen">
        <div class="p-10 border border-orange-300 drop-shadow-lg shadow-xl shadow-orange-300 mx-auto rounded-2xl">
            <div class="mb-4">
                <h3 class="font-semibold text-2xl text-gray-800">Login</h3>
                <p class="text-gray-500">Please login to your account.</p>
            </div>
            <form class="space-y-5">
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Email</label>
                    <input
                        class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                        type="email" placeholder="email@gmail.com" required>
                </div>
                <div class="space-y-2">
                    <label class="mb-5 text-sm font-medium text-gray-700 ">
                        Password
                    </label>
                    <input
                        class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                        type="password" placeholder="Enter your password" required>
                </div>
            </form>
            <div class="space-y-3 my-3">
                <div class="text-sm">
                    <a href="#" class="text-orange-500 hover:text-orange-600">
                        Forgot your password?
                    </a>
                </div>
                <button type="submit"
                    class="w-full flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100 p-3  rounded-full font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>

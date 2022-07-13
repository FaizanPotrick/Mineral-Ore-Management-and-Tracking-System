<template>
  <div class="flex justify-center items-center  min-h-screen">
        <div class="p-10 border border-orange-300 drop-shadow-lg shadow-xl shadow-orange-300 mx-auto rounded-2xl">
            <div class="mb-4">
                <h3 class="font-semibold text-2xl text-gray-800">Ore Details</h3>
                <p class="text-gray-500">Please Fill your ore details</p>
            </div>
            <form class="space-y-5">
                <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-700">Amount</label>
                    <input
                        class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                        type="Ore Amount" placeholder="Ore Amount" required>
                </div>
                <div class="space-y-2">
                    <label class="mb-5 text-sm font-medium text-gray-700 ">
                        Type
                    </label>
                    <input
                        class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                        type="Ore Type" placeholder="eg. Haemitite, Magnetite" required>
                </div>
                <div class="space-y-2">
                    <label class="mb-5 text-sm font-medium text-gray-700 ">
                        Grade
                    </label>
                    <input
                        class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
                        type="Ore Grade" placeholder="eg. High Grade 88" required>
                </div>
                <div class="space-y-2">
                    <label class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-700" for="default_size">Upload File</label>
                    <input class="mb-5 w-full h-full text-md text-gray-700 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-300 dark:placeholder-gray-400" id="upload_file" type="file">
                </div>
                <div class="my-5">
                <button type="submit"
                    class="w-full flex justify-center bg-orange-400 hover:bg-orange-500 text-gray-100 p-3 rounded-full font-semibold  shadow-lg cursor-pointer transition ease-in duration-300">
                    Submit
                </button>
            </div>
            </form>
        </div>
    </div>
</template>
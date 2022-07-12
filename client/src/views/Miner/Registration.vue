<template>
<div class="flex justify-center items-center min-h-screen bg-white">
        <form class="max-w-3xl  border-orange-300 drop-shadow-lg shadow-2xl shadow-orange-300  focus:border-orange-400 p-10 rounded-3xl text-black m-5 font-medium ">
            <div class="text-center text-4xl font-semibold mb-10">Mine Registeration</div>
            <div class="grid gap-6 mb-6 sm:grid-cols-2">
                <div>
                    <label class="block mb-2">Miner Name</label>
                    <input type="text" class="border rounded-lg w-full p-2.5 text-black border-gray-600"
                        placeholder="Enter the Miner Name" required>
                </div>
                <div>
                    <label class="block mb-2">Location</label>
                    <input type="tel" class="border rounded-lg w-full text-black p-2.5 border-gray-600"
                        placeholder="Enter the Location of the Mine" required>
                </div>
            </div>
            <div class="grid gap-6 mb-6 sm:grid-cols-1">
                <div>
                    <label class="block mb-2">Organization</label>
                    <input type="text" class="border text-black rounded-lg w-full p-2.5 border-gray-600"
                        placeholder="Enter the Organization Name" required>
                </div>
            </div>
            <div class="grid gap-6 mb-6 sm:grid-cols-2">
                <div>
                    <label class="block mb-2">Email
                        Address</label>
                    <input type="text" class="border text-black rounded-lg w-full p-2.5 border-gray-600"
                        placeholder="Enter the Email Address" required>
                </div>
                <div>
                    <label class="block mb-2">Phone
                        Number</label>
                    <input type="tel" class="border rounded-lg text-black w-full p-2.5  border-gray-600"
                        placeholder="Enter the Phone Number" required>
                </div>
            </div>
            <div class="grid gap-6 mb-6 sm:grid-cols-3">
                <div>
                    <label class="block mb-2">Block Number</label>
                    <input type="tel" class="border text-black rounded-lg w-full p-2.5 border-gray-600"
                        placeholder="Enter the Block Number" required>
                </div>
                <div>
                    <label class="block mb-2">Lease Period</label>
                    <input type="tel" class="border text-black rounded-lg w-full p-2.5 border-gray-600"
                        placeholder="Enter the Lease Period" required>
                </div>
                <div>
                    <label class="block mb-2">GST Number</label>
                    <input type="tel" class="border text-black rounded-lg w-full p-2.5 border-gray-600"
                        placeholder="Enter the GST Number" required>
                </div>
            </div>
            <div class="flex justify-center items-center w-full mt-3">
                <button type="submit"
                    class="w-full font-semibold bg-orange-400  hover:bg-orange-500 text-[#181818] px-5 py-2.5 rounded-lg">Submit</button>
            </div>
        </form>
    </div>

</template>

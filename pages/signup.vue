<template>
	<!-- TODO: use veeValidate and zod for handling form -->
	<!-- TODO: register user into DB -->
	<!-- TODO: hook up google provider with appwrite for google sign in option -->
	<div
		class="min-h-screen flex flex-col gap-y-5 items-center justify-center bg-gray-50"
	>
		<h1 class="text-4xl font-bold text-center text-gray-800">
			Join Our Community of Creative Innovators
		</h1>
		<p class="mb-5 text-xl text-center text-gray-600 max-w-xl">
			Share your ideas, and collaborate on groundbreaking projects.
		</p>
		<div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
			<!-- Page Title -->
			<h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
				Create an Account
			</h2>

			<!-- Registration Form -->
			<form @submit.prevent="register">
				<!-- Email Input -->
				<div class="mb-4">
					<label for="email" class="block text-gray-700 font-medium mb-2"
						>Email</label
					>
					<Input
						v-model="email"
						type="email"
						id="email"
						placeholder="Enter your email"
						class="w-full"
					/>
				</div>

				<!-- Password Input -->
				<div class="mb-4">
					<label for="password" class="block text-gray-700 font-medium mb-2"
						>Password</label
					>
					<Input
						v-model="password"
						type="password"
						id="password"
						placeholder="Enter your password"
						class="w-full"
					/>
				</div>

				<!-- Confirm Password Input -->
				<div class="mb-6">
					<label
						for="confirm-password"
						class="block text-gray-700 font-medium mb-2"
						>Confirm Password</label
					>
					<Input
						v-model="confirmPassword"
						type="password"
						id="confirm-password"
						placeholder="Confirm your password"
						class="w-full"
					/>
				</div>

				<!-- Register Button -->
				<Button type="submit" variant="primary" class="w-full">Register</Button>
			</form>

			<!-- Link to Login Page -->
			<p class="text-center text-gray-600 mt-4">
				Already have an account?
				<NuxtLink to="/login" class="text-blue-600 hover:underline"
					>Log in</NuxtLink
				>
			</p>
		</div>
	</div>
</template>

<script setup>
const { account } = useAppwrite();
try {
	const res = await account.get();
	console.log(res);
} catch (err) {
	console.log(err);
}
// import { ref } from 'vue';

// const { account, ID } = useAppwrite();

// const email = ref('');
// const password = ref('');
// const confirmPassword = ref('');

// const register = async () => {
//   if (password.value !== confirmPassword.value) {
//     alert('Passwords do not match!');
//     return;
//   }

//   try {
//     await account.create(ID.unique(), email.value, password.value);
//     alert('Registration successful! Please log in.');
//     // Redirect to login page or automatically log in the user
//   } catch (error) {
//     console.error('Registration error:', error);
//     alert('Registration failed. Please try again.');
//   }
// };
</script>

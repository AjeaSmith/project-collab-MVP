<template>
	<header class="bg-white shadow">
		<div class="container mx-auto px-4 flex justify-between items-center py-4">
			<!-- Logo -->
			<a href="/" class="text-2xl font-bold text-gray-800">CreativeCollab</a>

			<!-- Mobile Menu Button -->
			<button
				@click="isMobileMenuOpen = !isMobileMenuOpen"
				class="lg:hidden text-gray-800 focus:outline-none"
				aria-label="Toggle Menu"
			>
				<svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					></path>
				</svg>
			</button>
			<!-- Navigation Links -->
			<nav
				:class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
				class="lg:flex space-x-6 absolute lg:relative top-[9%] left-0 w-full bg-white lg:w-auto lg:bg-transparent lg:space-x-6 lg:flex-row flex-col"
			>
				<NuxtLink
					to="/explore"
					class="block py-2 md:py-0 text-gray-600 hover:text-gray-900"
					>Explore Projects</NuxtLink
				>
				<NuxtLink
					to="/my-projects"
					class="block py-2 md:py-0 text-gray-600 hover:text-gray-900"
					>My Projects</NuxtLink
				>
				<NuxtLink
					to="/collaborators"
					class="block py-2 md:py-0 text-gray-600 hover:text-gray-900"
					>Find Collaborators</NuxtLink
				>
				<NuxtLink
					to="/messages"
					class="block py-2 md:py-0 text-gray-600 hover:text-gray-900"
					>Messages</NuxtLink
				>
				<NuxtLink
					to="/profile"
					class="block py-2 md:py-0 text-gray-600 hover:text-gray-900"
					>Profile</NuxtLink
				>
			</nav>
			<!-- Search Bar and User Menu -->
			<div class="flex items-center space-x-4">
				<!-- Search Bar -->
				<Input
					type="text"
					placeholder="Search Projects or Collaborators"
					class="w-64"
				/>

				<!-- User Dropdown -->
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage
								src="https://github.com/radix-vue.png"
								alt="@radix-vue"
								class="cursor-pointer"
							/>
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent class="w-48">
						<DropdownMenuItem href="/notifications"
							>Notifications</DropdownMenuItem
						>
						<DropdownMenuItem href="/logout">Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	</header>
</template>

<script setup>
import { ref } from "vue";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "./ui/dropdown-menu";

// State to manage mobile menu visibility
const isMobileMenuOpen = ref(false);
</script>

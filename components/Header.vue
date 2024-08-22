<template>
	<ClientOnly>
		<header class="bg-white shadow">
			<div
				class="container mx-auto px-4 flex justify-between items-center py-4"
			>
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
					class="px-4 py-4 flex-col absolute top-[7%] left-0 w-full bg-white | lg:w-auto lg:bg-transparent lg:flex lg:relative lg:space-x-6 lg:flex-row lg:px-0 lg:py-0"
				>
					<NuxtLink
						to="/explore"
						class="block py-2 text-gray-600 hover:text-gray-900"
						>Explore Projects</NuxtLink
					>
					<!-- <div v-if="user.current">{{ user.current }}</div> -->
					<NuxtLink
						v-if="user.isAuthenticated"
						to="/my-projects"
						class="block py-2 text-gray-600 hover:text-gray-900"
						>My Projects</NuxtLink
					>
					<NuxtLink
						to="/collaborators"
						class="block py-2 text-gray-600 hover:text-gray-900"
						>Find Collaborators</NuxtLink
					>
					<NuxtLink
						v-if="user.isAuthenticated"
						to="/messages"
						class="block py-2 text-gray-600 hover:text-gray-900"
						>Messages</NuxtLink
					>
					<NuxtLink
						v-if="user.isAuthenticated"
						to="/profile"
						class="block py-2 text-gray-600 hover:text-gray-900"
						>Profile</NuxtLink
					>
				</nav>
				<!-- User Menu -->
				<div class="flex items-center space-x-4">
					<!-- User Dropdown -->
					<template v-if="user.isAuthenticated">
						<DropdownMenu>
							<DropdownMenuTrigger>
								<template v-if="user.current">
									<Avatar>
										<AvatarImage
											:src="
												user.current
													? user.current.profile_image
													: 'https://github.com/radix-vue.png'
											"
											alt="profile"
											class="cursor-pointer"
										/>
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
								</template>
								<template v-else>
									<Loader2Icon class="animate-spin h-5 w-5 mx-auto" />
								</template>
							</DropdownMenuTrigger>
							<DropdownMenuContent class="w-48">
								<DropdownMenuItem href="/notifications"
									>Notifications</DropdownMenuItem
								>
								<div
									v-if="user.current"
									class="text-sm my-2 mx-2 text-blue-400"
								>
									{{ user.current.name }}
								</div>
								<template v-else>
									<Loader2Icon class="animate-spin size-9 mx-auto" />
								</template>
								<DropdownMenuItem>
									<button
										@click="user.logout"
										class="rounded-sm border-2 px-4 py-1 border-blue-500"
									>
										Log out
									</button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</template>
					<template v-else>
						<NuxtLink
							to="sign-in"
							class="bg-slate-700 text-white hover:bg-white hover:text-slate-700 border-2 border-slate-800 px-2.5 py-2 rounded-sm"
							>Sign in to Create Project</NuxtLink
						>
					</template>
				</div>
			</div>
		</header>
	</ClientOnly>
</template>

<script setup>
import { ref } from "vue";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuContent,
} from "./ui/dropdown-menu";
import { Loader2Icon } from "lucide-vue-next";
import { useAuth } from "~/store/auth";

// State to manage mobile menu visibility
const isMobileMenuOpen = ref(false);

const user = useAuth();

onMounted(async () => {
	if (user.isAuthenticated) {
		user.fetchCurrentUser();
	}
});
</script>

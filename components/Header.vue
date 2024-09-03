<template>
	<ClientOnly>
		<header class="bg-white shadow">
			<section
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
						activeClass="text-blue-500"
						to="/explore"
						class="block py-2 text-gray-600 hover:text-gray-900"
						>Explore Projects</NuxtLink
					>

					<NuxtLink
						activeClass="text-blue-500"
						to="/collaborators"
						class="block py-2 text-gray-600 hover:text-gray-900"
						>Find Collaborators</NuxtLink
					>
					<template v-if="user.isAuthenticated" v-for="link in navLinks">
						<NuxtLink
							:to="link.path"
							activeClass="text-blue-500"
							class="block py-2 text-gray-600 hover:text-gray-900"
							>{{ link.label }}</NuxtLink
						>
					</template>
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
												user.current.profile_image
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
									<LoadingSpinner />
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
									<LoadingSpinner className="size-9 mx-auto" />
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
			</section>
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

import { useUserStore } from "~/store/user";
import LoadingSpinner from "./LoadingSpinner.vue";

const user = useUserStore();

const navLinks = ref([
	{ label: "My Projects", path: "/projects" },
	{ label: "Messages", path: "/messages" },
	{ label: "Profile", path: "/profile" },
]);

// State to manage mobile menu visibility
const isMobileMenuOpen = ref(false);

onMounted(async () => {
	if (user.isAuthenticated) {
		await user.fetchCurrentUser();
	}
});
</script>

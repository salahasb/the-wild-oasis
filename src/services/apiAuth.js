import { AUTH_ENDPOINT, supabaseKey, supabaseUrl } from "./supabase";

export async function SignUpAuth(body) {
	const res = await fetch(`${supabaseUrl}/${AUTH_ENDPOINT}/signup`, {
		headers: { apikey: supabaseKey },
		method: "POST",
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (!res.ok) throw new Error(`${data.msg}`);

	return data;
}

export async function loginAuth(body) {
	const res = await fetch(
		`${supabaseUrl}/${AUTH_ENDPOINT}/token?grant_type=password`,
		{
			headers: { apikey: supabaseKey },
			method: "POST",
			body: JSON.stringify(body),
		}
	);

	const data = await res.json();

	if (data.error) throw new Error(data.error);

	return data;
}

export async function logoutAuth() {
	const token = localStorage.getItem("authToken");

	if (!token) throw new Error(`Token Not Found!`);

	const res = await fetch(`${supabaseUrl}/${AUTH_ENDPOINT}/logout`, {
		headers: { apikey: supabaseKey, Authorization: `Bearer ${token}` },
		method: "POST",
	});

	if (!res.ok) {
		const data = await res.json();

		throw new Error(`${data.msg}`);
	}
}

export async function getUser() {
	const token = localStorage.getItem("authToken");

	if (!token) throw new Error(`Token Not Found!`);

	const res = await fetch(`${supabaseUrl}/${AUTH_ENDPOINT}/user`, {
		headers: {
			apikey: supabaseKey,
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await res.json();

	if (!res.ok) throw new Error(`${data.msg}`);

	return data;
}

export async function updateUserAuth(body) {
	const token = localStorage.getItem("authToken");

	if (!token) throw new Error(`Token Not Found!`);

	const res = await fetch(`${supabaseUrl}/${AUTH_ENDPOINT}/user`, {
		headers: { apikey: supabaseKey, Authorization: `Bearer ${token}` },
		method: "PUT",
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (!res.ok) throw new Error(`${data.msg}`);
	console.log(data);
	return data;
}

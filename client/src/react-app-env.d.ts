/// <reference types="react-scripts" />

interface User {
	id: string;
	name: string;
	email: string;
	bio?: string;
	photo?: { url: string; key: string };
	role: "user" | "instructor" | "admin";
	ratingsAverage: number;
	ratingsQuantity: number;
	students: number;
	wishlist: string[];
	coursesEnrolled: string[];
	coursesCreated: string[];
}

interface Review {
	id: string;
	rating: number;
	review: string;
	createdAt: string | Date;
	user: User<"id" | "name" | "photo">;
}

interface Instructor
	extends Pick<
		User,
		| "id"
		| "name"
		| "photo"
		| "bio"
		| "ratingsAverage"
		| "ratingsQuantity"
		| "students"
		| "coursesCreated"
	> {}

interface Course {
	id: string;
	name: string;
	imageCover: { url: string; key: string };
	summary: string;
	description: string;
	instructors: Instructor[];
	paid: boolean;
	price: number;
	ratingsAverage: number;
	ratingsQuantity: number;
	reviews?: Review[];
	categories: string[];
	duration: number;
	difficulty: "Beginner" | "Intermediate" | "Advanced";
	prerequisites: string[];
	skills: string[];
	onSale?: boolean;
	priceDiscount?: number;
	sections?: Section[];
	channel?: string | number;
}

interface Section {
	id: string;
	title: string;
	description: string;
	modules: Module[];
	duration: number;
}

interface Module {
	title: string;
	duration?: number;
	video: { url: string; key: string };
}

interface Testimonial {
	quote: string;
	photo: string;
	author: string;
}

interface TeamMember {
	name: string;
	role: string;
	photo: string;
	description: string;
	email: string;
	linkedIn: string;
	github?: string;
	x?: string;
}

interface Search {
	name?: string;
	categories?: { in: string[] };
	difficulty?: string;
	paid?: boolean;
	sort?: string;
}

interface Channel {
	id: string;
	name: string;
	messages: Message[];
	course: Pick<Course, "id">;
	users: Pick<User, "id" | "name" | "photo">[];
	admins: Pick<User, "id" | "name" | "photo">[];
	lastMessage: Message;
}

interface Message {
	_id: string;
	sender: Pick<User, "id" | "name" | "photo">;
	content: string;
	channel: number | string;
	readBy?: string[];
	createdAt: string | Date;
	edited: boolean;
	deleted: boolean;
}

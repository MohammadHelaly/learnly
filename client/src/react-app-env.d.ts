/// <reference types="react-scripts" />

interface User {
	id: number | string;
	name: string;
	email: string;
	bio?: string;
	photo?: { url: string; key: string };
	role: "user" | "instructor" | "admin";
	ratingsAverage: number;
	ratingsQuantity: number;
	students: number;
	wishlist: (number | string)[];
	coursesEnrolled: (number | string)[];
	coursesCreated: (number | string)[];
}

interface Review {
	id: number | string;
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
	id: number | string;
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
	id: number | string;
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

interface Search {
	name?: string;
	categories?: { in: string[] };
	difficulty?: string;
	paid?: boolean;
	sort?: string;
}

interface Channel {
	id: number | string;
	name: string;
	messages: Message[];
	course: Pick<Course, "id">;
	users: Pick<User, "id" | "name" | "photo">[];
	admins: Pick<User, "id" | "name" | "photo">[];
	lastMessage: Message;
}

interface Message {
	id: number | string;
	sender: Pick<User, "id" | "name" | "photo">;
	content: string;
	channel: number | string;
	readBy?: string[];
	createdAt: string | Date;
}

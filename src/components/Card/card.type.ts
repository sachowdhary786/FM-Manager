export interface CardInterface {
	title?: string;
	description?: string;
	href?: string;
}

export interface PlayerCardInterface extends CardInterface {
    firstName: string;
    lastName: string;
    imageLink: string;
}
export interface CardInterface {
	title?: string;
	description?: string;
	href?: string;
}

export interface PlayerCardInterface extends CardInterface {
    power?: number;
    cost?: number;
    imageLink?: string;
    position?: string;
}
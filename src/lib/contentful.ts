import contentful, {type EntryFieldTypes} from "contentful";

export interface PlayerType {
    contentTypeId: "playerType",
    fields : {
        firstName: EntryFieldTypes.Text,
        lastName: EntryFieldTypes.Text,
        position: EntryFieldTypes.Text,
        imageLink: EntryFieldTypes.Text,
        power: EntryFieldTypes.Integer,
        cost: EntryFieldTypes.Integer,
    }
}

export interface LinkType {
    contentTypeId: "linkLocation",
    fields: {
        linkText: EntryFieldTypes.Text,
        url: EntryFieldTypes.Text
    }
}

export interface SquadType {
    contentTypeId: "squadType",
    fields: {
        name: EntryFieldTypes.Text,
        players: PlayerType[],
        slug: EntryFieldTypes.Text
    }
}

export const contentfulClient = contentful.createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.DEV ? import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN : import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
    host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com"
})
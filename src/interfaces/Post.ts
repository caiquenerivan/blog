export interface Post {
    id?: number;
    title: string;
    description: string;
    body: string;
    photo: string;
    created_at?: Date;
    updated_at?: Date;
}
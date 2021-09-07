import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostToCategory {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public postId!: number;

    @Column()
    public categoryId!: number;

    @Column()
    public order!: number;

    // @ManyToOne(() => Post, post => post.postToCategories)
    // public post!: Post;

    // @ManyToOne(() => Category, category => category.postToCategories)
    // public category!: Category;
}
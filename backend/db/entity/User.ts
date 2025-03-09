import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Session } from '#/db/entity';
import { uuid } from '#/utils';

@Entity("users")
export class User {
    @PrimaryColumn( { name: 'user_id' } )
    userId: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    //@ts-ignore
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    //@ts-ignore
    updatedAt: Date;

    constructor(email : string, name: string, password: string) {
        this.userId = uuid();
        this.email = email;
        this.name = name;
        this.username = this.userId;
        this.password = password;
    }
}

export default User;

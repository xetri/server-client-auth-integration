import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity("user_sessions")
export class Session {
    @PrimaryColumn({ type: 'text', name: 'session_id' })
    // @ts-ignore
    sessionId: string;

    @Column({ name: 'user_id' })
    //@ts-ignore
    userId: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    //@ts-ignore
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    //@ts-ignore
    updatedAt: Date;

    constructor(sessionId : string, userId: string) {
        this.sessionId = sessionId;
        this.userId = userId;
    }

}

export default Session;

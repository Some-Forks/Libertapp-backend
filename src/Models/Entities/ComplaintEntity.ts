import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';
import { User } from './UserEntity';
import { File } from './FileEntity';

@Entity()
export class Complaint extends GenericTable {
    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    private userId: User;

    @Column({ nullable: false, length: 50 })
    private board: string;

    @ManyToOne(() => File, (file) => file.id)
    @JoinColumn({ name: 'file_id' })
    private fileId: File;

    public getUserId(): User {
        return this.userId;
    }

    public setUserId(userId: User): void {
        this.userId = userId;
    }

    public getBoard(): string {
        return this.board;
    }

    public setBoard(board: string): void {
        this.board = board;
    }

    public getFileId(): File {
        return this.fileId;
    }

    public setFileId(fileId: File): void {
        this.fileId = fileId;
    }
}

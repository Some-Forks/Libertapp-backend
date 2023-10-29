import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';
import { User } from './UserEntity';

@Entity()
export class File extends GenericTable {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 255 })
    private uuid: string;

    @Column({ nullable: false, length: 255, name: 'location_s3' })
    private locationS3: string;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'user_id' })
    private userId: User;

    @Column({ nullable: false, length: 50 })
    private board: string;

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getLocationS3(): string {
        return this.locationS3;
    }

    public setLocationS3(locationS3: string): void {
        this.locationS3 = locationS3;
    }

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
}

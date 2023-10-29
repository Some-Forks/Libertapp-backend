import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';

@Entity()
export class User extends GenericTable {
    @PrimaryGeneratedColumn()
    public id: number;

    @Index({ unique: true })
    @Column({ nullable: false, length: 255 })
    private uuid: string;

    @Column({ nullable: false, type: 'varchar', length: 50 })
    private name: string;

    @Column({ name: 'last_name', nullable: false, type: 'varchar', length: 50 })
    private lastName: string;

    @Column({ nullable: false, type: 'varchar', length: 50 })
    private email: string;

    @Column({ nullable: false, length: 255 })
    private password: string;

    @Column({ nullable: false, name: 'is_active', type: 'boolean', default: false })
    private isActive: boolean;

    public getUuid(): string {
        return this.uuid;
    }

    public setUuid(uuid: string): void {
        this.uuid = uuid;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public isIsActive(): boolean {
        return this.isActive;
    }

    public setIsActive(isActive: boolean): void {
        this.isActive = isActive;
    }
}

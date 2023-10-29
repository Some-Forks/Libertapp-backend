import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';

@Entity()
export class Role extends GenericTable {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false, length: 50 })
    private name: string;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}

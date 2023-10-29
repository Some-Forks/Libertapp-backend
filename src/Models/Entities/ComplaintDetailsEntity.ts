import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GenericTable } from './GenericTable';
import { Complaint } from './ComplaintEntity';

@Entity()
export class ComplaintDetails extends GenericTable {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => Complaint, (complaint) => complaint.id)
    @JoinColumn({ name: 'complaint_id' })
    private complaintId: Complaint;

    @Column({ nullable: false, length: 255 })
    private description: string;

    public getComplaintId(): Complaint {
        return this.complaintId;
    }

    public setComplaintId(complaintId: Complaint): void {
        this.complaintId = complaintId;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }
}

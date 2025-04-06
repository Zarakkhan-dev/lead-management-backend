import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Closed';
  createdAt: Date;
  userId: mongoose.Schema.Types.ObjectId;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Lost', 'Closed'],
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Lead = mongoose.model<ILead>('Lead', leadSchema);

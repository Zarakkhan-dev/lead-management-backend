import { Request, Response } from 'express';
import { Lead } from '../models/lead_model';

export const createLead = async (req: Request & { user?: any }, res: Response) : Promise<Response | void> => {
  const { name, email, phone, status } = req.body;
  const lead = await Lead.create({ name, email, phone, status, userId: req.user._id });
  res.status(201).json(lead);
};

export const getLeads = async (req: Request & { user?: any }, res: Response) : Promise<Response | void> => {
  const leads = await Lead.find({ userId: req.user._id });
  res.json(leads);
};

export const getLeadById = async (req: Request & { user?: any }, res: Response) : Promise<Response | void> => {
  const lead = await Lead.findOne({ _id: req.params.id, userId: req.user._id });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

export const updateLead = async (req: Request & { user?: any }, res: Response) : Promise<Response | void> => {
  const lead = await Lead.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    { new: true }
  );
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

export const deleteLead = async (req: Request & { user?: any }, res: Response) : Promise<Response | void> => {
  const lead = await Lead.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json({ message: 'Lead deleted' });
};


// Get lead statistics for the dashboard
export const getLeadStats = async (req: Request & { user?: any }, res: Response): Promise<Response | void> => {
    try {
      const userId = req.user._id;

      const leads = await Lead.find({ userId });
  
      const total = leads.length;
  
      const byStatus: Record<string, number> = {};
  
      leads.forEach((lead) => {
        byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;
      });
  
      return res.json({ total, byStatus });
    } catch (error) {
      console.error('Error fetching lead stats:', error);
      return res.status(500).json({ message: 'Failed to fetch lead stats' });
    }
  };
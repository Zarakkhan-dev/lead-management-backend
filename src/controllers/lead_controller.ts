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

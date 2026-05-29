import Lead from "../models/Lead.js";

export const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, status } = req.body;

    const duplicateLead = await Lead.findOne({
      email,
      createdBy: req.user._id
    });

    if (duplicateLead) {
      return res.status(409).json({ message: "Lead email already exists" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      status,
      createdBy: req.user._id
    });

    return res.status(201).json({ message: "Lead created successfully", lead });
  } catch (error) {
    return next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { createdBy: req.user._id };

    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ count: leads.length, leads });
  } catch (error) {
    return next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const lead = await Lead.findOne({ _id: id, createdBy: req.user._id });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    if (email && email !== lead.email) {
      const duplicateLead = await Lead.findOne({
        email,
        createdBy: req.user._id,
        _id: { $ne: id }
      });

      if (duplicateLead) {
        return res.status(409).json({ message: "Lead email already exists" });
      }
    }

    lead.name = req.body.name ?? lead.name;
    lead.email = req.body.email ?? lead.email;
    lead.phone = req.body.phone ?? lead.phone;
    lead.status = req.body.status ?? lead.status;

    const updatedLead = await lead.save();
    return res.status(200).json({
      message: "Lead updated successfully",
      lead: updatedLead
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const lead = await Lead.findOneAndDelete({
      _id: id,
      createdBy: req.user._id
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    return next(error);
  }
};

import mongoose from "mongoose";

const { Schema } = mongoose;

const ContactFormSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 3 },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    message: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const ContactForm = mongoose.models.ContactForm || mongoose.model("ContactForm", ContactFormSchema);

export default ContactForm;

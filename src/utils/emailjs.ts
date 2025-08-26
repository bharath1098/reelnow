// EmailJS configuration utility
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
// You'll need to replace this with your actual EmailJS user ID
const initEmailJS = () => {
  emailjs.init("VgXOFau6GZKyLUxx0");
};

// Send email function
export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactNumber: string;
}) => {
  try {
    const result = await emailjs.send(
      "service_b2el5r3", // EmailJS service ID
      "template_wtlt1uz", // EmailJS template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        contactNumber: formData.contactNumber,
        timestamp: new Date().toISOString(),
      }
    );
    
    return {
      success: true,
      result
    };
  } catch (error) {
    console.error("EmailJS error:", error);
    return {
      success: false,
      error
    };
  }
};

export default initEmailJS;

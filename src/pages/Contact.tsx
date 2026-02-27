import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Mail, Phone, MapPin, Send, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Contact Us</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 gradient-text-white">
            Get In Touch
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed">
            Have a question or ready to book? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                  Let's Create Something <span className="gradient-text">Amazing</span>
                </h2>
                <p className="text-white/60 leading-relaxed">
                  We're here to answer any questions you may have about our services. 
                  Reach out and we'll respond as soon as we can.
                </p>
              </div>

              <div className="space-y-6">
                <a href="mailto:info@reelnow.in" className="glass-card p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Email</p>
                    <p className="text-white font-medium">info@reelnow.in</p>
                  </div>
                </a>

                <a href="tel:+919010994207" className="glass-card p-4 flex items-center gap-4 hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Phone</p>
                    <p className="text-white font-medium">+91 90109 94207</p>
                  </div>
                </a>

                <div className="glass-card p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Location</p>
                    <p className="text-white font-medium">Hyderabad, India</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="text-white/50 text-sm mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/reelnow.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.youtube.com/@reelnow_official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                  >
                    <Youtube size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-xl font-display font-semibold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all resize-none"
                    placeholder="Tell us about your project..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-xl text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

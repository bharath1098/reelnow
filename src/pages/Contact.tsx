import React from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import {
  Instagram,
  Facebook,
  Mail,
  Phone,
  Youtube,
  YoutubeIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6 bg-photo-dark text-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Book Now
            </h1>
            <div className="w-24 h-1 bg-photo-accent mb-8"></div>
            <p className="max-w-3xl text-gray-300 text-lg">
              Have a question or ready to book? We'd love to hear from you.
              Reach out to us using the form below.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="fade-right">
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl mb-6">
                    Get In Touch
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-md">
                    We're here to answer any questions you may have about our
                    photography services, pricing, or availability.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="mr-4 text-photo-accent" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <a
                        className="text-gray-600"
                        href="mailto:info@reelnow.in"
                      >
                        info@reelnow.in
                      </a>
                      <p className="text-gray-500 text-sm mt-1">
                        We typically respond within few hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="mr-4 text-photo-accent" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <a href="tel:+919010994207" className="text-gray-600">
                        +91 90109 94207
                      </a>
                      <p className="text-gray-500 text-sm mt-1">
                        Mon - Fri: 9am - 5pm EST
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-medium mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://instagram.com/reelnow.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Instagram size={20} className="text-photo-accent" />
                      </a>
                      <a
                        href="https://www.youtube.com/@reelnow_official"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <YoutubeIcon size={20} className="text-photo-accent" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={100}>
              <Card className="overflow-hidden border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl mb-6">Send a Message</h3>
                  <ContactForm />
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Our Location
            </h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our studio is conveniently located in downtown. Feel free to visit
              us during our business hours.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={200}>
            <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903e421a6f1%3A0x27af1521d403d2d!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1619544619201!5m2!1sen!2sca"
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Studio Location Map"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <AnimatedSection animation="fade-up" className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-photo-accent mx-auto mb-6"></div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I book a photography session?",
                answer:
                  "Simply fill out our contact form, and we'll be in touch within 24 hours to discuss your needs and check availability.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "We understand that plans change. Cancellations with 72+ hours notice receive a full refund of any deposit.",
              },
              {
                question: "Do you offer rush delivery for photos?",
                answer:
                  "Yes, we offer rush delivery options for an additional fee. Please inquire for specifics based on your needs.",
              },
              {
                question: "Can I purchase additional photos after my session?",
                answer:
                  "Absolutely! You can purchase additional digital images or prints from your gallery at any time.",
              },
            ].map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Call CTA */}
      {/* <section className="py-20 px-6 bg-photo-dark text-white">
        <div className="container mx-auto text-center">
          <AnimatedSection animation="fade-up">
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Prefer to Talk in Person?
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300 mb-8">
              Schedule a free 15-minute consultation call to discuss your
              photography needs.
            </p>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-photo-accent hover:bg-photo-accent/90 text-white py-3 px-8 rounded-md font-medium transition-colors inline-block"
            >
              Book a Free Consultation
            </a>
          </AnimatedSection>
        </div>
      </section> */}
    </Layout>
  );
};

export default Contact;
